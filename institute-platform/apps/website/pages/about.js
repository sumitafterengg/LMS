import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { getDictionary, t } from "../lib/i18n";

export default function About({ dict }) {
  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "about.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          {t(dict, "about.body")}
        </p>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
