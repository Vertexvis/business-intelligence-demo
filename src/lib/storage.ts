import { Env } from './env';

export interface StreamCredentials {
  clientId: string;
  streamKey: string;
}

const CredsKey = 'creds';

export function getStoredCreds(): StreamCredentials {
  const val = getItem(CredsKey);
  const fallback = { clientId: '', streamKey: '' };
  return val ? JSON.parse(val) : fallback ?? fallback;
}

export function setStoredCreds(creds: StreamCredentials): void {
  setItem(CredsKey, JSON.stringify(creds));
}

function setItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(envKey(key), value);
}

function getItem(key: string): string | undefined {
  if (typeof window === 'undefined') return;

  return window.localStorage.getItem(envKey(key)) ?? undefined;
}

function envKey(key: string): string {
  return `vertexvis:${Env}:${key}`;
}
