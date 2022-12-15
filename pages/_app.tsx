import { notification } from "antd";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import RouteGuard from "core/routeGuard";
import MobileGuard from "core/mobileGuard";
import Notification from "core/notification";

import store from "store/index";

import Layout from "components/Layout";

import "styles/globals.css";

config.autoAddCss = false;

notification.config({
  maxCount: 5,
  duration: 3,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Notification>
        <Layout>
          <RouteGuard>
            <MobileGuard>
              <Component {...pageProps} />
            </MobileGuard>
          </RouteGuard>
        </Layout>
      </Notification>
    </Provider>
  );
}

export default MyApp;
