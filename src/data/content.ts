import { Sprout, TreePine, Recycle, GraduationCap, Users } from 'lucide-react';

export const siteConfig = {
  name: "Green Impact Innovators",
  founder: "Ambrose Okwach Odima",
  location: "Kisumu County, Kenya",
  fundingGoal: "Ksh 50,000",
};

export const heroContent = {
  headline: "Nurturing Minds, Restoring Nature, Feeding Futures.",
  subheadline:
    "We empower learners and communities to tackle climate change through a school based forest garden approach.",
  cta: "Support Our Mission",
}

export const problemStats = [
  { label: "Learners missing lunch daily", value: "300+" },
  { label: "Kenyans facing food insecurity (FAO 2023)", value: "63%" },
];

export const solutionPillars = [
  {
    title: "Climate-Smart Food Production",
    desc: "Growing indigenous vegetables using low-cost, scalable methods.",
    icon: Sprout,
  },
  {
    title: "Tree Growing & Restoration",
    desc: "1,000+ seedlings established, including our Birthday Tree Initiative.",
    icon: TreePine,
  },
  {
    title: "Waste Management & Eco Art",
    desc: "Reusing packet milk waste for seedling bags and creating eco-art.",
    icon: Recycle,
  },
  {
    title: "Youth Climate Leadership",
    desc: "Hands-on education integrating agriculture, environment, and leadership.",
    icon: GraduationCap,
  },
  {
    title: "Community Resilience",
    desc: "Empowering local households and teachers with sustainable skills that ripple across generations for lasting impact.",
    icon: Users,
  },
];

export const impactNumbers = [
  { value: "100+", label: "Learners accessing nutritious meals" },
  { value: "1,000+", label: "Tree seedlings established" },
  { value: "20", label: "Teachers trained on climate-smart agriculture" },
  { value: "3rd", label: "Position at CEL Program" },
];
