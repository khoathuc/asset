import SettingMenu from "./menu";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen max-h-screen overflow-hidden">
      <SettingMenu className="h-screen w-52 border-r-2 bg-base-100" />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
