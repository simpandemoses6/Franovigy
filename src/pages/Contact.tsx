import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { divisions } from "../data/siteData";
import { contactInfo, socials, address } from "../data/contactData";
import { emailConfig } from "../data/emailConfig";
import { suggestEmail } from "../utils/emailCheck";
import PageHero from "../components/PageHero";
import ContactModal, { type ContactValues, type Step } from "../components/ContactModal";
import "../styles/contact.css";

const empty: ContactValues = { name: "", company: "", phone: "", email: "", service: "", message: "", website: "" };

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Contact() {
  const [params] = useSearchParams();
  const [values, setValues] = useState<ContactValues>({ ...empty, service: params.get("service") ?? "" });
  const [step, setStep] = useState<Step>("idle");
  const emailRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof ContactValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (values.website) {
      // a bot filled the hidden field: pretend it worked, send nothing
      setStep("success");
      return;
    }
    setStep("confirm");
  }

  async function send() {
    setStep("sending");
    const minimumWait = new Promise((resolve) => setTimeout(resolve, 1400)); // so the sending animation is always seen
    try {
      const { serviceId, templateId, publicKey } = emailConfig;
      if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS is not configured. Check the .env file.");
      await Promise.all([
        emailjs.send(
            serviceId,
            templateId,
            {
              name: values.name,
              email: values.email,
              phone: values.phone || "Not provided",
              company: values.company || "Not provided",
              service: values.service,
              message: values.message,
              sent_at: new Date().toLocaleString(),
            },
            { publicKey }
        ),
        minimumWait,
      ]);
      setStep("success");
    } catch (err) {
      console.error("Enquiry failed to send:", err);
      await minimumWait;
      setStep("error");
    }
  }

  function backToForm(focusEmail = false) {
    setStep("idle");
    if (focusEmail) {
      setTimeout(() => {
        emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        emailRef.current?.focus();
      }, 250);
    }
  }

  return (
      <>
        <PageHero lines={["LET'S BUILD", "SOMETHING TOGETHER."]} kicker="Contact Us" watermark />



        <section className="section section-soft" id="form">
          <div className="container split">
            <div>
              <h2 className="display-md">Get in touch</h2>
              <motion.ul className="contact-list" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <motion.li variants={item}><span>Email</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></motion.li>
                <motion.li variants={item}><span>Phone</span><a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>{contactInfo.phone}</a></motion.li>
                <motion.li variants={item}><span>WhatsApp</span><a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer">Message us</a></motion.li>
                <motion.li variants={item}>
                  <span>Location</span>
                  {address.no} {address.street},<br />
                  {address.area}, {address.province}, {address.country}
                </motion.li>
                <motion.li variants={item}><span>Hours</span>{contactInfo.hours}</motion.li>
                <motion.li variants={item}>
                  <span>Social</span>
                  <div className="social-row">
                    {socials.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
                    ))}
                  </div>
                </motion.li>
              </motion.ul>
              <p className="muted">Prefer to see our work first? <Link to="/projects" className="text-link">View projects</Link></p>
            </div>

            <motion.form className="form" onSubmit={onSubmit} variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              <motion.label variants={item}>Name<input name="name" autoComplete="name" value={values.name} onChange={set("name")} required /></motion.label>
              <motion.label variants={item}>Company / Organization<input name="company" autoComplete="organization" value={values.company} onChange={set("company")} /></motion.label>
              <motion.label variants={item}>Phone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} /></motion.label>
              <motion.label variants={item}>Email<input ref={emailRef} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} required /></motion.label>
              <motion.label variants={item}>Service Required
                <select name="service" value={values.service} onChange={set("service")} required>
                  <option value="" disabled>Select a service</option>
                  {divisions.map((d) => (
                      <optgroup key={d.slug} label={d.navLabel}>
                        {d.services.map((s) => (
                            <option key={s.name}>{s.name}</option>
                        ))}
                      </optgroup>
                  ))}
                  <option>Other</option>
                </select>
              </motion.label>
              <motion.label variants={item}>Tell us about your project<textarea name="message" rows={5} value={values.message} onChange={set("message")} required /></motion.label>

              {/* hidden spam trap: people never see or fill this */}
              <div className="hp" aria-hidden="true">
                <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} /></label>
              </div>

              <motion.button variants={item} whileTap={{ scale: 0.97 }} type="submit" className="btn btn-red btn-send">
                Send Enquiry <i>→</i>
              </motion.button>
            </motion.form>
          </div>
        </section>

        <ContactModal
            step={step}
            values={values}
            suggestion={suggestEmail(values.email)}
            onEdit={() => backToForm()}
            onConfirm={send}
            onUseSuggestion={() => setValues((v) => ({ ...v, email: suggestEmail(v.email) ?? v.email }))}
            onDone={() => {
              setValues({ ...empty });
              setStep("idle");
            }}
            onFixEmail={() => backToForm(true)}
        />
      </>
  );
}