import { Link } from "react-router-dom";
import { LogoWatermark } from "./Logo";

interface Props {
  title?: string;
  label?: string;
  to?: string;
}

export default function CTA({ title = "LET'S BUILD SOMETHING TOGETHER.", label = "Contact Us", to = "/contact" }: Props) {
  return (
    <section className="cta">
      <LogoWatermark tone="white" />
      <div className="container">
        <p className="kicker">Get in touch</p>
        <h2 className="display-md">{title}</h2>
        <Link to={to} className="btn btn-red">{label} →</Link>
      </div>
    </section>
  );
}
