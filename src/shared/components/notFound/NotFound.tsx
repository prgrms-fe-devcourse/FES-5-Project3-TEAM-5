import { Link } from 'react-router'
import SubmitButton from '../form/SubmitButton'
import errorImg from '/src/shared/assets/notFound/404-error.png'

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-[10%] ">
      <img
        className="px-20 "
        src={errorImg}
        alt="errorImg"
      />
      <p className="font-bold text-black text-center ">
        찾으시는 페이지가 없습니다.
        <br />
        홈으로 돌아가 볼까요?
      </p>
      <Link
        to={'/'}
        className="w-full">
        <SubmitButton
          text="홈으로 이동"
          type="button"
        />
      </Link>
    </div>
  )
}
export default NotFound
