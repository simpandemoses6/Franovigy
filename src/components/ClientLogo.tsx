import { useState } from "react";
import type { Client } from "../data/clientsData";

// One client card: the logo (grey until hovered), with the name underneath.
// If the logo file is missing, the client's name is shown instead of a broken image.
export default function ClientLogo({ client }: { client: Client }) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const body = (
        <>
      <span className="client-logo">
        {failed ? (
            <span className="client-text">{client.name}</span>
        ) : (
            <img
                className={loaded ? "on" : ""}
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
            />
        )}
      </span>
            {!failed && <span className="client-name">{client.name}</span>}
        </>
    );

    return client.url ? (
        <a className={`client${client.dark ? " dark" : ""}`} href={client.url} target="_blank" rel="noreferrer" aria-label={`${client.name} (opens their website)`}>
            {body}
        </a>
    ) : (
        <div className={`client${client.dark ? " dark" : ""}`}>{body}</div>
    );
}