import { useEffect, useState } from 'react'

interface Props {
  questionRef: React.RefObject<HTMLTextAreaElement | null>
}

export function VoteQuestion({ questionRef }: Props) {
  const [textLength, setTextLength] = useState(0)

  useEffect(() => {
    if (questionRef.current) {
      const val = questionRef.current.value
      setTextLength(val.length)
    }
  }, [questionRef.current?.value])

  const handleChange = () => {
    if (!questionRef.current) return
    let value = questionRef.current.value

    if (value.length > 50) {
      value = value.slice(0, 50)
      questionRef.current.value = value
      alert('50글자만 작성 가능합니다!')
    }

    setTextLength(value.length)
  }

  return (
    <div>
      <h3 className="text-size-lg font-bold text-neutral-dark mb-3">
        투표 질문
      </h3>
      <div className="items-start rounded-lg border-2 p-4">
        <textarea
          ref={questionRef}
          onChange={handleChange}
          className="w-full text-black resize-none focus:outline-none"
          placeholder="질문을 입력해 주세요"></textarea>
        <p className="text-neutral-dark ">{textLength}/50</p>
      </div>
    </div>
  )
}
