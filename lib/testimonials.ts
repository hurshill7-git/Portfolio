/**
 * Peer testimonials — sourced from real 314e Slack/Bonusly recognition.
 * `featured` items appear in the homepage "What people say" section; the rest
 * are kept here for later use (a dedicated page, rotation, etc.).
 *
 * Quotes are verbatim, lightly cleaned of Slack @mentions, point values, and
 * hashtags. Attribution is first name + role (roles confirmed from Slack
 * profiles where set). Give the featured people a heads-up before publishing.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "For delivering exceptional help on the Jeeves videos and helping our customers adopt Jeeves — kudos for leading and executing it end-to-end.",
    name: "Abhilash R.",
    role: "Product Marketing Manager, 314e",
    featured: true,
  },
  {
    quote:
      "Great work on the redesign. Your skills and commitment will be crucial as we move forward.",
    name: "Soumya A.",
    role: "Product Manager, 314e",
    featured: true,
  },
  {
    quote:
      "Hard work mixed with creativity creates sensational results — thanks for the amazing work on our two main conferences.",
    name: "Swapnil P.",
    role: "314e",
    featured: true,
  },
  {
    quote:
      "Harshil was quite helpful in setting up a starting point for the Inside team with a very cool zone map.",
    name: "Joel M.",
    role: "Director of Inside Sales, 314e",
    featured: true,
  },
  {
    quote:
      "Thanks for making the conferences a big success — our marketing game has gone up substantially.",
    name: "Abhishek B.",
    role: "314e",
    featured: true,
  },
  {
    quote:
      "A big shoutout for the clear guidelines and support on the Jeeves help videos.",
    name: "Hari N.",
    role: "Sr. Graphic Designer, 314e",
    featured: true,
  },
  {
    quote:
      "Your contribution to getting the ViVE requirements out on time is truly invaluable.",
    name: "Nahid N.",
    role: "Design, 314e",
    featured: true,
  },
  {
    quote: "Vibe content looks amazing — great work!",
    name: "Pallavi K.",
    role: "314e",
    featured: true,
  },

  // Held for later (not shown on the homepage):
  {
    quote: "Rockstar.",
    name: "Hari N.",
    role: "Sr. Graphic Designer, 314e",
  },
  {
    quote:
      "Thanks for the ongoing UI revamp — a refreshing 'interface lift' that's got us all clicking with joy.",
    name: "Soumya A.",
    role: "Product Manager, 314e",
  },
  {
    quote:
      "Thank you for making our designs shine, even in the eleventh hour.",
    name: "Purnima R.",
    role: "314e",
  },
  {
    quote: "Thanks for all the amazing work.",
    name: "Abhilash R.",
    role: "Product Marketing Manager, 314e",
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);
