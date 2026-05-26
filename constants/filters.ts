import { FilterOption, SortOption } from "@/types";

export const MAKES: FilterOption[] = [
  { value: "BMW", label: "BMW" },
  { value: "Tesla", label: "Tesla" },
  { value: "Porsche", label: "Porsche" },
  { value: "Land Rover", label: "Land Rover" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "Audi", label: "Audi" },
  { value: "Toyota", label: "Toyota" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Ford", label: "Ford" },
  { value: "Honda", label: "Honda" },
  { value: "Volkswagen", label: "Volkswagen" },
  { value: "Nissan", label: "Nissan" },
];

export const BODY_TYPES: FilterOption[] = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "coupe", label: "Coupe" },
  { value: "hatchback", label: "Hatchback" },
  { value: "pickup", label: "Pickup Truck" },
  { value: "convertible", label: "Convertible" },
  { value: "van", label: "Van" },
];

export const FUEL_TYPES: FilterOption[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];

export const TRANSMISSION_TYPES: FilterOption[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

export const CONDITION_TYPES: FilterOption[] = [
  { value: "new", label: "Brand New" },
  { value: "used", label: "Used" },
  { value: "certified", label: "Certified Pre-Owned" },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "mileage_asc", label: "Lowest Mileage" },
  { value: "popular", label: "Most Popular" },
];

export const LOCATIONS: FilterOption[] = [
  { value: "Colombo", label: "Colombo" },
  { value: "Kandy", label: "Kandy" },
  { value: "Galle", label: "Galle" },
  { value: "Negombo", label: "Negombo" },
  { value: "Gampaha", label: "Gampaha" },
  { value: "Matara", label: "Matara" },
  { value: "Jaffna", label: "Jaffna" },
];

export const DEFAULT_FILTERS = {
  make: [] as string[],
  bodyType: [] as string[],
  fuel: [] as string[],
  transmission: [] as string[],
  condition: [] as string[],
  priceMin: 0,
  priceMax: 500000,
  yearMin: 2000,
  yearMax: 2025,
  location: "",
  sortBy: "newest" as const,
};
