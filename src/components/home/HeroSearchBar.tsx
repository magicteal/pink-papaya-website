"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, MapPin, Home as HomeIcon, Users } from "lucide-react";
import { cn } from "@/utils/utils";

const LOCATIONS = [
  "All Locations",
  "North Goa",
  "South Goa",
  "Candolim",
  "Siolim",
  "Calangute",
  "Reis Magos",
  "Saipem",
  "Assagao",
  "Anjuna",
  "Vagator",
  "Morjim",
  "Benaulim",
];

const PROPERTY_TYPES = [
  { label: "All Homes", value: "all-homes" },
  { label: "Villas", value: "villas" },
  { label: "Apartments", value: "apartments" },
];

const GUEST_OPTIONS = [
  "Add guests",
  "1-2 Guests",
  "3-5 Guests",
  "6+ Guests",
];

function HeroSearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryLoc = searchParams?.get("locs") || "";
  const queryType = searchParams?.get("type") || "";
  const queryGuests = searchParams?.get("guests") || "";

  const [location, setLocation] = useState(queryLoc || "All Locations");
  const [propertyType, setPropertyType] = useState(() => {
    if (!queryType || queryType === "all-homes") return "All Homes";
    if (queryType.toLowerCase().startsWith("villa")) return "Villas";
    if (queryType.toLowerCase().startsWith("apartment")) return "Apartments";
    return queryType;
  });
  const [guests, setGuests] = useState(queryGuests || "Add guests");

  const [openDropdown, setOpenDropdown] = useState<"location" | "type" | "guests" | null>(null);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if URL query params change (e.g. user navigated or cleared filters)
  useEffect(() => {
    if (queryLoc) setLocation(queryLoc);
    else setLocation("All Locations");

    if (queryType) {
      if (queryType.toLowerCase().startsWith("villa")) setPropertyType("Villas");
      else if (queryType.toLowerCase().startsWith("apartment")) setPropertyType("Apartments");
      else setPropertyType(queryType);
    } else {
      setPropertyType("All Homes");
    }

    if (queryGuests) setGuests(queryGuests);
    else setGuests("Add guests");
  }, [queryLoc, queryType, queryGuests]);

  // Dynamically determine whether dropdown should open upward or downward
  useEffect(() => {
    if (openDropdown && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If space below is less than 280px and space above is greater, open upward
      if (spaceBelow < 280 && rect.top > 280) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [openDropdown]);

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
    setOpenDropdown(null);
    const params = new URLSearchParams();

    if (location && location !== "All Locations") {
      params.set("locs", location);
    }

    if (propertyType && propertyType !== "All Homes") {
      const typeSlug = propertyType.toLowerCase().startsWith("villa")
        ? "villas"
        : propertyType.toLowerCase().startsWith("apartment")
        ? "apartments"
        : propertyType.toLowerCase();
      params.set("type", typeSlug);
    }

    if (guests && guests !== "Add guests") {
      params.set("guests", guests);
    }

    const queryString = params.toString();
    router.push(`/stays${queryString ? `?${queryString}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className="relative z-30 -mt-7 sm:-mt-9 md:-mt-10 mb-6 sm:mb-8 md:mb-10 w-[92%] sm:w-[88%] md:w-[78%] lg:w-[68%] max-w-4xl 2xl:max-w-5xl mx-auto"
    >
      {/* Single Horizontal Bar Across ALL Screen Sizes */}
      <div className="bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-neutral-200/80 p-1 sm:p-2 md:p-2.5 px-3 sm:px-5 md:px-7 lg:px-8 flex flex-row items-center justify-between gap-1 sm:gap-2 md:gap-3 transition-all duration-300">

        {/* Location Field */}
        <div className="relative flex-1 min-w-0 group">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
            className="w-full text-left flex flex-col justify-center py-1 px-1.5 sm:px-2.5 rounded-full hover:bg-neutral-50 transition-colors font-bricolage cursor-pointer focus:outline-none"
          >
            <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-semibold text-[#C07A5A] uppercase tracking-[0.14em] block truncate">
              Location
            </span>
            <span className="text-[10.5px] sm:text-xs md:text-sm font-medium text-[#16323C] flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
              <span className="truncate">{location === "All Locations" ? "Where to?" : location}</span>
              <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 transition-transform duration-200 shrink-0", openDropdown === "location" && "rotate-180")} />
            </span>
          </button>

          {/* Location Dropdown Menu */}
          {openDropdown === "location" && (
            <div
              className={cn(
                "absolute left-0 w-48 sm:w-56 rounded-2xl bg-white border border-neutral-100 shadow-2xl py-2 z-50 animate-in fade-in duration-150 font-bricolage max-h-64 overflow-y-auto",
                openUpward
                  ? "bottom-full mb-3 slide-in-from-bottom-2 shadow-[0_-12px_36px_rgba(0,0,0,0.15)]"
                  : "top-full mt-2 slide-in-from-top-2"
              )}
            >
              {LOCATIONS.map((loc) => {
                const isSelected = location === loc || (loc === "All Locations" && (!location || location === "All Locations"));
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocation(loc);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer",
                      isSelected ? "bg-[#F7F2EA] text-[#C07A5A] font-semibold" : "text-[#16323C] hover:bg-neutral-50"
                    )}
                  >
                    <MapPin className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-[#C07A5A]" : "text-neutral-400")} />
                    <span className="truncate">{loc}</span>
                  </button>
                );
              })}
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
            className="w-full text-left flex flex-col justify-center py-1 px-1.5 sm:px-2.5 rounded-full hover:bg-neutral-50 transition-colors font-bricolage cursor-pointer focus:outline-none"
          >
            <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-semibold text-[#C07A5A] uppercase tracking-[0.14em] block truncate">
              Property Type
            </span>
            <span className="text-[10.5px] sm:text-xs md:text-sm font-medium text-[#16323C] flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
              <span className="truncate">{propertyType}</span>
              <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 transition-transform duration-200 shrink-0", openDropdown === "type" && "rotate-180")} />
            </span>
          </button>

          {/* Property Type Dropdown Menu */}
          {openDropdown === "type" && (
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 w-44 sm:w-52 rounded-2xl bg-white border border-neutral-100 shadow-2xl py-2 z-50 animate-in fade-in duration-150 font-bricolage",
                openUpward
                  ? "bottom-full mb-3 slide-in-from-bottom-2 shadow-[0_-12px_36px_rgba(0,0,0,0.15)]"
                  : "top-full mt-2 slide-in-from-top-2"
              )}
            >
              {PROPERTY_TYPES.map((pt) => {
                const isSelected = propertyType === pt.label || (pt.value === "all-homes" && (!propertyType || propertyType === "All Homes"));
                return (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => {
                      setPropertyType(pt.label);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer",
                      isSelected ? "bg-[#F7F2EA] text-[#C07A5A] font-semibold" : "text-[#16323C] hover:bg-neutral-50"
                    )}
                  >
                    <HomeIcon className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-[#C07A5A]" : "text-neutral-400")} />
                    <span className="truncate">{pt.label}</span>
                  </button>
                );
              })}
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
            className="w-full text-left flex flex-col justify-center py-1 px-1.5 sm:px-2.5 rounded-full hover:bg-neutral-50 transition-colors font-bricolage cursor-pointer focus:outline-none"
          >
            <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-semibold text-[#C07A5A] uppercase tracking-[0.14em] block truncate">
              Guests
            </span>
            <span className="text-[10.5px] sm:text-xs md:text-sm font-medium text-[#16323C] flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
              <span className="truncate">{guests}</span>
              <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 transition-transform duration-200 shrink-0", openDropdown === "guests" && "rotate-180")} />
            </span>
          </button>

          {/* Guests Dropdown Menu */}
          {openDropdown === "guests" && (
            <div
              className={cn(
                "absolute right-0 w-44 sm:w-52 rounded-2xl bg-white border border-neutral-100 shadow-2xl py-2 z-50 animate-in fade-in duration-150 font-bricolage",
                openUpward
                  ? "bottom-full mb-3 slide-in-from-bottom-2 shadow-[0_-12px_36px_rgba(0,0,0,0.15)]"
                  : "top-full mt-2 slide-in-from-top-2"
              )}
            >
              {GUEST_OPTIONS.map((opt) => {
                const isSelected = guests === opt || (opt === "Add guests" && (!guests || guests === "Add guests"));
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setGuests(opt);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer",
                      isSelected ? "bg-[#F7F2EA] text-[#C07A5A] font-semibold" : "text-[#16323C] hover:bg-neutral-50"
                    )}
                  >
                    <Users className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-[#C07A5A]" : "text-neutral-400")} />
                    <span className="truncate">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Action Button */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search Stays"
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-[#C07A5A] hover:bg-[#A04415] active:scale-95 transition-all duration-200 flex items-center justify-center text-white shadow-sm cursor-pointer shrink-0 ml-1 sm:ml-2 group"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}

export default function HeroSearchBar() {
  return (
    <Suspense fallback={
      <div className="relative z-30 -mt-7 sm:-mt-9 md:-mt-10 mb-6 sm:mb-8 md:mb-10 w-[92%] sm:w-[88%] md:w-[78%] lg:w-[68%] max-w-4xl 2xl:max-w-5xl mx-auto h-14 bg-white/80 rounded-full" />
    }>
      <HeroSearchBarContent />
    </Suspense>
  );
}
