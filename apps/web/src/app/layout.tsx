import { Metadata } from "next";



import { ThemeProvider } from "../provider/theme-provider";
import "./global.css";

export const metadata: Metadata = {
  title: "EraVend CRM",
  description: "This is the EraVend's CRM System.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}