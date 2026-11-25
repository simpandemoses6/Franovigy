import { about } from "../data/siteData";
import PageHero from "../components/PageHero";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <>
      <PageHero lines={about.heroLines} text={about.brief[0]} kicker="About Us" watermark />

      <section className="section">
        <div className="container split">
          <h2 className="display-md">Our story</h2>
          <div className="prose">
            <p>{about.brief[1]}</p>
            <p>{about.areasIntro}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <Reveal>
            <div className="statement">
              <h3>Our Mission</h3>
              <p>{about.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="statement">
              <h3>Our Vision</h3>
              <p>{about.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>


      <section className="section">
        <div className="container">
          <p className="kicker"></p>
          <h2 className="display-md">Core values.</h2>
          <div className="grid grid-3">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 80}>
                <div className="value">
                  <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <p className="kicker"></p>
          <h2 className="display-md">Why choose us.</h2>
          <div className="grid grid-3">
            {about.whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 80}>
                <div className="value ">
                  <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
