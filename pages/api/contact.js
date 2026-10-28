// pages/api/contact.js — sends the contact form to Javier's inbox.
// Spam protection: hidden honeypot field, minimum fill-in time, size limits,
// a cap on links, and a per-IP rate limit. Messages caught as spam get the same
// "sent" answer so bots learn nothing.
import nodemailer from "nodemailer";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map(); // ip → timestamps (per server instance)

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const body = req.body || {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const projectType = clean(body.projectType, 80);
  const dates = clean(body.dates, 120);
  const budget = clean(body.budget, 80);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ success: false });
  }

  const links = (message.match(/https?:\/\//gi) || []).length;
  const isSpam =
    clean(body.website, 200) !== "" || // honeypot filled
    Number(body.elapsed) < 3000 || // sent less than 3 s after the page loaded
    links > 3;
  if (isSpam) {
    console.warn("contact: spam blocked", { ip, links, elapsed: body.elapsed });
    return res.status(200).json({ success: true });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const details = [
    projectType && `Tipo de proyecto: ${projectType}`,
    dates && `Fechas: ${dates}`,
    budget && `Presupuesto: ${budget}`,
  ].filter(Boolean);

  const text = [
    `De: ${name} <${email}>`,
    ...details,
    "",
    message,
    "",
    `Página: ${clean(req.headers.referer, 300) || "—"}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Web: ${projectType ? `${projectType} · ` : ""}${name}`,
      text,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
