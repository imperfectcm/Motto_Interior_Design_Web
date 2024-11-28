import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LogoIcon from "@/public/icon/Motto_icon.webp";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
import Navbar from "./_component/Navbar";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motto Interior Design",
  icons: [
    {
      url: LogoIcon.src,
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Motto Interior Design</title>
      </head>
      <body>
        <ToastContainer />
        <Navbar />
        {props.children}
      </body>
    </html>
  );
}
