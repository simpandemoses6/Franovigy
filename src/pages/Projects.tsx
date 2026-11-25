import PageHero from "../components/PageHero";
import GalleryGrid from "../components/GalleryGrid";
import WebPreview from "../components/WebPreview";
import Reveal from "../components/Reveal";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { webProjects } from "../data/webProjectsData";

export default function Projects() {
    return (
        <>
            <PageHero
                lines={["OUR WORK."]}
                text="Websites you can try for yourself, and a gallery of everything we have designed, printed and grown."
                kicker="Projects"
            />

            {webProjects.length > 0 && (
                <section className="section">
                    <div className="container">
                        <p className="kicker">Websites</p>
                        <h2 className="display-md">Live website previews.</h2>
                        <p className="muted narrow">These are real, working websites. Scroll and click inside a preview, switch to the phone view, or open the site in a new tab.</p>
                        <div className="wp-grid">
                            {webProjects.map((p, i) => (
                                <Reveal key={p.url} delay={(i % 2) * 100}>
                                    <WebPreview project={p} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className={`section ${webProjects.length > 0 ? "section-soft" : ""}`}>
                <div className="container">
                    <p className="kicker">Gallery</p>
                    <h2 className="display-md">Design, print and more.</h2>
                    <p className="muted narrow">Select any image to view it full size.</p>
                    <GalleryGrid filter />
                </div>
            </section>

            <Testimonials />
            <CTA />
        </>
    );
}