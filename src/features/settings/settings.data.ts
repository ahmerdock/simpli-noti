import { GithubIcon, LinkedinIcon, GlobeIcon } from "@/assets/icons";

export const CONTACT_LINKS = [
  {
    label: "GitHub",
    description: "@ahmersdev",
    icon: GithubIcon,
    url: "https://github.com/ahmersdev",
  },
  {
    label: "LinkedIn",
    description: "Connect with me",
    icon: LinkedinIcon,
    url: "https://linkedin.com/in/ahmersdev",
  },
  {
    label: "Portfolio",
    description: "ahmersdev.com",
    icon: GlobeIcon,
    url: "https://ahmersdev.com",
  },
] as const;
