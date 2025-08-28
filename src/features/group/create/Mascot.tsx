function Mascot() {
  return (
    <div>
      <h2 className="text-neutral-dark font-semibold mb-1">대표 이미지</h2>
      <div className="flex">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 6L9 12L15 18"
              stroke="#1E1E1E"
            />
          </svg>
        </div>

        <div></div>

        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 6L15 12L9 18"
              stroke="#222222"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Mascot
