"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, MapPin, Home as HomeIcon, Users } from "lucide-react";
import { cn } from "@/utils/utils";

const LOCATIONS = [
  "All Locations",
  "North Goa",
  "South Goa",
  "Candolim",
  "Anjuna",
  "Assagao",
  "Calangute",
  "Vagator",
  "Morjim",
];

const PROPERTY_TYPES = [
  "All Homes",
  "Villa",
  "Apartment",
  "Estate",
];

const GUEST_OPTIONS = [
  "Add guests",
  "1-2 Guests",
  "3-5 Guests",
  "6+ Guests",
];

export default function HeroSearchBar() {
  const router = useRouter();

  const [location, setLocation] = useState("All Locations");
  const [propertyType, setPropertyType] = useState("All Homes");
  const [guests, setGuests] = useState("Add guests");

  const [openDropdown, setOpenDropdown] = useState<"location" | "type" | "guests" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location !== "All Locations") params.set("locs", location);
    if (propertyType !== "All Homes") params.set("type", propertyType);
    if (guests !== "Add guests") params.set("guests", guests);

    const queryString = params.toString();
    router.push(`/stays${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative z-30 -mt-7 sm:-mt-10 md:-mt-12 mb-8 sm:mb-14 w-[92%] sm:w-[88%] md:w-[80%] lg:w-[72%] max-w-5xl mx-auto"
    >
      {/* Single Horizontal Bar Across ALL Screen Sizes */}
      <div className="bg-white rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.10)] border border-neutral-200/80 p-1.5 sm:p-2.5 md:p-3 px-3 sm:px-6 md:px-8 lg:px-10 flex flex-row items-center justify-between gap-1 sm:gap-2 md:gap-4 transition-all duration-300">
        
        {/* Location Field */}
        <div className="relative flex-1 min-w-0 group">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
            className="w-full text-left flex flex-col justify-center py-1 px-1.5 sm:px-2.5 rounded-full hover:bg-neutral-50 transition-colors"
          >
            <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
              Location
            </span>
            <span className="text-[10.5px] sm:text-xs md:text-sm font-semibold text-neutral-800 flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
              <span className="truncate">{location === "All Locations" ? "Where to?" : location}</span>
              <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 transition-transform duration-200 shrink-0", openDropdown === "location" && "rotate-180")} />
            </span>
          </button>

          {/* Dropdown Menu */}
          {openDropdown === "location" && (
            <div className="absolute top-full left-0 w-48 sm:w-56 mt-2 rounded-2xl bg-white border border-neutral-100 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setLocation(loc);
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2",
                    location === loc ? "bg-amber-50 text-[#9E3B09] font-semibold" : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#9E3B09]/70 shrink-0" />
                  <span className="truncate">{loc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider 1 */}
        <div className="w-px h-6 sm:h-7 md:h-8 bg-neutral-200/80 shrink-0 mx-0.5 sm:mx-1" />

        {/* Property Type Field */}
        <div className="relative flex-1 min-w-0 group">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
            className="w-full text-left flex flex-col justify-center py-1 px-1.5 sm:px-2.5 rounded-full hover:bg-neutral-50 transition-colors"
          >
            <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
              Property Type
            </span>
            <span className="text-[10.5px] sm:text-xs md:text-sm font-semibold text-neutral-800 flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
              <span className="truncate">{propertyType}</span>
              <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 transition-transform duration-200 shrink-0", openDropdown === "type" && "rotate-180")} />
            </span>
          </button>

          {/* Dropdown Menu */}
          {openDropdown === "type" && (
            <div className="absolute top-full left-0 w-44 sm:w-52 mt-2 rounded-2xl bg-white border border-neutral-100 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setPropertyType(type);
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2",
                    propertyType === type ? "bg-amber-50 text-[#9E3B09] font-semibold" : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  <HomeIcon className="w-3.5 h-3.5 text-[#9E3B09]/70 shrink-0" />
                  <span className="truncate">{type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider 2 */}
        <div className="w-px h-6 sm:h-7 md:h-8 bg-neutral-200/80 shrink-0 mx-0.5 sm:mx-1" />

        {/* Guests Field */}
        <div className="relative flex-1 min-w-0 group">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "guests" ? null : "guests")}
            className="w-full text-left flex flex-col justify-center py-1 px-1.5 sm:px-2.5 rounded-full hover:bg-neutral-50 transition-colors"
          >
            <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
              Guests
            </span>
            <span className="text-[10.5px] sm:text-xs md:text-sm font-semibold text-neutral-800 flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
              <span className="truncate">{guests}</span>
              <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 transition-transform duration-200 shrink-0", openDropdown === "guests" && "rotate-180")} />
            </span>
          </button>

          {/* Dropdown Menu */}
          {openDropdown === "guests" && (
            <div className="absolute top-full right-0 w-44 sm:w-52 mt-2 rounded-2xl bg-white border border-neutral-100 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {GUEST_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setGuests(opt);
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2",
                    guests === opt ? "bg-amber-50 text-[#9E3B09] font-semibold" : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  <Users className="w-3.5 h-3.5 text-[#9E3B09]/70 shrink-0" />
                  <span className="truncate">{opt}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Action Button */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search Stays"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#9E3B09] hover:bg-[#802F07] active:scale-95 transition-all duration-200 flex items-center justify-center text-white shadow-sm cursor-pointer shrink-0 ml-1 sm:ml-2 group"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}
