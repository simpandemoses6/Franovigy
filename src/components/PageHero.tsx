import type { ReactNode } from "react";
import Headline from "./Headline";
import { LogoWatermark } from "./Logo";

interface Props {
  lines: string[];
  text?: string;
  kicker?: string;
  watermark?: boolean;
  children?: ReactNode;
}

export default function PageHero({ lines, text, kicker, watermark, children }: Props) {
  return (
    <section className="page-hero">
      {watermark && <LogoWatermark />}
      <div className="container">
        {kicker && <p className="kicker">{kicker}</p>}
        <Headline lines={lines} />
        <div className="red-rule" />
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}
