import {  Layout } from 'antd';
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function LayoutDefault() {

  return (
    <>
      <Layout className="layout-default">
        <Header />
        <Main />
        <Footer />
      </Layout>
    </>
  );
}
export default LayoutDefault;