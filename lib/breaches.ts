// Utility to check if a password has been breached using the Pwned Passwords API (k-Anonymity model)
// https://haveibeenpwned.com/API/v3#PwnedPasswords

export async function checkPasswordBreach(password: string): Promise<number> {
  const sha1 = await sha1Hex(password);
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5).toUpperCase();
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  if (!res.ok) throw new Error('Failed to fetch from Pwned Passwords API');
  const text = await res.text();
  const lines = text.split('\n');
  for (const line of lines) {
    const [hashSuffix, count] = line.trim().split(':');
    if (hashSuffix === suffix) {
      return parseInt(count, 10);
    }
  }
  return 0;
}

// Helper to get SHA-1 hash as hex string
async function sha1Hex(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}
