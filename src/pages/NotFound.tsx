import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function NotFound() {
  return (
    <PageHero watermark lines={["PAGE NOT FOUND."]} text="The page you are looking for does not exist or has moved.">
      <Link to="/" className="btn btn-red">Back to Home →</Link>
    </PageHero>
  );
}
