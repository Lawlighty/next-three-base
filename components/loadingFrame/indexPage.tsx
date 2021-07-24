import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import html from "./index.js";
// loading 页面1
export default function LoadingPage() {
  return (
    <div>
      <iframe
        title="resg"
        srcDoc={html}
        style={{ width: "100vw", border: "0px", height: "100vh" }}
        scrolling="auto"
      />
    </div>
  );
}
