import { siteTarget } from '../../site-target.mjs';
import { href } from './url';

// Build-time origins only. No browser API client or credential storage.
export const ENDPOINTS = siteTarget(process.env);

export function accountHref(page: 'register' | 'login' | 'account' = 'account'): string {
  if (ENDPOINTS.accountPreview) return `${ENDPOINTS.accountPreview}/preview/${page}`;
  if (ENDPOINTS.account && !ENDPOINTS.preview) return `${ENDPOINTS.account}/${page}`;
  return href('/account/');
}
