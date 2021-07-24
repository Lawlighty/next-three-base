import "../styles/global.css";
import "antd/dist/antd.css"; //全局引用antd的样式
import { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
