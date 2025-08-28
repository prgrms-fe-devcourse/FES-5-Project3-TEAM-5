import AddButton from '@/shared/components/buttons/AddButton'
import { Link } from 'react-router'

function AddBtn() {
  const handleCreatePage = () => {}

  return (
    <div>
      <Link to="/add">
        <AddButton
          size="lg"
          onClick={handleCreatePage}
        />
      </Link>
    </div>
  )
}

export default AddBtn
