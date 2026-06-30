export const SITE_INFO = {
  name: "Caregivers Nearby",
  tagline: "Compassionate Care. Trusted Caregivers. Right Nearby.",
  phone: "(800) 555-0199",
  email: "care@caregiversnearby.com",
  hours: "24/7 Care Support | Office Hours: Mon-Fri, 8 AM - 6 PM EST",
  address: "100 Medical Center Parkway, Suite 500, Boston, MA 02111",
  emergencyNotice: "Emergency Notice: If this is a medical emergency, please call 911 immediately. Caregivers Nearby provides non-medical home care services, companion care, and daily living support.",
};

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  detailedDescription: string;
}

export const SERVICES: Service[] = [
  {
    id: "companion-care",
    title: "Companion Care",
    iconName: "HeartHandshake",
    description: "Meaningful social interaction, conversation, and companionship to improve emotional well-being.",
    imageUrl: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Engaging conversation and mental stimulation",
      "Sharing hobbies, games, and reading together",
      "Accompanying to social events and walks",
      "Preventing isolation and depression in seniors"
    ],
    detailedDescription: "Companion Care is designed to enhance the quality of life for seniors and adults who need social interaction or assistance. We believe that emotional support is just as important as physical assistance. Our caregivers build genuine relationships, providing companionship that brings joy, purpose, and comfort to daily living."
  },
  {
    id: "personal-assistance",
    title: "Personal Assistance",
    iconName: "User",
    description: "Support with activities of daily living (ADLs) including bathing, dressing, grooming, and mobility.",
    imageUrl: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Safe bathing, grooming, and dressing assistance",
      "Mobility and transfer support (wheelchair, walker)",
      "Incontinence and toileting care with dignity",
      "Help with morning wake-up and evening tuck-in routines"
    ],
    detailedDescription: "Personal Assistance provides crucial, respectful help with personal hygiene and mobility. Our caregivers are trained to provide sensitive, dignified support with personal hygiene, dressing, transfers, and toileting. We prioritize our clients' comfort, safety, and self-respect in every interaction."
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation",
    iconName: "Utensils",
    description: "Nutritious, delicious, and customized meal planning and cooking based on dietary guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Customized meal planning for diabetes, heart health, etc.",
      "Fresh, home-cooked meals prepared in the client's home",
      "Kitchen clean-up and sanitization",
      "Hydration monitoring and encouragement"
    ],
    detailedDescription: "Proper nutrition is vital for health, energy, and cognitive function. Our caregivers prepare fresh, healthy, and appetizing meals customized to your family member's specific dietary requirements, tastes, and medical needs, handling everything from grocery planning to post-meal clean-up."
  },
  {
    id: "medication-reminders",
    title: "Medication Reminders",
    iconName: "Clock",
    description: "Prompts and monitoring to ensure medications are taken accurately and on schedule.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Timely reminders to take correct dosages",
      "Monitoring side effects and logs for doctor visits",
      "Assistance with opening pill containers",
      "Coordination with pharmacies and families for refills"
    ],
    detailedDescription: "Managing complex medication schedules can be stressful and dangerous if mismanaged. While our caregivers provide non-medical assistance (cannot administer injections or set up pill organizers directly unless certified), they provide essential, timely reminders and oversight to ensure your loved one adheres to their doctor's prescriptions."
  },
  {
    id: "transportation",
    title: "Transportation",
    iconName: "Car",
    description: "Reliable rides and escort support for medical appointments, shopping, and social visits.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Safe transport to doctors, physical therapy, and pharmacies",
      "Assistance getting in and out of the vehicle",
      "Running social and recreational errands together",
      "Peace of mind knowing your loved one is escorted throughout the trip"
    ],
    detailedDescription: "Loss of mobility shouldn't mean loss of independence. Our transportation services ensure seniors can attend doctor appointments, run errands, visit family, and attend community events safely, accompanied by a caregiver who assists at every stage of the journey."
  },
  {
    id: "errands",
    title: "Errands & Shopping",
    iconName: "ShoppingBag",
    description: "Handling grocery shopping, prescription pick-ups, mail, and other essential tasks.",
    imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Grocery shopping and household supply replenishment",
      "Prescription pickups and pharmacy drops",
      "Post office, dry cleaning, and general errands",
      "Detailed tracking of grocery budgets and receipts"
    ],
    detailedDescription: "Staying on top of household errands can be physically challenging for seniors. Our caregivers can handle these duties independently or take clients along to keep them active and engaged in their community. We ensure all essential supplies and prescriptions are always stocked."
  },
  {
    id: "light-housekeeping",
    title: "Light Housekeeping",
    iconName: "Home",
    description: "Maintaining a clean, safe, and clutter-free living space to prevent accidents and falls.",
    imageUrl: "https://images.unsplash.com/photo-1581579439043-078d4e28a7e4?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Dusting, vacuuming, and sweeping common areas",
      "Washing dishes and sanitizing countertops",
      "Laundry, ironing, and changing bed linens",
      "Clearing walkways to prevent dangerous fall hazards"
    ],
    detailedDescription: "A clean home is a safe and healthy home. We assist with standard light housekeeping tasks to maintain hygiene and order in the client's home. Our focus is on maintaining a comfortable environment and actively eliminating clutter that could lead to slips, trips, and falls."
  },
  {
    id: "hospital-transition",
    title: "Hospital Transition",
    iconName: "Activity",
    description: "Specialized care during the critical days following a hospital discharge or rehab stay.",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Review and alignment of post-hospital discharge instructions",
      "Coordination of follow-up appointments and prescriptions",
      "Immediate assistance upon returning home to prevent re-admission",
      "Providing families with reports on daily recovery progress"
    ],
    detailedDescription: "The transition from hospital to home is a high-risk period for seniors. Our Transitional Care program focuses on preventing re-hospitalization by providing immediate, dedicated care, managing discharge instructions, preparing the home environment, and ensuring compliance with medical guidelines."
  },
  {
    id: "respite-care",
    title: "Respite Care",
    iconName: "Coffee",
    description: "Temporary relief for family caregivers, allowing them to rest, recharge, and prevent burnout.",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Flexible coverage (few hours a week to overnight care)",
      "Peace of mind knowing professional caregivers are on duty",
      "Prevents physical and emotional burnout for family members",
      "Allows family caregivers to attend to personal needs and work"
    ],
    detailedDescription: "Caring for a loved one is rewarding but physically and emotionally demanding. Respite Care offers family caregivers a much-needed break to recharge, go to work, attend appointments, or go on vacation, knowing their loved one is in safe, professional, and compassionate hands."
  },
  {
    id: "alzheimers-companion-care",
    title: "Alzheimer's & Dementia Companion Care",
    iconName: "BrainCircuit",
    description: "Specialized cognitive support and gentle guidance for clients experiencing memory loss.",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Consistent routines to minimize confusion and anxiety",
      "Cognitive engagement, memory stimulation, and activities",
      "Gentle redirection and support for mood swings",
      "Ensures a safe, secure home environment to prevent wandering"
    ],
    detailedDescription: "Dementia and Alzheimer's require patient, knowledgeable care. Our caregivers receive specialized instruction to understand the behavioral shifts, memory limitations, and security needs of clients with memory conditions. We focus on validation, safety, and maintaining comfort in familiar surroundings."
  }
];

export const WHY_US = [
  {
    title: "Carefully Screened",
    description: "Every caregiver undergoes rigorous screening, federal background checks, reference reviews, and values-based interviews.",
    iconName: "ShieldCheck"
  },
  {
    title: "Flexible Scheduling",
    description: "From 4-hour visits to 24/7 care, we adapt completely to your family's schedule and changing needs.",
    iconName: "Calendar"
  },
  {
    title: "Affordable & Transparent",
    description: "Premium care doesn't have to be financially stressful. We offer transparent rates and guide you through funding options.",
    iconName: "DollarSign"
  },
  {
    title: "Personalized Care Plans",
    description: "Every individual is unique. We create customized care blueprints matching clinical needs and personality fits.",
    iconName: "FileText"
  },
  {
    title: "Local Caregivers",
    description: "Our caregivers live in your local community, ensuring prompt arrivals, local familiarity, and reliable service.",
    iconName: "MapPin"
  },
  {
    title: "Easy Matching",
    description: "We use character and experience assessments to match your loved one with a caregiver they will genuinely love.",
    iconName: "Sparkles"
  }
];

export const STEPS = [
  {
    number: "01",
    title: "Request Care",
    description: "Reach out via our simple online portal or call our care support team to initiate the conversation."
  },
  {
    number: "02",
    title: "Tell Us About Your Needs",
    description: "We conduct a complimentary, detailed home evaluation to understand daily routines, preferences, and goals."
  },
  {
    number: "03",
    title: "We Match You",
    description: "Based on personality traits, interests, and caregiver expertise, we match your loved one with the ideal care provider."
  },
  {
    number: "04",
    title: "Meet Your Caregiver",
    description: "We organize a warm introductory meeting so you can approve the caregiver and establish initial comfort."
  },
  {
    number: "05",
    title: "Receive Compassionate Care",
    description: "Care begins, backed by daily logs, ongoing supervisor checks, and continuous family communications."
  }
];

export const TESTIMONIALS = [
  {
    quote: "Caregivers Nearby changed our family's life. Sarah, our caregiver, is like a daughter to my mother. The peace of mind we have is absolutely priceless.",
    author: "Eleanor Vance",
    relation: "Daughter of Margaret (87)",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Finding a caregiver who understood my father's dementia was extremely difficult. The caregiver matched by Caregivers Nearby is exceptionally patient, trained, and kind.",
    author: "Robert Chen",
    relation: "Son of Arthur (79)",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "After my hip replacement, I needed temporary support. The housekeeping, meals, and transit support were fantastic, letting me focus entirely on my recovery.",
    author: "Clara Johansson",
    relation: "Respite & Transition Client",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  }
];

export const RECRUITMENT_BENEFITS = [
  {
    title: "Flexible Scheduling",
    description: "Design a schedule that fits your life. Choose between part-time, full-time, daytime, night-shift, or weekend hours.",
    iconName: "CalendarClock"
  },
  {
    title: "Meaningful Work",
    description: "Build genuine, life-changing connections with local seniors and families who truly value your support.",
    iconName: "Heart"
  },
  {
    title: "Competitive Opportunities",
    description: "Receive industry-leading compensation, health benefits, mileage reimbursement, and paid time off packages.",
    iconName: "TrendingUp"
  },
  {
    title: "Growing Network",
    description: "Access structured clinical training, career advancement tracks, and join a supportive healthcare family.",
    iconName: "Users"
  }
];

export const FAQS = [
  {
    question: "How do you screen and vet your caregivers?",
    answer: "Safety and trust are our absolute priorities. Every caregiver undergoes a comprehensive multi-layered screening process: a federal criminal background check, national sex offender registry search, DMV driving record check, employment reference reviews, professional license validations, and a rigorous in-person behavioral assessment testing clinical knowledge and empathy."
  },
  {
    question: "What happens if our matched caregiver is sick or unavailable?",
    answer: "We guarantee continuity of care. In the event that your primary caregiver is ill or has an emergency, our care coordinators immediately assign a qualified, pre-vetted backup caregiver. We coordinate the transition directly, ensuring all care plan instructions are fully briefed in advance."
  },
  {
    question: "Are your care services contractually binding or flexible?",
    answer: "We offer completely flexible care structures. There are no long-term contracts or hidden setup fees. You can increase, decrease, or pause services at any time with reasonable notice, allowing you to pay only for the care you need when you need it."
  },
  {
    question: "Do you accept long-term care insurance or government aid?",
    answer: "Yes. We work closely with most major Long-Term Care Insurance (LTCI) providers and help you compile the daily care logs and invoices needed to claim benefits. We also assist with Veteran Aid & Attendance benefits and guide families through private pay options."
  },
  {
    question: "How do we get started with a customized care plan?",
    answer: "Getting started is simple. Contact us through our website form or by calling our office. We will schedule a free, no-obligation Home Care Consultation at your loved one's home. Our senior care advisor will meet with you, assess needs, draft a customized care blueprint, and match you with the ideal caregiver."
  }
];

export const ABOUT_CONTENT = {
  story: "Caregivers Nearby was founded out of a personal struggle. When our own grandfather needed support after a stroke, we spent weeks searching for someone trustworthy, certified, and compassionate who lived nearby. We found that the existing agencies felt cold and transactional, while independent listings lacked vetting and safety. We knew there had to be a better way. We built Caregivers Nearby to combine modern technology with local human care—creating an organization that treats your family exactly like our own.",
  mission: "To elevate the standard of home-based care by connecting families with the most compassionate, rigorously vetted caregivers in their local communities, enabling seniors to age safely and comfortably in their own homes.",
  vision: "To become America's most trusted and reliable local care network, fostering deep human connections, supporting caregiver careers, and transforming how society views and receives elder care.",
  values: [
    {
      title: "Uncompromising Safety",
      description: "We maintain double-checked screenings and background reviews because your family's safety is our sacred trust."
    },
    {
      title: "Empathetic Connection",
      description: "We believe care is clinical but, above all, emotional. We listen, support, and care with real heart."
    },
    {
      title: "Caregiver Dignity",
      description: "Outstanding care begins with outstanding caregivers. We support our staff with fair wages, training, and respect."
    },
    {
      title: "Radical Transparency",
      description: "No hidden fees, no long contracts, and immediate, open communication lines between care coordinators, caregivers, and families."
    }
  ],
  stats: [
    { value: "10,000+", label: "Happy Families Served" },
    { value: "98%", label: "Caregiver Match Success" },
    { value: "100%", label: "Background Checked Caregivers" },
    { value: "500,000+", label: "Hours of Care Provided" }
  ],
  timeline: [
    { year: "2020", title: "Founding Promise", description: "Launched our first local care network in Boston with 15 dedicated caregivers." },
    { year: "2022", title: "Regional Expansion", description: "Expanded services throughout Massachusetts and New England, serving over 1,500 families." },
    { year: "2024", title: "Advanced Training Academy", description: "Launched our proprietary training academy to equip caregivers with specialized Alzheimer's and Dementia support skills." },
    { year: "2026", title: "Nationwide Vision", description: "Expanding our digital matching platform and caregiver hubs to bring trusted local care to communities across America." }
  ]
};
