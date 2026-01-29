declare global {
  interface Window {
    trackMetrikaGoal?: (goal: string) => void;
  }
}

export const trackMetrikaGoal = (goal: string) => {
  if (typeof window === 'undefined') return;
  // Вызов в следующем тике, чтобы Метрика успела обработать очередь после init
  const send = () => {
    if (typeof window.trackMetrikaGoal === 'function') {
      window.trackMetrikaGoal(goal);
    } else {
      const w = window as any;
      if (typeof w.ym === 'function') {
        try { w.ym(106475005, 'reachGoal', goal); } catch (_) {}
      }
    }
  };
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => send());
  } else {
    setTimeout(send, 0);
  }
};

