import { ResponsiveSankey } from "@nivo/sankey";
import { useEffect, useState } from "react";

const USD_RATE = 18.75; // dummy exchange rate (R → $)
const RENT_STEP = 500; // how much the button increases rent by

const nodes = [
  { id: "Salary" },
  { id: "Rent" },
  { id: "Groceries" },
  { id: "Transport" },
  { id: "Utilities" },
  { id: "Entertainment" },
  { id: "Savings" },
  { id: "Investments" },
];

const initialLinks = [
  { source: "Salary", target: "Rent", value: 12000 },
  { source: "Salary", target: "Groceries", value: 4500 },
  { source: "Salary", target: "Transport", value: 2500 },
  { source: "Salary", target: "Utilities", value: 1800 },
  { source: "Salary", target: "Entertainment", value: 2200 },
  { source: "Salary", target: "Savings", value: 4000 },
  { source: "Savings", target: "Investments", value: 3000 },
];

const formatZAR = (value: number) =>
  `R${value.toLocaleString("en-ZA")}`;

const formatUSD = (value: number) =>
  `$${(value / USD_RATE).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;

const formatBoth = (value: number) =>
  `${formatZAR(value)} · ${formatUSD(value)}`;

export default function SankeyDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [links, setLinks] = useState(initialLinks);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const increaseRent = () => {
    setLinks((prev) =>
      prev.map((link) =>
        link.source === "Salary" && link.target === "Rent"
          ? { ...link, value: link.value + RENT_STEP }
          : link
      )
    );
  };

const SankeyNodeLabels = ({ nodes }: any) => {
  return (
    <>
      {nodes.map((node: any) => {
        const incoming = node.targetLinks.reduce(
          (sum: number, l: any) => sum + l.value,
          0
        );

        const outgoing = node.sourceLinks.reduce(
          (sum: number, l: any) => sum + l.value,
          0
        );

        // show label if:
        // - it has incoming money (expenses, savings, etc)
        // - OR it's the starting node (salary)
        const value =
          incoming > 0 ? incoming :
          outgoing > 0 && node.targetLinks.length === 0 ? outgoing :
          0;

        if (value === 0) return null;

        return (
          <text
            key={node.id}
            x={node.x0 - 8}
            y={(node.y0 + node.y1) / 2}
            dominantBaseline="middle"
            textAnchor="end"
            fontSize={12}
            fill="#333"
          >
            {node.id} — {formatBoth(value)}
          </text>
        );
      })}
    </>
  );
};


  return (
    <div style={{ width: "100%" }}>
      {/* Controls */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={increaseRent}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            background: "#2563eb",
            color: "white",
            fontWeight: 500,
          }}
        >
          Increase Rent (+R{RENT_STEP})
        </button>
      </div>

      {/* Sankey */}
      <div style={{ height: isMobile ? 420 : 520 }}>
        <ResponsiveSankey
          data={{ nodes, links }}
          align="justify"
          margin={{
            top: 20,
            right: isMobile ? 20 : 140,
            bottom: 20,
            left: isMobile ? 20 : 60,
          }}
          colors={{ scheme: "set2" }}
          nodeOpacity={1}
          nodeThickness={isMobile ? 12 : 18}
          nodeInnerPadding={isMobile ? 4 : 6}
          linkOpacity={0.45}
          linkHoverOpacity={0.75}
          enableLabels={false}

          valueFormat={formatBoth}
           layers={[
    "links",
    "nodes",
    "labels",
    SankeyNodeLabels, // 👈 custom UI text layer
  ]}
        />
      </div>
    </div>
  );
}
