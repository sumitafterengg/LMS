import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import InstructorApplicationForm from "../components/InstructorApplicationForm";
import { getDictionary, t } from "../lib/i18n";

export default function JoinTrainer({ dict }) {
  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "joinTrainer.title")} subtitle={t(dict, "joinTrainer.intro")} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="bg-white p-8 rounded-lg border shadow-sm">
          <h2 className="text-2xl font-bold text-instituteDarkGreen mb-6">{t(dict, "joinTrainer.formTitle")}</h2>
          <InstructorApplicationForm dict={dict} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
