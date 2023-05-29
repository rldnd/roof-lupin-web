import "@/styles/global.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "루프루팡",
  description: "Cumuco Roof-lupin service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
