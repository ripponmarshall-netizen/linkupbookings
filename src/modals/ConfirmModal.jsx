import ModalShell from '../components/ModalShell.jsx';

/**
 * Lightweight confirmation dialog built on ModalShell.
 * Props: title, body, confirmLabel, cancelLabel, danger, onConfirm, onClose.
 */
export default function ConfirmModal({
  title = 'Are you sure?',
  body = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onClose,
}) {
  return (
    <ModalShell onClose={onClose} width={420}>
      <div style={{ padding: '24px 24px 18px' }}>
        <h2 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 400, lineHeight: 1.15 }}>
          {title}
        </h2>
        {body && (
          <p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5, marginTop: 10, marginBottom: 0 }}>
            {body}
          </p>
        )}
      </div>
      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)', background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'flex-end', gap: 8,
      }}>
        <button className="btn btn-secondary btn-sm" onClick={onClose}>{cancelLabel}</button>
        <button
          className={danger ? 'btn btn-terracotta btn-sm' : 'btn btn-primary btn-sm'}
          onClick={() => { onConfirm?.(); onClose?.(); }}
        >
          {confirmLabel}
        </button>
      </div>
    </ModalShell>
  );
}
