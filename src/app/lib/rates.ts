export const calculate5to8Rate = (date: Date, hour: number): number => {
  const month = date.getMonth();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;

  if (month >= 5 && month <= 8) {
    // June - September
    if (hour >= 17 && hour < 20) {
      return isWeekend ? 0.33 : 0.33; // Mid-Peak (Weekend) or On-Peak (Weekday)
    } else {
      return 0.28; // Off-Peak
    }
  } else {
    // October - May
    if (hour >= 8 && hour < 17) {
      return 0.26; // Super Off-Peak
    } else if (hour >= 17 && hour < 20) {
      return 0.33; // Mid-Peak
    } else {
      return 0.28; // Off-Peak
    }
  }
};
