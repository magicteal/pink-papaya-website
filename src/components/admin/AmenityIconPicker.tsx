"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  AMENITY_ICONS,
  AmenityIcon,
  AmenityCategory,
  AmenityIconItem,
} from "@/lib/amenityIcons";
import { Search, Upload, X, Check, Image as ImageIcon, Sparkles } from "lucide-react";

interface AmenityIconPickerProps {
  selectedIcon?: string;
  onSelect: (iconId: string) => void;
  amenityName?: string;
}

const CATEGORIES: ("All" | AmenityCategory | "Custom")[] = [
  "All",
  "Essentials",
  "Climate & Comfort",
  "Food & Dining",
  "Outdoors & Views",
  "Wellness & Leisure",
  "Services & Safety",
  "Custom",
];

export default function AmenityIconPicker({
  selectedIcon,
  onSelect,
  amenityName = "",
}: AmenityIconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | AmenityCategory | "Custom">("All");
  const [uploading, setUploading] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter icons based on search query and category
  const filteredIcons = useMemo(() => {
    return AMENITY_ICONS.filter((item: AmenityIconItem) => {
      const matchesCategory = category === "All" || item.category === category;
      if (!matchesCategory) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase().trim();
      const inName = item.name.toLowerCase().includes(q);
      const inId = item.id.toLowerCase().includes(q);
      const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
      return inName || inId || inTags;
    });
  }, [search, category]);

  // Handle custom file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      if (data?.url) {
        onSelect(data.url);
        setIsOpen(false);
      }
    } catch (err: any) {
      alert("Failed to upload icon: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      onSelect(customUrlInput.trim());
      setCustomUrlInput("");
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2.5 px-3 py-2 border border-neutral-300 rounded-lg bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all text-sm font-bricolage text-neutral-800 shrink-0 cursor-pointer shadow-2xs"
        title="Choose or change amenity icon"
      >
        <div className="w-6 h-6 rounded-md bg-[#F7F2EA] flex items-center justify-center text-[#C07A5A] shrink-0 border border-[#E7E2D6]">
          <AmenityIcon icon={selectedIcon} className="w-3.5 h-3.5" fallback="Check" />
        </div>
        <span className="text-xs font-medium text-neutral-700 hidden sm:inline">
          {selectedIcon ? "Change Icon" : "Select Icon"}
        </span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F7F2EA] flex items-center justify-center text-[#16323C]">
                  <Sparkles className="w-4 h-4 text-[#C07A5A]" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg text-neutral-900 font-medium">
                    Choose Amenity Icon
                  </h3>
                  <p className="text-xs text-neutral-500 font-bricolage">
                    {amenityName ? `Select icon for "${amenityName}"` : "Pick from library or upload a custom SVG"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search 40+ hospitality icons (e.g., pool, wifi, ac, bed, kitchen, pet)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-hidden focus:border-[#16323C] focus:ring-1 focus:ring-[#16323C] font-bricolage"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bricolage">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      category === cat
                        ? "bg-[#16323C] text-white font-medium shadow-xs"
                        : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body: Icons Grid or Custom Upload */}
            <div className="flex-1 overflow-y-auto p-5">
              {category === "Custom" ? (
                /* Custom Upload Tab */
                <div className="space-y-6 py-2">
                  <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center bg-neutral-50/70 hover:bg-neutral-50 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".svg,.png,.webp,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="custom-icon-file"
                    />
                    <label
                      htmlFor="custom-icon-file"
                      className="flex flex-col items-center justify-center cursor-pointer space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#16323C]/5 flex items-center justify-center text-[#16323C]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bricolage text-sm font-semibold text-[#16323C] underline">
                          {uploading ? "Uploading icon..." : "Upload custom icon"}
                        </span>
                        <p className="text-xs text-neutral-400 font-bricolage mt-1">
                          SVG, PNG or WebP (recommended 48x48px or SVG)
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-neutral-200" />
                    <span className="shrink mx-4 text-neutral-400 text-xs uppercase font-bricolage">Or paste image / SVG URL</span>
                    <div className="flex-grow border-t border-neutral-200" />
                  </div>

                  <form onSubmit={handleCustomUrlSubmit} className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/icon.svg"
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-sm border border-neutral-200 rounded-xl font-bricolage focus:outline-hidden focus:border-[#16323C]"
                    />
                    <button
                      type="submit"
                      disabled={!customUrlInput.trim()}
                      className="px-4 py-2 bg-[#16323C] text-white rounded-xl text-xs font-bricolage font-medium hover:bg-[#1f4350] disabled:opacity-50 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                </div>
              ) : (
                /* Icon Grid */
                <div>
                  {filteredIcons.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 font-bricolage">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">No icons matching &ldquo;{search}&rdquo;</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setCategory("Custom");
                        }}
                        className="mt-3 text-xs text-[#16323C] underline font-medium"
                      >
                        Upload a custom icon instead
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {filteredIcons.map((item) => {
                        const isSelected = selectedIcon === item.id;
                        const ItemComponent = item.component;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              onSelect(item.id);
                              setIsOpen(false);
                            }}
                            className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer group ${
                              isSelected
                                ? "border-[#16323C] bg-[#16323C]/5 text-[#16323C] ring-1 ring-[#16323C]"
                                : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 text-neutral-700"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#16323C] text-white"
                                  : "bg-[#F7F2EA] text-[#C07A5A] group-hover:bg-[#16323C] group-hover:text-white"
                              }`}
                            >
                              <ItemComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bricolage font-medium truncate flex-1">
                              {item.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#16323C] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2 text-xs font-bricolage text-neutral-500">
                <span>Selected:</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-800 font-medium">
                  <AmenityIcon icon={selectedIcon} className="w-3.5 h-3.5 text-[#C07A5A]" fallback="Check" />
                  {selectedIcon || "Default (Check)"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedIcon && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelect("");
                      setIsOpen(false);
                    }}
                    className="text-xs font-bricolage text-neutral-500 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Clear Icon
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 text-xs font-bricolage font-medium bg-[#16323C] text-white rounded-lg hover:bg-[#1f4350] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
