import Head from "next/head";
import { SocketProvider } from "../components/providers/socket-provider";
import { Toaster } from "sonner";

export const siteTitle = "Harmony";

export default function Layout({ children }) {
  return (
    <div id="main" className="h-full w-full">
      <Head>
        <link rel="icon" href="/images/logo_white.png" />
        <meta name="description" content="Harmonize with Locals:Just Around!" />
        <title>{siteTitle}</title>
      </Head>
      <SocketProvider>
        <Toaster richColors expand position="top-right"/>
          <div id="core" className="h-full w-full">{children}</div>
      </SocketProvider>
    </div>
  );
}
