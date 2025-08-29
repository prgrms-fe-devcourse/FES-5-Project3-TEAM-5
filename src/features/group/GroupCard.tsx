import moneyBear from '@/shared/assets/momo/momo-wallet.png'

function GroupCard() {
  return (
    <button className="bg-white w-38 h-40 rounded-lg shadow-lg shadow-gray-300 cursor-pointer">
      <div className="bg-primary-pale h-[60%] w-full rounded-lg flex justify-center items-center">
        <img
          src={moneyBear}
          alt="돈이 든 지갑을 들고 있는 곰돌이 이미지"
          className="w-23"
        />
      </div>
      <div className="px-2 py-1">
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-black px-2.5 py-[0.3px] bg-primary-light rounded-lg">
            개인
          </span>
          <span className="text-neutral-dark font-light">1일전</span>
        </div>
        <div className="mt-1.5">
          <p className="text-black text-[15px] mr-3">가계부 이름임돠</p>
        </div>
      </div>
    </button>
  )
}

export default GroupCard
