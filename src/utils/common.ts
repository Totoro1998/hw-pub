export const isDev =
  window.location.origin.includes('dev-gamepub') ||
  window.location.origin.includes('localhost') ||
  window.location.origin.includes('127.0.0.1');
