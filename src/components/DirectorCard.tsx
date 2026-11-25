import type { Director } from "../data/siteData";

export default function DirectorCard({ director }: { director: Director }) {
  const initials = director.fullName.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <a
      className={`director director-${director.variant}`}
      href={director.hiHelloUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${director.fullName}'s digital contact card`}
    >
      <div className="director-photo">
        {director.photo ? <img src={director.photo} alt={director.fullName} /> : <span className="director-initials">{initials}</span>}
        <div className="director-line" />
      </div>
      <div className="director-info">
        <p className="director-first">{director.firstName}</p>
        <h3>{director.fullName}</h3>
        <p className="director-role">{director.role}</p>
        <p className="director-bio">{director.bio}</p>
        <span className="director-link">View digital contact →</span>
      </div>
    </a>
  );
}
