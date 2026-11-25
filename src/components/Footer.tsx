import { Link } from "react-router-dom";
import { company, divisions } from "../data/siteData";
import { contactInfo, socials } from "../data/contactData";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <Logo size="lg" />
            {!company.logoHasName && <h2 className="footer-brand">{company.name}</h2>}
            <p className="footer-tag">{company.fullName}</p>
            <p className="footer-motto">{company.tagline.join(" ")}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Company</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div>
              <h4>Services</h4>
              {divisions.map((d) => (
                <Link key={d.slug} to={d.path}>{d.navLabel}</Link>
              ))}
            </div>
            <div>
              <h4>Contact</h4>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>{contactInfo.phone}</a>
              <span>{contactInfo.address}</span>
            </div>
            <div>
              <h4>Connect</h4>
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {company.year} {company.fullName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
