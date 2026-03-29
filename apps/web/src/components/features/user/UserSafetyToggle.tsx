"use client";

export type UserSafetyToggleProps = {
  enabled: boolean;
  onChange: (next: boolean) => void;
  id?: string;
};

export function UserSafetyToggle({ enabled, onChange, id = "user-safety-toggle" }: UserSafetyToggleProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-[var(--fg)]">
      <input
        id={id}
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[rgb(var(--accent-rgb))]"
      />
      Safety emphasis
    </label>
  );
}
