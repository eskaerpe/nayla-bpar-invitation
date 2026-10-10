export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdown(target: Date | null, now = new Date()): Countdown | null {
  if (!target) return null;
  const difference = target.getTime() - now.getTime();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
