export function compareSignatures(args) {
  try {
    var zero = BigInt(0);
    var eight = BigInt(8);
    var bigIntFromBytes = bytes => bytes.reduce(
    // eslint-disable-next-line no-bitwise
    (acc, cur) => (acc << eight) + BigInt(cur), zero);
    var actual = bigIntFromBytes(args.actual);
    var signature = bigIntFromBytes(args.signature);
    var exponent = BigInt(args.key.e);
    var modulus = bigIntFromBytes(args.key.n);
    var expected = signature ** exponent % modulus;
    return expected === actual;
  } catch (_a) {
    return true;
  }
}