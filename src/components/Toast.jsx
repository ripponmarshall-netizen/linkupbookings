import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts(ts => ts.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((message, opts = {}) => {
    const id = ++idRef.current;
    const tone = opts.tone || 'default'; // 'default' | 'success' | 'error'
    setToasts(ts => [...ts, { id, message, tone }]);
    const ttl = opts.duration ?? 2800;
    if (ttl > 0) setTimeout(() => dismiss(id), ttl);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          style={{
            position: 'fixed', left: 0, right: 0, bottom: 'calc(20px + env(safe-area-inset-bottom))',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            zIndex: 1000, pointerEvents: 'none', padding: '0 16px',
          }}
        >
          {toasts.map(t => (
            <button
              key={t.id}
              onClick={() => dismiss(t.id)}
              style={{
                pointerEvents: 'auto', maxWidth: 420, width: 'fit-content',
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--ink)', color: '#fbf6ec',
                padding: '11px 16px', borderRadius: 10,
                boxShadow: 'var(--shadow-lg)', fontSize: 13, fontWeight: 500,
                borderLeft: `3px solid ${t.tone === 'error' ? 'var(--terracotta)' : t.tone === 'success' ? 'var(--moss)' : 'var(--ochre)'}`,
                textAlign: 'left', lineHeight: 1.4,
              }}
            >
              {t.message}
            </button>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
