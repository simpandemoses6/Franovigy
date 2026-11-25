import { Link } from "react-router-dom";
import { company, divisions, heroWords } from "../data/siteData";
import Headline from "../components/Headline";
import Rotator from "../components/Rotator";
import Testimonials from "../components/Testimonials";
import LegacyBadge from "../components/LegacyBadge";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { LogoWatermark } from "../components/Logo";
import TypeText from "../components/TypeText.tsx";

// Image shown on each path card (set in siteData.ts: techLogo, agricultureLogo)
const pathImage = { digital: company.techLogo, agriculture: company.agricultureLogo };

export default function Home() {
  return (
      <>
        {/* ---------- HERO + PATH CHOOSER ---------- */}
        <section className="hero">
          <LogoWatermark />
          <div className="container">
            <div className="hero-top">
              <div className="hero-copy">
                <Headline className="display hero-title" lines={company.tagline.map((t) => t.toUpperCase())} />
                <p className="lead"><span className="c-red">{company.slogan_st1}</span> <span className="c-black">{company.slogan_st2}</span></p> { /*need to increae the size of the text and change colors*/ }
                <div className="red-rule" />
                <p className="lead">
                  <strong>{company.fullName}</strong> {company.heroText}
                </p>
                <p className="making">
                  Now building: <Rotator words={heroWords} />
                </p>
              </div>
              <LegacyBadge />
            </div>

            <p className="choose">
              Choose your path <span aria-hidden="true">↓</span>
            </p>
            <div className="paths">
              {divisions.map((d, i) => (
                  <Reveal key={d.slug} delay={i * 120}>
                    <div className={`path path-${d.slug}`}>
                      <div className="path-art logo-art">
                        <img className="path-art-img" src={pathImage[d.slug]} alt={`${d.navLabel} logo`} decoding="async" />
                        <span className="path-scan" />
                      </div>
                      <div className="path-body">
                        <h2>{d.name}</h2>
                        <p>{d.summary}</p>
                        <div className="path-foot">
                          <Link to={d.path} className="path-go">
                            {d.enterLabel} <i>→</i>
                          </Link>
                          <a className="path-dl" href={company.profileFile} download aria-label={company.profileLabel}>
                            <TypeText text={company.profileLabel} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>
        <Testimonials />

        <CTA />
      </>
  );
}