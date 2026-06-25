import { CoffeeIcon, BurgerIcon, RocketIcon } from "@/assets/icons";

export const HELP_ME_PRODUCT_IDS = {
  COFFEE: "tip_coffee",
  LUNCH: "tip_lunch",
  FEATURE: "tip_feature",
} as const;

export const HELP_ME_PRODUCTS = [
  {
    id: HELP_ME_PRODUCT_IDS.COFFEE,
    label: "Buy me a coffee",
    description: "A small thank you ☕",
    icon: CoffeeIcon,
    successMessage: "Thank you for the coffee! ☕",
  },
  {
    id: HELP_ME_PRODUCT_IDS.LUNCH,
    label: "Buy me lunch",
    description: "A generous treat 🍔",
    icon: BurgerIcon,
    successMessage: "Thank you for lunch! 🍔",
  },
  {
    id: HELP_ME_PRODUCT_IDS.FEATURE,
    label: "Sponsor a feature",
    description: "Help build the next big thing 🚀",
    icon: RocketIcon,
    successMessage: "Thank you for sponsoring a feature! 🚀",
  },
] as const;
