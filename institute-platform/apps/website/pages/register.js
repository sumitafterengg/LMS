import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function Register({ dict }) {
  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "register.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-bold text-instituteDarkGreen mb-6">{t(dict, "register.stepsTitle")}</h2>
          <div className="space-y-4">
            <p className="text-gray-700">1. {t(dict, "common.placeholder")}</p>
            <p className="text-gray-700">2. {t(dict, "common.placeholder")}</p>
            <p className="text-gray-700">3. {t(dict, "common.placeholder")}</p>
          </div>
          <div className="mt-8">
            <button className="bg-instituteDarkGreen text-white px-6 py-3 rounded font-semibold">
              {t(dict, "register.downloadForm")}
            </button>
          </div>
        </section>

        <Card title={t(dict, "register.paymentTitle")}>
          <p>{t(dict, "register.paymentBody")}</p>
        </Card>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
