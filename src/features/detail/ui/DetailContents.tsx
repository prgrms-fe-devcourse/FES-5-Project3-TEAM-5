import ButtonContainer from './ButtonContainer'
import ToggleMoreButton from './ToggleMoreButton'

interface Props {
  isArticleToggleOn: boolean
  onChangeArticleToggle: () => void
}

function DetailContents({ isArticleToggleOn, onChangeArticleToggle }: Props) {
  return (
    <>
      <div className="flex flex-col w-full items-center gap-4">
        <div
          className="flex  w-full  text-neutral-dark  text-size-md "
          onClick={onChangeArticleToggle}>
          <p className="flex-1">결제수단: 신용카드</p>
          <p className="mr-2.5">작성자</p>
          <ToggleMoreButton
            isOpen={isArticleToggleOn}
            onChangeToggle={onChangeArticleToggle}
          />
        </div>
        <img
          className="rounded-lg  w-full "
          src="https://i.pinimg.com/736x/c7/c8/f7/c7c8f7013c96d7ec33fdeb82ce391aa0.jpg"
          alt=""
        />
        <p className=" w-full  text-black text-[16px]">
          배민은 다가와 아오예~ 배고파배고파 너무 배 고파 집인데 집가고 싶고
          배고프고 졸려요ㅠㅠ
        </p>

        <ButtonContainer />
      </div>
    </>
  )
}
export default DetailContents
