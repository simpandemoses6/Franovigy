import { useState } from "react";
import { Link } from "react-router-dom";
import { clients } from "../data/clientsData";
import type { GalleryCategory } from "../data/types";
import PageHero from "../components/PageHero";
import ClientLogo from "../components/ClientLogo";
import Testimonials from "../components/Testimonials";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";

export default function Clients() {
    const available = Array.from(new Set(clients.flatMap((c) => (c.category ? [c.category] : []))));
    const [cat, setCat] = useState<"All" | GalleryCategory>("All");
    const list = clients.filter((c) => cat === "All" || c.category === cat);

    return (
        <>
            <PageHero
                lines={["OUR CLIENTS."]}
                text="The businesses and organisations we are proud to work with."
                kicker="Clients"
                watermark
            />

            <section className="section">
                <div className="container">
                    {available.length > 1 && (
                        <div className="filters" role="tablist">
                            {(["All", ...available] as const).map((f) => (
                                <button key={f} role="tab" aria-selected={cat === f} className={cat === f ? "on" : ""} onClick={() => setCat(f)}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="clients-grid">
                        {list.map((c, i) => (
                            <Reveal key={c.name} delay={(i % 4) * 60}>
                                <ClientLogo client={c} />
                            </Reveal>
                        ))}
                        <Reveal delay={(list.length % 4) * 60}>
                            <Link to="/contact" className="client client-cta">
                                <span>Your business here</span>
                                <b>Work with us →</b>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Testimonials />
            <CTA />
        </>
    );
}