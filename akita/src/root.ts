export const isBrowser = typeof window !== 'undefined';
export const isNativeScript = typeof global !== 'undefined' && (<any>global).__runtimeVersion !== 'undefined';

// @internal
export const isNotBrowser = !isBrowser && !isNativeScript;
