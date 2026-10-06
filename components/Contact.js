import { useState } from "react";
import { useLang } from "../lib/i18n";
import { contactEmail, social } from "../lib/content";
import { ArrowIcon } from "./Icons";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState("idle"); // idle | invalid | sending | sent | error
  const [invalid, setInvalid] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };
    const bad = { name: !data.name, email: !emailOk(data.email), message: !data.message };
    setInvalid(bad);
    if (bad.name || bad.email || bad.message) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
    }
  }

  const message =
    status === "invalid" ? t.required : status === "sent" ? t.sent : status === "error" ? t.failed : "";

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact-title">
        {t.contactTitle}
      </h2>

      <div className="contact-layout">
        <div>
          <p className="contact-intro">{t.contactIntro}</p>
          <span className="contact-or">{t.orWrite}</span>
          <a className="contact-mail link-line" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          <div className="contact-social">
            {social.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div className="field">
              <label className="meta" htmlFor="f-name">
                {t.name}
              </label>
              <input id="f-name" name="name" type="text" autoComplete="name" aria-invalid={!!invalid.name} />
            </div>
            <div className="field">
              <label className="meta" htmlFor="f-email">
                {t.email}
              </label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!invalid.email}
              />
            </div>
          </div>
          <div className="field">
            <label className="meta" htmlFor="f-message">
              {t.message}
            </label>
            <textarea id="f-message" name="message" rows={4} aria-invalid={!!invalid.message} />
          </div>
          <div className="form-foot">
            <button className="btn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.send}
              <ArrowIcon size={16} />
            </button>
            <p
              className="form-status"
              role="status"
              aria-live="polite"
              data-tone={status === "sent" ? "ok" : status === "idle" || status === "sending" ? "" : "error"}
            >
              {message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
