export type FeedbackItem = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number; // 0-5
  text: string;
};

export const feedback: FeedbackItem[] = [
  {
    id: "f1",
    name: "KATY PERI",
    role: "Business Traveler",
    rating: 5,
    text:
      "Quiet, stylish, and comfortable. The garden patio was my favorite spot to unwind after meetings.",
  },
  {
    id: "f2",
    name: "MIA PATEL",
    role: "Anjuna, Goa",
    rating: 5,
    text:
      "We loved the design details and the breakfast. Felt like a boutique home away from home.",
  },
  {
    id: "f3",
    name: "DANIEL KIM",
    role: "Solo Retreat",
    rating: 5,
    text:
      "Meditation class, quiet surroundings, and the food was perfect. Staff was warm, helpful, and attentive.",
  },
  {
    id: "f4",
    name: "AVA MOORE",
    role: "Weekend Guest",
    rating: 5,
    text:
      "Beautiful spaces and such a calming vibe. The little touches made our stay feel special.",
  },
  {
    id: "f5",
    name: "SOFIA ROSSI",
    role: "Family Stay",
    rating: 5,
    text:
      "Rooms were spotless, beds super comfy. Kids loved the open spaces and the peaceful mornings.",
  },
];

