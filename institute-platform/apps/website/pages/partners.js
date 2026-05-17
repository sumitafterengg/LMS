import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { getDictionary, t } from "../lib/i18n";

export default function Partners({ dict }) {
  const partners = [1, 2, 3, 4, 5, 6];

  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "partners.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {partners.map(p => (
          <div key={p} className="aspect-video bg-gray-100 flex items-center justify-center rounded border border-gray-200">
            <span className="text-gray-400 font-bold">Partner {p}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
