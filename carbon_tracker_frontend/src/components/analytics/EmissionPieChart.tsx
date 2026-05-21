import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function EmissionPieChart({ summary }: any) {

  const data = [

    {
      name: "Driving",
      value: summary?.drivingEmission || 0,
    },

    {
      name: "Food",
      value: summary?.foodEmission || 0,
    },

    {
      name: "Electricity",
      value: summary?.electricityEmission || 0,
    },

    {
      name: "Flight",
      value: summary?.flightEmission || 0,
    },
  ];

  const COLORS = [
     "#15803d",
  "#a16207",
  "#2563eb", 
  "#db2777",
  ];

  return (

    <div className="w-full h-[400px]">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={130}
            innerRadius={70}
            paddingAngle={5}
            label
          >

            {data.map((_, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default EmissionPieChart;