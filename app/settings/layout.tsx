import SettingMenu from "./menu";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SettingMenu className="flex h-screen w-52 border-r-2 bg-base-100" />
      <main>{children}</main>
    </div>
  );
}
