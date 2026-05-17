import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { getDictionary, t } from "../lib/i18n";

export default function Courses({ dict }) {
  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "courses.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          {t(dict, "courses.body")}
        </p>
        <div className="mt-8 p-12 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          LMS Integration Pending
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
