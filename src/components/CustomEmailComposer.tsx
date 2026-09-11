import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Eye,
  User,
  Mail,
  Bold,
  Italic,
  Underline,
  Type,
  List,
  Palette,
  Heading2,
  Paperclip,
} from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { sendEmailReply } from '@/lib/emailService';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PRESET_COLORS = [
  { name: 'Cyan', hex: '#38bdf8', bgClass: 'bg-cyan-400' },
  { name: 'Emerald', hex: '#34d399', bgClass: 'bg-emerald-400' },
  { name: 'Amber Gold', hex: '#fbbf24', bgClass: 'bg-amber-400' },
  { name: 'Rose Red', hex: '#fb7185', bgClass: 'bg-rose-400' },
  { name: 'Purple', hex: '#c084fc', bgClass: 'bg-purple-400' },
  { name: 'Indigo', hex: '#818cf8', bgClass: 'bg-indigo-400' },
  { name: 'White', hex: '#ffffff', bgClass: 'bg-white' },
];

const DRAFT_KEY = 'saurav_email_draft';

const loadSavedDraft = () => {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load email draft:', e);
  }
  return null;
};

export const CustomEmailComposer: React.FC = () => {
  const [recipientName, setRecipientName] = useState<string>(() => loadSavedDraft()?.recipientName || '');
  const [recipientEmail, setRecipientEmail] = useState<string>(() => loadSavedDraft()?.recipientEmail || '');
  const [subject, setSubject] = useState<string>(() => loadSavedDraft()?.subject || '');
  const [message, setMessage] = useState<string>(() => loadSavedDraft()?.message || '');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>(() => loadSavedDraft()?.fontFamily || 'sans');
  const [selectedColor, setSelectedColor] = useState<string>(() => loadSavedDraft()?.selectedColor || '#38bdf8');
  const [isSending, setIsSending] = useState(false);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [statusToast, setStatusToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [webmailUrl, setWebmailUrl] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(() =>
    loadSavedDraft() ? 'Saved Draft Loaded' : null
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-Upload File & Insert Direct Access Link into Message Body
  const handleAttachmentUploadAndInsertLink = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingAttachment(true);
    let insertedLinksText = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `uploads/${Date.now()}_${cleanFileName}`;

        let downloadUrl = '';

        // Attempt Firebase Storage Upload with 120s timeout for large files (up to 50MB)
        if (storage) {
          try {
            const fileRef = ref(storage, storagePath);
            const uploadPromise = uploadBytes(fileRef, file).then(() => getDownloadURL(fileRef));
            const uploadTimeoutMs = Math.max(45000, Math.min(180000, Math.ceil(file.size / 1000) * 3));
            const timeoutPromise = new Promise<string>((_, reject) =>
              setTimeout(() => reject(new Error('Storage Timeout')), uploadTimeoutMs)
            );
            downloadUrl = await Promise.race([uploadPromise, timeoutPromise]);
          } catch (stErr) {
            console.warn('Firebase Storage upload notice, using Data URL fallback:', stErr);
          }
        }

        // Attempt 2: Free Public Cloud Upload Fallback (tmpfiles.org) if Firebase Storage is unconfigured or blocked by CORS
        if (!downloadUrl) {
          try {
            const formData = new FormData();
            formData.append('file', file);
            const tmpRes = await fetch('https://tmpfiles.org/api/v1/upload', {
              method: 'POST',
              body: formData,
            });
            if (tmpRes.ok) {
              const tmpData = await tmpRes.json();
              if (tmpData?.data?.url) {
                downloadUrl = tmpData.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
              }
            }
          } catch (tmpErr) {
            console.warn('Public cloud upload notice, using Data URL fallback:', tmpErr);
          }
        }

        // Attempt 3: Base64 Data URL Fallback if both cloud storage attempts fail
        if (!downloadUrl) {
          downloadUrl = await new Promise<string>((resolve) => {
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (evt) => {
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  let width = img.width;
                  let height = img.height;
                  const maxDim = 1200;
                  if (width > maxDim || height > maxDim) {
                    if (width > height) {
                      height = Math.round((height * maxDim) / width);
                      width = maxDim;
                    } else {
                      width = Math.round((width * maxDim) / height);
                      height = maxDim;
                    }
                  }
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.85));
                  } else {
                    resolve((evt.target?.result as string) || '');
                  }
                };
                img.onerror = () => resolve((evt.target?.result as string) || '');
                img.src = (evt.target?.result as string) || '';
              };
              reader.onerror = () => resolve('');
              reader.readAsDataURL(file);
            } else {
              const reader = new FileReader();
              reader.onload = (evt) => resolve((evt.target?.result as string) || '');
              reader.onerror = () => resolve('');
              reader.readAsDataURL(file);
            }
          });
        }

        if (downloadUrl) {
          // Record in Firestore storage_attachments collection so it appears in Storage Manager
          if (db) {
            try {
              await addDoc(collection(db, 'storage_attachments'), {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type || 'application/octet-stream',
                storagePath: storagePath,
                downloadUrl: downloadUrl,
                sentTo: recipientEmail || 'Custom Email Attachment',
                uploadedAt: serverTimestamp(),
              });
            } catch (dbErr) {
              console.warn('Firestore attachment save notice:', dbErr);
            }
          }

          // Format clean HTML attachment box that opens in a new tab with working URL (never '#')
          const isHttpUrl = downloadUrl.startsWith('http');
          if (isHttpUrl) {
            insertedLinksText += `\n<div style="margin-top: 10px; margin-bottom: 10px; padding: 10px 14px; background: #0f172a; border: 1px solid #334155; border-radius: 8px;">📎 <b>Attached File:</b> ${file.name}<br/><a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">🔗 Open ${file.name} in New Tab: ${downloadUrl}</a></div>\n`;
          } else {
            insertedLinksText += `\n<div style="margin-top: 10px; margin-bottom: 10px; padding: 10px 14px; background: #0f172a; border: 1px solid #334155; border-radius: 8px;">📎 <b>Attached File:</b> ${file.name}<br/><a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">🔗 Click to Open ${file.name} in New Tab</a></div>\n`;
          }
        }
      } catch (err) {
        console.error('Attachment processing error:', err);
      }
    }

    setIsUploadingAttachment(false);
    e.target.value = '';

    if (insertedLinksText) {
      setMessage((prev) => {
        const nextMsg = prev + insertedLinksText;
        try {
          const draftData = {
            recipientName,
            recipientEmail,
            subject,
            message: nextMsg,
            fontFamily,
            selectedColor,
          };
          localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastSavedTime(`Auto-Saved at ${nowStr}`);
        } catch (e) {
          console.warn('Failed to save draft on attachment upload:', e);
        }
        return nextMsg;
      });
      setStatusToast({
        type: 'success',
        msg: 'Attachment uploaded & direct download link inserted into email body!',
      });
      setTimeout(() => setStatusToast(null), 4000);
    }
  };

  // Auto-Save Draft to LocalStorage whenever content changes
  useEffect(() => {
    const draftData = {
      recipientName,
      recipientEmail,
      subject,
      message,
      fontFamily,
      selectedColor,
    };

    if (recipientName || recipientEmail || subject || message) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSavedTime(`Auto-Saved at ${nowStr}`);
      } catch (e) {
        console.warn('Failed to auto-save email draft:', e);
      }
    }
  }, [recipientName, recipientEmail, subject, message, fontFamily, selectedColor]);

  // Formatting helper
  const insertFormatting = (tagStart: string, tagEnd: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end) || 'text';
    const replacement = `${tagStart}${selectedText}${tagEnd}`;

    const newMessage = message.substring(0, start) + replacement + message.substring(end);
    setMessage(newMessage);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, start + tagStart.length + selectedText.length);
    }, 0);
  };

  const insertColoredText = (hex: string) => {
    setSelectedColor(hex);
    insertFormatting(`<span style="color: ${hex}; font-weight: bold;">`, '</span>');
  };

  // Quick Preset Templates
  const applyPreset = (type: 'proposal' | 'followup' | 'invoice' | 'none') => {
    const name = recipientName || 'Client';
    if (type === 'none') {
      setRecipientName('');
      setRecipientEmail('');
      setSubject('');
      setMessage('');
      localStorage.removeItem(DRAFT_KEY);
      setLastSavedTime(null);
      return;
    }
    if (type === 'proposal') {
      setSubject(`Project Proposal & Scope - ${name}`);
      setMessage(`Hi <b>${name}</b>,

Thank you for our recent discussion! 

Below, you will find our comprehensive <u>Project Proposal</u> and Scope breakdown tailored to your deliverables, timeline, and goals.

<h3 style="color: #38bdf8; font-size: 16px; font-weight: 700; margin-top: 16px; margin-bottom: 8px;">Key Deliverables Covered:</h3>
• <b>Complete Custom UI/UX Design Mockups</b>
• <i>High-Performance Fullstack Architecture</i>
• <span style="color: #34d399; font-weight: bold;">Sub-second Speed Optimization & SEO Setup</span>

Please review these details and let me know if you have any questions. I look forward to collaborating!

Best regards,
<b>Saurav Kumar</b>
Founder & Digital Architect • Saurav Studio`);
    } else if (type === 'followup') {
      setSubject(`Following up on our recent conversation - ${name}`);
      setMessage(`Hi <b>${name}</b>,

I hope you're having a great week!

I wanted to follow up on our previous discussion regarding your project. I'm excited about the possibility of collaborating with your team to build a <u>high-performance web experience</u>.

Are you available for a brief <span style="color: #fbbf24; font-weight: bold;">10-minute check-in call</span> this week to align on next steps?

Best regards,
<b>Saurav Kumar</b>
Founder & Digital Architect • Saurav Studio`);
    } else if (type === 'invoice') {
      setSubject(`Invoice & Milestone Details - Saurav Studio`);
      setMessage(`Hi <b>${name}</b>,

Thank you for a great phase of work!

Below is the <u>invoice and milestone breakdown</u> for our recent project phase.

If you need any additional documentation, please let me know.

Best regards,
<b>Saurav Kumar</b>
Founder & Digital Architect • Saurav Studio`);
    }
  };

  const handleSendCustomEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setStatusToast({ type: 'error', msg: 'Please enter a valid recipient email address.' });
      return;
    }
    if (!message.trim()) {
      setStatusToast({ type: 'error', msg: 'Please enter a message body before sending.' });
      return;
    }

    setIsSending(true);
    setStatusToast(null);

    // Apply font styling if non-default font chosen
    let finalMessage = message;
    if (fontFamily === 'serif') {
      finalMessage = `<div style="font-family: Georgia, serif;">${message}</div>`;
    } else if (fontFamily === 'mono') {
      finalMessage = `<div style="font-family: 'Courier New', monospace;">${message}</div>`;
    }

    try {
      const res = await sendEmailReply({
        to_email: recipientEmail,
        to_name: recipientName || 'Client',
        subject: subject || 'Direct Email from Saurav Studio',
        message: finalMessage,
      });

      if (res.webmailUrl) {
        setWebmailUrl(res.webmailUrl);
      }

      if (res.success) {
        setStatusToast({
          type: 'success',
          msg: res.message || `Email successfully delivered to ${recipientEmail}!`,
        });
        // Clear draft on successful delivery
        setRecipientName('');
        setRecipientEmail('');
        setSubject('');
        setMessage('');
        localStorage.removeItem(DRAFT_KEY);
        setLastSavedTime(null);
      } else {
        setStatusToast({
          type: 'error',
          msg: res.message || 'Failed to send email. Please check EmailJS configuration.',
        });
      }
    } catch (err: any) {
      setStatusToast({
        type: 'error',
        msg: err.message || 'An unexpected error occurred while sending email.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative group overflow-hidden glass-card rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-800 shadow-xl">
        <CornerBorder />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Custom Mailer</span>
            </div>
            {lastSavedTime && (
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-400 font-medium bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lastSavedTime}</span>
              </div>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Custom Email & Rich Document Composer
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Compose rich HTML emails with bolding, italics, underlines, multi-color highlights, and custom typography for instant executive delivery.
          </p>
        </div>
      </div>

      {/* Main Composer Layout: Form (Left) & Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Email Composer Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSendCustomEmail} className="relative group overflow-hidden glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-5 sm:space-y-6 shadow-2xl">
            <CornerBorder />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Compose Rich Message</span>
              </h3>

              {/* Quick Template Presets */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-mono w-full sm:w-auto">
                <span className="text-slate-500 font-semibold shrink-0">Presets:</span>
                <button
                  type="button"
                  onClick={() => applyPreset('proposal')}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer text-[10px] font-mono font-medium"
                >
                  Proposal
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('followup')}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer text-[10px] font-mono font-medium"
                >
                  Follow-up
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('invoice')}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer text-[10px] font-mono font-medium"
                >
                  Invoice
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('none')}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-950/60 hover:border-rose-800 transition-colors cursor-pointer text-[10px] font-mono font-bold"
                  title="Clear Subject & Message Body"
                >
                  None (Clear)
                </button>
              </div>
            </div>

            {/* Status Toast */}
            {statusToast && (
              <div
                className={`p-4 rounded-xl text-xs font-mono flex items-center gap-3 ${
                  statusToast.type === 'success'
                    ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                    : 'bg-rose-950/70 border border-rose-500/50 text-rose-300'
                }`}
              >
                {statusToast.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div className="flex-1">
                  <span>{statusToast.msg}</span>
                  {webmailUrl && (
                    <div className="mt-2 pt-2 border-t border-emerald-800/40 flex items-center justify-between">
                      <span className="text-slate-300 text-[11px]">Also open pre-filled in Gmail Web:</span>
                      <a
                        href={webmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 text-[11px] flex items-center gap-1"
                      >
                        <span>Open Gmail Web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recipient Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-400 font-medium">
                  Recipient Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-slate-400 font-medium">
                  Recipient Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alex@yourclient.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Subject Line */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-400 font-medium">
                Email Subject *
              </label>
              <input
                type="text"
                required
                placeholder="Project Scope & Proposal Breakdown"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-cyan-300 font-bold placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Message Body & Rich Text Formatting Toolbar */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                <label className="block text-xs font-mono uppercase text-slate-400 font-medium">
                  Email Message Body (Rich Text) *
                </label>
                <span className="text-[10px] font-mono text-slate-500">{message.length} chars</span>
              </div>

              {/* Rich Formatting Toolbar */}
              <div className="flex items-center gap-1.5 p-2.5 bg-slate-950 border border-b-0 border-slate-800 rounded-t-xl text-xs font-mono overflow-x-auto no-scrollbar whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => insertFormatting('<b>', '</b>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px]">Bold</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('<i>', '</i>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-white italic flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px]">Italic</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('<u>', '</u>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-white underline flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Underline"
                >
                  <Underline className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px]">Underline</span>
                </button>

                <div className="h-4 w-px bg-slate-800 mx-0.5 shrink-0"></div>

                {/* Direct File Attachment & Link Generator */}
                <label className="p-1.5 hover:bg-cyan-900/60 rounded text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors cursor-pointer shrink-0 font-bold bg-cyan-950/60 border border-cyan-500/40 shadow-sm" title="Upload Document / Image & Insert Direct Access Link into Email Body">
                  {isUploadingAttachment ? (
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  ) : (
                    <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span className="text-[10px]">
                    {isUploadingAttachment ? 'Uploading to Storage...' : 'Attach File (Up to 50MB)'}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleAttachmentUploadAndInsertLink}
                    className="hidden"
                    disabled={isUploadingAttachment}
                  />
                </label>

                <div className="h-4 w-px bg-slate-800 mx-0.5 shrink-0"></div>

                {/* Multi-Color Palette Swatches */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
                  <Palette className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 mr-0.5">Colors:</span>
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => insertColoredText(c.hex)}
                      className={`w-4 h-4 rounded-full ${c.bgClass} hover:scale-125 transition-transform cursor-pointer border border-slate-900 shrink-0 shadow-sm`}
                      title={`Highlight in ${c.name} (${c.hex})`}
                    />
                  ))}

                  {/* Native HTML Custom Color Picker Wheel */}
                  <div className="relative flex items-center ml-1 border-l border-slate-800 pl-1.5 shrink-0">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => insertColoredText(e.target.value)}
                      className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0 shadow-sm"
                      title="Custom Color Picker Wheel"
                    />
                  </div>
                </div>

                <div className="h-4 w-px bg-slate-800 mx-0.5 shrink-0"></div>

                <button
                  type="button"
                  onClick={() => insertFormatting('<h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 16px; margin-bottom: 8px;">', '</h3>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Heading"
                >
                  <Heading2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px]">Heading</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('• ')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Bullet Point"
                >
                  <List className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px]">Bullet</span>
                </button>

                {/* Font Selector */}
                <div className="ml-auto flex items-center gap-1 shrink-0">
                  <Type className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={fontFamily}
                    onChange={(e: any) => setFontFamily(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[11px] text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="sans">Sans-Serif</option>
                    <option value="serif">Serif</option>
                    <option value="mono">Monospace</option>
                  </select>
                </div>
              </div>

              <textarea
                id="composer-message-textarea"
                ref={textareaRef}
                rows={9}
                required
                placeholder="Type your message here... Use the toolbar above to apply bold, italics, underline, or pick any color from the swatches!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full bg-slate-950 border border-slate-800 rounded-b-xl p-4 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 leading-relaxed ${
                  fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="relative group overflow-hidden w-full px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CornerBorder />
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Delivering Rich Email...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send Direct Email Now</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Live Email Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-8">
          <div className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-2xl">
            <CornerBorder />
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Live Rich Email Preview</span>
              </h3>
            </div>

            {/* Email Metadata Card */}
            <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">To:</span>
                <span className="text-cyan-300 font-bold">{recipientEmail || '[Recipient Email]'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subject:</span>
                <span className="text-slate-200 font-bold">{subject || '[Subject Line]'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Font:</span>
                <span className="text-purple-400 font-bold capitalize">{fontFamily}</span>
              </div>
            </div>

            {/* Simulated HTML Email Output Box */}
            <div className="bg-[#0b0f17] rounded-xl border border-slate-800 overflow-hidden shadow-inner">
              {/* Fake Email Header */}
              <div className="bg-[#111827] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    SAURAV STUDIO
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>

              {/* Rendered Rich HTML Body */}
              <div
                className={`p-5 text-slate-300 text-xs leading-relaxed space-y-4 whitespace-pre-wrap ${
                  fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
                }`}
                dangerouslySetInnerHTML={{ __html: message || '[Your message text will render here with live HTML formatting...]' }}
              />

              {/* Fake Email Footer Signature */}
              <div className="bg-[#0b0f17] p-4 border-t border-slate-800/80 text-[11px] space-y-1">
                <div className="font-bold text-white">Saurav Kumar</div>
                <div className="text-slate-400 text-[10px]">Founder & Digital Architect • Saurav Studio</div>
                <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="text-cyan-400">0501sauravkumar0501@gmail.com</span>
                  <span className="text-cyan-400 font-semibold">LinkedIn &rarr;</span>
                  <span className="text-purple-400 font-semibold">GitHub &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
