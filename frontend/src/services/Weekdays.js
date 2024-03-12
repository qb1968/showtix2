const getNextDate = (dayIndex) => {
  const now = new Date();
  const daysUntilNextDayOfWeek = (dayIndex - now.getDay() + 14) % 7;
  const nextDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilNextDayOfWeek
  );
  return nextDate;
};

export { getNextDate };
