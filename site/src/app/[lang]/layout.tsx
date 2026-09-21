import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { LANGS, getDictionary, isLang, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

// I font sono serviti dal nostro dominio: nessuna chiamata a Google al caricamento.
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const text = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.home.title,
      template: "%s | Giulia Scognamiglio",
    },
    description: dict.home.description,
    alternates: {
      canonical: `/${lang}/`,
      // hreflang: dice ai motori di ricerca che le due lingue sono la stessa pagina
      languages: { it: "/it/", en: "/en/", "x-default": "/it/" },
    },
    openGraph: {
      type: "website",
      locale: lang === "it" ? "it_IT" : "en_US",
      siteName: "Giulia Scognamiglio",
      title: dict.home.title,
      description: dict.home.description,
      url: `/${lang}/`,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const typed = lang as Lang;
  const dict = getDictionary(typed);

  return (
    <html lang={typed} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${display.variable} ${text.variable}`}>
        <a className="skip" href="#main">
          {dict.common.skipToContent}
        </a>
        <Nav lang={typed} dict={dict} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
