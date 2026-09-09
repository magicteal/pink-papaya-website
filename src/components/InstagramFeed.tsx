"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { PiInstagramLogo, PiPlayCircle, PiImagesLight } from "react-icons/pi";
import {
  DEFAULT_INSTAGRAM_POSTS,
  type InstagramItem,
  type InstagramProfile,
} from "@/lib/instagram";

const PROFILE_URL = "https://www.instagram.com/pinkpapayastays/";
const HANDLE = "@pinkpapayastays";

function MediaBadge({ type }: { type: string }) {
  if (type === "VIDEO") {
    return (
      <PiPlayCircle
        className="text-white drop-shadow-md"
        size={20}
        aria-label="Video"
      />
    );
  }
  if (type === "CAROUSEL_ALBUM") {
    return (
      <PiImagesLight
        className="text-white drop-shadow-md"
        size={20}
        aria-label="Album"
      />
    );
  }
  return null;
}

export default function InstagramFeed({ content }: { content?: any }) {
  const [items, setItems] = useState<InstagramItem[] | null>(null);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/instagram", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { items: [], profile: null }))
      .then((data) => {
        if (!active) return;
        setItems(
          Array.isArray(data?.items) && data.items.length > 0
            ? data.items
            : DEFAULT_INSTAGRAM_POSTS
        );
        setProfile(
          data?.profile ?? {
            username: "pinkpapayastays",
            followersCount: 10263,
            mediaCount: 150,
          }
        );
      })
      .catch(() => {
        if (active) {
          setItems(DEFAULT_INSTAGRAM_POSTS);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const isLoading = items === null;
  const displayItems =
    items && items.length > 0 ? items : DEFAULT_INSTAGRAM_POSTS;

  const tagline = content?.tagline || "FOLLOW ALONG";
  const handle = content?.handle || HANDLE;
  const profileUrl = content?.profileUrl || PROFILE_URL;

  return (
    <section className="relative z-20 w-full bg-[#FAF8F5] py-16 sm:py-20 md:py-28 font-bricolage">
      <div className="w-[90%] mx-auto max-w-[1552px]">
        {/* Editorial Centered Header */}
        <Reveal>
          <div className="mb-10 sm:mb-14 flex flex-col items-center text-center">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#A04415] font-bricolage mb-2 sm:mb-3">
              {tagline}
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <h2 className="font-playfair italic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-neutral-900 tracking-tight leading-[1.1] transition-colors group-hover:text-[#A04415]">
                {handle}
              </h2>
            </a>
            {profile && profile.followersCount > 0 && (
              <p className="mt-3 font-bricolage text-xs sm:text-sm text-neutral-500">
                <span className="font-semibold text-neutral-800">
                  {profile.followersCount.toLocaleString("en-IN")}
                </span>{" "}
                followers
              </p>
            )}
          </div>
        </Reveal>

        {/* 6-Column Editorial Grid: Sharp Straight Edges, Rich Visuals */}
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square animate-pulse bg-neutral-200/70"
                  />
                ))
              : displayItems.slice(0, 12).map((item) => (
                  <a
                    key={item.id}
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View post on Instagram"
                    className="group relative block aspect-square overflow-hidden bg-neutral-200 shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={
                        item.caption
                          ? item.caption.slice(0, 80)
                          : "Instagram post"
                      }
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = "true";
                          const idx = displayItems.findIndex(
                            (it) => it.id === item.id
                          );
                          const fallback =
                            DEFAULT_INSTAGRAM_POSTS[
                              idx >= 0
                                ? idx % DEFAULT_INSTAGRAM_POSTS.length
                                : 0
                            ]?.image || DEFAULT_INSTAGRAM_POSTS[0].image;
                          target.src = fallback;
                        }
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Media Type Indicator (Video / Album) */}
                    <span className="absolute right-2.5 top-2.5 z-10">
                      <MediaBadge type={item.mediaType} />
                    </span>

                    {/* Subtle Dark Overlay + Logo on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                      <PiInstagramLogo
                        className="text-white opacity-0 transition-all duration-300 scale-90 group-hover:scale-100 group-hover:opacity-100"
                        size={30}
                      />
                    </div>
                  </a>
                ))}
          </div>
        </Reveal>

        {/* Editorial Follow Button */}
        <Reveal>
          <div className="mt-10 sm:mt-14 flex justify-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-neutral-900 px-7 py-3 text-xs sm:text-sm font-medium tracking-wide text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:shadow-sm"
            >
              <PiInstagramLogo size={18} />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
