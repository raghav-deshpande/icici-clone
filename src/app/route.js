import fs from "node:fs";
import path from "node:path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "motor-insurance", "car-insurance.html");
  let html = "";
  try {
    html = fs.readFileSync(filePath, "utf8");
  } catch {
    html = "<!doctype html><html><head><meta charset=\"utf-8\"><title>Missing</title></head><body>Missing car-insurance.html</body></html>";
  }
  html = html.replace(/\/(docs\/default-source\/[^"']*\/images\/)([^"'>]+)/g, "/assets/images/$2");
  html = html.replace(/url\(\/(docs\/default-source\/[^\)]*\/images\/)([^\)]+)\)/g, "url(/assets/images/$2)");
  html = html.replace(/\/(images\/default-source\/site-assets\/)([^"'>]+)/g, "/assets/images/$2");
  html = html.replace(/href="\/(docs\/default-source\/[^"']*\.css)"/g, (m) => {
    const f = m.match(/[^\/]+\.css/);
    return f ? `href="/assets/css/${f[0]}"` : m;
  });
  html = html.replace(/src="\/(docs\/default-source\/[^"']*\.js)"/g, (m) => {
    const f = m.match(/[^\/]+\.js/);
    return f ? `src="/assets/js/${f[0]}"` : m;
  });
  html = html.replace(/href="\/(images\/default-source\/site-assets\/favicon\.ico)"/g, 'href="/favicon.ico"');
  html = html.replace(/href="\/images\/default-source\/site-assets\/favicon-new\.png"/g, 'href="/favicon.ico"');
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
