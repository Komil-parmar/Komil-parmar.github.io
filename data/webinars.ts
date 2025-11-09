// ===========================
// Webinars Data
// ===========================
// EASY TO EDIT: Add, remove, or reorder webinars by modifying this array

export interface Webinar {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  attendees: string;
  linkedInUrl: string;
}

export const webinarsData: Webinar[] = [
  {
    id: 1,
    title: "Getting Started with Meta-Learning",
    date: "March 2024",
    description: "An introductory session covering the fundamentals of meta-learning, including few-shot learning techniques and practical implementations. Perfect for beginners looking to understand how AI can learn to learn.",
    image: "/images/webinar-meta-learning.jpg",
    attendees: "150+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 2,
    title: "TensorFlow Deep Dive: Advanced Techniques",
    date: "February 2024",
    description: "Exploring advanced TensorFlow features, custom training loops, and optimization strategies. Shared insights from earning the TensorFlow Developer Certification.",
    image: "/images/webinar-tensorflow.jpg",
    attendees: "200+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 3,
    title: "Self-Learning Journey in ML",
    date: "January 2024",
    description: "My personal journey of choosing self-learning over traditional college. Tips, resources, and strategies for aspiring self-taught ML engineers.",
    image: "/images/webinar-self-learning.jpg",
    attendees: "180+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 4,
    title: "Kaggle Competition Strategies",
    date: "December 2023",
    description: "Sharing my approach to Kaggle competitions, from data preprocessing to ensemble methods. How I consistently placed in the top 10%.",
    image: "/images/webinar-kaggle.jpg",
    attendees: "220+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 5,
    title: "Building ML Projects from Scratch",
    date: "November 2023",
    description: "End-to-end walkthrough of building production-ready ML projects. From problem definition to deployment, covering best practices and common pitfalls.",
    image: "/images/webinar-ml-projects.jpg",
    attendees: "190+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  }
];
