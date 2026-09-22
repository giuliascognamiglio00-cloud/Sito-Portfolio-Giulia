import type { Metadata } from "next";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { getProjects } from "@/content/projects";
import WorksList from "@/components/WorksList";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.works.heading,
    description: dict.works.description,
    alternates: { canonical: `/${lang}/works/`, languages: { it: "/it/works/", en: "/en/works/" } },
  };
}

export default async function WorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const typed = (isLang(lang) ? lang : "it") as Lang;
  const dict = getDictionary(typed);
  const professional = getProjects("works");
  const academic = getProjects("academy");

  return (
    <div className="wrap">
      <section className={styles.section}>
        <div className={styles.head}>
          <h1 className="display">{dict.works.heading}</h1>
          <p className={styles.lede}>{dict.works.lede}</p>
        </div>

        <WorksList professional={professional} academic={academic} lang={typed} dict={dict} />
      </section>
    </div>
  );
}
