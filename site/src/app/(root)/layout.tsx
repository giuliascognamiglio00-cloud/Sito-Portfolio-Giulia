/**
 * Layout minimo della sola rotta "/", che non appartiene a nessuna lingua.
 * Non carica gli stili del sito: la pagina esiste solo per smistare e scompare subito.
 */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
