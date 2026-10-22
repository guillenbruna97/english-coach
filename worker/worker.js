// Intermediario entre la app y Gemini: la clave vive como secreto del Worker y nunca llega al navegador.
const ALLOWED = ["https://guillenbruna97.github.io", "http://localhost:8000", "http://127.0.0.1:8000"];
const MODEL = "gemini-2.5-flash";
const MAX_BODY = 60_000;

function cors(origin){
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export default {
  async fetch(req, env){
    const origin = req.headers.get("Origin") || "";
    if (!ALLOWED.includes(origin)) return new Response("Forbidden", {status: 403});
    if (req.method === "OPTIONS") return new Response(null, {status: 204, headers: cors(origin)});
    if (req.method !== "POST") return new Response("Method not allowed", {status: 405, headers: cors(origin)});

    const body = await req.text();
    if (body.length > MAX_BODY) return new Response("Too large", {status: 413, headers: cors(origin)});

    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: {"Content-Type": "application/json", "x-goog-api-key": env.GEMINI_KEY},
      body,
    });
    return new Response(r.body, {status: r.status, headers: {...cors(origin), "Content-Type": "application/json"}});
  },
};
