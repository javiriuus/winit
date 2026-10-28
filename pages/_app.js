import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "../lib/i18n";

export default function App({ Component, pageProps }) {
  return (
    <LangProvider>
      <Component {...pageProps} />
      {/* Visits and real-user speed, cookie-free. They start reporting once
          Web Analytics and Speed Insights are enabled in the Vercel project. */}
      <Analytics />
      <SpeedInsights />
    </LangProvider>
  );
}
