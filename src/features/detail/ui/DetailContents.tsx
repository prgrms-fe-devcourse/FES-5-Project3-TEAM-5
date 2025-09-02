import type { Reactions } from '../model/responseBody'
import ReactionButtonContainer from './ReactionButtonContainer'
import ToggleMoreButton from './ToggleMoreButton'

interface Props {
  isArticleToggleOn: boolean
  receipt_url?: string
  payment_methods?: string
  user_id: string
  memo?: string
  onChangeArticleToggle: () => void
  reactions: Reactions[]
}

export function DetailContents({
  isArticleToggleOn,
  onChangeArticleToggle,
  payment_methods,
  user_id,
  receipt_url,
  memo,
  reactions
}: Props) {
  return (
    <>
      <div className="flex flex-col w-full items-center gap-4">
        <div
          className="flex  w-full  text-neutral-dark  text-size-md "
          onClick={onChangeArticleToggle}>
          {payment_methods && <p>결제수단: {payment_methods}</p>}
          <p className="mr-2.5 flex-1">{user_id}</p>
          <ToggleMoreButton
            isOpen={isArticleToggleOn}
            onChangeToggle={onChangeArticleToggle}
          />
        </div>
        <img
          className="rounded-lg  w-full "
          src={receipt_url}
          alt="사진"
        />
        <p className=" w-full  text-black text-[16px]">{memo}</p>

        <ReactionButtonContainer reactions={reactions} />
      </div>
    </>
  )
}
