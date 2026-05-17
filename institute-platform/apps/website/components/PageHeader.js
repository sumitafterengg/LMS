export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-gray-50 border-b">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-instituteDarkGreen">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-3xl text-gray-700">{subtitle}</p>}
      </div>
    </section>
  );
}
