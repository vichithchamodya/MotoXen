export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type TransmissionType = "automatic" | "manual";
export type BodyType =
  | "sedan"
  | "suv"
  | "coupe"
  | "hatchback"
  | "truck"
  | "convertible"
  | "van"
  | "pickup";
export type ConditionType = "new" | "used" | "certified";
export type VehicleBadge = "hot" | "new" | "reduced" | "certified" | "electric";
export type SortOption =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "mileage_asc"
  | "popular";

export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  fuel: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  condition: ConditionType;
  color: string;
  location: string;
  images: string[];
  features: string[];
  description: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  sellerVerified: boolean;
  sellerResponseTime: string;
  sellerListings: number;
  postedAt: string;
  views: number;
  isFeatured: boolean;
  badge?: VehicleBadge;
  horsepower?: number;
  engine?: string;
  doors?: number;
  seats?: number;
  driveType?: string;
}

export interface Category {
  id: string;
  label: string;
  image: string;
  count: number;
  bodyType: BodyType | "all";
}

export interface FilterState {
  make: string[];
  bodyType: string[];
  fuel: string[];
  transmission: string[];
  condition: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  location: string;
  sortBy: SortOption;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  vehicle: string;
  type: "buyer" | "seller";
  location: string;
  date: string;
}

export interface AppStat {
  value: string;
  label: string;
  suffix: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
