import localFont from "next/font/local";

export const suit = localFont({
  src: [
    {
      path: "../styles/fonts/Suit/SUIT-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../styles/fonts/Suit/SUIT-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/Suit/SUIT-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/Suit/SUIT-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/Suit/SUIT-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/Suit/SUIT-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-suit",
});
