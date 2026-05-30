import { useState, useRef } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { useToast } from '../components/Toast.jsx';
import { insertToken } from '../utils/actions.js';
import { useLocalStorage } from '../utils/useLocalStorage.js';

const INITIAL = {
  '24h': { on: true,  channel: 'whatsapp', timing: '24 hours before', label: '24-hour reminder',
    template: "Hi {first_name}! Reminder: yuh appointment at Glow is tomorrow at {time}. Reply CONFIRM or call to reschedule 💕" },
  '2h':  { on: true,  channel: 'whatsapp', timing: '2 hours before', label: '2-hour reminder',
    template: "See yuh soon {first_name}! Yuh {service} is in 2 hours at {time}. Mi cyaan wait! ✨" },
  'thanks': { on: true, channel: 'whatsapp', timing: '1 hour after', label: 'Thank you message',
    template: "Thank yuh for coming in {first_name}! 💅 Hope yuh love it. Tag @glow on IG & get 10% off next time!" },
  'birthday': { on: false, channel: 'sms', timing: 'on their birthday', label: 'Birthday greeting',
    template: "Happy Birthday {first_name}! 🎂 Treat yuhself — 20% off any service this month. Book now!" },
  'winback': { on: false, channel: 'sms', timing: 'after 60 days', label: 'Win-back message',
    template: "Wi miss yuh {first_name}! It's been a while. Here's 15% off to welcome yuh back 💕 Book this week!" },
};

export default function RemindersScreen() {
  const [reminders, setReminders] = useLocalStorage('lup_reminders', INITIAL);
  const [selected, setSelected] = useState('24h');

  function addCustom() {
    const key = 'custom-' + Date.now();
    setReminders(r => ({
      ...r,
      [key]: { on: false, channel: 'whatsapp', timing: 'custom trigger', label: 'Custom message', template: '' },
    }));
    setSelected(key);
  }

  return (
    <DashboardShell title="Reminders" sub="Automated messages to keep clients coming back">
      <div className="split-pane" style={{ display: 'flex', height: '100%' }}>
        {/* List */}
        <div className="split-pane-rail" style={{ width: 280, borderRight: '1px solid var(--line)', overflowY: 'auto', background: 'var(--card-warm)' }}>
          {Object.entries(reminders).map(([key, r]) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              style={{
                width: '100%', textAlign: 'left', padding: '14px 18px',
                borderBottom: '1px solid var(--line)',
                background: selected === key ? 'var(--paper-2)' : 'transparent',
                borderLeft: selected === key ? '2px solid var(--forest)' : '2px solid transparent',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>{r.label}</span>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: r.on ? 'var(--moss)' : 'var(--line-2)',
                }} />
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>{r.timing}</div>
            </button>
          ))}
          <button onClick={addCustom} style={{ width: '100%', textAlign: 'left', padding: '14px 18px', color: 'var(--forest)', fontSize: 13, fontWeight: 500 }}>
            + Custom message
          </button>
        </div>

        {/* Detail */}
        <div className="split-pane-body" style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <Editor key={selected} rk={selected} data={reminders[selected]} setReminders={setReminders} />
        </div>
      </div>
    </DashboardShell>
  );
}

function Editor({ rk, data, setReminders }) {
  const { toast } = useToast();
  const [text, setText] = useState(data.template);
  const taRef = useRef(null);

  const update = (patch) => setReminders(r => ({ ...r, [rk]: { ...r[rk], ...patch } }));

  function addToken(token) {
    const el = taRef.current;
    const start = el ? el.selectionStart : text.length;
    const end = el ? el.selectionEnd : text.length;
    const next = insertToken(text, token, start, end);
    setText(next);
    // restore caret just after the inserted token
    requestAnimationFrame(() => {
      if (el) { el.focus(); const pos = start + token.length; el.setSelectionRange(pos, pos); }
    });
  }

  function save() {
    update({ template: text });
    toast('Reminder saved', { tone: 'success' });
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 400 }}>{data.label}</h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Sent {data.timing} · via {data.channel}</p>
        </div>
        <button
          aria-label={data.on ? 'Turn reminder off' : 'Turn reminder on'}
          onClick={() => update({ on: !data.on })}
          style={{
            width: 44, height: 26, borderRadius: 13,
            background: data.on ? 'var(--forest)' : 'var(--line-2)', position: 'relative', flexShrink: 0,
          }}
        >
          <div style={{ position: 'absolute', top: 3, left: data.on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fbf6ec', transition: 'left 120ms' }} />
        </button>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div className="label" style={{ marginBottom: 10 }}>Message preview</div>
        <div style={{ background: '#0d141a', borderRadius: 10, padding: 14, color: '#e9edef', fontSize: 13, lineHeight: 1.5, minHeight: 20 }}>
          {text || <span style={{ color: '#7d8a94', fontStyle: 'italic' }}>Your message will appear here…</span>}
        </div>
      </div>

      <label className="label" htmlFor="reminder-text" style={{ marginBottom: 10, display: 'block' }}>Customize</label>
      <textarea
        id="reminder-text"
        ref={taRef}
        className="textarea"
        rows="4"
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {['{first_name}', '{service}', '{time}', '{date}', '{booking_link}'].map(token => (
          <button key={token} onClick={() => addToken(token)} className="chip" style={{ cursor: 'pointer' }}>
            {token}
          </button>
        ))}
      </div>

      <button className="btn btn-primary" onClick={save}>Save changes</button>
    </div>
  );
}
