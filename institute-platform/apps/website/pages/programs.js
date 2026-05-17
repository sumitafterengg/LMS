import Link from "next/link";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function Programs({ dict }) {
  const programs = [
    { id: 1, name: "Program 1" },
    { id: 2, name: "Program 2" },
    { id: 3, name: "Program 3" },
  ];

  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "programs.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-6 md:grid-cols-3">
        {programs.map(p => (
          <Card key={p.id} title={p.name} action={
            <Link href="/program-detail" className="text-instituteGold font-semibold">
              {t(dict, "common.learnMore")}
            </Link>
          }>
            <p>{t(dict, "programs.duration")}: [DURATION_PENDING]</p>
            <p>{t(dict, "programs.fees")}: [FEES_PENDING]</p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
