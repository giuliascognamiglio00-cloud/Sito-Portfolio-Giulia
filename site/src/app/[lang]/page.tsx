import Link from "next/link";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import { getProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import ProjectCard from "@/components/ProjectCard";
import styles from "./page.module.css";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const typed = (isLang(lang) ? lang : "it") as Lang;
  const dict = getDictionary(typed);

  return (
    <>
      <Hero role={dict.home.role} lede={dict.home.lede} portraitAlt={profile[typed].portraitAlt} />

      <div className="wrap">
        <Approach
          heading={dict.home.approach.heading}
          lede={dict.home.approach.lede}
          steps={dict.home.approach.steps}
        />

        <section className={styles.section}>
          <div className={styles.head}>
            <h2 className="display">{dict.home.selectedWorks}</h2>
            <Link href={routes.works(typed)} className={styles.seeAll}>
              {dict.home.seeAll}
            </Link>
          </div>

          <ul className={styles.grid}>
            {getProjects()
              .slice(0, 4)
              .map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={typed} />
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}
