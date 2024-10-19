import type { Metadata } from "next";
import "@/public/styles/index.css";
import "@/public/styles/tailwind.css";
import ReduxProvider from "@/store/ReduxProvider";

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
      <ReduxProvider>
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
