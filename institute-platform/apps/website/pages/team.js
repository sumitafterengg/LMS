import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getDictionary, t } from "../lib/i18n";

export default function Team({ dict }) {
  const staff = ["Member 1", "Member 2", "Member 3"];
  const faculty = ["Instructor 1", "Instructor 2"];

  return (
    <Layout dict={dict}>
      <PageHeader title={t(dict, "team.title")} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-instituteDarkGreen mb-6">{t(dict, "team.adminTitle")}</h2>
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {staff.map(name => (
            <Card key={name} title={name}>
              <p>[POSITION_PENDING]</p>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-instituteDarkGreen mb-6">{t(dict, "team.facultyTitle")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {faculty.map(name => (
            <Card key={name} title={name}>
              <p>[SPECIALTY_PENDING]</p>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { dict: getDictionary(locale) } };
}
