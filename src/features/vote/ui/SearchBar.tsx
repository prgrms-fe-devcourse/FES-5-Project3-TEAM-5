import searchIcon from '@/shared/assets/vote/searchIcon.svg'

export function SearchBar() {
  return (
    <div className="flex gap-3 px-2.5 py-2 rounded-xl bg-neutral-light">
      <img
        src={searchIcon}
        alt="검색 아이콘"
      />
      <input
        className=" w-full focus:outline-none focus:border-none"
        type="text"
        placeholder="검색어를 입력해 주세요"
      />
    </div>
  )
}
