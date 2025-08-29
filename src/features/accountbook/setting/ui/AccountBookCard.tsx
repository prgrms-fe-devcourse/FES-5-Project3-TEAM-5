import raiseBear from '@/shared/assets/momo/momo-raise.png'

function AccountBookCard() {
  return (
    <div className="flex items-center gap-4 p-4 shadow-md rounded-xl bg-white">
      <div className="w-[100px] h-[100px] bg-primary-pale rounded-full flex justify-center items-center">
        <img
          src={raiseBear}
          alt="profile Icon"
          className="w-[90%] h-[90%]"
        />
      </div>
      <div className="flex flex-col gap-1 ">
        <span className=" text-xs bg-primary-light rounded-lg py-0.5 w-[43px] text-center text-black">
          개인
        </span>
        <p className="text-black font-bold text-[18px]">
          일이삼사오육칠팔구십일이삼사오육
        </p>
        <div className="flex text-neutral-dark">
          <p>정보 수정</p>
          <img
            src=""
            alt="오른쪽 화살표"
          />
        </div>
      </div>
    </div>
  )
}

export default AccountBookCard
