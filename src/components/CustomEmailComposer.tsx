import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  File,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Eye,
  User,
  Mail,
  FileText,
  Bold,
  Italic,
  Underline,
  Type,
  List,
  Palette,
  Heading2,
} from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { sendEmailReply, EmailAttachment } from '@/lib/emailService';
import { storage, db } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

const initialDraft = loadSavedDraft();

export const CustomEmailComposer: React.FC = () => {
  const [recipientName, setRecipientName] = useState<string>(initialDraft?.recipientName || '');
  const [recipientEmail, setRecipientEmail] = useState<string>(initialDraft?.recipientEmail || '');
  const [subject, setSubject] = useState<string>(initialDraft?.subject || '');
  const [message, setMessage] = useState<string>(initialDraft?.message || '');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>(initialDraft?.fontFamily || 'sans');
  const [selectedColor, setSelectedColor] = useState<string>(initialDraft?.selectedColor || '#38bdf8');
  const [attachments, setAttachments] = useState<EmailAttachment[]>(initialDraft?.attachments || []);
  const [isSending, setIsSending] = useState(false);
  const [statusToast, setStatusToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [webmailUrl, setWebmailUrl] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(
    initialDraft ? 'Saved Draft Loaded' : null
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-Save Draft to LocalStorage whenever content changes
  useEffect(() => {
    const draftData = {
      recipientName,
      recipientEmail,
      subject,
      message,
      fontFamily,
      selectedColor,
      attachments,
    };

    if (recipientName || recipientEmail || subject || message || attachments.length > 0) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSavedTime(`Auto-Saved at ${nowStr}`);
      } catch (e) {
        console.warn('Failed to auto-save email draft:', e);
      }
    }
  }, [recipientName, recipientEmail, subject, message, fontFamily, selectedColor, attachments]);

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
      setAttachments([]);
      localStorage.removeItem(DRAFT_KEY);
      setLastSavedTime(null);
      return;
    }
    if (type === 'proposal') {
      setSubject(`Project Proposal & Scope - ${name}`);
      setMessage(`Hi <b>${name}</b>,

Thank you for our recent discussion! 

Attached to this email, you will find our comprehensive <u>Project Proposal</u> and Scope breakdown tailored to your deliverables, timeline, and goals.

<h3 style="color: #38bdf8; font-size: 16px; font-weight: 700; margin-top: 16px; margin-bottom: 8px;">Key Deliverables Covered:</h3>
• <b>Complete Custom UI/UX Design Mockups</b>
• <i>High-Performance Fullstack Architecture</i>
• <span style="color: #34d399; font-weight: bold;">Sub-second Speed Optimization & SEO Setup</span>

Please review the attached document and let me know if you have any questions. I look forward to collaborating!

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

Attached is the <u>invoice and milestone breakdown</u> for our recent project phase.

If you need any additional documentation, please let me know.

Best regards,
<b>Saurav Kumar</b>
Founder & Digital Architect • Saurav Studio`);
    }
  };

const compressImageFile = (file: File): Promise<{ base64: string; size: number }> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve({ base64: reader.result as string, size: file.size });
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        resolve({ base64: compressedBase64, size: Math.round((compressedBase64.length * 3) / 4) });
      } else {
        resolve({ base64: (reader.result as string) || '', size: file.size });
      }
    };

    reader.onerror = () => resolve({ base64: '', size: file.size });
    reader.readAsDataURL(file);
  });
};

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const { base64, size } = await compressImageFile(file);
      if (!base64) continue;

      const attachmentEntry: EmailAttachment = {
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: size,
        data: base64,
        isUploading: true,
      };

      setAttachments((prev) => [...prev, attachmentEntry]);

      // Immediate Upload to Firebase Storage with automatic Firestore Fallback if CORS blocks
      if (storage || db) {
        let url = '';

        if (storage) {
          try {
            const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const fileRef = ref(storage, `attachments/${Date.now()}_${cleanFileName}`);

            const uploadPromise = uploadString(fileRef, base64, 'data_url').then(() => getDownloadURL(fileRef));
            const timeoutPromise = new Promise<string>((_, reject) =>
              setTimeout(() => reject(new Error('Firebase Storage timeout/CORS')), 2500)
            );

            url = await Promise.race([uploadPromise, timeoutPromise]);
            if (url && db) {
              try {
                await addDoc(collection(db, 'storage_attachments'), {
                  fileName: file.name,
                  fileSize: size,
                  fileType: file.type || 'application/octet-stream',
                  storagePath: fileRef.fullPath,
                  downloadUrl: url,
                  sentTo: 'Composer Upload',
                  uploadedAt: serverTimestamp(),
                });
              } catch (metaErr) {
                console.warn('Firestore attachment record error:', metaErr);
              }
            }
          } catch (uploadErr: any) {
            console.warn('Firebase Storage CORS blocked on localhost. Switching to Firestore fallback...');
          }
        }

        // Firestore Fallback if Storage CORS blocked or unconfigured
        if (!url && db && base64.length < 950000) {
          try {
            await addDoc(collection(db, 'storage_attachments'), {
              fileName: file.name,
              fileSize: size,
              fileType: file.type || 'application/octet-stream',
              fileData: base64,
              sentTo: 'Composer Upload (Firestore)',
              uploadedAt: serverTimestamp(),
            });
            url = base64; // Data URL for view & send
          } catch (fsErr) {
            console.warn('Firestore fallback error:', fsErr);
          }
        }

        if (url) {
          setAttachments((prev) =>
            prev.map((item) =>
              item.name === file.name && item.data === base64
                ? { ...item, downloadUrl: url, isUploading: false, uploadError: undefined }
                : item
            )
          );
        } else {
          setAttachments((prev) =>
            prev.map((item) =>
              item.name === file.name && item.data === base64
                ? { ...item, isUploading: false, uploadError: 'Localhost CORS blocked' }
                : item
            )
          );
        }
      } else {
        setAttachments((prev) =>
          prev.map((item) => (item.name === file.name && item.data === base64 ? { ...item, isUploading: false } : item))
        );
      }
    }

    e.target.value = '';
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
        attachments: attachments,
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
        setAttachments([]);
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
      <div className="relative group overflow-hidden glass-card rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <CornerBorder />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Custom Mailer</span>
            </div>
            {lastSavedTime && (
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lastSavedTime}</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Custom Email & Rich Document Composer
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Compose rich HTML emails with bolding, italics, underlines, multi-color highlights, font families, and attached documents for instant executive delivery.
          </p>
        </div>
      </div>

      {/* Main Composer Layout: Form (Left) & Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Email Composer Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSendCustomEmail} className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 space-y-6 shadow-2xl">
            <CornerBorder />
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Compose Rich Message</span>
              </h3>

              {/* Quick Template Presets */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className="text-slate-500">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => applyPreset('proposal')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 cursor-pointer"
                >
                  Proposal
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('followup')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 cursor-pointer"
                >
                  Follow-up
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('invoice')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 cursor-pointer"
                >
                  Invoice
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('none')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-950/60 hover:border-rose-800 cursor-pointer font-bold"
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
              <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-950 border border-b-0 border-slate-800 rounded-t-xl text-xs font-mono">
                <button
                  type="button"
                  onClick={() => insertFormatting('<b>', '</b>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px]">Bold</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('<i>', '</i>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-white italic flex items-center gap-1 transition-colors cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px]">Italic</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('<u>', '</u>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 hover:text-white underline flex items-center gap-1 transition-colors cursor-pointer"
                  title="Underline"
                >
                  <Underline className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px]">Underline</span>
                </button>

                <div className="h-4 w-px bg-slate-800 mx-0.5"></div>

                {/* Multi-Color Palette Swatches */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
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
                  <div className="relative flex items-center ml-1 border-l border-slate-800 pl-1.5">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => insertColoredText(e.target.value)}
                      className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0 shadow-sm"
                      title="Custom Color Picker Wheel"
                    />
                  </div>
                </div>

                <div className="h-4 w-px bg-slate-800 mx-0.5"></div>

                <button
                  type="button"
                  onClick={() => insertFormatting('<h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin-top: 16px; margin-bottom: 8px;">', '</h3>')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Heading"
                >
                  <Heading2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px]">Heading</span>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('• ')}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Bullet Point"
                >
                  <List className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px]">Bullet</span>
                </button>

                {/* Font Selector */}
                <div className="ml-auto flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={fontFamily}
                    onChange={(e: any) => setFontFamily(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[11px] text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="sans">Sans-Serif (Modern)</option>
                    <option value="serif">Serif (Executive)</option>
                    <option value="mono">Monospace (Code)</option>
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

            {/* File Attachment Dropzone & List */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase text-slate-400 font-medium flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-cyan-400" />
                  <span>Attach Documents / Files ({attachments.length})</span>
                </label>

                <label className="relative group overflow-hidden px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 hover:bg-cyan-900/60 transition-all flex items-center gap-1.5 cursor-pointer">
                  <CornerBorder />
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Browse & Upload File</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Attached Files Grid */}
              {attachments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {attachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <File className="w-4 h-4 text-cyan-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-white truncate font-medium">{att.name}</p>
                            <p className="text-[10px] text-slate-500">{formatFileSize(att.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1 shrink-0 transition-colors"
                          title="Remove Attachment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Upload Status Badge / Link */}
                      <div className="pt-1.5 border-t border-slate-900/80 flex items-center justify-between text-[10px]">
                        {att.isUploading ? (
                          <span className="text-cyan-400 font-mono flex items-center gap-1 animate-pulse font-semibold">
                            <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                            <span>Uploading to Firebase Storage...</span>
                          </span>
                        ) : att.downloadUrl ? (
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-emerald-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>Uploaded to Firebase ✓</span>
                            </span>
                            <a
                              href={att.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 underline shrink-0"
                            >
                              <span>View File</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        ) : att.uploadError ? (
                          <span className="text-amber-400 font-medium flex items-center gap-1 truncate" title="Localhost CORS blocked upload to Storage. Will fallback to Gmail Web.">
                            <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">Localhost CORS Blocked (Gmail Web Fallback)</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 font-medium">Ready</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] font-mono text-slate-500 italic">
                  No files attached yet. Click "Browse & Upload File" to upload to Firebase Storage & attach documents.
                </p>
              )}
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
              {attachments.length > 0 && (
                <div className="flex justify-between pt-1 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-500">Attachments:</span>
                  <span className="text-emerald-400 font-bold">{attachments.length} file(s) attached</span>
                </div>
              )}
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

              {/* Attachments Section in Email Preview */}
              {attachments.length > 0 && (
                <div className="p-4 bg-slate-950/80 border-t border-slate-800 space-y-2">
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Attached Documents:</p>
                  <div className="space-y-1.5">
                    {attachments.map((att, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-cyan-300">
                        <File className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{att.name}</span>
                        <span className="text-slate-500">({formatFileSize(att.size)})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
