import "../styles/tailwind.css";

import Footer from "../components/footer";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Footer {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
