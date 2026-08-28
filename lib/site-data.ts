import brandsData from "@/data/brands.json";
import faqsData from "@/data/faqs.json";
import productsData from "@/data/products.json";
import portfolioData from "@/data/portfolio.json";
import resourcesData from "@/data/resources.json";
import testimonialsData from "@/data/testimonials.json";

export type Brand = {
  slug: string;
  name: string;
  logoText: string;
  description: string;
  website: string;
  sourceUrl: string;
  lastSyncedAt: string;
  paintTypes: string[];
  categories: string[];
  productLines: string[];
};

export type Product = {
  slug: string;
  brand: string;
  brandSlug: string;
  name: string;
  line: string;
  paintType: string;
  finish: string;
  description: string;
  features: string[];
  priceFrom: string;
  sortPrice: number;
  stockStatus: string;
  swatch: string;
  sourceUrl: string;
  newestRank: number;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: string;
};

export type PortfolioEntry = {
  slug: string;
  title: string;
  roomType: string;
  description: string;
  coloursUsed: string[];
  image: string;
  imageAlt: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Resource = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Submission = {
  id: string;
  type: "contact" | "booking" | "newsletter";
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  serviceInterest?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  createdAt: string;
};

export const brands = brandsData as Brand[];
export const seedProducts = productsData as Product[];
export const seedPortfolio = portfolioData as PortfolioEntry[];
export const testimonials = testimonialsData as Testimonial[];
export const faqs = faqsData as Faq[];
export const resources = resourcesData as Resource[];

export const services: Service[] = [
  {
    slug: "consultation",
    title: "Colour Consultation Service",
    description:
      "Palette development, finish recommendations, and brand comparisons tailored to natural light, architecture, and your furniture scheme.",
    cta: "Book a consultation",
    href: "/contact#booking",
    icon: "01",
  },
  {
    slug: "supply-delivery",
    title: "Paint Supply & Delivery",
    description:
      "Reliable access to premium paint systems, on-site coordination, and practical supply support for phased residential or commercial projects.",
    cta: "Request supply support",
    href: "/contact?service=Paint%20supply",
    icon: "02",
  },
  {
    slug: "trade-partnerships",
    title: "Contractor & Decorator Partnerships",
    description:
      "A specification-minded partner for quoting, account support, finish selection, and client-ready product presentation.",
    cta: "Start a trade enquiry",
    href: "/contact?service=Trade%20partnership",
    icon: "03",
  },
  {
    slug: "decor-guidance",
    title: "Interior Decoration Guidance",
    description:
      "A thoughtful bridge between colour, texture, cabinetry, stone, and soft furnishings to keep the whole room working together.",
    cta: "Discuss your project",
    href: "/contact?service=Decoration%20guidance",
    icon: "04",
  },
];
