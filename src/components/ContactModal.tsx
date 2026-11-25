import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contactInfo } from "../data/contactData";

export type Step = "idle" | "confirm" | "sending" | "success" | "error";

export interface ContactValues {
    name: string;
    company: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    website: string; // hidden "honeypot" field, real people leave it empty
}

interface Props {
    step: Step;
    values: ContactValues;
    suggestion: string | null;
    onEdit: () => void; // back to the form
    onConfirm: () => void; // send now
    onUseSuggestion: () => void;
    onDone: () => void; // success finished, clear the form
    onFixEmail: () => void; // "I did not get the email"
}

const view = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
    transition: { duration: 0.25 },
};

export default function ContactModal({ step, values, suggestion, onEdit, onConfirm, onUseSuggestion, onDone, onFixEmail }: Props) {
    const open = step !== "idle";

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape" || step === "sending") return;
            if (step === "success") onDone();
            else onEdit();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open, step, onDone, onEdit]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div className="cm-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <motion.div
                        className={`cm cm-${step}`}
                        role="dialog"
                        aria-modal="true"
                        aria-live="polite"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    >
                        <AnimatePresence mode="wait">
                            {/* ---------- 1. CHECK DETAILS ---------- */}
                            {step === "confirm" && (
                                <motion.div key="confirm" {...view}>
                                    <h3>Please check your details</h3>
                                    <p>
                                        We will reply to the email below and may call the number you give us. If either is wrong, we won't be able to reach you.
                                    </p>
                                    <dl className="cm-details">
                                        {[
                                            ["Name", values.name],
                                            ["Email", values.email],
                                            ["Phone", values.phone || "Not provided"],
                                            ["Service", values.service],
                                        ].map(([k, v], i) => (
                                            <motion.div key={k} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i + 0.1 }}>
                                                <dt>{k}</dt>
                                                <dd>{v}</dd>
                                            </motion.div>
                                        ))}
                                    </dl>
                                    {suggestion && (
                                        <motion.div className="cm-warn" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                                            Did you mean <b>{suggestion}</b>?
                                            <button type="button" onClick={onUseSuggestion}>Use this email</button>
                                        </motion.div>
                                    )}
                                    <div className="cm-actions">
                                        <button type="button" className="btn btn-outline" onClick={onEdit}>Edit details</button>
                                        <button type="button" className="btn btn-red" onClick={onConfirm} autoFocus>Yes, send it →</button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ---------- 2. SENDING ---------- */}
                            {step === "sending" && (
                                <motion.div key="sending" className="cm-center" {...view}>
                                    <div className="plane-stage" aria-hidden="true">
                                        <span className="plane-trail" />
                                        <svg className="plane" viewBox="0 0 48 48" fill="currentColor">
                                            <path d="M44 4L4 21l13 5 5 14 6-10 9 6 7-32z" />
                                            <path d="M17 26l27-22L22 30" fill="none" stroke="#fff" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <h3>
                                        Sending your enquiry<span className="cm-dots"><i>.</i><i>.</i><i>.</i></span>
                                    </h3>
                                    <p>Please keep this page open.</p>
                                    <div className="send-bar" />
                                </motion.div>
                            )}

                            {/* ---------- 3. SENT ---------- */}
                            {step === "success" && (
                                <motion.div key="success" className="cm-center" {...view}>
                                    <div className="confetti" aria-hidden="true">
                                        {Array.from({ length: 16 }).map((_, i) => {
                                            const angle = (i / 16) * Math.PI * 2;
                                            const dist = 70 + (i % 3) * 28;
                                            return (
                                                <motion.span
                                                    key={i}
                                                    style={{ background: ["#d71920", "#0a0a0a", "#d4d4d0"][i % 3] }}
                                                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                                                    animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, rotate: 200 }}
                                                    transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
                                                />
                                            );
                                        })}
                                    </div>
                                    <svg className="cm-icon" viewBox="0 0 72 72" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <motion.circle cx="36" cy="36" r="30" stroke="#d71920" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                                        <motion.path d="M22 37l10 10 18-21" stroke="#0a0a0a" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5 }} />
                                    </svg>
                                    <h3>Enquiry sent!</h3>
                                    <p>
                                        Thank you, {values.name.split(" ")[0]}. We have received your message and sent a confirmation email to <b>{values.email}</b>.
                                    </p>
                                    <div className="cm-note">
                                        <b>Haven't received the confirmation?</b> Wait a few minutes and check your spam or junk folder. If it still isn't
                                        there, the email address you entered is probably incorrect. Fix it below, or reach us on WhatsApp.
                                    </div>
                                    <div className="cm-actions">
                                        <button type="button" className="btn btn-outline" onClick={onFixEmail}>I didn't get it, fix my email</button>
                                        <button type="button" className="btn btn-red" onClick={onDone} autoFocus>Done</button>
                                    </div>
                                    <p className="cm-small">Sending again will notify us a second time.</p>
                                </motion.div>
                            )}

                            {/* ---------- 4. FAILED ---------- */}
                            {step === "error" && (
                                <motion.div key="error" className="cm-center" {...view}>
                                    <svg className="cm-icon cm-shake" viewBox="0 0 72 72" fill="none" strokeWidth="4" strokeLinecap="round">
                                        <circle cx="36" cy="36" r="30" stroke="#d71920" />
                                        <path d="M25 25l22 22M47 25L25 47" stroke="#0a0a0a" />
                                    </svg>
                                    <h3>We couldn't send your enquiry</h3>
                                    <p>Something went wrong on our side, or your connection dropped. Your details are still in the form, so nothing is lost.</p>
                                    <div className="cm-actions">
                                        <button type="button" className="btn btn-outline" onClick={onEdit}>Back to the form</button>
                                        <button type="button" className="btn btn-red" onClick={onConfirm} autoFocus>Try again →</button>
                                    </div>
                                    <p className="cm-small">
                                        Or reach us directly: <a className="text-link" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or{" "}
                                        <a className="text-link" href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}