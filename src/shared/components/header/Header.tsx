import { useNavigate } from "react-router";

type Props = {
  title: string;
};

function Header({ title }:Props) {
  const navigate = useNavigate();

  return (
    <header>
      <div className="relative h-11 flex items-center justify-center">
        <button type="button" aria-label="뒤로가기" onClick={() => navigate(-1)} className="absolute left-4 hover:cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="#1E1E1E"/>
          </svg>
        </button>
        <h1 className="text-center text-size-xl font-bold">{ title }</h1>
      </div>
    </header>
  )
}
export default Header