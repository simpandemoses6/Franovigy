import { motion } from "framer-motion";

interface Props {
  lines: string[];
  className?: string;
}

// Each line slides up from behind a mask
export default function Headline({ lines, className = "display" }: Props) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span className="hl-line" key={line}>
          <motion.span
            className="hl-inner"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
