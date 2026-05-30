/**
 * Reusable empty-state block for lists/panels.
 * Props: icon (node, optional), title, sub (optional), action (node, optional), compact (bool).
 */
export default function EmptyState({ icon, title, sub, action, compact = false }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', gap: 8,
        padding: compact ? '28px 20px' : '56px 24px',
        color: 'var(--muted)',
      }}
    >
      {icon && (
        <div aria-hidden="true" style={{ color: 'var(--muted-2)', marginBottom: 2 }}>
          {icon}
        </div>
      )}
      <div className="serif" style={{ fontSize: compact ? 18 : 22, color: 'var(--ink-2)', lineHeight: 1.2 }}>
        {title}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.5 }}>
          {sub}
        </div>
      )}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
