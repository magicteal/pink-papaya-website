"use client";

import { useState, useMemo } from "react";
import StayCard from "./StayCard";
import FilterBar from "./FilterBar";
import { stayCategories } from "@/data/stays";

type Stay = {
  id: string;
  title: string;
  imageUrl: string;
  area: string;
  bed: string;
  guests: string;
  category?: string;
  description?: string;
  pricePerNight?: string;
  images?: string[];
  amenities?: string[];
  location?: string;
};

type Location = {
  id: string;
  name: string;
  stayIds: string[];
};

type StaysGridWithFiltersProps = {
  stays: Stay[];
  locations: Location[];
};

export default function StaysGridWithFilters({ stays, locations }: StaysGridWithFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredStays = useMemo(() => {
    let filtered = [...stays];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((stay) => stay.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation) {
      const locationData = locations.find((loc) => loc.id === selectedLocation);
      if (locationData) {
        filtered = filtered.filter((stay) => locationData.stayIds.includes(stay.id));
      }
    }

    return filtered;
  }, [stays, locations, selectedCategory, selectedLocation]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <div className="sticky top-24">
          <FilterBar
            categories={stayCategories}
            locations={locations}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
            onClearFilters={handleClearFilters}
          />
        </div>
      </aside>

      <div className="md:col-span-3">
        {/* Results summary */}
        <div className="text-sm text-neutral-600 mb-4">
          Showing {filteredStays.length} {filteredStays.length === 1 ? "stay" : "stays"}
        </div>

        {/* Stays grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
          {filteredStays.length > 0 ? (
            filteredStays.map((s) => (
              <StayCard
                key={s.id}
                title={s.title}
                imageUrl={s.imageUrl}
                images={s.images}
                area={s.area}
                bed={s.bed}
                guests={s.guests}
                href={`/stays/${s.id}`}
                pricePerNight={s.pricePerNight}
                location={s.location}
                amenities={s.amenities}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-600">No stays match your current filters.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-[#3C8A84] hover:underline font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
