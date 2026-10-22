// Intermediario entre la app y Gemini: la clave vive como secreto del Worker y nunca llega al navegador.
const ALLOWED = ["https://guillenbruna97.github.io", "http://localhost:8000", "http://127.0.0.1:8000"];
// Por orden. Lite primero: con clave gratuita, 3.8 Flash solo da 20 peticiones al día.
// Si uno no tiene cupo (429), está saturado (503) o ya no existe (404), se prueba el siguiente.
const MODELS = [
  {id: "gemini-flash-lite-latest", thinking: null},
  {id: "gemini-3.8-flash", thinking: {thinkingLevel: "low"}},
];
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

    const raw = await req.text();
    if (raw.length > MAX_BODY) return new Response("Too large", {status: 413, headers: cors(origin)});
    let body;
    try{ body = JSON.parse(raw); }catch{ return new Response("Bad JSON", {status: 400, headers: cors(origin)}); }
    body.generationConfig = body.generationConfig || {};

    let r;
    for (const m of MODELS){
      if (m.thinking) body.generationConfig.thinkingConfig = m.thinking; else delete body.generationConfig.thinkingConfig;
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "x-goog-api-key": env.GEMINI_KEY},
        body: JSON.stringify(body),
      });
      if (![404, 429, 503].includes(r.status)) break;
    }
    return new Response(r.body, {status: r.status, headers: {...cors(origin), "Content-Type": "application/json"}});
  },
};
