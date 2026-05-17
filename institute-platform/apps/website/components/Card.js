export default function Card({ title, children, action }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-instituteDarkGreen">{title}</h3>
      <div className="mt-3 text-gray-700">{children}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
