import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function ProgramDetail({ dict }) {
  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "programDetail.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-instituteDarkGreen mb-4">{t(dict, "programDetail.objectives")}</h2>
          <p className="text-gray-700">{t(dict, "common.placeholder")}</p>
        </section>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card title={t(dict, "programDetail.syllabus")}>
            {t(dict, "common.placeholder")}
          </Card>
          <Card title={t(dict, "programDetail.schedule")}>
            {t(dict, "common.placeholder")}
          </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-instituteDarkGreen mb-4">{t(dict, "programDetail.fees")}</h2>
          <p className="text-gray-700">{t(dict, "common.placeholder")}</p>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
