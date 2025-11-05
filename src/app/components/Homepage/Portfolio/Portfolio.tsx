import React from "react";

// Simple Pie Chart Component
type PieSegment = {
  label: string;
  percentage: number;
  color: string;
};

type MultiPieChartProps = {
  segments: PieSegment[];
  size?: number;
  bgColor?: string;
};

const MultiPieChart: React.FC<MultiPieChartProps> = ({
  segments,
  size = 160,
  bgColor = "#E5E7EB",
}) => {
  const radius = size / 2 - 16;
  const circumference = 2 * Math.PI * radius;

  // Helper to get SVG arc path for each segment
  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return [
      "M",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  // Calculate segments
  let currentAngle = 0;
  const arcs = segments.map((seg, idx) => {
    const segAngle = (seg.percentage / 100) * 360;
    const arcPath = describeArc(
      size / 2,
      size / 2,
      radius,
      currentAngle,
      currentAngle + segAngle
    );
    currentAngle += segAngle;
    return (
      <path
        key={seg.label}
        d={arcPath}
        fill="none"
        stroke={seg.color}
        strokeWidth={28}
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={28}
      />
      {arcs}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.5em"
        fill="#222"
        fontWeight="bold"
      >
        100%
      </text>
    </svg>
  );
};

const Portfolio: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start w-full lg:max-w-[80vw] mt-20 mx-auto justify-between">
      {/* 9 columns */}
      <div className="mx-auto flex-1 w-[90vw] lg:w-2/3">
        <h1 className="text-center lg:text-left text-2xl lg:text-[2rem] font-bold mb-2">
          Portfolio
        </h1>
        <h2 className="text-center text-lg lg:text-3xl lg:text-left font-normal mb-2">
          Asset Under Management (AUM)
        </h2>
        <p className="text-justify lg:text-left text-base font-normal text-gray-600 mb-4">
          Portofolio Bersama KSPM merupakan kumpulan aset investasi yang
          dikelola secara kolektif oleh anggota sebagai sarana pembelajaran
          sekaligus praktik nyata dalam dunia pasar modal. Melalui portofolio
          ini, anggota dapat memahami strategi diversifikasi, analisis
          fundamental maupun teknikal, serta manajemen risiko secara langsung.
        </p>

        {/* Total pill */}
        <div className="hidden lg:flex flex-row items-center gap-4 mt-10 md:order-none">
          <h1 className="text-2xl lg:text-[2rem] font-bold m-0 leading-[1.5] flex items-center h-12">
            Total
          </h1>
          <div className="bg-[#27A8F7] text-white font-bold text-xl rounded-full px-8 py-2 shadow-md flex items-center h-12">
            Rp10.000.000
          </div>
        </div>
      </div>
      {/* Pie chart, legend*/}
      <div className="w-full lg:w-1/3 flex flex-col items-center gap-6">
        <MultiPieChart
          segments={[
            { label: "Stock", percentage: 10, color: "#10B981" },
            { label: "Crypto", percentage: 50, color: "#4F46E5" },
            { label: "Bonds", percentage: 40, color: "#F59E42" },
          ]}
        />
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#10B981] rounded-sm inline-block"></span>
            <span className="font-medium">Stock</span>
            <span className="text-gray-500">10%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#4F46E5] rounded-sm inline-block"></span>
            <span className="font-medium">Crypto</span>
            <span className="text-gray-500">50%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#F59E42] rounded-sm inline-block"></span>
            <span className="font-medium">Bonds</span>
            <span className="text-gray-500">40%</span>
          </div>
        </div>
        <div className="flex lg:hidden flex-row items-center gap-4 mt-10 md:order-none">
          <h1 className="text-2xl lg:text-[2rem] font-bold m-0 leading-[1.5] flex items-center h-12">
            Total
          </h1>
          <div className="bg-[#27A8F7] text-white font-bold text-xl rounded-full px-8 py-2 shadow-md flex items-center h-12">
            Rp10.000.000
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
