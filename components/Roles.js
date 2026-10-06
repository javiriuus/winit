import { useLang } from "../lib/i18n";

export default function Roles({ roles = [], className = "" }) {
  const { t } = useLang();
  if (!roles.length) return null;
  return <span className={`meta work-roles ${className}`}>{roles.map((r) => t.roles[r] || r).join(" · ")}</span>;
}
