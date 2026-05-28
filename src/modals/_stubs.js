// Stub modals — will be replaced by agent-generated files
import ModalShell, { ModalHeader } from '../components/ModalShell.jsx';

export function StubModal({ title, onClose }) {
  return (
    <ModalShell onClose={onClose} width={480}>
      <ModalHeader title={title} onClose={onClose} />
      <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
        Loading…
      </div>
    </ModalShell>
  );
}
