export default function PageHeader({
    children,
  }: {
    children?: React.ReactNode;
  }) {
    return (
      <div className="absolute top-20 bottom-0 right-0 left-56">
        {children}
      </div>
    );
  }
  