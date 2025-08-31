interface Props {
  label: string;
}

function SingleTab({ label }: Props) {
  return (
    <div className="relative select-none">
      {/* 버튼 */}
      <div className="grid grid-cols-1">
        <button type="button" className="h-8 text-center text-base font-bold text-primary-base cursor-default">
          {label}
        </button>
      </div>

      {/* 전체 밑줄 */}
      <div className="absolute bottom-0 h-[3px] w-full bg-primary-base" />
    </div>
  );
}

export default SingleTab;
