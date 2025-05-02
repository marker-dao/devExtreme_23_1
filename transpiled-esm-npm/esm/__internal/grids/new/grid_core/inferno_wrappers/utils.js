export function wrapRef(ref) {
  return {
    // @ts-expect-error
    dxRenderer: true,
    get 0() {
      return ref.current;
    },
    get() {
      return ref.current;
    },
    length: 1
  };
}