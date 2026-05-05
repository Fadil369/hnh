const CLAIMLINC_BASE = 'https://api.brainsait.org/nphies';

const BRANCH_ALIASES = {
  r001: 'riyadh',
  riyadh: 'riyadh',
  j001: 'jizan',
  jazan: 'jizan',
  jizan: 'jizan',
  k001: 'khamis',
  khamis: 'khamis',
  khamis_mushayt: 'khamis',
  khamis_mushait: 'khamis',
  khamismushayt: 'khamis',
  khamismushait: 'khamis',
  m001: 'madinah',
  madinah: 'madinah',
  madina: 'madinah',
  medina: 'madinah',
  u001: 'unaizah',
  unaizah: 'unaizah',
  unayzah: 'unaizah',
  abha: 'abha',
};

export function claimlincKey(env) {
  return env.CLAIMLINC_KEY || '';
}

export function claimlincBranch(value) {
  const key = String(value || 'riyadh').trim().toLowerCase().replace(/[\s-]+/g, '_');
  return BRANCH_ALIASES[key] || 'riyadh';
}

export function firstIdentifier(...values) {
  for (const value of values) {
    const identifier = String(value || '').trim();
    if (identifier) return identifier;
  }
  return '';
}

export async function claimlincEligibility(env, options = {}) {
  const key = claimlincKey(env);
  const identifier = firstIdentifier(options.identifier);
  if (!key || !identifier) return null;

  const branch = claimlincBranch(options.branch || env.NPHIES_BRANCH);
  const url = new URL(`${CLAIMLINC_BASE}/eligibility/${branch}`);
  url.searchParams.set('identifier', identifier);
  url.searchParams.set('page', String(options.page || '0'));
  url.searchParams.set('size', String(options.size || '10'));

  try {
    const res = env.CLAIMLINC_SERVICE
      ? await env.CLAIMLINC_SERVICE.fetch(new Request(`https://claimlinc.internal/nphies/eligibility/${branch}${url.search}`, {
          headers: { 'X-API-Key': key, Accept: 'application/json' },
        }))
      : await fetch(url.toString(), {
          headers: { 'X-API-Key': key, Accept: 'application/json' },
          signal: AbortSignal.timeout(options.timeoutMs || 8000),
        });
    if (res.ok) return res.json();
    return null;
  } catch (e) {
    console.error('ClaimLinc eligibility error:', e?.message?.slice(0, 100));
    return null;
  }
}
