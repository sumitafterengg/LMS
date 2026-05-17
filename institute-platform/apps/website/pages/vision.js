import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function Vision({ dict }) {
  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "vision.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-2">
        <Card title={t(dict, "vision.visionTitle")}>
          {t(dict, "vision.visionBody")}
        </Card>
        <Card title={t(dict, "vision.missionTitle")}>
          {t(dict, "vision.missionBody")}
        </Card>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
