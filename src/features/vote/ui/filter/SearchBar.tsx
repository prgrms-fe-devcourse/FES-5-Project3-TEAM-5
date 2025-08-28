import searchIcon from '@/shared/assets/vote/searchIcon.svg'
import { useRef } from 'react'
import type { TotalVote } from '../../model/responseBody'

interface Props {
  voteList: TotalVote[]
  setFilteredList: (list: TotalVote[]) => void
}

export function SearchBar({ voteList, setFilteredList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = () => {
    const value = inputRef.current?.value.trim().toLowerCase() ?? ''
    const filtered = voteList.filter(item =>
      item.title.toLowerCase().includes(value)
    )
    setFilteredList(filtered)
  }

  const onChange = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      handleSearch()
    }, 500)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      handleSearch()
    }
  }

  const onFocus = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="flex gap-3 px-2.5 py-2 rounded-xl bg-neutral-light">
      <img
        src={searchIcon}
        alt="검색 아이콘"
      />
      <input
        ref={inputRef}
        className="w-full focus:outline-none focus:border-none"
        type="text"
        placeholder="검색어를 입력해 주세요"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      />
    </div>
  )
}
