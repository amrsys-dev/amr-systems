import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMR Systems | Modular Technology Ecosystem",
  description: "AMR Systems develops independent digital products with a modular architecture for practical workflows and real-world industries.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
