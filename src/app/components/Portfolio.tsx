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
    <div className="flex flex-row gap-8 items-start">
      {/* 9 columns */}
      <div className="flex-1 basis-0 min-w-0">
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Portfolio
        </h1>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "normal",
            marginBottom: "0.5rem",
          }}
        >
          Asset Under Management (AUM)
        </h2>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "normal",
            color: "#4B5563",
            marginBottom: "1rem",
          }}
        >
          Portofolio Bersama KSPM merupakan kumpulan aset investasi yang
          dikelola secara kolektif oleh anggota sebagai sarana pembelajaran
          sekaligus praktik nyata dalam dunia pasar modal. Melalui portofolio
          ini, anggota dapat memahami strategi diversifikasi, analisis
          fundamental maupun teknikal, serta manajemen risiko secara langsung.
        </p>

        {/* Total pill */}
        <div className="flex flex-row items-center gap-4 mt-10">
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
              lineHeight: "1.5",
              display: "flex",
              alignItems: "center",
              height: "3rem",
            }}
          >
            Total
          </h1>
          <div
            style={{
              background: "#27A8F7",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.5rem",
              borderRadius: "2rem",
              padding: "0.5rem 2rem",
              boxShadow: "0 2px 8px rgba(39,168,247,0.12)",
              display: "flex",
              alignItems: "center",
              height: "3rem",
            }}
          >
            Rp10.000.000
          </div>
        </div>
      </div>
      {/* Pie chart, legend*/}
      <div className="w-1/3 flex flex-col items-center gap-6">
        <MultiPieChart
          segments={[
            { label: "BBRI", percentage: 10, color: "#10B981" },
            { label: "BBCA", percentage: 50, color: "#4F46E5" },
            { label: "BMRI", percentage: 40, color: "#F59E42" },
          ]}
        />
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 16,
                height: 16,
                background: "#10B981",
                borderRadius: 4,
                display: "inline-block",
              }}
            ></span>
            <span className="font-medium">BBRI</span>
            <span className="text-gray-500">10%</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 16,
                height: 16,
                background: "#4F46E5",
                borderRadius: 4,
                display: "inline-block",
              }}
            ></span>
            <span className="font-medium">BBCA</span>
            <span className="text-gray-500">50%</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 16,
                height: 16,
                background: "#F59E42",
                borderRadius: 4,
                display: "inline-block",
              }}
            ></span>
            <span className="font-medium">BMRI</span>
            <span className="text-gray-500">40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
