// netlify/functions/comments.js
import { neon } from "@neondatabase/serverless";

// Netlify × Neon sets this env var automatically after you created the DB
const sql = neon(process.env.NETLIFY_DATABASE_URL);

// helper to respond JSON
const json = (code, body) => ({
  statusCode: code,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export async function handler(event) {
  try {
    const method = event.httpMethod;

    if (method === "GET") {
      // /.netlify/functions/comments?slug=post-slug
      const slug = event.queryStringParameters?.slug || "";
      if (!slug) return json(400, { error: "Missing slug" });

      const rows = await sql`SELECT id, slug, name, message, status, created_at
                  FROM comments
                  WHERE slug = ${slug} AND status = 'approved'
                  ORDER BY created_at DESC`;

      const out = rows.map((r) => ({
        id: String(r.id),
        name: r.name,
        message: r.message,
        createdAt: r.created_at,
      }));

      return json(200, out);
    }

    if (method === "POST") {
      // body: { slug, name, email, message }
      const { slug, name, email, message } = JSON.parse(event.body || "{}");
      if (!slug || !name || !email || !message) {
        return json(400, { error: "Missing fields" });
      }

      await sql`
        INSERT INTO comments (slug, name, email, message, status)
        VALUES (${slug}, ${name}, ${email}, ${message}, 'pending')
      `;

      return json(200, { ok: true });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return json(500, { error: "Server error" });
  }
}
