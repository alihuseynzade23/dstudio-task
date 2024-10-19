import type { Metadata } from "next";
import "@/public/styles/index.css";
import "@/public/styles/tailwind.css";

export const metadata: Metadata = {
  title: "Main page",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}