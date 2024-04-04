import type { Metadata } from "next"; 
import "./globals.css";
import Provider from "./components/Provider";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
 
import { Roboto } from 'next/font/google'

//👇 Configure our font object
const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Dusk",
  description: "My personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning={true}>
        <Provider>

            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >

                <div className={`flex flex-col ${roboto.className}`}>
                  <div className="min-h-[100vh]">
                    <AppBar/>
                    
                    {children}
                  </div>
                    
                  <Footer/>
                </div>

                
              </ThemeProvider>

        </Provider>
      </body>
    </html>
  );
}
