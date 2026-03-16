/* ─────────────────────────────────────────────
 * WizardUpload — File upload zone + URL input
 * ───────────────────────────────────────────── */
import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Image, Link2, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UploadedDocument } from '@/types/wizard';
import { extractTextFromFile } from '@/lib/brand-analysis';

interface WizardUploadProps {
  documents: UploadedDocument[];
  onDocumentsChange: (docs: UploadedDocument[]) => void;
  onAnalyze: () => void;
  onSkip: () => void;
}

const ACCEPTED_TYPES: Record<string, UploadedDocument['type']> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xlsx',
  'text/csv': 'xlsx',
  'text/plain': 'text',
  'text/markdown': 'text',
  'image/png': 'image',
  'image/jpeg': 'image',
  'image/webp': 'image',
};

const ACCEPT_STRING = Object.keys(ACCEPTED_TYPES).join(',');

function fileIcon(type: UploadedDocument['type']) {
  switch (type) {
    case 'image': return <Image className="h-4 w-4" />;
    case 'url': return <Link2 className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
}

function statusIcon(status: UploadedDocument['status']) {
  switch (status) {
    case 'uploading':
    case 'processing':
      return <Loader2 className="h-4 w-4 animate-spin text-brand-yellow" />;
    case 'ready':
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-400" />;
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

let docIdCounter = 0;
function nextId() {
  return `doc-${Date.now()}-${++docIdCounter}`;
}

export function WizardUpload({ documents, onDocumentsChange, onAnalyze, onSkip }: WizardUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    // First, add documents as 'processing'
    const newDocs: UploadedDocument[] = fileArray.map((f) => ({
      id: nextId(),
      name: f.name,
      type: ACCEPTED_TYPES[f.type] || 'text',
      size: f.size,
      status: 'processing' as const,
    }));
    const allDocs = [...documents, ...newDocs];
    onDocumentsChange(allDocs);

    // Then extract text from each file in parallel
    const results = await Promise.allSettled(
      fileArray.map((f) => extractTextFromFile(f)),
    );

    // Update documents with extracted text
    const updatedDocs = allDocs.map((doc, idx) => {
      const newDocIndex = idx - documents.length;
      if (newDocIndex < 0 || newDocIndex >= results.length) return doc;

      const result = results[newDocIndex];
      if (result.status === 'fulfilled' && result.value) {
        return { ...doc, extractedText: result.value, status: 'ready' as const };
      }
      return { ...doc, status: 'error' as const, errorMessage: 'Could not extract text' };
    });
    onDocumentsChange(updatedDocs);
  }, [documents, onDocumentsChange]);

  const addUrl = useCallback(() => {
    const url = urlInput.trim();
    if (!url) return;
    const doc: UploadedDocument = {
      id: nextId(),
      name: url.replace(/^https?:\/\//, '').slice(0, 60),
      type: 'url',
      size: 0,
      status: 'ready',
    };
    onDocumentsChange([...documents, doc]);
    setUrlInput('');
  }, [urlInput, documents, onDocumentsChange]);

  const removeDoc = useCallback((id: string) => {
    onDocumentsChange(documents.filter((d) => d.id !== id));
  }, [documents, onDocumentsChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const hasDocuments = documents.length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Drop zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          group relative cursor-pointer rounded-xl border-2 border-dashed p-8
          transition-all duration-300 text-center
          ${isDragging
            ? 'border-brand-yellow/60 bg-brand-yellow/5 scale-[1.01]'
            : 'border-border hover:border-brand-yellow/30 hover:bg-muted/30'
          }
        `}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_STRING}
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <Upload className={`mx-auto mb-3 h-8 w-8 transition-colors ${isDragging ? 'text-brand-yellow' : 'text-muted-foreground group-hover:text-brand-yellow/70'}`} />
        <p className="text-sm font-medium text-foreground">
          Drop files here or <span className="text-brand-yellow">browse</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PDF, DOCX, XLSX, images, or plain text
        </p>
      </motion.div>

      {/* URL input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="url"
            placeholder="Paste a website URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addUrl()}
            className="w-full rounded-lg border border-border bg-background/40 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-yellow/60 focus:outline-none focus:ring-1 focus:ring-brand-yellow/30"
          />
        </div>
        <Button size="sm" variant="outline" onClick={addUrl} disabled={!urlInput.trim()}>
          Add
        </Button>
      </div>

      {/* Uploaded file list */}
      <AnimatePresence mode="popLayout">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3"
          >
            <span className="text-muted-foreground">{fileIcon(doc.type)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
              {doc.size > 0 && (
                <p className="text-xs text-muted-foreground">{formatSize(doc.size)}</p>
              )}
            </div>
            {statusIcon(doc.status)}
            <button
              onClick={() => removeDoc(doc.id)}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={onAnalyze}
          disabled={!hasDocuments}
          className="flex-1"
        >
          {hasDocuments ? `Analyze ${documents.length} file${documents.length > 1 ? 's' : ''}` : 'Upload files to continue'}
        </Button>
        <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
          Start from scratch →
        </Button>
      </div>
    </div>
  );
}
