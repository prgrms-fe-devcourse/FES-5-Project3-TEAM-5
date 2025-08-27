import { tw } from "@/shared/utils/tw";

type Props<T extends string> = {
  value: T;
  onChange: (next:T) => void;
  options: [T, T];
}

function BinaryTabs<T extends string>({ value, onChange, options }: Props<T>) {

  const [left, right] = options;
  const isLeft = value === left;

  return (
    <div className="relative select-none">
      {/* 버튼 */}
      <div className="grid grid-cols-2">
        <button type="button" className={tw("h-8 text-center text-base font-bold transition-colors hover:cursor-pointer", isLeft ? "text-primary-base" : "text-neutral-dark")} onClick={() => onChange(left)}>{left}</button>
        <button type="button" className={tw("h-8 text-center text-base font-bold transition-colors hover:cursor-pointer", !isLeft ? "text-primary-base" : "text-neutral-dark")} onClick={() => onChange(right)}>{right}</button>
      </div>
      {/* 전체 밑줄 */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-light"/>
      {/* 선택된 밑줄 */}
      <div className={tw("absolute bottom-0 h-[3px] w-1/2 bg-primary-base transition-transform duration-200 ease-out", isLeft ? "translate-x-0" : "translate-x-[100%]")}/>
    </div>
  )
}
export default BinaryTabs