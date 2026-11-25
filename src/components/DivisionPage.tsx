import { Link } from "react-router-dom";
import { workSteps } from "../data/siteData";
import type { Division } from "../data/types";
import Headline from "./Headline";
import ServiceGrid from "./ServiceGrid";
import LoadedImage from "./LoadedImage";
import CTA from "./CTA";
import Reveal from "./Reveal";
import { DivisionVisual } from "./Visuals";

export default function DivisionPage({ division }: { division: Division }) {

  return (
      <>
        <section className="page-hero split-hero">
          <div className="container split-hero-inner">
            <div>
              <p className="kicker">{division.navLabel}</p>
              <Headline lines={division.heroLines} />
              <div className="red-rule" />
              <p className="lead">{division.intro}</p>
              <div className="btn-row">
                <Link to="/contact" className="btn btn-red">{division.ctaLabel} →</Link>
                <Link to="/projects" className="btn btn-outline">See our work →</Link>
              </div>
            </div>
            <div className={`hero-art ${division.heroImage ? "has-image" : ""}`}>
              {division.heroImage ? (
                  <LoadedImage
                      src={division.heroImage}
                      alt={`${division.navLabel} hero`}
                      className="hero-img"
                      ratio="4 / 3"
                      priority
                      fallback={<DivisionVisual slug={division.slug} />}
                  />
              ) : (
                  <DivisionVisual slug={division.slug} />
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="kicker">Services</p>
            <h2 className="display-md">{division.tagline}</h2>
            <ServiceGrid services={division.services} />
          </div>
        </section>

        {division.slug === "digital" && (
            <section className="section section-soft">
              <div className="container">
                <p className="kicker">Process</p>
                <h2 className="display-md">How a project runs</h2>
                <ol className="process">
                  {workSteps.map((s, i) => (
                      <Reveal key={s.title} delay={i * 100}>
                        <li>
                          <span className="step-num">{i + 1}</span>
                          <h3>{s.title}</h3>
                          <p>{s.text}</p>
                        </li>
                      </Reveal>
                  ))}
                </ol>
              </div>
            </section>
        )}


        <CTA title={division.ctaTitle} label={division.ctaLabel} />
      </>
  );
}