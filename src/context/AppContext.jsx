import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SERVICES, CLIENTS, APPTS, BLOCKS } from '../data/seed.js';

const AppContext = createContext(null);

const STORAGE_KEY = 'lup_data';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      appts: state.appts,
      clients: state.clients,
      services: state.services,
      blocks: state.blocks,
      isPro: state.isPro,
    }));
  } catch {}
}

function defaults() {
  return {
    appts:    APPTS,
    clients:  CLIENTS,
    services: SERVICES,
    blocks:   BLOCKS,
    isPro:    false,
  };
}

function init() {
  const saved = load();
  return saved ? { ...defaults(), ...saved } : defaults();
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRO':
      return { ...state, isPro: !state.isPro };

    case 'ADD_APPT':
      return { ...state, appts: [...state.appts, action.appt] };

    case 'UPDATE_APPT':
      return {
        ...state,
        appts: state.appts.map(a => a.id === action.id ? { ...a, ...action.patch } : a),
      };

    case 'REMOVE_APPT':
      return { ...state, appts: state.appts.filter(a => a.id !== action.id) };

    case 'MARK_PAID':
      return {
        ...state,
        appts: state.appts.map(a =>
          a.id === action.id ? { ...a, paid: true, paidMethod: action.method, tip: action.tip } : a
        ),
      };

    case 'ADD_BLOCK':
      return { ...state, blocks: [...state.blocks, action.block] };

    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.client] };

    case 'ADD_SERVICE':
      return { ...state, services: [...state.services, action.service] };

    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(s => s.id === action.id ? { ...s, ...action.patch } : s),
      };

    case 'REMOVE_SERVICE':
      return {
        ...state,
        services: state.services.filter(s => s.id !== action.id),
        appts: state.appts.filter(a => a.serviceId !== action.id),
      };

    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(c => c.id === action.id ? { ...c, ...action.patch } : c),
      };

    case 'RESET':
      return defaults();

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => { save(state); }, [state]);

  const actions = {
    togglePro:    ()                    => dispatch({ type: 'TOGGLE_PRO' }),
    addAppt:      (appt)                => dispatch({ type: 'ADD_APPT', appt }),
    updateAppt:   (id, patch)           => dispatch({ type: 'UPDATE_APPT', id, patch }),
    removeAppt:   (id)                  => dispatch({ type: 'REMOVE_APPT', id }),
    markPaid:     (id, method, tip = 0) => dispatch({ type: 'MARK_PAID', id, method, tip }),
    addBlock:     (block)               => dispatch({ type: 'ADD_BLOCK', block }),
    addClient:    (client)              => dispatch({ type: 'ADD_CLIENT', client }),
    addService:   (service)             => dispatch({ type: 'ADD_SERVICE', service }),
    updateService:(id, patch)           => dispatch({ type: 'UPDATE_SERVICE', id, patch }),
    removeService:(id)                  => dispatch({ type: 'REMOVE_SERVICE', id }),
    updateClient: (id, patch)           => dispatch({ type: 'UPDATE_CLIENT', id, patch }),
    reset:        ()                    => dispatch({ type: 'RESET' }),
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
