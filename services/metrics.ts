export const trackMetrikaGoal = (goal: string) => {
  if (typeof window === 'undefined') return;
  const ym = (window as any).ym;
  if (typeof ym === 'function') {
    try {
      ym(106475005, 'reachGoal', goal);
    } catch {
      // fail silently in case Metrika is blocked
    }
  }
};

