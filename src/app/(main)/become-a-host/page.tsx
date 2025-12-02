"use client";

import { useState, FormEvent } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/ui/Reveal";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Counter from "@/components/ui/Counter";
import { motion } from "motion/react";
import AreaIcon from '@/components/icons/area';
import BedIcon from '@/components/icons/bed';
import BreakfastIcon from '@/components/icons/breakfast';
import PatioIcon from '@/components/icons/patio';
import TvIcon from '@/components/icons/tv';
import UsersIcon from '@/components/icons/users';
import YogaMatIcon from '@/components/icons/yoga';
// import CheckIcon from '@/components/icons/check';
import PremiumIcon from '@/components/icons/premium';

export default function BecomeHostPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    alert("Thank you for your interest! We'll get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("host-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Form */}
      <section
        id="host-form"
        className="pt-32 pb-12 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24 bg-gradient-to-br from-orange-50 to-pink-50"
      >
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Persuasive Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Partner with Pink Papaya
                </h1>
                <p className="mt-6 text-lg md:text-xl text-neutral-700 font-bricolage leading-relaxed">
                  Turn your property into an unforgettable experience. We handle
                  the details, you enjoy the rewards.
                </p>
                <p className="mt-4 text-base md:text-lg text-neutral-600 font-bricolage">
                  Join our exclusive network of handpicked homes and connect with
                  discerning travelers seeking authentic, curated stays.
                </p>

                <div className="mt-8 space-y-3">
                  <p className="text-neutral-700 font-bricolage">
                    Professional photography and listing optimization
                  </p>
                  <p className="text-neutral-700 font-bricolage">
                    Premium pricing and revenue optimization
                  </p>
                  <p className="text-neutral-700 font-bricolage">
                    24/7 guest support and property management
                  </p>
                </div>
              </motion.div>

              {/* Right: Lead Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Card className="p-8 md:p-10 bg-white shadow-2xl border-0 rounded-[20px]">
                  <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                    Get Started Today
                  </h2>
                  <p className="text-neutral-600 font-bricolage mb-6">
                    Fill in your details and we will reach out within 24 hours
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-2 font-bricolage"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="rounded-[10px] h-12"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-700 mb-2 font-bricolage"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="rounded-[10px] h-12"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutral-700 mb-2 font-bricolage"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="rounded-[10px] h-12"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-neutral-700 mb-2 font-bricolage"
                      >
                        Property Location
                      </label>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Goa, Mumbai, Bangalore..."
                        className="rounded-[10px] h-12"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="propertyType"
                        className="block text-sm font-medium text-neutral-700 mb-2 font-bricolage"
                      >
                        Property Type
                      </label>
                      <Select
                        id="propertyType"
                        name="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="rounded-[10px] h-12"
                      >
                        <option value="">Select property type</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="cottage">Cottage</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="beachhouse">Beach House</option>
                        <option value="farmhouse">Farmhouse</option>
                        <option value="other">Other</option>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="outlineBlack"
                      className="mt-10 w-full h-12 text-base font-medium  text-black hover:bg-neutral-100"
                    >
                      Get Started
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 md:py-16">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white rounded-[15px] shadow-lg p-8 md:p-10 text-center border border-neutral-100">
                <div className="text-4xl md:text-5xl font-bold font-playfair text-neutral-900">
                  <Counter end={10000} duration={1800} decimals={0} suffix="+" />
                </div>
                <div className="mt-3 text-base md:text-lg text-neutral-600 font-bricolage">
                  Happy Guests
                </div>
              </div>

              <div className="bg-white rounded-[15px] shadow-lg p-8 md:p-10 text-center border border-neutral-100">
                <div className="text-4xl md:text-5xl font-bold font-playfair text-neutral-900">
                  <Counter end={4.8} duration={1400} decimals={1} />★
                </div>
                <div className="mt-3 text-base md:text-lg text-neutral-600 font-bricolage">
                  Star Ratings
                </div>
              </div>

              <div className="bg-white rounded-[15px] shadow-lg p-8 md:p-10 text-center border border-neutral-100">
                <div className="text-4xl md:text-5xl font-bold font-playfair text-neutral-900">
                  <Counter end={1} duration={1000} decimals={0} /> in 10
                </div>
                <div className="mt-3 text-base md:text-lg text-neutral-600 font-bricolage">
                  Homes Selected
                  <span className="block text-sm text-neutral-500 mt-1">
                    (Exclusive curation)
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why Host With Us */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <Container>
          <Reveal>
              <div className="text-center mb-12 md:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
                Why Host With Us
              </h2>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 font-bricolage max-w-2xl mx-auto">
                We do not just list properties. We create experiences that guests
                remember and return for.
              </p>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { title: 'Hassle-Free Management', Icon: UsersIcon },
                { title: 'Global Reach', Icon: AreaIcon },
                { title: 'Premium Pricing', Icon: PremiumIcon },
                { title: 'Professional Support', Icon: BedIcon },
                { title: 'Quality Guests', Icon: TvIcon },
                { title: 'Marketing Excellence', Icon: BreakfastIcon },
                { title: 'Transparent Reporting', Icon: PatioIcon },
                { title: 'Professional Photography', Icon: YogaMatIcon },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-[15px] border border-neutral-100 shadow-sm">
                  <item.Icon className="w-10 h-10 text-neutral-900" />
                  <p className="mt-3 font-playfair font-semibold text-sm md:text-base text-neutral-900">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 to-orange-50">
        <Container>
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
                What Our Hosts Say
              </h2>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 font-bricolage max-w-2xl mx-auto">
                Real experiences from property owners across the globe
              </p>
            </div>
          </Reveal>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6 pb-4"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[
                {
                  name: "Sarah Mitchell",
                  location: "California, US",
                  review:
                    "Pink Papaya transformed my beach house into a thriving business. The team handles everything professionally, and I love seeing happy guests enjoy my property.",
                  
                },
                {
                  name: "James Robertson",
                  location: "London, UK",
                  review:
                    "Best decision I made was partnering with Pink Papaya. Revenue is up 40% and I don't have to deal with any of the day-to-day hassles.",
                 
                },
                {
                  name: "Priya Sharma",
                  location: "Delhi, India",
                  review:
                    "The marketing and photography services alone were worth it. My property looks stunning online and bookings have been consistent.",
                  
                },
                {
                  name: "Arjun Patel",
                  location: "Mumbai, India",
                  review:
                    "Professional, transparent, and results-driven. Pink Papaya treats my property like their own and the guest feedback has been phenomenal.",
                  
                },
                {
                  name: "Kavya Reddy",
                  location: "Bangalore, India",
                  review:
                    "I was hesitant to list my home, but Pink Papaya's selective process ensures only quality guests. It's been a wonderful passive income stream.",
                  
                },
                // Duplicate for infinite scroll effect
                {
                  name: "Sarah Mitchell",
                  location: "California, US",
                  review:
                    "Pink Papaya transformed my beach house into a thriving business. The team handles everything professionally, and I love seeing happy guests enjoy my property.",
                  
                },
                {
                  name: "James Robertson",
                  location: "London, UK",
                  review:
                    "Best decision I made was partnering with Pink Papaya. Revenue is up 40% and I don't have to deal with any of the day-to-day hassles.",
                  
                },
                {
                  name: "Priya Sharma",
                  location: "Delhi, India",
                  review:
                    "The marketing and photography services alone were worth it. My property looks stunning online and bookings have been consistent.",
                  
                },
                {
                  name: "Arjun Patel",
                  location: "Mumbai, India",
                  review:
                    "Professional, transparent, and results-driven. Pink Papaya treats my property like their own and the guest feedback has been phenomenal.",
                  rating: 5,
                },
                {
                  name: "Kavya Reddy",
                  location: "Bangalore, India",
                  review:
                    "I was hesitant to list my home, but Pink Papaya's selective process ensures only quality guests. It's been a wonderful passive income stream.",
                  
                },
              ].map((review, idx) => (
                <Card
                  key={idx}
                  className="flex-shrink-0 w-[300px] sm:w-[350px] p-6 bg-white rounded-[15px] border-0 shadow-md"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-orange-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-700 font-bricolage leading-relaxed mb-4 text-sm sm:text-base">
                    <q>{review.review}</q>
                  </p>
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="font-playfair font-semibold text-neutral-900 text-sm sm:text-base">
                      {review.name}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500 font-bricolage">
                      {review.location}
                    </p>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <Reveal>
        <FAQ
          title="Frequently Asked Questions"
          faqs={[
            {
              question: "What types of properties do you accept?",
              answer:
                "We curate unique, high-quality properties including villas, apartments, cottages, beach houses, and farmhouses. Each property undergoes a thorough vetting process to ensure it meets our standards for design, location, and guest experience.",
            },
            {
              question: "How much commission do you charge?",
              answer:
                "Our commission structure is competitive and transparent, typically ranging from 15-25% depending on the services you require. This includes marketing, guest support, property management, and maintenance coordination. We'll provide a detailed breakdown during our initial consultation.",
            },
            {
              question: "Do I need to provide furnishings and amenities?",
              answer:
                "Yes, properties should be fully furnished and equipped with essential amenities. However, we provide guidance on optimal furnishing and can recommend upgrades that enhance guest experience and increase booking rates. We also offer styling services to make your property photo-ready.",
            },
            {
              question: "How quickly can I start earning?",
              answer:
                "Once your property is approved and listed (typically 2-3 weeks from initial contact), you can start receiving bookings immediately. Most properties see their first booking within the first month, with revenue ramping up as we optimize your listing and build reviews.",
            },
          ]}
        />
      </Reveal>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Ready to Transform Your Property?
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Join our exclusive network of hosts and start earning from your
                property today.
              </p>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-neutral-900 text-white hover:bg-neutral-800 text-base md:text-lg px-8 md:px-12 h-12 md:h-14 font-semibold shadow-lg"
              >
                Contact Us
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
