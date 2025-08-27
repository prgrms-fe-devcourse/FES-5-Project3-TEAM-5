export function VoteQuestion() {
  return (
    <div>
      <h3 className="text-size-lg font-bold text-neutral-dark mb-3">
        투표 질문
      </h3>
      <div className="items-start rounded-lg border-2 p-4">
        <textarea
          className="w-full text-black resize-none focus:outline-none"
          placeholder="질문을 입력해 주세요"></textarea>
        <p className="text-neutral-dark ">입력수/50</p>
      </div>
    </div>
  )
}
