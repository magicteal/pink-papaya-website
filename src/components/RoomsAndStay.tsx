"use client";

import * as React from "react";
import Container from "@/components/Container";
import HeaderContent from "@/components/headerContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Removed individual stay attribute icons - not needed anymore
import { useRouter } from "next/navigation";
import { stays as staysData, stayCategories } from "@/data/stays";

export default function RoomsAndStay() {
  const router = useRouter();
  // show four categories only
  const categories = stayCategories.slice(0, 4);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // For display, find a representative stay for the selected category
  function representativeFor(catId: string) {
    return staysData.find((s) => s.category === catId) ?? staysData[0];
  }

  const active = representativeFor(categories[activeIndex].id);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <HeaderContent
          align="left"
          title="Curated collections"
          description={"Thoughtfully chosen stays, for every kind of getaway"}
          showCta={false}
        />

        {/* Content grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left list */}
          <div className="md:col-span-6">
            <ul className="divide-y divide-neutral-200">
              {categories.map((c, idx) => {
                const selected = idx === activeIndex;
                const rep = representativeFor(c.id);
                return (
                  <li key={c.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <button
                        className={
                          // larger, prominent style for the selected category
                          "text-left rounded-[10px] " +
                          (selected
                            ? "text-3xl md:text-4xl font-playfair text-neutral-900"
                            : "text-base font-medium text-[#99C0C2] hover:underline")
                        }
                        onClick={() => setActiveIndex(idx)}
                      >
                        {c.name}
                      </button>

                      {selected ? (
                        <div className="ml-4">
                          <Button
                            variant="outlineBlack"
                            onClick={() => router.push(`/stays?category=${c.id}`)}
                          >
                            Explore
                          </Button>
                        </div>
                      ) : null}
                    </div>

                    {selected ? (
                      <div className="mt-3">
                        <div className="text-sm text-neutral-700">{c.description}</div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right image */}
          <div className="md:col-span-6">
            <Card className="!rounded-none !border-0 overflow-hidden h-80 md:h-[420px] bg-neutral-200">
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${active.imageUrl})` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-white font-playfair text-lg md:text-xl leading-tight">
                    {active.description}
                  </div>
                </div>
              </div>
            </Card> 
          </div>
        </div>
      </Container>
    </section>
  );
}
