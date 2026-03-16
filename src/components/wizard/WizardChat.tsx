/* ─────────────────────────────────────────────
 * WizardChat — Conversational gap-fill interface
 * ───────────────────────────────────────────── */
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ChatMessage } from '@/types/wizard';

interface WizardChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectSuggestion: (suggestion: string) => void;
  onFinishConversation: () => void;
  isThinking: boolean;
  fieldsComplete: number;
  fieldsTotal: number;
}

export function WizardChat({
  messages,
  onSendMessage,
  onSelectSuggestion,
  onFinishConversation,
  isThinking,
  fieldsComplete,
  fieldsTotal,
}: WizardChatProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isThinking) return;
    onSendMessage(text);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [input, isThinking, onSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Auto-resize textarea
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }, []);

  const progressPct = fieldsTotal > 0 ? Math.round((fieldsComplete / fieldsTotal) * 100) : 0;
  const allFieldsComplete = fieldsComplete >= fieldsTotal;

  return (
    <div className="flex h-full flex-col">
      {/* Progress bar */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              <strong className="text-brand-yellow">{fieldsComplete}</strong> of {fieldsTotal} fields complete
            </span>
            <span className="text-xs text-muted-foreground">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-brand-yellow"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
        {allFieldsComplete && (
          <Button size="sm" onClick={onFinishConversation} className="shrink-0">
            Review →
          </Button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-yellow/10 text-foreground'
                    : msg.role === 'system'
                      ? 'bg-muted/50 text-muted-foreground italic'
                      : 'bg-card border border-border text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {/* Field badges */}
                {msg.fieldsUpdated && msg.fieldsUpdated.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.fieldsUpdated.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                        <Sparkles className="h-2.5 w-2.5" /> {f}
                      </span>
                    ))}
                  </div>
                )}
                {/* Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectSuggestion(s)}
                        className="rounded-lg border border-brand-yellow/20 bg-brand-yellow/5 px-3 py-1.5 text-xs font-medium text-brand-yellow transition-colors hover:bg-brand-yellow/10"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl bg-card border border-border px-4 py-3">
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-yellow/40" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-yellow/40" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-yellow/40" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-yellow/60 focus:outline-none focus:ring-1 focus:ring-brand-yellow/30"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="h-11 w-11 shrink-0 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {!allFieldsComplete && (
          <button
            onClick={onFinishConversation}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip remaining questions and review →
          </button>
        )}
      </div>
    </div>
  );
}
