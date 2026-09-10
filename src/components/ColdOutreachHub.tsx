import React, { useState } from 'react';
import { Send, Plus, Trash2, Sparkles, CheckCircle2, AlertCircle, Eye, FileText, Upload, RefreshCw } from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { sendEmailReply } from '@/lib/emailService';

export interface TargetLead {
  id: string;
  company: string;
  name: string;
  email: string;
  customNote: string;
  status: 'idle' | 'sending' | 'sent' | 'error';
  errorMsg?: string;
}

interface ColdTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
}

const PRESET_TEMPLATES: ColdTemplate[] = [
  {
    id: 'redesign',
    title: 'Website & App Redesign Pitch',
    subject: 'Quick question regarding {{company_name}}\'s digital experience',
    body: `Hi {{contact_name}},

I came across {{company_name}} and was really impressed by what your team is building. 

While reviewing your current digital touchpoints, I noticed a few high-impact opportunities to elevate your brand visual hierarchy, mobile user experience, and conversion performance.

{{custom_note}}

At Saurav Studio, I specialize in crafting high-performance, ultra-modern web applications for high-growth tech brands. 

Are you open to a brief 10-minute chat or async feedback video this week?

Best regards,
Saurav Kumar
Founder & Digital Architect • Saurav Studio`,
  },
  {
    id: 'ux_audit',
    title: 'UX & Performance Audit Pitch',
    subject: 'UX & Frontend Performance Audit for {{company_name}}',
    body: `Hi {{contact_name}},

I hope you're having a great week!

I ran a quick frontend performance and interface design audit on {{company_name}}. There are a few low-hanging optimization fixes that could significantly boost your site speed and visitor retention.

{{custom_note}}

I've helped high-growth teams rebuild their web architectures to achieve sub-second load times and premium aesthetic positioning.

Would you be open to seeing a quick breakdown of my findings for {{company_name}}?

Best regards,
Saurav Kumar
Founder & Digital Architect • Saurav Studio`,
  },
  {
    id: 'landing_page',
    title: 'High-Converting Landing Page Pitch',
    subject: 'Elevating {{company_name}}\'s conversion rate',
    body: `Hi {{contact_name}},

I'm reaching out because I love the product value proposition behind {{company_name}}.

{{custom_note}}

I help tech companies turn casual visitors into active customers by engineering high-converting, micro-animation-rich landing pages.

Are you available for a quick call this week to explore how we can boost {{company_name}}'s conversion rate?

Best regards,
Saurav Kumar
Founder & Digital Architect • Saurav Studio`,
  },
  {
    id: 'custom',
    title: 'Custom Pitch Template',
    subject: 'Collaboration opportunity with {{company_name}}',
    body: `Hi {{contact_name}},

{{custom_note}}

Best regards,
Saurav Kumar
Founder & Digital Architect • Saurav Studio`,
  },
];

export const ColdOutreachHub: React.FC = () => {
  const [leads, setLeads] = useState<TargetLead[]>([
    {
      id: '1',
      company: 'Acme SaaS Labs',
      name: 'Alex Rivera',
      email: 'alex@acmesaassample.com',
      customNote: "Loved your recent v2.0 release on Product Hunt!",
      status: 'idle',
    },
    {
      id: '2',
      company: 'Nexus AI Stack',
      name: 'Elena Rostova',
      email: 'elena@nexusaisample.io',
      customNote: "Your developer API documentation looks sleek, but the main landing page could use a high-end dark mode polish.",
      status: 'idle',
    },
    {
      id: '3',
      company: 'Vanguard Pay',
      name: 'Marcus Chen',
      email: 'marcus@vanguardpaysample.com',
      customNote: "Saw your expansion into APAC markets - congratulations!",
      status: 'idle',
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<ColdTemplate>(PRESET_TEMPLATES[0]);
  const [customSubject, setCustomSubject] = useState(PRESET_TEMPLATES[0].subject);
  const [customBody, setCustomBody] = useState(PRESET_TEMPLATES[0].body);
  const [previewLeadId, setPreviewLeadId] = useState<string>('1');
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [showCsvImport, setShowCsvImport] = useState(false);
  const [rawCsvInput, setRawCsvInput] = useState('');

  const handleSelectTemplate = (template: ColdTemplate) => {
    setSelectedTemplate(template);
    setCustomSubject(template.subject);
    setCustomBody(template.body);
  };

  const handleAddLead = () => {
    const newId = Date.now().toString();
    setLeads((prev) => [
      ...prev,
      {
        id: newId,
        company: '',
        name: '',
        email: '',
        customNote: '',
        status: 'idle',
      },
    ]);
    setPreviewLeadId(newId);
  };

  const handleRemoveLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleUpdateLead = (id: string, field: keyof TargetLead, value: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleCsvImport = () => {
    if (!rawCsvInput.trim()) return;
    const lines = rawCsvInput.split('\n');
    const newLeads: TargetLead[] = [];

    lines.forEach((line, idx) => {
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length >= 2) {
        const company = parts[0] || 'Target Company';
        const name = parts[1] || 'Founder / Executive';
        const email = parts[2] || '';
        const customNote = parts[3] || '';

        newLeads.push({
          id: `${Date.now()}-${idx}`,
          company,
          name,
          email,
          customNote,
          status: 'idle',
        });
      }
    });

    if (newLeads.length > 0) {
      setLeads((prev) => [...prev, ...newLeads]);
      setRawCsvInput('');
      setShowCsvImport(false);
    }
  };

  const getRenderedContent = (lead: TargetLead) => {
    const company = lead.company || '[Company Name]';
    const name = lead.name || '[Contact Name]';
    const customNote = lead.customNote || '';

    const subject = customSubject
      .replace(/\{\{company_name\}\}/g, company)
      .replace(/\{\{contact_name\}\}/g, name);

    const body = customBody
      .replace(/\{\{company_name\}\}/g, company)
      .replace(/\{\{contact_name\}\}/g, name)
      .replace(/\{\{custom_note\}\}/g, customNote);

    return { subject, body };
  };

  const activePreviewLead = leads.find((l) => l.id === previewLeadId) || leads[0];
  const renderedPreview = activePreviewLead ? getRenderedContent(activePreviewLead) : { subject: '', body: '' };

  const handleStartBatchOutreach = async () => {
    const validLeads = leads.filter((l) => l.email && l.email.includes('@'));
    if (validLeads.length === 0) {
      alert('Please add at least one valid recipient with a valid email address.');
      return;
    }

    setIsSending(true);
    setSentCount(0);

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      if (!lead.email || !lead.email.includes('@')) {
        continue;
      }

      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, status: 'sending' } : l))
      );

      const rendered = getRenderedContent(lead);

      try {
        const res = await sendEmailReply({
          to_email: lead.email,
          to_name: lead.name || 'Executive',
          subject: rendered.subject,
          message: rendered.body,
          service_requested: 'Cold Outreach',
        });

        if (res.success) {
          setLeads((prev) =>
            prev.map((l) => (l.id === lead.id ? { ...l, status: 'sent' } : l))
          );
          setSentCount((c) => c + 1);
        } else {
          setLeads((prev) =>
            prev.map((l) =>
              l.id === lead.id ? { ...l, status: 'error', errorMsg: res.message } : l
            )
          );
        }
      } catch (err: any) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id ? { ...l, status: 'error', errorMsg: err.message } : l
          )
        );
      }

      // Small rate-limit safety delay between dispatches
      await new Promise((r) => setTimeout(r, 600));
    }

    setIsSending(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative group overflow-hidden glass-card rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <CornerBorder />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized Cold Email Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Cold Outreach Hub
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Send tailored, high-converting pitches to multiple prospect companies simultaneously. Every email is dynamically personalized with custom notes, company details, and executive signatures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCsvImport(!showCsvImport)}
              className="relative group overflow-hidden px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CornerBorder />
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Bulk CSV Import</span>
            </button>

            <button
              onClick={handleStartBatchOutreach}
              disabled={isSending || leads.length === 0}
              className="relative group overflow-hidden px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all shadow-lg shadow-cyan-400/20 flex items-center gap-2 cursor-pointer"
            >
              <CornerBorder />
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Sending ({sentCount}/{leads.length})...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Launch Outreach ({leads.length} Companies)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* CSV Import Modal / Collapse */}
        {showCsvImport && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Paste Bulk CSV Lines (Company, Name, Email, Custom Note)
              </h4>
              <span className="text-xs text-slate-500 font-mono">Format: Company, Name, email@domain.com, Custom Note</span>
            </div>
            <textarea
              rows={3}
              placeholder="Acme Corp, Sarah Jenkins, sarah@acme.com, Loved your recent Product Hunt launch!&#10;Nexus AI, David Miller, david@nexus.io, Impressive platform architecture."
              value={rawCsvInput}
              onChange={(e) => setRawCsvInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCsvImport(false)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCsvImport}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-mono font-bold"
              >
                Import Leads
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Left Template & Recipient List, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Template Selection & Recipient Builder (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Template Picker */}
          <div className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <CornerBorder />
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>1. Select Cold Email Strategy</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400">{selectedTemplate.title}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`relative group overflow-hidden text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-cyan-950/50 border-cyan-500/80 text-white shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <CornerBorder />
                  <div className="font-semibold text-white mb-1">{tmpl.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">{tmpl.subject}</div>
                </button>
              ))}
            </div>

            {/* Editable Subject & Body Pattern */}
            <div className="space-y-3 pt-3 border-t border-slate-800/80">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Email Subject Pattern (supports &#10100;&#10100;company_name&#10101;&#10101; & &#10100;&#10100;contact_name&#10101;&#10101;)
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Email Body Pattern (supports &#10100;&#10100;company_name&#10101;&#10101;, &#10100;&#10100;contact_name&#10101;&#10101;, &#10100;&#10100;custom_note&#10101;&#10101;)
                </label>
                <textarea
                  rows={6}
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Recipient Companies Builder */}
          <div className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <CornerBorder />
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>2. Target Companies & Personalization ({leads.length})</span>
              </h3>
              <button
                onClick={handleAddLead}
                className="relative group overflow-hidden px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 hover:bg-cyan-900/60 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CornerBorder />
                <Plus className="w-3.5 h-3.5" />
                <span>Add Company</span>
              </button>
            </div>

            {/* Recipient Lead Cards */}
            <div className="space-y-4">
              {leads.map((lead, idx) => (
                <div
                  key={lead.id}
                  className={`p-4 rounded-xl border transition-all ${
                    previewLeadId === lead.id
                      ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold border border-cyan-800">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {lead.company || 'Unnamed Company'}
                      </span>
                      {lead.status === 'sent' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sent</span>
                        </span>
                      )}
                      {lead.status === 'sending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60 animate-pulse">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Sending...</span>
                        </span>
                      )}
                      {lead.status === 'error' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/60">
                          <AlertCircle className="w-3 h-3" />
                          <span>Failed</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewLeadId(lead.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                          previewLeadId === lead.id
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </button>

                      {leads.length > 1 && (
                        <button
                          onClick={() => handleRemoveLead(lead.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Stripe"
                        value={lead.company}
                        onChange={(e) => handleUpdateLead(lead.id, 'company', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">Contact Person</label>
                      <input
                        type="text"
                        placeholder="e.g. Patrick Collison"
                        value={lead.name}
                        onChange={(e) => handleUpdateLead(lead.id, 'name', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">Work Email *</label>
                      <input
                        type="email"
                        placeholder="patrick@stripe.com"
                        value={lead.email}
                        onChange={(e) => handleUpdateLead(lead.id, 'email', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">
                      Custom Personalization Note (replaces &#10100;&#10100;custom_note&#10101;&#10101;)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Saw your recent tech talk on scalable payment infrastructures!"
                      value={lead.customNote}
                      onChange={(e) => handleUpdateLead(lead.id, 'customNote', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Email Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-8">
          <div className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-2xl">
            <CornerBorder />
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Live Personalization Preview</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Target #{leads.findIndex((l) => l.id === activePreviewLead?.id) + 1}
              </span>
            </div>

            {/* Email Metadata Card */}
            <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">To:</span>
                <span className="text-cyan-300 font-bold">{activePreviewLead?.email || '[No Email Specified]'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="text-white">{activePreviewLead?.company || '[Company]'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subject:</span>
                <span className="text-slate-200 font-bold">{renderedPreview.subject}</span>
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

              {/* Rendered Body */}
              <div className="p-5 text-slate-300 text-xs leading-relaxed space-y-4 font-sans whitespace-pre-wrap">
                {renderedPreview.body}
              </div>

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
