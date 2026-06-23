"use client";

import Script from "next/script";
import { PIXEL_ID } from "@/lib/pixel";

// Snippet base do Meta Pixel (fbevents) + init + PageView. Os eventos do funil
// disparam via track() em lib/pixel.ts (Lead, InitiateCheckout, ViewContent, etc.).
export function Pixel() {
  if (!PIXEL_ID || PIXEL_ID === "PLACEHOLDER") return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
      }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
