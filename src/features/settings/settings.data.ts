import { GithubIcon, LinkedinIcon, GlobeIcon } from "@/assets/icons";

export const CONTACT_LINKS = [
  {
    label: "GitHub",
    sub: "@ahmersdev",
    icon: GithubIcon,
    url: "https://github.com/ahmersdev",
  },
  {
    label: "LinkedIn",
    sub: "Connect with me",
    icon: LinkedinIcon,
    url: "https://linkedin.com/in/ahmersdev",
  },
  {
    label: "Portfolio",
    sub: "ahmersdev.com",
    icon: GlobeIcon,
    url: "https://ahmersdev.com",
  },
] as const;
