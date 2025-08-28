import { Pie, PieChart, Tooltip } from 'recharts'

export default function StatisticsPage() {
  return (
    <div className="w-full min-h-[618px] px-5 py-2.5 border-2 border-red-500 flex flex-col gap-8 justify-center items-center">
      <div>
        <div className="flex justify-between text-size-lg font-bold">
          <p>수입 카테고리</p>
          <p className="text-secondary-blue">111.111.111</p>
        </div>
        <PieChart
          width={400}
          height={400}>
          <Pie
            activeShape={{
              fill: 'red'
            }}
            data={[
              { name: 'Page A', uv: 590 },
              { name: 'Page B', uv: 590 },
              { name: 'Page C', uv: 868 }
            ]}
            dataKey="uv"
          />
          <Tooltip defaultIndex={2} />
        </PieChart>
      </div>

      <div>
        <div className="flex justify-between text-size-lg font-bold">
          <p>지출 카테고리</p>
          <p className="text-secondary-red">111.111.111</p>
        </div>
        <PieChart
          width={400}
          height={400}>
          <Pie
            activeShape={{
              fill: 'red'
            }}
            data={[
              { name: 'Page A', uv: 590 },
              { name: 'Page B', uv: 590 },
              { name: 'Page C', uv: 868 }
            ]}
            dataKey="uv"
          />
          <Tooltip defaultIndex={2} />
        </PieChart>
      </div>
    </div>
  )
}
