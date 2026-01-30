import dynamic from "next/dynamic";
import Page from "@/components/page";
import Section from "@/components/section";

// Client-only Sankey (NO SSR)
const SankeyDemo = dynamic(
  () => import("@/components/sankeydemo"),
  { ssr: false }
);

const Index = () => (
  <Page>
    <Section>
      <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
        Sankey Diagram
      </h2>

      <div className="-mx-4 sm:mx-0">
        <SankeyDemo />
      </div>
    </Section>
  </Page>
);

export default Index;
