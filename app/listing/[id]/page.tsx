import { notFound } from "next/navigation";
import { getVehicleById } from "@/data/vehicles";
import { ListingDetailClient } from "@/components/listing/ListingDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) return {};
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - MOTOXEN`,
    description: vehicle.description,
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) notFound();

  return <ListingDetailClient vehicle={vehicle} />;
}
