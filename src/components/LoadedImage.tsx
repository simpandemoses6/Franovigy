import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string; // tiny blurred copy shown while the real picture downloads
    ratio?: string; // shape reserved before anything has loaded, e.g. "4 / 5"
    priority?: boolean; // load straight away (use for the hero picture)
    onFail?: () => void;
    fallback?: ReactNode; // shown if the picture cannot be loaded
}

// Blur-up loading: a tiny blurred version appears almost instantly and holds the picture's shape,
// then the real picture fades in on top of it, going from blurred to sharp.
export default function LoadedImage({ src, alt, className = "", placeholder, ratio, priority = false, onFail, fallback = null }: Props) {
    const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
    const [phReady, setPhReady] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = ref.current;
        setState(img && img.complete && img.naturalWidth > 0 ? "loaded" : "loading");
    }, [src]);

    if (state === "error") return <>{fallback}</>;

    const reserve = state === "loading" && !phReady && ratio ? { aspectRatio: ratio } : undefined;

    return (
        <div className={`limg ${placeholder ? "has-ph" : ""} ${state} ${className}`} style={reserve}>
            {placeholder && <img className="limg-ph" src={placeholder} alt="" aria-hidden="true" onLoad={() => setPhReady(true)} />}
            <img
                ref={ref}
                className="limg-main"
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                onLoad={() => setState("loaded")}
                onError={() => {
                    setState("error");
                    onFail?.();
                }}
            />
        </div>
    );
}