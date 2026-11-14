import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMR Systems — Technology Ecosystem",
  description: "An integrated technology ecosystem connecting intelligent software, digital products, and real-world industries.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
