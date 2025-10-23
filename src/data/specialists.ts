import specialist1 from "@/assets/specialist-1.jpg";
import specialist2 from "@/assets/specialist-2.jpg";
import specialist3 from "@/assets/specialist-3.jpg";
import specialist4 from "@/assets/specialist-4.jpg";

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  categories: string[];
  country: string;
  countryFlag: string;
  rating: number;
  reviewCount: number;
  sessionCount: number;
  price: number;
  bio: string;
  yearsOfPractice: number;
  photo: string;
  available: boolean;
}

export const specialists: Specialist[] = [
  {
    id: "1",
    name: "Raluca",
    specialty: "Astrologer",
    categories: ["Astrology", "Moon Cycles", "Emotional Healing"],
    country: "Romania",
    countryFlag: "🇷🇴",
    rating: 4.9,
    reviewCount: 128,
    sessionCount: 150,
    price: 40,
    bio: "15 years of holistic practice focusing on emotional balance and lunar guidance. I help people reconnect with their inner wisdom through astrological insights.",
    yearsOfPractice: 15,
    photo: specialist1,
    available: true,
  },
  {
    id: "2",
    name: "Marcus",
    specialty: "Holistic Therapist",
    categories: ["Therapy", "Mindfulness", "Life Coaching"],
    country: "USA",
    countryFlag: "🇺🇸",
    rating: 4.8,
    reviewCount: 96,
    sessionCount: 120,
    price: 55,
    bio: "Compassionate therapist specializing in mindfulness-based approaches to emotional wellness and personal transformation.",
    yearsOfPractice: 12,
    photo: specialist2,
    available: true,
  },
  {
    id: "3",
    name: "Sophia",
    specialty: "Numerologist",
    categories: ["Numerology", "Life Path", "Career Guidance"],
    country: "Greece",
    countryFlag: "🇬🇷",
    rating: 4.9,
    reviewCount: 142,
    sessionCount: 200,
    price: 35,
    bio: "Expert in numerology with a focus on life path discovery and career alignment through numbers and cosmic patterns.",
    yearsOfPractice: 18,
    photo: specialist3,
    available: true,
  },
  {
    id: "4",
    name: "Kai",
    specialty: "Reiki Master",
    categories: ["Reiki", "Energy Healing", "Chakra Balance"],
    country: "Japan",
    countryFlag: "🇯🇵",
    rating: 5.0,
    reviewCount: 87,
    sessionCount: 95,
    price: 50,
    bio: "Traditional Reiki master offering energy healing sessions to restore balance, clarity, and inner peace.",
    yearsOfPractice: 10,
    photo: specialist4,
    available: true,
  },
];

export interface Review {
  id: string;
  specialistId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    specialistId: "1",
    userName: "Emma",
    rating: 5,
    comment: "Raluca helped me understand my moon cycle patterns. Truly transformative session.",
    date: "2025-09-15",
  },
  {
    id: "2",
    specialistId: "1",
    userName: "Oliver",
    rating: 5,
    comment: "Her insights were incredibly accurate and deeply resonant. Highly recommend!",
    date: "2025-09-10",
  },
];

export interface Session {
  id: string;
  specialistId: string;
  specialistName: string;
  specialistPhoto: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "upcoming" | "completed" | "pending";
  meetingLink?: string;
}

export const mockSessions: Session[] = [
  {
    id: "s1",
    specialistId: "1",
    specialistName: "Raluca",
    specialistPhoto: specialist1,
    specialty: "Astrologer",
    date: "2025-11-05",
    time: "14:00",
    duration: 50,
    price: 40,
    status: "upcoming",
    meetingLink: "https://meet.aroti.app/session-123",
  },
  {
    id: "s2",
    specialistId: "3",
    specialistName: "Sophia",
    specialistPhoto: specialist3,
    specialty: "Numerologist",
    date: "2025-10-15",
    time: "10:00",
    duration: 60,
    price: 35,
    status: "completed",
  },
];
