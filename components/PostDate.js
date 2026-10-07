import { useLang } from "../lib/i18n";

// Dates are stored as YYYY-MM-DD; build them in local time so the day never shifts.
export default function PostDate({ date, className = "" }) {
  const { t } = useLang();
  const [y, m, d] = date.split("-").map(Number);
  return (
    <time className={`meta ${className}`} dateTime={date}>
      {t.formatDate(new Date(y, (m || 1) - 1, d || 1))}
    </time>
  );
}
