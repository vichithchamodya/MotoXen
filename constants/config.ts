export const appconfig = {
  name: "MOTOXEN",
  tagline: "Drive Your Dream",
  description: "Sri Lanka's premium vehicle marketplace",
  url: "https://motoxen.lk",
  contactEmail: "hello@motoxen.lk",
  contactPhone: "+94 11 234 5678",
  stats: [
    { value: "12", label: "Vehicles Listed", suffix: "K+" },
    { value: "500", label: "Verified Dealers", suffix: "+" },
    { value: "50", label: "Premium Brands", suffix: "+" },
    { value: "4.9", label: "Average Rating", suffix: "★" },
  ],
  priceRange: {
    min: 0,
    max: 500000,
    step: 5000,
    default: [0, 300000] as [number, number],
  },
  yearRange: {
    min: 2000,
    max: 2025,
    default: [2015, 2025] as [number, number],
  },
} as const;
