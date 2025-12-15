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
    title: "Students ML Playground Series S1E1",
    date: "March 2025",
    description: "An introductory session covering the fundamentals of kaggle and machine-learning, including best practices for competitions showcasing my self hosted kaggle competition perfect for beginners looking to .",
    image: "/images/first_webinar.png",
    attendees: "50+",
    linkedInUrl: "https://www.linkedin.com/posts/komil-parmar-488967243_machinelearning-kaggle-datascience-activity-7360206691495243777-n0Jt?utm_source=share&utm_medium=member_desktop&rcm=ACoAADx58-gB_ayvN_mw1PCLTEAzgWAxUMYOvGg"
  },
  {
    id: 2,
    title: "A small interaction with 50 of my IITG Juniors",
    date: "February 2025",
    description: "This was a small but meaningful meetup, mainly to break the ice, clear doubts, and make the juniors feel more comfortable as they step into this degree",
    image: "/images/juniors_interaction.png",
    attendees: "200+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 3,
    title: "Self-Learning Journey in ML",
    date: "January 2025",
    description: "My personal journey of choosing self-learning over traditional college. Tips, resources, and strategies for aspiring self-taught ML engineers.",
    image: "/images/webinar-self-learning.jpg",
    attendees: "180+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 4,
    title: "Kaggle Competition Strategies",
    date: "December 2025",
    description: "Sharing my approach to Kaggle competitions, from data preprocessing to ensemble methods. How I consistently placed in the top 10%.",
    image: "/images/webinar-kaggle.jpg",
    attendees: "220+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  },
  {
    id: 5,
    title: "Building ML Projects from Scratch",
    date: "November 2025",
    description: "End-to-end walkthrough of building production-ready ML projects. From problem definition to deployment, covering best practices and common pitfalls.",
    image: "/images/webinar-ml-projects.jpg",
    attendees: "190+",
    linkedInUrl: "https://www.linkedin.com/in/komil-parmar-488967243/"
  }
];
