// pages/_app.tsx
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import {NextUIProvider} from "@nextui-org/react";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;