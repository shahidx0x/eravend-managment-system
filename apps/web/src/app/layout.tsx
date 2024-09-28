import { Metadata } from "next";



import { ThemeProvider } from "../provider/theme-provider";
import "./global.css";

export const metadata: Metadata = {
  title: "EraVend System",
  description: "This is the EraVend's All in One System.",
  openGraph: {
    title: "EraVend System",
    description: "This is the EraVend's CRM System.",
    url: "https://i.ibb.co.com/d2dFyTw/logo-white.png",
    siteName: "EraVend",
    images: [
      {
        url: "https://i.ibb.co.com/d2dFyTw/logo-white.png",
        width: 1200,
        height: 630,
        alt: "EraVend CRM",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EraVend System",
    description: "This is the EraVend's All in One System.",
    images: ["https://i.ibb.co.com/d2dFyTw/logo-white.png"],
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