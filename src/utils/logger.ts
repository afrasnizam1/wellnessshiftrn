/** Dev-only verbose logs; warn/error always pass through. */
export const logger = {
  log: (...args: unknown[]) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    console.warn(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
};
