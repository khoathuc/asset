import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import MasterMenu from "@/components/layout/MasterMenu";
import Modal from "@/components/layout/Modal";
import { ToastContainer } from "react-toastify";

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
        <div className="flex h-screen flex-row bg-base-200">
          <MasterMenu></MasterMenu>
          <main className="flex-grow">{children}</main>
          <Modal></Modal>
          <ToastContainer/>
        </div>
      </body>
    </html>
  );
}
