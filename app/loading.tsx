export default function PageLoading() {
  return (
    <div className="flex flex-col gap-5 h-screen w-full items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
      Loading...
    </div>
  );
}
