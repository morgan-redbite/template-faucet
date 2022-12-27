import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../layout"
import App from "../components"
import "./index.scss";
import EZModal from "../components/common/modal/modal";
import favicon from "./"
import Metadata from "./SEO/metadata";
import { Provider } from "react-redux";
import store from "../store/store";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
        <Provider store={store}>
          <App/>
        </Provider>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <Metadata/>
