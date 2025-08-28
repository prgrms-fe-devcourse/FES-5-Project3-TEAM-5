import Input from '@/shared/components/form/Input'

interface Props {
  firstOptionRef: React.RefObject<HTMLInputElement | null>
  secondOptionRef: React.RefObject<HTMLInputElement | null>
}
export function VoteOption({ firstOptionRef, secondOptionRef }: Props) {
  return (
    <div>
      <h3 className="text-size-lg font-bold text-neutral-dark ">선택지</h3>
      <div className="flex gap-3 mb-3">
        <div className="px-3 py-1.5 my-1.5 bg-primary-pale text-primary-base rounded-lg flex items-center">
          1
        </div>
        <Input
          label="선택지"
          ref={firstOptionRef}
        />
      </div>
      <div className="flex gap-3">
        <div className="px-3 py-1.5 my-1.5 bg-primary-pale text-primary-base rounded-lg flex items-center">
          2
        </div>
        <Input
          label="선택지"
          ref={secondOptionRef}
        />
      </div>
    </div>
  )
}
