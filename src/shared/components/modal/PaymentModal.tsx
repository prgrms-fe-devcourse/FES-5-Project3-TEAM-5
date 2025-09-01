import BaseModal from "./BaseModal"

type PaymentMethod = {
  id: string;
  type: string;
  index: number;
}

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (id: string) => void;
  methods: PaymentMethod[];
}

function PaymentModal({ open, onClose, onSelect, methods }:Props) {
  return (
    <BaseModal isOpen={open} onClose={onClose}>
      {/* 제목 */}
      <h2 className="text-center text-[22px] font-bold text-black">결제수단 설정</h2>

      {/* 결제수단 버튼 */}
      <div className="mt-6 flex flex-col gap-2">
        {methods.map(({ id, type }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="w-full py-2 rounded-lg text-black bg-gray-100 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-150 "
          >
            {type}
          </button>
        ))}
      </div>
    </BaseModal>
  )
}
export default PaymentModal