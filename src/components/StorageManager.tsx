import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Search,
  FileText,
  Image as ImageIcon,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { db, storage } from '../lib/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export interface StorageAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  storagePath: string;
  downloadUrl: string;
  sentTo?: string;
  uploadedAt?: any;
}

export const StorageManager: React.FC = () => {
  const [attachments, setAttachments] = useState<StorageAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pdf' | 'image'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Subscribe to real-time storage metadata from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'storage_attachments'), orderBy('uploadedAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: StorageAttachment[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            downloadUrl: data.downloadUrl || data.fileData || '',
          };
        }) as StorageAttachment[];
        setAttachments(docs);
        setLoading(false);
      },
      (error) => {
        // Quietly catch Firestore permission errors if rules restrict unauthenticated reads
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const totalBytesUsed = attachments.reduce((acc, curr) => acc + (curr.fileSize || 0), 0);
  const formattedMbUsed = (totalBytesUsed / (1024 * 1024)).toFixed(2);
  // Free tier is 5000 MB (5 GB)
  const freeTierMb = 5000;
  const percentageUsed = Math.min(100, (parseFloat(formattedMbUsed) / freeTierMb) * 100);

  const filteredAttachments = attachments.filter((att) => {
    const matchesSearch =
      att.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (att.sentTo && att.sentTo.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedCategory === 'pdf') {
      return att.fileType.includes('pdf') || att.fileName.endsWith('.pdf');
    }
    if (selectedCategory === 'image') {
      return att.fileType.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(att.fileName);
    }
    return true;
  });

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteSingle = async (att: StorageAttachment) => {
    if (!confirm(`Are you sure you want to delete "${att.fileName}"? This will free up storage immediately.`)) {
      return;
    }

    setDeletingId(att.id);
    try {
      // 1. Delete file from Firebase Storage if available
      if (storage && att.storagePath) {
        try {
          const fileRef = ref(storage, att.storagePath);
          await deleteObject(fileRef);
        } catch (storageErr) {
          console.warn('Storage file deletion note:', storageErr);
        }
      }

      // 2. Delete tracking document from Firestore
      if (db) {
        await deleteDoc(doc(db, 'storage_attachments', att.id));
      }

      setNotification({ type: 'success', message: `Deleted "${att.fileName}" successfully!` });
    } catch (err: any) {
      setNotification({ type: 'error', message: err?.message || 'Failed to delete attachment' });
    } finally {
      setDeletingId(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} selected files? This cannot be undone.`)) return;

    setIsBatchDeleting(true);
    let successCount = 0;

    for (const id of selectedIds) {
      const att = attachments.find((a) => a.id === id);
      if (!att) continue;

      try {
        if (storage && att.storagePath) {
          try {
            await deleteObject(ref(storage, att.storagePath));
          } catch (e) {
            console.warn(e);
          }
        }
        if (db) {
          await deleteDoc(doc(db, 'storage_attachments', id));
        }
        successCount++;
      } catch (e) {
        console.warn('Failed batch item delete:', id, e);
      }
    }

    setSelectedIds([]);
    setIsBatchDeleting(false);
    setNotification({
      type: 'success',
      message: `Successfully deleted ${successCount} items and freed up storage!`,
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAttachments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAttachments.map((a) => a.id));
    }
  };

  const toggleSelectId = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl flex items-center justify-between border ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storage KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400 font-medium">Storage Used</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{formattedMbUsed} MB</span>
            <span className="text-xs text-slate-400">/ 5,000 MB Free Tier</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(2, percentageUsed)}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400 font-medium">Total Files</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{attachments.length}</span>
            <span className="text-xs text-slate-400">documents & images</span>
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
            <span>📄 PDFs: {attachments.filter((a) => a.fileName.endsWith('.pdf') || a.fileType.includes('pdf')).length}</span>
            <span>•</span>
            <span>🖼️ Images: {attachments.filter((a) => a.fileType.startsWith('image/')).length}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400 font-medium">Free Storage Left</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{(freeTierMb - parseFloat(formattedMbUsed)).toFixed(1)} MB</span>
            <span className="text-xs text-emerald-400 font-medium">100% Free Plan</span>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Deleting unused attachments reclaims instant storage quota.
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Category Filters, Batch Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by file name or recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            All Files ({attachments.length})
          </button>
          <button
            onClick={() => setSelectedCategory('pdf')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'pdf'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            📄 PDFs & Docs
          </button>
          <button
            onClick={() => setSelectedCategory('image')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'image'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            🖼️ Images
          </button>
        </div>

        {/* Batch Delete Action */}
        {selectedIds.length > 0 && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleBatchDelete}
            disabled={isBatchDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-500/20 transition-all disabled:opacity-50"
          >
            {isBatchDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Delete Selected ({selectedIds.length})
          </motion.button>
        )}
      </div>

      {/* Files List Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
            <span className="text-sm">Loading storage documents...</span>
          </div>
        ) : filteredAttachments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <HardDrive className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="text-slate-300 font-medium">No storage attachments found</p>
            <p className="text-xs text-slate-500 mt-1">
              Documents attached to emails will automatically appear here to allow easy deletion.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredAttachments.length && filteredAttachments.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                    />
                  </th>
                  <th className="p-4">Document / File</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Sent To</th>
                  <th className="p-4">Upload Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAttachments.map((att) => {
                  const isImage = att.fileType?.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(att.fileName);
                  const formattedSize = (att.fileSize / 1024).toFixed(1) + ' KB';

                  return (
                    <tr key={att.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(att.id)}
                          onChange={() => toggleSelectId(att.id)}
                          className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2.5 rounded-xl border ${
                              isImage
                                ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                            }`}
                          >
                            {isImage ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-200 block truncate max-w-xs group-hover:text-cyan-400 transition-colors">
                              {att.fileName}
                            </span>
                            <span className="text-xs text-slate-500">{att.fileType || 'Document'}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-300 font-mono text-xs">
                        <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
                          {formattedSize}
                        </span>
                      </td>

                      <td className="p-4 text-slate-400 text-xs">
                        {att.sentTo ? (
                          <span className="text-slate-300">{att.sentTo}</span>
                        ) : (
                          <span className="text-slate-600 italic">Unspecified</span>
                        )}
                      </td>

                      <td className="p-4 text-slate-400 text-xs">
                        {att.uploadedAt?.toDate ? att.uploadedAt.toDate().toLocaleString() : 'Recent'}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Preview Link */}
                          {att.downloadUrl && (
                            <a
                              href={att.downloadUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Preview Document"
                              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Copy URL */}
                          {att.downloadUrl && (
                            <button
                              onClick={() => handleCopyLink(att.id, att.downloadUrl)}
                              title="Copy Download Link"
                              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedId === att.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}

                          {/* Delete File */}
                          <button
                            onClick={() => handleDeleteSingle(att)}
                            disabled={deletingId === att.id}
                            title="Delete file & free up storage"
                            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors disabled:opacity-50"
                          >
                            {deletingId === att.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-400" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
