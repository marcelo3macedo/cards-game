export const withContextLogging = (context: string) => (fn: Function) => {
  return (...args: any[]) => {
    const actionName = fn.name || 'anonymous';

    if (import.meta.env.VITE_ENABLE_LOGS === 'true') {
      console.log(`[${context}] Action: ${actionName}`, { args });
    }

    return fn(...args);
  };
};
