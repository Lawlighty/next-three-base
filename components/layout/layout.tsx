import styles from "./layout.module.css";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
const name = "Lawlighty";
export const siteTitle = "Lawlighty Base Next.js & Three.js";
export const siteIco = "/images/website/car.ico";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const [currentProfiles, setCurrentProfiles] = useState("");
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href={siteIco} />
        <meta
          name="description"
          content="这是一个基于Next.js 和 Three.js 的 模板"
        ></meta>
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        {home ? (
          <>{/* 首页特别展示信息 */}</>
        ) : (
          <>
            {/* 其他页面展示 */}
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
