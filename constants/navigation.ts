export const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "Home", icon: "Home" },
  { href: "/browse", label: "Browse", icon: "Search" },
  { href: "/sell", label: "Sell", icon: "PlusCircle" },
  { href: "/favorites", label: "Saved", icon: "Heart" },
  { href: "/profile", label: "Profile", icon: "User" },
] as const;

export const HOW_IT_WORKS_STEPS = {
  buying: [
    {
      number: "01",
      title: "Search & Filter",
      description:
        "Use our powerful search to find your perfect vehicle by make, model, price, and dozens more filters.",
    },
    {
      number: "02",
      title: "Connect with Sellers",
      description:
        "Message verified sellers directly. View full specs, photos, and seller ratings before committing.",
    },
    {
      number: "03",
      title: "Drive Away Happy",
      description:
        "Complete your purchase with confidence. Our buyer protection ensures a safe, transparent transaction.",
    },
  ],
  selling: [
    {
      number: "01",
      title: "List in Minutes",
      description:
        "Create your listing with photos, specs, and price. Our smart form makes it incredibly fast.",
    },
    {
      number: "02",
      title: "Reach Buyers",
      description:
        "Your listing reaches thousands of serious buyers instantly. Premium placement available.",
    },
    {
      number: "03",
      title: "Get Paid Safely",
      description:
        "Communicate, negotiate, and close deals securely through our platform.",
    },
  ],
};
