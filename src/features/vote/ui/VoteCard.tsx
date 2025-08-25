import Selection from './Selection'

function VoteCard() {
  return (
    <div className="flex flex-col w-full p-4 gap-4 rounded-lg border-2 border-primary-light ">
      <div className="flex justify-between text-neutral-dark text-size-md">
        <p>
          11월 22일 토
          <span className="text-black font-bold ml-3 ">종료 1시간 전!</span>
        </p>
        <div className="flex gap-2 cursor-pointer">
          <button className="hover:font-bold">수정</button>
          <button className="hover:font-bold">삭제</button>
        </div>
      </div>

      <div className="bg-neutral-light p-3 rounded-lg border-2 border-neutral-200 text-black ">
        <p>
          치킨 먹는다 안 먹는다치킨 먹는다 안 먹는다치킨 먹는다 안 먹는다치킨
          먹는다 안 먹는다 치킨 먹는다 안 먹는다
        </p>
      </div>
      <Selection />
      <Selection />
      <p>24명 참여</p>
    </div>
  )
}
export default VoteCard
