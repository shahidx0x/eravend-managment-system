import { Metadata } from "next";



import { ThemeProvider } from "../provider/theme-provider";
import "./global.css";


export const metadata: Metadata = {
  title: "EraVend System - Comprehensive Management Solution",
  description:
    "EraVend's all-in-one system offers powerful tools for managing and optimizing your business operations seamlessly.",

  openGraph: {
    title: "EraVend System - Complete Management Platform",
    description:
      "Discover EraVend's all-in-one management system, designed to streamline business processes and enhance productivity.",
    url: "https://ems.eravend.com",
    siteName: "EraVend",
    images: [
      {
        url: "https://i.ibb.co.com/qWB3n43/image.png",
        width: 1200,
        height: 630,
        alt: "EraVend System Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "EraVend System - Comprehensive Management Solution",
    description:
      "EraVend's powerful all-in-one system helps businesses streamline operations and maximize efficiency.",
    images: ["https://i.ibb.co.com/qWB3n43/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}