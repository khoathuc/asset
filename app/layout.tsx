import "./globals.css";
import "@/styles/main.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import MasterMenu from "@/components/layout/MasterMenu";
import { ToastContainer } from "react-toastify";
import { ModalContainer } from "@/components/layout/Modal";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./redux/provider";
import { DataProvider } from "@/context/data.context";
import AuthProvider from "@/context/auth.context";
import { SessionProvider } from "next-auth/react";

const openSans = Open_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asset",
  description: "Asset management software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AuthProvider>
          <DataProvider>
            <ReduxProvider>
              <div className="master-page flex h-screen flex-row bg-base-200">
                <MasterMenu></MasterMenu>
                <main className="absolute inset-0 left-56 min-w-0 flex-grow">
                  {children}
                </main>
                <ToastContainer />
                <ModalContainer />
              </div>
            </ReduxProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
