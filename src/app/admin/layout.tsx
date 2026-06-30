export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="!pt-0 -mt-20">{children}</div>;
}
