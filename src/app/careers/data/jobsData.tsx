export type Job = {
  id: number;
  category: string;
  title: string;
  shortDescription: string;
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
};

export const jobsData: Job[] = [
  {
    id: 1,
    category: "Business Development",
    title: "Business Development Manager (B2B / Construction Materials)",
shortDescription:
  "Drive Hubeco's growth by building relationships with Developers, Architects and Procurement teams. Scale the adoption of sustainable materials across major construction projects in India.",
    location: "Hyderabad / Remote",
    type: "Full-Time",
    experience: "5+ Years Exp.",
    overview:
      "The BDM will drive business growth in Hyderabad by approaching developers and contractors promoting hubeco.market’s platform, and closing B2B2C deals in the sustainable construction ecosystem",
    responsibilities: [
      "Identify and acquire developers, contractors and residential owners in Telangana/AP",
      "Present and promote hubeco.market to decision makers in construction firms",
      "Build and maintain strong client and supplier relationships",
      "Negotiate commercial terms and close deals (online/offline).",
      "Track pipeline and report progress",
      "Represent hubeco.market at local industry events and trade forums"
    ],
    requirements: [
      "3–5 years of experience in B2B2C sales / business development in building materials.",
      "Excellent communication, presentation and negotiation skills.",
      "Understanding of the Hyderabad construction ecosystem",
      "Self-driven, target-oriented  and passionate about sustainability",
      "Willingness to travel locally"
    ],
    preferred: [
      "Experience designing for B2B or complex operational workflows.",
      "Knowledge or passion for sustainability and green construction.",
      "Previous experience in a high-growth startup environment."
    ]
  }
];