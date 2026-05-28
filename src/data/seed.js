// Seed data — matches the original design prototype exactly

export const today = new Date(2026, 4, 26); // Tue 26 May 2026

export const SERVICES = [
  { id: 's1', name: 'Gel Manicure',     duration: 60,  price: 3500,  color: '#c4663d' },
  { id: 's2', name: 'Acrylic Full Set', duration: 120, price: 8000,  color: '#0c4a2d' },
  { id: 's3', name: 'Pedicure',         duration: 75,  price: 4500,  color: '#6a3a4a' },
  { id: 's4', name: 'Nail Art (extra)', duration: 30,  price: 1500,  color: '#c89b3d' },
  { id: 's5', name: 'Polish Change',    duration: 30,  price: 2000,  color: '#4d6a48' },
];

export const CLIENTS = [
  { id: 'c1', name: 'Tanisha Bennett',  phone: '+1 876 555 0142', email: 'tanisha.b@gmail.com',  visits: 12, lifetime: 42000, last: '2 weeks ago',  tags: ['VIP','Acrylic'],  notes: 'Allergic to acetone. Prefers ballerina shape. Coming back for graduation pics.' },
  { id: 'c2', name: 'Keisha Robinson',  phone: '+1 876 555 0103', email: 'keisha.r@outlook.com', visits: 7,  lifetime: 24500, last: '1 month ago',  tags: ['New'],            notes: 'Found me on IG. Brought daughter last time.' },
  { id: 'c3', name: 'Aaliyah Cooper',   phone: '+1 876 555 0117', email: 'aaliyah.coop@gmail.com', visits: 18, lifetime: 63000, last: '3 days ago', tags: ['VIP','Regular'],  notes: 'Books every 3 weeks like clockwork. Loves chrome finish.' },
  { id: 'c4', name: 'Shanique Powell',  phone: '+1 876 555 0188', email: 'shaniquep@yahoo.com',  visits: 4,  lifetime: 14000, last: '5 weeks ago',  tags: [],                 notes: '' },
  { id: 'c5', name: 'Marsha Henry',     phone: '+1 876 555 0156', email: 'marshahnr@gmail.com',  visits: 9,  lifetime: 31500, last: '1 week ago',   tags: ['Regular'],        notes: "Tipper. Don't double-book her with chatty clients." },
  { id: 'c6', name: 'Daniella Brown',   phone: '+1 876 555 0124', email: 'dani.brown@gmail.com', visits: 2,  lifetime: 7000,  last: '2 months ago', tags: ['New'],            notes: 'Birthday June 14 — send reminder.' },
];

// times are decimal hours: 9 = 9:00am, 9.5 = 9:30am, 13.25 = 1:15pm
export const APPTS = [
  { id: 'a1',  clientId: 'c1', serviceId: 's2', dayIdx: 0, start: 9,    end: 11,    status: 'confirmed', deposit: 2000, paid: false },
  { id: 'a2',  clientId: 'c3', serviceId: 's1', dayIdx: 0, start: 12,   end: 13,    status: 'confirmed', deposit: 1000, paid: false, recurring: true },
  { id: 'a3',  clientId: 'c5', serviceId: 's3', dayIdx: 0, start: 14,   end: 15.25, status: 'confirmed', deposit: 0,    paid: false },
  { id: 'a4',  clientId: 'c2', serviceId: 's1', dayIdx: 1, start: 10,   end: 11,    status: 'confirmed', deposit: 1000, paid: false },
  { id: 'a5',  clientId: 'c4', serviceId: 's5', dayIdx: 1, start: 13.5, end: 14,    status: 'pending',   deposit: 0,    paid: false },
  { id: 'a6',  clientId: 'c6', serviceId: 's2', dayIdx: 1, start: 15,   end: 17,    status: 'confirmed', deposit: 2000, paid: false },
  { id: 'a7',  clientId: 'c1', serviceId: 's1', dayIdx: 2, start: 9.5,  end: 10.5,  status: 'confirmed', deposit: 1000, paid: false },
  { id: 'a8',  clientId: 'c3', serviceId: 's3', dayIdx: 2, start: 11,   end: 12.25, status: 'confirmed', deposit: 1500, paid: false },
  { id: 'a9',  clientId: 'c5', serviceId: 's2', dayIdx: 2, start: 13,   end: 15,    status: 'confirmed', deposit: 2000, paid: false, recurring: true },
  { id: 'a10', clientId: 'c2', serviceId: 's1', dayIdx: 3, start: 9,    end: 10,    status: 'confirmed', deposit: 1000, paid: false },
  { id: 'a11', clientId: 'c6', serviceId: 's4', dayIdx: 3, start: 11,   end: 11.5,  status: 'confirmed', deposit: 0,    paid: false },
  { id: 'a12', clientId: 'c1', serviceId: 's3', dayIdx: 3, start: 14,   end: 15.25, status: 'confirmed', deposit: 1500, paid: false },
  { id: 'a13', clientId: 'c4', serviceId: 's2', dayIdx: 4, start: 10,   end: 12,    status: 'confirmed', deposit: 2000, paid: false },
  { id: 'a14', clientId: 'c3', serviceId: 's1', dayIdx: 4, start: 13,   end: 14,    status: 'confirmed', deposit: 1000, paid: false, recurring: true },
  { id: 'a15', clientId: 'c5', serviceId: 's5', dayIdx: 4, start: 15,   end: 15.5,  status: 'confirmed', deposit: 0,    paid: false },
  { id: 'a16', clientId: 'c6', serviceId: 's2', dayIdx: 5, start: 10,   end: 12,    status: 'confirmed', deposit: 2000, paid: false },
];

export const BLOCKS = [
  { id: 'b1', dayIdx: 0, start: 13,   end: 14,   reason: 'Lunch',       recurring: true },
  { id: 'b2', dayIdx: 1, start: 12,   end: 13,   reason: 'Lunch',       recurring: true },
  { id: 'b3', dayIdx: 2, start: 15.5, end: 16.5, reason: 'School run',  recurring: true },
  { id: 'b4', dayIdx: 3, start: 13,   end: 14,   reason: 'Lunch',       recurring: true },
  { id: 'b5', dayIdx: 5, start: 14,   end: 17,   reason: 'Closed early' },
];

export const DAYS      = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
export const DAY_DATES = ['25','26','27','28','29','30','31'];
export const MONTH     = 'May 2026';

export const findClient  = id => CLIENTS.find(c => c.id === id) || {};
export const findService = id => SERVICES.find(s => s.id === id) || {};

// h is a decimal hour: 9 = "9am", 9.5 = "9:30am", 13.25 = "1:15pm"
export function fmtTime(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const ampm = hh >= 12 ? 'pm' : 'am';
  const hr = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh;
  return mm === 0 ? `${hr}${ampm}` : `${hr}:${mm.toString().padStart(2,'0')}${ampm}`;
}

export function fmtJ(n) {
  return 'J$' + Number(n).toLocaleString();
}
