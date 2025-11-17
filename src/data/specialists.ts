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
  languages: string[];
  addedDate?: string; // For "Newest Specialists" sorting
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
    languages: ["Romanian", "English"],
    addedDate: "2024-01-15",
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
    languages: ["English", "Spanish"],
    addedDate: "2024-03-20",
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
    languages: ["Greek", "English"],
    addedDate: "2023-11-10",
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
    languages: ["Japanese", "English"],
    addedDate: "2024-06-05",
  },
  {
    id: "5",
    name: "Luna",
    specialty: "Tarot Reader",
    categories: ["Tarot", "Divination", "Spiritual Guidance"],
    country: "France",
    countryFlag: "🇫🇷",
    rating: 4.8,
    reviewCount: 156,
    sessionCount: 180,
    price: 45,
    bio: "Intuitive tarot reader with 20 years of experience helping clients navigate life's crossroads with clarity and wisdom.",
    yearsOfPractice: 20,
    photo: specialist1,
    available: true,
    languages: ["French", "English"],
    addedDate: "2024-02-12",
  },
  {
    id: "6",
    name: "Amara",
    specialty: "Crystal Healer",
    categories: ["Crystal Healing", "Chakras", "Energy Work"],
    country: "Brazil",
    countryFlag: "🇧🇷",
    rating: 4.9,
    reviewCount: 102,
    sessionCount: 135,
    price: 38,
    bio: "Certified crystal healer specializing in chakra alignment and energy clearing using powerful healing crystals.",
    yearsOfPractice: 8,
    photo: specialist2,
    available: true,
    languages: ["Portuguese", "English", "Spanish"],
    addedDate: "2024-05-18",
  },
  {
    id: "7",
    name: "David",
    specialty: "Life Coach",
    categories: ["Life Coaching", "Goal Setting", "Personal Growth"],
    country: "Canada",
    countryFlag: "🇨🇦",
    rating: 4.7,
    reviewCount: 89,
    sessionCount: 110,
    price: 60,
    bio: "Empowering life coach dedicated to helping individuals achieve their goals and unlock their full potential.",
    yearsOfPractice: 14,
    photo: specialist3,
    available: true,
    languages: ["English", "French"],
    addedDate: "2024-04-22",
  },
  {
    id: "8",
    name: "Ananya",
    specialty: "Meditation Guide",
    categories: ["Meditation", "Mindfulness", "Stress Relief"],
    country: "India",
    countryFlag: "🇮🇳",
    rating: 5.0,
    reviewCount: 174,
    sessionCount: 220,
    price: 30,
    bio: "Experienced meditation teacher guiding students to inner peace through ancient mindfulness practices.",
    yearsOfPractice: 22,
    photo: specialist4,
    available: true,
    languages: ["Hindi", "English"],
    addedDate: "2023-12-08",
  },
  {
    id: "9",
    name: "Isabella",
    specialty: "Herbalist",
    categories: ["Herbalism", "Natural Remedies", "Wellness"],
    country: "Italy",
    countryFlag: "🇮🇹",
    rating: 4.6,
    reviewCount: 68,
    sessionCount: 85,
    price: 42,
    bio: "Traditional herbalist offering natural wellness consultations and personalized herbal remedy recommendations.",
    yearsOfPractice: 16,
    photo: specialist1,
    available: false,
    languages: ["Italian", "English"],
    addedDate: "2024-07-30",
  },
  {
    id: "10",
    name: "Zara",
    specialty: "Sound Healer",
    categories: ["Sound Healing", "Singing Bowls", "Frequency Therapy"],
    country: "Australia",
    countryFlag: "🇦🇺",
    rating: 4.9,
    reviewCount: 112,
    sessionCount: 145,
    price: 48,
    bio: "Sound healing practitioner using singing bowls and frequency therapy to promote deep relaxation and healing.",
    yearsOfPractice: 9,
    photo: specialist2,
    available: true,
    languages: ["English"],
    addedDate: "2024-03-14",
  },
  {
    id: "11",
    name: "Rafael",
    specialty: "Psychic Medium",
    categories: ["Mediumship", "Spirit Communication", "Closure"],
    country: "Spain",
    countryFlag: "🇪🇸",
    rating: 4.8,
    reviewCount: 134,
    sessionCount: 165,
    price: 55,
    bio: "Compassionate psychic medium connecting clients with loved ones on the other side for healing and closure.",
    yearsOfPractice: 13,
    photo: specialist3,
    available: true,
    languages: ["Spanish", "English"],
    addedDate: "2024-01-28",
  },
  {
    id: "12",
    name: "Ming",
    specialty: "Feng Shui Consultant",
    categories: ["Feng Shui", "Space Clearing", "Home Harmony"],
    country: "China",
    countryFlag: "🇨🇳",
    rating: 4.7,
    reviewCount: 76,
    sessionCount: 92,
    price: 52,
    bio: "Expert Feng Shui consultant helping clients create harmonious living and working spaces for prosperity.",
    yearsOfPractice: 17,
    photo: specialist4,
    available: true,
    languages: ["Mandarin", "English"],
    addedDate: "2024-08-11",
  },
  {
    id: "13",
    name: "Priya",
    specialty: "Yoga Instructor",
    categories: ["Yoga", "Breathwork", "Flexibility"],
    country: "India",
    countryFlag: "🇮🇳",
    rating: 5.0,
    reviewCount: 198,
    sessionCount: 250,
    price: 35,
    bio: "Certified yoga instructor offering personalized sessions focused on alignment, breathwork, and holistic wellness.",
    yearsOfPractice: 11,
    photo: specialist1,
    available: true,
    languages: ["Hindi", "English", "Tamil"],
    addedDate: "2023-10-20",
  },
  {
    id: "14",
    name: "Elena",
    specialty: "Dream Interpreter",
    categories: ["Dream Analysis", "Symbolism", "Subconscious"],
    country: "Sweden",
    countryFlag: "🇸🇪",
    rating: 4.8,
    reviewCount: 91,
    sessionCount: 115,
    price: 40,
    bio: "Skilled dream interpreter helping clients understand the messages from their subconscious mind.",
    yearsOfPractice: 7,
    photo: specialist2,
    available: true,
    languages: ["Swedish", "English"],
    addedDate: "2024-06-25",
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
