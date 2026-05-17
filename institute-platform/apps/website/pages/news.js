import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function News({ dict }) {
  const newsItems = [1, 2, 3];

  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "news.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-3">
        {newsItems.map(item => (
          <Card key={item} title={`${t(dict, "news.title")} ${item}`} action={
            <button className="text-instituteDarkGreen font-semibold">{t(dict, "common.readMore")}</button>
          }>
            <p className="text-sm text-gray-500 mb-2">2026-04-28</p>
            <p>{t(dict, "common.placeholder")}</p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
