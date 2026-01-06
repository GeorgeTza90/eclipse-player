// Full charset
export const CHARSET = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()-_=+[]{}|;:'",.<>?/`;

// Secret key for deterministic shuffle
const SECRET_KEY = "my-secret-key";

// Deterministic pseudo-random generator from key
function seededRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Shuffle charset based on key
function shuffleWithKey(str, key) {
  const rand = seededRandom(key);
  const arr = [...str];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

// Generate shuffled charset
const SHUFFLED = shuffleWithKey(CHARSET, SECRET_KEY);

// Build Maps
const encodeMap = new Map();
const decodeMap = new Map();

for (let i = 0; i < CHARSET.length; i++) {
  encodeMap.set(CHARSET[i], SHUFFLED[i]);
  decodeMap.set(SHUFFLED[i], CHARSET[i]);
}

// Encode / Decode functions
export function encode(str) {
  let out = "";
  for (const c of str) out += encodeMap.get(c) ?? c;
  return out;
}

export function decode(str) {
  let out = "";
  for (const c of str) out += decodeMap.get(c) ?? c;
  return out;
}
