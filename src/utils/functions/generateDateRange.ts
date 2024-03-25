import dayjs from 'dayjs';

const generateDateRange = () => {
  const days: { date: string; isCurrentMonth?: boolean; day: number }[] = [];
  const today = dayjs();
  const startOfMonth = today.startOf('month');
  const endOfMonth = today.endOf('month');

  for (let date = startOfMonth; date.isBefore(endOfMonth) || date.isSame(endOfMonth, 'day'); date = date.add(1, 'day')) {
    const dateString = date.format('YYYY-MM-DD');
    const isCurrentMonth = date.month() === today.month();
    const dayOfMonth = date.date()
    days.push({ date: dateString, isCurrentMonth, day: dayOfMonth });
  }

  return days;
};

export default generateDateRange;
