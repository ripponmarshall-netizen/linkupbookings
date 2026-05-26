// Analytics dashboard — pro tier
function AnalyticsScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  return (
    <DashboardShell
      active="analytics"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Analytics"
      sub="Last 30 days · May 2026"
      action={
        <div style={{ display: 'flex', gap: 6 }}>
          <select className="select" style={{ padding: '7px 10px', fontSize: 12.5, width: 'auto' }}>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="btn btn-secondary btn-sm">Export CSV</button>
        </div>
      }
    >
      {!isPro ? <AnalyticsLocked onUpgrade={onUpgrade} /> : <AnalyticsBody />}
    </DashboardShell>
  );
}

function AnalyticsLocked({ onUpgrade }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 32, background: 'var(--paper)' }}>
      {/* Today free — give them a taste */}
      <div className="label" style={{ marginBottom: 12 }}>Today's numbers — free, every day</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <KpiCard label="Today's takings" value="J$16,500" delta="+8%" deltaPos sub="vs last Tue" />
        <KpiCard label="Today's bookings" value="3" delta="on track" deltaPos />
        <KpiCard label="Deposits collected" value="J$4,500" delta="3 of 3" deltaPos sub="all paid" />
        <KpiCard label="Reminders sent" value="3" delta="24h ahead" deltaPos />
      </div>

      {/* The locked part — blurred preview with single overlay */}
      <div style={{ position: 'relative' }}>
        <div className="label" style={{ marginBottom: 12 }}>The bigger picture</div>
        <div style={{ filter: 'blur(8px)', opacity: 0.4, pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', padding: 22 }}>
              <div className="serif" style={{ fontSize: 36 }}>J$182,500</div>
              <RevenueChart />
            </div>
            <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', padding: 22, minHeight: 240 }}>
              <div className="label">Top services</div>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingTop: 80,
        }}>
          <div style={{
            background: 'var(--card)', padding: 32, borderRadius: 16,
            border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)',
            maxWidth: 460, textAlign: 'center',
          }}>
            <div className="chip chip-terracotta" style={{ marginBottom: 16 }}>30 / 90 day insights</div>
            <h3 className="serif" style={{ fontSize: 30, margin: '0 0 10px', fontWeight: 400 }}>
              Yuh today numbers are free.<br/><span style={{ fontStyle: 'italic' }}>Trends are on Pro.</span>
            </h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 22px', lineHeight: 1.5, fontSize: 13.5 }}>
              Revenue trends, your top clients, busiest hours, no-show rate. Unlock for J$400/month — cancel any time.
            </p>
            <button className="btn btn-terracotta btn-lg" onClick={onUpgrade}>Upgrade to Pro</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsBody() {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <KpiCard label="Revenue" value="J$182,500" delta="+18%" deltaPos />
        <KpiCard label="Bookings" value="47" delta="+9" deltaPos sub="this month" />
        <KpiCard label="No-show rate" value="4.2%" delta="-1.8pp" deltaPos sub="dep. saved 3" />
        <KpiCard label="Avg. ticket" value="J$3,880" delta="+J$240" deltaPos />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* revenue chart */}
        <div style={{
          background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)',
          padding: 22,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <div className="label">Revenue · last 30 days</div>
              <div className="serif" style={{ fontSize: 36, lineHeight: 1.05, marginTop: 4 }}>J$182,500</div>
              <div style={{ fontSize: 12, color: 'var(--forest)', marginTop: 2 }}>+ J$28k from previous period</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Day', 'Week'].map((p, i) => (
                <button key={p} className="chip" style={{
                  background: i === 1 ? 'var(--ink)' : 'transparent',
                  color: i === 1 ? '#fbf6ec' : 'var(--ink-2)',
                  border: i === 1 ? '1px solid var(--ink)' : '1px solid var(--line)',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* services breakdown */}
        <div style={{
          background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)',
          padding: 22,
        }}>
          <div className="label" style={{ marginBottom: 14 }}>Top services</div>
          {[
            { name: 'Gel Manicure', count: 18, rev: 63000, color: 'var(--terracotta)' },
            { name: 'Acrylic Full Set', count: 9, rev: 72000, color: 'var(--forest)' },
            { name: 'Pedicure', count: 11, rev: 49500, color: 'var(--plum)' },
            { name: 'Nail Art', count: 6, rev: 9000, color: 'var(--ochre)' },
            { name: 'Polish Change', count: 3, rev: 6000, color: 'var(--moss)' },
          ].map((s, i) => {
            const max = 72000;
            return (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                  <span style={{ fontWeight: 500 }}>{s.name}</span>
                  <span className="mono" style={{ color: 'var(--muted)' }}>{fmtJ(s.rev)} · {s.count}</span>
                </div>
                <div style={{ height: 6, background: 'var(--paper-2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(s.rev / max) * 100}%`, height: '100%', background: s.color, borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <HoursHeatmap />
        <TopClientsCard />
        <ReviewsCard />
      </div>
    </div>
  );
}

function KpiCard({ label, value, delta, deltaPos, sub }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 12,
      border: '1px solid var(--line)', padding: 18,
    }}>
      <div className="label" style={{ marginBottom: 8 }}>{label}</div>
      <div className="serif" style={{ fontSize: 32, lineHeight: 1, fontWeight: 400 }}>{value}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
        <div className="mono" style={{ fontSize: 11, color: deltaPos ? 'var(--forest)' : 'var(--terracotta)' }}>
          {deltaPos ? '↑' : '↓'} {delta}
        </div>
        {sub && <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</div>}
      </div>
    </div>
  );
}

function RevenueChart() {
  const data = [
    32, 28, 45, 38, 52, 48, 55, 42, 38, 48, 62, 58, 72, 65,
    58, 68, 75, 88, 78, 92, 85, 78, 95, 88, 102, 95, 88, 102, 110, 95,
  ];
  const max = 120;
  const W = 600;
  const H = 200;
  const step = W / (data.length - 1);
  const points = data.map((v, i) => [i * step, H - (v / max) * H * 0.9 - 10]);
  const path = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c4a2d" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0c4a2d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[0.25, 0.5, 0.75].map(y => (
          <line key={y} x1="0" y1={H * y + 10} x2={W} y2={H * y + 10} stroke="#e6dcc4" strokeDasharray="3 5" />
        ))}
        <path d={area} fill="url(#rev-grad)" />
        <path d={path} fill="none" stroke="#0c4a2d" strokeWidth="1.8" />
        {/* highlight dot */}
        <circle cx={points[points.length - 2][0]} cy={points[points.length - 2][1]} r="4" fill="#c4663d" />
      </svg>
      <div className="mono" style={{
        display: 'flex', justifyContent: 'space-between', fontSize: 10,
        color: 'var(--muted)', marginTop: 4, padding: '0 4px',
      }}>
        <span>APR 26</span><span>MAY 5</span><span>MAY 15</span><span>MAY 25</span>
      </div>
    </div>
  );
}

function HoursHeatmap() {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const matrix = DAYS.map((d, di) => hours.map((h, hi) => {
    // higher density Tue/Fri afternoons
    let n = Math.floor(Math.random() * 3);
    if ((di === 1 || di === 4) && hi >= 3) n += 3;
    if (di === 5 && hi >= 2) n += 4;
    return Math.min(n, 6);
  }));
  const tint = (n) => {
    if (n === 0) return 'var(--paper-2)';
    const op = 0.2 + n * 0.13;
    return `rgba(12, 74, 45, ${op})`;
  };
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', padding: 22,
    }}>
      <div className="label" style={{ marginBottom: 14 }}>Busiest hours</div>
      <div style={{ display: 'grid', gridTemplateColumns: '24px repeat(9, 1fr)', gap: 3 }}>
        <div />
        {hours.map(h => (
          <div key={h} className="mono" style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{h}</div>
        ))}
        {DAYS.map((d, di) => (
          <React.Fragment key={d}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>{d[0]}</div>
            {hours.map((h, hi) => (
              <div key={hi} style={{
                aspectRatio: '1', borderRadius: 3, background: tint(matrix[di][hi]),
              }} />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>
        Your best window: <strong style={{ color: 'var(--ink)' }}>Sat 11am–2pm</strong>. Consider raising prices then.
      </div>
    </div>
  );
}

function TopClientsCard() {
  const top = [...CLIENTS].sort((a, b) => b.lifetime - a.lifetime).slice(0, 4);
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', padding: 22,
    }}>
      <div className="label" style={{ marginBottom: 14 }}>Top clients · lifetime</div>
      {top.map((c, i) => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 14 }}>{i + 1}</div>
          <Avatar name={c.name} size={28} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{c.visits} visits</div>
          </div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{fmtJ(c.lifetime)}</div>
        </div>
      ))}
    </div>
  );
}

function ReviewsCard() {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', padding: 22,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div className="label">Reviews</div>
        <div style={{ display: 'flex', gap: 2, color: 'var(--ochre)' }}>
          {[1,2,3,4,5].map(i => Icon.star({ key: i, width: 12, height: 12 }))}
        </div>
      </div>
      <div className="serif" style={{ fontSize: 36, lineHeight: 1, fontWeight: 400 }}>
        4.9 <span style={{ fontSize: 14, color: 'var(--muted)' }}>/ 5.0</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, marginBottom: 16 }}>
        from 38 reviews · last 60 days
      </div>
      <div style={{
        background: 'var(--paper-2)', borderRadius: 10, padding: 14,
        fontSize: 12, lineHeight: 1.5, color: 'var(--ink-2)', fontStyle: 'italic',
        borderLeft: '3px solid var(--ochre)',
      }}>
        "Tanya is meticulous and the studio feels like a treat. Already booked the next one."
        <div style={{ fontStyle: 'normal', fontSize: 10, color: 'var(--muted)', marginTop: 6 }}>— Aaliyah C., 3 days ago</div>
      </div>
    </div>
  );
}

Object.assign(window, { AnalyticsScreen, KpiCard, RevenueChart });
