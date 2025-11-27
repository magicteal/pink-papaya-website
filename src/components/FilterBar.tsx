"use client";

import { cn } from "@/utils/utils";
import { Button } from "./ui/button";

type FilterBarProps = {
  categories: { id: string; name: string }[];
  locations: { id: string; name: string }[];
  selectedCategory: string;
  selectedLocation: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
  className?: string;
};

export default function FilterBar({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
  onClearFilters,
  className,
}: FilterBarProps) {
  const hasActiveFilters = selectedCategory !== "" || selectedLocation !== "";

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Filter (heading uses Playfair) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-playfair font-semibold text-neutral-900">Filter by Category</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Clear All
            </Button>
          )}
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-neutral-200 rounded-[10px] font-playfair text-neutral-900"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter (heading uses Playfair) */}
      <div className="space-y-3">
        <h3 className="text-lg font-playfair font-semibold text-neutral-900">Filter by Location</h3>

        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-neutral-200 rounded-[10px] font-playfair text-neutral-900"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-neutral-200">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="font-medium">Active filters:</span>
            {selectedCategory && (
              <span className="px-3 py-1 bg-neutral-100 rounded-full">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
            {selectedLocation && (
              <span className="px-3 py-1 bg-neutral-100 rounded-full">
                {locations.find((l) => l.id === selectedLocation)?.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
