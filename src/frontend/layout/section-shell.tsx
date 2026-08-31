import type { ReactNode } from "react";

import { DotGridBackground } from "@/frontend/layout/dot-grid-background";
import { Navbar } from "@/frontend/layout/navbar";

type SectionShellProps = {
  children: ReactNode;
  dashboardSpacing?: boolean;
};

export function SectionShell({ children }: SectionShellProps) {
  return (
    <main className="page-shell bg-ink">
      <Navbar />
      <DotGridBackground />
      <div className="w-full">{children}</div>
    </main>
  );
}
