export function Chip({ children, active = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm ${
        active
          ? "border-teal bg-teal text-white"
          : "border-line bg-paper/80 text-ink"
      } ${className}`}
    >
      {children}
    </span>
  );
}
