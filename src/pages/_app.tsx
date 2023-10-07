"use client"
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout/Layout";
import '../styles/styles.css'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
