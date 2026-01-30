import { ResponsiveSankey } from "@nivo/sankey";
import { useEffect, useState } from "react";

const USD_RATE = 18.75; // dummy exchange rate (R → $)

const data = {
  nodes: [
    { id: "Salary" },
    { id: "Rent" },
    { id: "Groceries" },
    { id: "Transport" },
    { id: "Utilities" },
    { id: "Entertainment" },
    { id: "Savings" },
    { id: "Investments" },
  ],
  links: [
    { source: "Salary", target: "Rent", value: 12000 },
    { source: "Salary", target: "Groceries", value: 4500 },
    { source: "Salary", target: "Transport", value: 2500 },
    { source: "Salary", target: "Utilities", value: 1800 },
    { source: "Salary", target: "Entertainment", value: 2200 },
    { source: "Salary", target: "Savings", value: 4000 },
    { source: "Savings", target: "Investments", value: 3000 },
  ],
};

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ height: isMobile ? 420 : 520, width: "100%" }}>
      <ResponsiveSankey
        data={data}
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

        valueFormat={formatBoth}

        nodeLabel={node => `${node.id} (${formatBoth(node.value)})`}
        nodeLabelPadding={12}
        nodeLabelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}

        tooltip={({ node, link }) => {
          if (node) {
            return (
              <div style={{ padding: 8 }}>
                <strong>{node.id}</strong>
                <br />
                {formatBoth(node.value)}
              </div>
            );
          }

          if (link) {
            return (
              <div style={{ padding: 8 }}>
                {link.source.id} → {link.target.id}
                <br />
                <strong>{formatBoth(link.value)}</strong>
              </div>
            );
          }

          return null;
        }}
      />
    </div>
  );
}
