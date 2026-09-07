import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { SocialLink } from "@/data/resume";

const icons = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  tiktok: FaTiktok,
  x: FaXTwitter,
  facebook: FaFacebookF,
};

export function SocialIcons({
  links,
  variant = "dark",
}: {
  links: SocialLink[];
  variant?: "dark" | "light";
}) {
  const styles =
    variant === "light"
      ? "border-white/20 bg-white/10 text-white hover:bg-white hover:text-navy"
      : "border-line bg-white text-navy hover:border-brand hover:bg-brand hover:text-white";

  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => {
        const Icon = icons[link.icon];
        return (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-colors ${styles}`}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
