import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle, siteIco } from "../components/layout/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/Date/date";
import { GetStaticProps } from "next";
import LoadingPage from "../components/loadingFrame/indexPage";
import { useState, useEffect } from "react";

import init from "./carInit";

export default function Home() {
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <div>
        <Layout home>{}</Layout>
        <div className="container">
          {/* <Head>
            <title>{siteTitle}</title>
            <link rel="icon" href={siteIco} />
          </Head> */}

          <main>
            {/* 这是是汽车展示 */}
            <div id="theatre"></div>
          </main>

          <footer>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="logo_desc">
                狗狗币<strong className="logo_desc_info">1</strong>U{" "}
              </div>

              <img
                src="/images/website/doge.png"
                alt="Vercel Logo"
                className="logo"
              />
            </a>
          </footer>

          <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              // padding: 1rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer img {
              margin-left: 0.5rem;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
            }

            .title,
            .description {
              text-align: center;
            }

            .description {
              line-height: 1.5;
              font-size: 1.5rem;
            }

            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 1rem;
            }

            .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            .card:hover,
            .card:focus,
            .card:active {
              color: #0070f3;
              border-color: #0070f3;
            }

            .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }

            .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
            }

            .logo_desc {
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              letter-spacing: 0.2rem;
              animation-name: hd;
              animation-duration: 3s;
              animation-iteration-count: infinite;
            }

            @keyframes hd {
              0% {
                color: #1abc9c;
                opacity: 0.2;
              }
              15% {
                color: #16a085;
                opacity: 0.3;
              }
              30% {
                color: #f1c40f;
                opacity: 0.4;
              }
              45% {
                color: #f39c12;
                opacity: 0.5;
              }
              60% {
                color: #e67e22;
                opacity: 0.6;
              }
              75% {
                color: #e74c3c;
                opacity: 0.7;
              }
              90% {
                color: #c0392b;
                opacity: 0.8;
              }
              100% {
                color: #c0392b;
                opacity: 1;
              }
            }
            .logo_desc_info {
              font-size: 2rem;
              position: relative;
              top: -0.1rem;
            }

            .logo {
              height: 1.5em;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
