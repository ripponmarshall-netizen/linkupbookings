import { useEffect } from 'react';

export default function ModalShell({ onClose, children, width = 480, noPad = false }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="modal-box"
        style={{ maxWidth: width }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ title, onClose }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 22px 16px',
      borderBottom: '1px solid var(--line)',
      flexShrink: 0,
    }}>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
      <button
        onClick={onClose}
        style={{ color: 'var(--muted)', padding: 4, borderRadius: 6 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ModalBody({ children, style }) {
  return (
    <div style={{ padding: '20px 22px', overflowY: 'auto', flex: 1, ...style }}>
      {children}
    </div>
  );
}

export function ModalFooter({ children }) {
  return (
    <div style={{
      padding: '14px 22px',
      borderTop: '1px solid var(--line)',
      display: 'flex', gap: 10, justifyContent: 'flex-end',
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}
