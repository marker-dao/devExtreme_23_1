export function factors(n) {
  const res = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      res.push(i);
    }
  }
  return res;
}