/**
 * Mock data for FuturistCards development
 * Used when MongoDB is not available
 */

const mockCards = [
  {
    _id: "507f1f77bcf86cd799439011",
    title: "Tech Innovator",
    subtitle: "Full Stack Developer",
    description: "Passionate developer creating cutting-edge web applications with modern technologies.",
    phone: "050-1234567",
    email: "tech@example.com",
    web: "https://techdev.example.com",
    image: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      alt: "Professional developer portrait"
    },
    address: {
      country: "Israel",
      city: "Tel Aviv",
      street: "Rothschild Blvd",
      houseNumber: "15"
    },
    category: "Technology",
    bizNumber: 1000001,
    likes: ["507f1f77bcf86cd799439012"],
    user_id: "507f1f77bcf86cd799439012",
    createdAt: new Date("2024-01-15"),
    isActive: true
  },
  {
    _id: "507f1f77bcf86cd799439013",
    title: "Creative Designer",
    subtitle: "UI/UX Specialist",
    description: "Creating beautiful and intuitive user experiences for digital products.",
    phone: "052-9876543",
    email: "design@example.com",
    web: "https://creative-design.example.com",
    image: {
      url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      alt: "Creative designer workspace"
    },
    address: {
      country: "Israel",
      city: "Jerusalem",
      street: "King George St",
      houseNumber: "42"
    },
    category: "Marketing",
    bizNumber: 1000002,
    likes: [],
    user_id: "507f1f77bcf86cd799439014",
    createdAt: new Date("2024-01-20"),
    isActive: true
  },
  {
    _id: "507f1f77bcf86cd799439015",
    title: "Business Consultant",
    subtitle: "Strategy & Growth",
    description: "Helping businesses scale and optimize their operations for maximum growth.",
    phone: "054-5555555",
    email: "consultant@example.com",
    web: "https://business-growth.example.com",
    image: {
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      alt: "Business consultant in office"
    },
    address: {
      country: "Israel",
      city: "Haifa",
      street: "Carmel Center",
      houseNumber: "88"
    },
    category: "Consulting",
    bizNumber: 1000003,
    likes: ["507f1f77bcf86cd799439012"],
    user_id: "507f1f77bcf86cd799439016",
    createdAt: new Date("2024-01-25"),
    isActive: true
  },
  {
    _id: "507f1f77bcf86cd799439017",
    title: "Digital Marketing Expert",
    subtitle: "SEO & Social Media",
    description: "Boosting online presence and driving traffic through strategic digital marketing.",
    phone: "053-7777777",
    email: "marketing@example.com",
    web: "https://digital-boost.example.com",
    image: {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      alt: "Digital marketing specialist"
    },
    address: {
      country: "Israel",
      city: "Netanya",
      street: "Independence Square",
      houseNumber: "12"
    },
    category: "Marketing",
    bizNumber: 1000004,
    likes: [],
    user_id: "507f1f77bcf86cd799439018",
    createdAt: new Date("2024-02-01"),
    isActive: true
  },
  {
    _id: "507f1f77bcf86cd799439019",
    title: "Healthcare Professional",
    subtitle: "Family Medicine",
    description: "Providing comprehensive healthcare services with a focus on preventive medicine.",
    phone: "050-9999999",
    email: "doctor@example.com",
    web: "https://family-health.example.com",
    image: {
      url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
      alt: "Healthcare professional"
    },
    address: {
      country: "Israel",
      city: "Beersheba",
      street: "Medical Center St",
      houseNumber: "7"
    },
    category: "Healthcare",
    bizNumber: 1000005,
    likes: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439014"],
    user_id: "507f1f77bcf86cd799439020",
    createdAt: new Date("2024-02-05"),
    isActive: true
  }
];

module.exports = {
  mockCards
};
