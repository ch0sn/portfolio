/** Only in-app private paths may be used after login. */
export function safeNextPath(value: string | null | undefined): string {
  if (!value) {
    return '/privat';
  }
  if (!value.startsWith('/privat') || value.startsWith('//') || value.includes('\\') || value.includes('://')) {
    return '/privat';
  }
  if (value !== '/privat' && !value.startsWith('/privat/')) {
    return '/privat';
  }
  if (value === '/privat/anmelden' || value.startsWith('/privat/anmelden?') || value.startsWith('/privat/anmelden#')) {
    return '/privat';
  }
  if (value.includes('..')) {
    return '/privat';
  }
  return value;
}
