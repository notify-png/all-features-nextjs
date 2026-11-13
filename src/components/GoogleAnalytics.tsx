import Script from "next/script";

/**
 * GA4 埋点。
 *
 * 与主站 app 共用同一个属性（`495906931`）——两边同在 `www.tunee.ai` 域下，
 * 所以用户从这里点进 app 属于**同一个会话**，source / medium 原样保留。
 * 正因为同域，这里不需要任何跨域（cross-domain）配置。
 *
 * **ID 走环境变量、且刻意不设默认值**：预览部署（`www-pre.tunee.ai`）
 * 不配这个变量就不上报，免得预览流量混进生产属性的数据里。
 * 代价是生产环境漏配会静默没有埋点，所以上线后必须按 PR 里的步骤实测一次。
 */
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA4_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
