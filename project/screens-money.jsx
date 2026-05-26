// Money / takings / close-out screen — the other half of the business

function MoneyScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  const [tab, setTab] = React.useState('today');
  const [paid, setPaid] = React.useState({}); // apptId -> { method, tip, cash }

  return (
    <DashboardShell
      active="money"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Takings"
      sub="Cash, card, deposits — reconciled"
      action={
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary btn-sm">Export CSV</button>
          <button className="btn btn-secondary btn-sm">For accountant</button>
        </div>
      }
    >
      {/* day / week / month switcher */}
      <div style={{
        padding: '14px 32px', borderBottom: '1px solid var(--line)',
        background: 'var(--card-warm)', display: 'flex', gap: 16, alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', background: 'var(--paper-2)', borderRadius: 8,
          padding: 2, border: '1px solid var(--line)',
        }}>
          {[['today', 'Today'], ['week', 'This week'], ['month', 'May']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{
                padding: '6px 14px', borderRadius: 6,
                background: tab === k ? 'var(--card)' : 'transparent',
                color: tab === k ? 'var(--ink)' : 'var(--muted)',
                fontSize: 12.5, fontWeight: 500,
              }}>{l}</button>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
          TUE · 26 MAY · UPDATED 11:42 AM
        </div>
      </div>

      {tab === 'today' && <TodayCloseOut paid={paid} setPaid={setPaid} />}
      {tab === 'week' && <WeekTakings />}
      {tab === 'month' && <MonthTakings />}
    </DashboardShell>
  );
}

function TodayCloseOut({ paid, setPaid }) {
  const todaysAppts = APPTS.filter(a => a.dayIdx === 1);
  // synthetic: first 2 are completed/paid, last is upcoming
  const status = (a, i) => {
    if (i === 0) return paid[a.id] || { method: 'cash', amount: 3500, tip: 500, complete: true };
    if (i === 1) return paid[a.id] || { method: 'lynk', amount: 8000, tip: 0, complete: true };
    return paid[a.id] || { complete: false };
  };

  const completed = todaysAppts.filter((a, i) => status(a, i).complete);
  const upcoming = todaysAppts.filter((a, i) => !status(a, i).complete);

  let cash = 0, digital = 0, deposit = 0, tips = 0, service = 0;
  todaysAppts.forEach((a, i) => {
    const s = findService(a.serviceId);
    deposit += a.deposit || 0;
    const p = status(a, i);
    if (p.complete) {
      service += s.price;
      tips += p.tip || 0;
      const balance = s.price - (a.deposit || 0);
      if (p.method === 'cash') cash += balance + (p.tip || 0);
      else digital += balance + (p.tip || 0);
    }
  });

  const expected = todaysAppts.reduce((s, a) => s + findService(a.serviceId).price, 0);
  const expectedTotal = expected + tips;
  const collectedSoFar = service + tips;

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
      {/* Hero stat */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 220, height: 220,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,61,0.22), transparent 60%)',
          }} />
          <div className="mono" style={{ fontSize: 10.5, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 10 }}>
            TODAY'S TAKINGS · RUNNING
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
            <div className="serif" style={{ fontSize: 64, lineHeight: 0.95, fontWeight: 400 }}>{fmtJ(collectedSoFar)}</div>
            <div style={{ fontSize: 13, color: '#a89c87' }}>of {fmtJ(expectedTotal)} expected</div>
          </div>
          {/* progress bar */}
          <div style={{ height: 4, background: 'rgba(251,246,236,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 18 }}>
            <div style={{
              width: `${(collectedSoFar / expectedTotal) * 100}%`,
              height: '100%',
              background: 'linear-gradient(to right, var(--ochre), var(--terracotta))',
            }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {[
              { l: 'Cash', v: cash, c: 'var(--ochre)' },
              { l: 'Card / Lynk', v: digital, c: 'var(--ochre)' },
              { l: 'Deposits', v: deposit, c: 'var(--ochre)', sub: 'already banked' },
              { l: 'Tips', v: tips, c: 'var(--ochre)' },
            ].map((s, i) => (
              <div key={i}>
                <div className="mono" style={{ fontSize: 9.5, color: '#a89c87', letterSpacing: '0.08em', marginBottom: 4 }}>{s.l.toUpperCase()}</div>
                <div className="serif" style={{ fontSize: 22, lineHeight: 1 }}>{fmtJ(s.v)}</div>
                {s.sub && <div style={{ fontSize: 10, color: '#a89c87', marginTop: 4 }}>{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* end-of-day card */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column',
        }}>
          <div className="label" style={{ marginBottom: 4 }}>To bank tomorrow</div>
          <div className="serif" style={{ fontSize: 38, lineHeight: 1, marginBottom: 8 }}>
            {fmtJ(cash)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4, marginBottom: 16 }}>
            Cash on hand from today. Digital already in your NCB Lynk account.
          </div>

          <div style={{ flex: 1 }} />

          <div style={{
            padding: 12, background: 'var(--forest-soft)', borderRadius: 10,
            borderLeft: '3px solid var(--forest)',
            fontSize: 12, color: 'var(--forest)', lineHeight: 1.4, marginBottom: 12,
          }}>
            <strong>End-of-day check:</strong> 2 of {todaysAppts.length} appointments closed.<br/>
            {upcoming.length} more before 5pm.
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            {Icon.check({ width: 13, height: 13 })} Close out today
          </button>
        </div>
      </div>

      {/* completed appointments */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          <div className="label" style={{ marginBottom: 10 }}>Today's appointments</div>
          {todaysAppts.map((a, i) => {
            const s = findService(a.serviceId);
            const c = findClient(a.clientId);
            const p = status(a, i);
            return (
              <ApptMoneyRow key={a.id} appt={a} client={c} service={s}
                paid={p} setPaid={(np) => setPaid({ ...paid, [a.id]: np })} />
            );
          })}
        </div>

        <div>
          <div className="label" style={{ marginBottom: 10 }}>For your records</div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            {[
              ['Service revenue', fmtJ(service)],
              ['Tips', fmtJ(tips)],
              ['Deposits credited', fmtJ(deposit)],
              ['Refunds', 'J$0'],
              ['GCT (15%)', fmtJ(Math.round(service * 0.15))],
              ['Net of GCT', fmtJ(Math.round(service * 0.85) + tips)],
            ].map(([k, v], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: i < 5 ? '1px solid var(--line)' : 'none',
                background: i === 5 ? 'var(--paper-2)' : 'transparent',
              }}>
                <span style={{ fontSize: 12.5, color: i === 5 ? 'var(--ink)' : 'var(--muted)', fontWeight: i === 5 ? 500 : 400 }}>{k}</span>
                <span className="mono" style={{ fontSize: 12.5, fontWeight: i === 5 ? 600 : 500 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: 14,
            background: 'var(--paper-2)', borderRadius: 10,
            fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.55,
          }}>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 4 }}>FOR THE BOOKKEEPER</div>
            All transactions auto-tagged with GCT. Export to CSV or email it direct from <span style={{ fontWeight: 500 }}>For accountant ↑</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

function ApptMoneyRow({ appt, client, service, paid, setPaid }) {
  const balance = service.price - (appt.deposit || 0);
  const total = balance + (paid.tip || 0);

  if (paid.complete) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', marginBottom: 6,
        background: 'var(--card)', border: '1px solid var(--line)',
        borderRadius: 10,
      }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 50 }}>
          {fmtTime(appt.start)}
        </div>
        <Avatar name={client.name} size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{client.name}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{service.name} · {fmtJ(service.price)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{fmtJ(balance + (paid.tip || 0))}</div>
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            {paid.method?.toUpperCase()}{paid.tip ? ` · TIP ${fmtJ(paid.tip)}` : ''}
          </div>
        </div>
        <span className="chip chip-forest" style={{ fontSize: 10 }}>✓ paid</span>
      </div>
    );
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', marginBottom: 6,
      background: 'var(--card-warm)', border: '1px dashed var(--line-2)',
      borderRadius: 10,
    }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 50 }}>
        {fmtTime(appt.start)}
      </div>
      <Avatar name={client.name} size={28} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{client.name}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{service.name} · expected {fmtJ(balance)}</div>
      </div>
      <button className="btn btn-primary btn-sm" onClick={() => setPaid({ method: 'cash', tip: 0, complete: true })}>
        {Icon.cash({ width: 13, height: 13 })} Mark paid
      </button>
    </div>
  );
}

function WeekTakings() {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 24 }}>
        {DAYS.map((d, i) => {
          const dayAppts = APPTS.filter(a => a.dayIdx === i);
          const dayRev = dayAppts.reduce((s, a) => s + findService(a.serviceId).price, 0);
          const max = 23000;
          const isToday = i === 1;
          const isPast = i < 1;
          return (
            <div key={d} style={{
              background: isToday ? 'var(--ink)' : 'var(--card)',
              color: isToday ? '#fbf6ec' : 'var(--ink)',
              border: '1px solid var(--line)',
              borderRadius: 12, padding: 16,
              opacity: !isPast && !isToday ? 0.65 : 1,
            }}>
              <div className="mono" style={{ fontSize: 10, color: isToday ? '#a89c87' : 'var(--muted)', letterSpacing: '0.08em', marginBottom: 4 }}>
                {d.toUpperCase()} · {DAY_DATES[i]}
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1, fontWeight: 400, marginBottom: 6 }}>
                {fmtJ(dayRev)}
              </div>
              <div style={{ height: 4, background: isToday ? 'rgba(251,246,236,0.1)' : 'var(--paper-2)', borderRadius: 2, marginBottom: 8 }}>
                <div style={{
                  width: `${(dayRev / max) * 100}%`, height: '100%',
                  background: isToday ? 'var(--ochre)' : 'var(--forest)',
                  borderRadius: 2,
                }} />
              </div>
              <div style={{ fontSize: 10.5, color: isToday ? '#a89c87' : 'var(--muted)' }}>
                {dayAppts.length} appts
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <KpiCard label="Week total" value="J$84,500" delta="+12% vs last" deltaPos />
        <KpiCard label="Cash collected" value="J$28,400" sub="33% of week" delta="" />
        <KpiCard label="Digital (Lynk + card)" value="J$56,100" sub="67% of week" delta="" />
        <KpiCard label="Tips" value="J$3,800" delta="+J$900" deltaPos sub="vs last week" />
      </div>

      <div style={{
        background: 'var(--terracotta-soft)', borderRadius: 12, padding: 18,
        display: 'flex', alignItems: 'center', gap: 14, borderLeft: '3px solid var(--terracotta)',
      }}>
        <span style={{ color: 'var(--terracotta)' }}>{Icon.sparkle({ width: 18, height: 18 })}</span>
        <div style={{ flex: 1, color: '#8d3f1e' }}>
          <strong>Mi notice somet'ing:</strong> Saturdays are 38% of yuh week. Worth adding a small Saturday surcharge?
        </div>
        <button className="btn btn-terracotta btn-sm">Adjust pricing</button>
      </div>
    </div>
  );
}

function MonthTakings() {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <KpiCard label="May total" value="J$182,500" delta="+18% vs Apr" deltaPos />
        <KpiCard label="Avg / week" value="J$45,625" delta="" sub="4 weeks" />
        <KpiCard label="Top service" value="Acrylic" delta="" sub="J$72,000 · 9 bookings" />
        <KpiCard label="GCT collected" value="J$23,800" delta="" sub="due Jun 30" />
      </div>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 22,
      }}>
        <div className="label" style={{ marginBottom: 14 }}>Monthly revenue · last 6 months</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 200, padding: '0 6px' }}>
          {[
            { m: 'Dec', v: 124000 },
            { m: 'Jan', v: 96000 },
            { m: 'Feb', v: 112000 },
            { m: 'Mar', v: 138000 },
            { m: 'Apr', v: 154000 },
            { m: 'May', v: 182500, current: true },
          ].map(b => (
            <div key={b.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{fmtJ(Math.round(b.v / 1000)) + 'k'}</div>
              <div style={{
                width: '100%', height: `${(b.v / 200000) * 100}%`,
                background: b.current ? 'var(--forest)' : 'var(--paper-3)',
                borderRadius: 6,
              }} />
              <div className="mono" style={{ fontSize: 10, color: b.current ? 'var(--ink)' : 'var(--muted)', letterSpacing: '0.06em', fontWeight: b.current ? 500 : 400 }}>{b.m.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.MoneyScreen = MoneyScreen;
