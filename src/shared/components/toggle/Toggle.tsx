import { tw } from "@/shared/utils/tw"

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  leftLabel?: string
  rightLabel?: string
}

function Toggle({ checked, onChange, leftLabel, rightLabel }: Props) {
  const ariaLabel = leftLabel && rightLabel 
    ? `${leftLabel}/${rightLabel} 토글 버튼` 
    : "토글 버튼"

  return (
    <div className="inline-flex items-center gap-2">
      {leftLabel && (
        <span
          className="flex items-center text-base text-neutral-dark transition-colors"
        >
          {leftLabel}
        </span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        onClick={() => onChange(!checked)}
        className={tw(
          "relative w-[30px] h-[17px] rounded-full border-none p-0 cursor-pointer transition-colors",
          checked ? "bg-primary-base" : "bg-gray-100"
        )}
      >
        <span
          className={tw(
            "absolute top-[2px] left-[2px] w-[13px] h-[13px] bg-white rounded-full shadow transition-transform",
            checked ? "translate-x-[13px]" : "translate-x-0"
          )}
        />
      </button>

      {rightLabel && (
        <span
          className={tw(
            "flex items-center text-base text-neutral-dark transition-colors",
            checked && "text-primary-base font-bold"
          )}
        >
          {rightLabel}
        </span>
      )}
    </div>
  )
}

export default Toggle