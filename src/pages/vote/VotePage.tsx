import SearchBar from '@/features/vote/ui/SearchBar'
import SortButtonList from '@/features/vote/ui/SortButtonList'
import VoteCard from '@/features/vote/ui/VoteCard'
import AddButton from '@/shared/components/buttons/AddButton'
import { Link } from 'react-router'

function VotePage() {
  return (
    <div className="flex flex-col gap-5 ">
      <SearchBar />
      <SortButtonList />
      <VoteCard />
      <VoteCard />
      <div className="flex justify-end items-end sticky z-50 bottom-18">
        <Link to="/vote/create">
          <AddButton />
        </Link>
      </div>
    </div>
  )
}
export default VotePage
