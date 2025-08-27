import cryingMomo from '@/shared/assets/momo/momo-cry.png'

interface Props {
  label: string
}

export function EmptyData({ label }: Props) {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <img
        style={{ width: '150px' }}
        src={cryingMomo}
        alt="우는 모모"
      />
      <p className=" text-neutral-dark text-lg font-bold">
        {label}가 없습니다.
      </p>
    </div>
  )
}
