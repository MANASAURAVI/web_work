import { storage, db } from './firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface EmailAttachment {
  name: string;
  type: string;
  size: number;
  data: string; // Base64 Data URL
  downloadUrl?: string;
  isUploading?: boolean;
  uploadError?: string;
}

export interface SendReplyParams {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  service_requested?: string;
  attachments?: EmailAttachment[];
}

export interface SendReplyResponse {
  success: boolean;
  isDemo: boolean;
  webmailUrl?: string;
  message: string;
}

// Dynamically load EmailJS browser SDK via script tag if needed
const loadEmailJSSDK = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).emailjs) {
      resolve((window as any).emailjs);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).emailjs) {
        resolve((window as any).emailjs);
      } else {
        reject(new Error('EmailJS SDK loaded but window.emailjs is undefined.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load EmailJS SDK script.'));
    document.head.appendChild(script);
  });
};

export const checkIsEmailJSConfigured = (): boolean => {
  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim();
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim();
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim();
  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    serviceId !== 'your_service_id' &&
    serviceId.length > 2
  );
};

const stripHtmlToPlainText = (html: string): string => {
  return html
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n$1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<b>(.*?)<\/b>/gi, '$1')
    .replace(/<i>(.*?)<\/i>/gi, '$1')
    .replace(/<u>(.*?)<\/u>/gi, '$1')
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const sendEmailReply = async (params: SendReplyParams): Promise<SendReplyResponse> => {
  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim();
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim();
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim();
  const privateKey = (import.meta.env.VITE_EMAILJS_PRIVATE_KEY || '').trim();
  const isConfigured = checkIsEmailJSConfigured();

  // Create webmail fallback link with attachment note if any
  let attachmentNotes = '';
  if (params.attachments && params.attachments.length > 0) {
    attachmentNotes = `\n\n[Attached Files: ${params.attachments.map((a) => a.name).join(', ')}]`;
  }

  const webmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(params.to_email)}&su=${encodeURIComponent(params.subject)}&body=${encodeURIComponent(stripHtmlToPlainText(params.message) + attachmentNotes)}`;

  if (isConfigured) {
    let formattedMessage = params.message;

    let isStorageCorsBlocked = false;
    const uploadedUrls: Record<string, string> = {};

    // Attachments processing - Upload to Firebase Storage with fast fallback if CORS blocks
    if (params.attachments && params.attachments.length > 0) {
      for (const att of params.attachments) {
        let uploadedUrl = att.downloadUrl || '';
        if (!uploadedUrl && storage && att.data && !isStorageCorsBlocked) {
          try {
            const cleanFileName = att.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const fileRef = ref(storage, `attachments/${Date.now()}_${cleanFileName}`);
            
            // Fast 2s timeout promise so CORS errors don't hang email dispatch
            const uploadPromise = uploadString(fileRef, att.data, 'data_url').then(() => getDownloadURL(fileRef));
            const timeoutPromise = new Promise<string>((_, reject) =>
              setTimeout(() => reject(new Error('Firebase Storage timeout/CORS')), 2000)
            );

            uploadedUrl = await Promise.race([uploadPromise, timeoutPromise]);
            if (uploadedUrl) {
              uploadedUrls[att.name] = uploadedUrl;
            }

            // Record in Firestore storage_attachments collection for Admin Storage Manager
            if (db && uploadedUrl) {
              try {
                await addDoc(collection(db, 'storage_attachments'), {
                  fileName: att.name,
                  fileSize: att.size,
                  fileType: att.type,
                  storagePath: fileRef.fullPath,
                  downloadUrl: uploadedUrl,
                  sentTo: params.to_email,
                  uploadedAt: serverTimestamp(),
                });
              } catch (metaErr) {
                console.warn('Firestore attachment record error:', metaErr);
              }
            }
          } catch (uploadErr) {
            isStorageCorsBlocked = true;
            console.warn('Firebase Storage upload skipped due to CORS policy. Email dispatch fallback active.');
          }
        } else if (uploadedUrl) {
          uploadedUrls[att.name] = uploadedUrl;
        }
      }

      // Check if there are non-image document attachments (like PDFs) that failed to upload to Storage
      const unhostedDocs = params.attachments.filter((att) => {
        const isImage = att.type.startsWith('image/');
        const hasUrl = Boolean(uploadedUrls[att.name]);
        return !isImage && !hasUrl;
      });

      if (unhostedDocs.length > 0) {
        const docNames = unhostedDocs.map((d) => d.name).join(', ');
        return {
          success: true,
          isDemo: true,
          webmailUrl,
          message: `Opening Gmail Web! Firebase Storage upload was blocked by CORS on localhost, so free EmailJS cannot attach '${docNames}' directly. Your draft is pre-filled in Gmail Web so you can attach your PDF!`,
        };
      }

      // Format attachments for HTML email body
      for (const att of params.attachments) {
        const uploadedUrl = uploadedUrls[att.name] || '';
        if (att.type.startsWith('image/')) {
          const imgSrc = uploadedUrl || att.data;
          formattedMessage += `
            <div style="margin-top:16px; text-align:center;">
              <a href="${imgSrc}" target="_blank">
                <img src="${imgSrc}" alt="${att.name}" style="max-width:100%; border-radius:8px; border:1px solid #334155;" />
              </a>
              ${uploadedUrl ? `<div style="margin-top:6px;"><a href="${uploadedUrl}" target="_blank" style="color:#38bdf8; font-size:12px; text-decoration:underline;">Click to view full image (${att.name})</a></div>` : ''}
            </div>
          `;
        } else if (uploadedUrl) {
          formattedMessage += `
            <div style="margin-top:20px; padding:16px; background:#0f172a; border:1px solid #38bdf8; border-radius:10px; text-align:center; font-family:sans-serif;">
              <div style="margin-bottom:8px; font-weight:bold; color:#f8fafc; font-size:14px;">📄 Attached Document: ${att.name}</div>
              <a href="${uploadedUrl}" target="_blank" download="${att.name}" style="display:inline-block; padding:10px 20px; background:#38bdf8; color:#0f172a; font-weight:bold; font-size:13px; text-decoration:none; border-radius:6px; margin-top:4px;">
                📥 Download / View PDF (${Math.round(att.size / 1024)} KB)
              </a>
            </div>
          `;
        }
      }
    }

    const cleanMessage = stripHtmlToPlainText(formattedMessage);

    const templateParams: any = {
      to_email: params.to_email,
      email: params.to_email,
      to_name: params.to_name,
      client_name: params.to_name,
      from_name: 'Saurav Studio',
      name: 'Saurav Studio',
      subject: params.subject,
      title: params.subject,
      message: cleanMessage,
      html_message: formattedMessage,
      service_requested: params.service_requested || 'General Inquiry',
      reply_to: '0501sauravkumar0501@gmail.com',
      time: new Date().toLocaleString(),
    };

    if (params.attachments && params.attachments.length > 0) {
      // Map main attachment to content and content_name
      templateParams.content = params.attachments[0].data;
      templateParams.content_name = params.attachments[0].name;

      // Map additional attachments if any
      params.attachments.forEach((att, idx) => {
        if (idx > 0) {
          templateParams[`content_${idx + 1}`] = att.data;
          templateParams[`content_${idx + 1}_name`] = att.name;
        }
      });
    }

    // Protection against EmailJS 50KB Variables Size Limit (HTTP 413)
    if (JSON.stringify(templateParams).length > 42000) {
      console.warn('Payload exceeds EmailJS 42KB safety threshold. Trimming Base64 data to prevent 413 error...');
      delete templateParams.content;
      if (params.attachments) {
        params.attachments.forEach((_, idx) => {
          if (idx > 0) delete templateParams[`content_${idx + 1}`];
        });
      }
      templateParams.message = templateParams.message.replace(/<img src="data:image\/[^"]+"/g, '<span style="color:#94a3b8; font-size:12px;">[Attached Image]</span>');
    }

    let lastErrorMsg = '';

    // 1. Direct REST API Call using environment variables
    for (const token of [privateKey, '']) {
      try {
        const bodyPayload: any = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        };
        if (token) {
          bodyPayload.accessToken = token;
        }

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyPayload),
        });

        if (response.ok) {
          const resText = await response.text();
          console.log('EmailJS send success:', resText);
          return {
            success: true,
            isDemo: false,
            message: `Real email delivered successfully to ${params.to_email}!`,
          };
        } else {
          lastErrorMsg = await response.text();
          console.warn(`EmailJS REST attempt (token:${Boolean(token)}) failed:`, lastErrorMsg);
        }
      } catch (e: any) {
        lastErrorMsg = e?.message || 'Network request failed';
      }
    }

    // 2. EmailJS Browser SDK Fallback using environment variables
    try {
      const emailjs = await loadEmailJSSDK();
      const sdkOptions: any = { publicKey };
      if (privateKey) sdkOptions.privateKey = privateKey;

      const res = await emailjs.send(serviceId, templateId, templateParams, sdkOptions);
      if (res.status === 200 || res.text === 'OK') {
        return {
          success: true,
          isDemo: false,
          message: `Real email delivered successfully to ${params.to_email}!`,
        };
      }
    } catch (sdkErr: any) {
      console.warn('SDK attempt failed:', sdkErr);
    }

    // If EmailJS returned 404 Account Not Found, fallback gracefully with Gmail Web composer option
    return {
      success: true,
      isDemo: true,
      webmailUrl,
      message: `Reply saved & lead updated to 'Replied'! (EmailJS returned 404 Account Not Found for Public Key "${publicKey}". You can also click below to open Gmail Web with your reply pre-filled).`,
    };
  }

  // Demo / Unconfigured Mode Notice
  console.log('--- EMAIL DISPATCH (DEMO MODE) ---');
  console.log(`To: ${params.to_email}`);
  console.log(`Subject: ${params.subject}`);
  console.log(`Message:\n${params.message}`);
  console.log('-----------------------------------');

  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    isDemo: true,
    webmailUrl,
    message: `Reply saved & lead updated to 'Replied'!`,
  };
};
