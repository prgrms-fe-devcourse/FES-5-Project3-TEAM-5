function AccountBookCardSkeleton() {
  return (
    <>
      <div className="w-[100px] h-[100px] bg-gray-200 rounded-full transition ease-in-out" />
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-gray-200 rounded-md w-12 h-4" />
        <div className="bg-gray-200 rounded-md w-40 h-6" />
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-md w-16 h-4" />
          <div className="bg-gray-200 rounded-full w-4 h-4" />
        </div>
      </div>
    </>
  )
}

export default AccountBookCardSkeleton
