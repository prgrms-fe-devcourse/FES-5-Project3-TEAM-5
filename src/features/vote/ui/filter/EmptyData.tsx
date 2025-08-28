import cryingMomo from '@/shared/assets/momo/momo-cry.png'

export function EmptyData() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <img
        style={{ width: '150px' }}
        src={cryingMomo}
        alt="우는 모모"
      />
      <p className=" text-neutral-dark text-lg font-bold">데이터가 없습니다.</p>
    </div>
  )
}
