import "./globals.css";
import '@/styles/main.css'
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import MasterMenu from "@/components/layout/MasterMenu";
import { ToastContainer } from "react-toastify";
import { ModalContainer } from "@/components/layout/Modal";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./redux/provider";
import { DataProvider } from "@/context/data.context";

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
        <DataProvider>
          <ReduxProvider>
            <div className="master-page flex h-screen flex-row bg-base-200">
              <MasterMenu></MasterMenu>
              <main className="min-w-0 flex-grow absolute inset-0 left-56">{children}</main>
              <ToastContainer />
              <ModalContainer />
            </div>
          </ReduxProvider>
        </DataProvider>
      </body>
    </html>
  );
}
