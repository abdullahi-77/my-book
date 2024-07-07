import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "myBook",
  description: "Control your cash flow",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
    
      <body className={inter.className}>
      <main>{children}</main>
        <Toaster />
        </body>
  
    </html>
    </ClerkProvider>

  );
}
