import { ExpenseButton } from "../expenseButton"
import BaseModal from "./BaseModal" 

type Category = {
  id: string
  name: string
  korean_name: string
  type: "income" | "expense"
}

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (id: string) => void
  categories: Category[]
  filterType: "income" | "expense"
}

function CategoryModal({ open, onClose, onSelect, categories, filterType }: Props) {
  const filtered = categories.filter(c => c.type === filterType)

  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <h2 className="text-center text-[22px] font-bold text-black">카테고리 설정</h2>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {filtered.map(({ id, name, korean_name }) => (
          <button
            key={id}
            onClick={() => {
              onSelect(id)
              onClose()
            }}
            className="flex flex-col items-center justify-center gap-1 pt-3 pb-2 rounded-[10px] hover:cursor-pointer hover:bg-primary-light/30 transition-colors duration-150"
          >
            {/* 아이콘 */}
            <ExpenseButton size="lg" icon={name as Parameters<typeof ExpenseButton>[0]['icon']} />
            {/* 텍스트 */}
            <span className="text-size-md text-black">{korean_name}</span>
          </button>
        ))}
      </div>
    </BaseModal>
  )
}

export default CategoryModal
