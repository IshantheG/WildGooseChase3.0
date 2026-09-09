import {
  Wand2,
  Scissors,
  TrendingUp,
  Target,
  MessageCircleQuestion,
} from "lucide-react";

export const JOB = {
  id: "job-google-software-engineer",
  employer: "Google",
  title: "Software Engineer Intern",
  employerJobNumber: "GOOG-2027-001",
  workTerm: "2027 — Winter",
  jobType: "Co-op Main",
  openings: 3,
  levels: ["Junior"],
  region: "Western Canada",
  province: "British Columbia",
  postalCode: "V6B 1V1",
  country: "Canada",
  locationArrangement: "Hybrid",
  duration: "4 month work term",
  compensation: "$42–$58/hr",
  summary:
    "Join Google's engineering team as a Software Engineer Intern and work alongside experienced engineers to build reliable, scalable software used by millions of people. Interns contribute to production systems while gaining experience across software design, development, testing, and deployment.",
  responsibilities:
    "Design, implement, test, and maintain software features. Collaborate with engineers, product managers, and designers to solve technical problems. Participate in code reviews and contribute to technical discussions. Analyze performance and reliability issues and develop solutions.",
  requiredSkills: [
    "Currently enrolled in a Computer Science, Computer Engineering, Software Engineering, or related undergraduate program",
    "Experience with at least one programming language such as C++, Java, Python, or Go",
    "Strong understanding of data structures and algorithms",
    "Ability to work effectively in a collaborative engineering environment",
    "Currently enrolled in a Computer Science, Computer Engineering, Software Engineering, or related undergraduate program",
    "Experience with at least one programming language such as C++, Java, Python, or Go",
    "Strong understanding of data structures and algorithms",
    "Ability to work effectively in a collaborative engineering environment",
    "Currently enrolled in a Computer Science, Computer Engineering, Software Engineering, or related undergraduate program",
    "Experience with at least one programming language such as C++, Java, Python, or Go",
    "Strong understanding of data structures and algorithms",
    "Ability to work effectively in a collaborative engineering environment",
  ],
};

export const ACTIONS = [
  { id: "rewrite", label: "Rewrite", icon: Wand2 },
  { id: "concise", label: "Make concise", icon: Scissors },
  { id: "impact", label: "Add impact", icon: TrendingUp },
  { id: "align", label: "Align with job", icon: Target },
  { id: "explain", label: "Explain change", icon: MessageCircleQuestion },
];

export const INITIAL_FIELDS = {
  "header-name": "Jordan Reyes",
  "header-contact":
    "jordan.reyes@email.com · (403) 555-0176 · linkedin.com/in/jordanreyes · github.com/jreyes",
  "overview-summary":
    "Computer Engineering student with hands-on experience building automation tooling and full-stack web applications. Comfortable moving between embedded and software contexts, with a track record of shipping production features independently.",

  "exp1-company": "Northline Robotics",
  "exp1-title": "Software Engineering Co-op",
  "exp1-location": "Waterloo, ON",
  "exp1-dates": "May 2025 – Aug 2025",
  "exp1-b1":
    "Built a Python service to log and visualize sensor data from test rigs, cutting manual review time significantly.",
  "exp1-b2":
    "Worked with hardware and firmware teams to debug intermittent communication failures on a CAN bus interface.",
  "exp1-b3":
    "Wrote unit and integration tests that raised coverage on the diagnostics module.",

  "exp2-company": "Campus IT Services",
  "exp2-title": "Technical Support Assistant",
  "exp2-location": "Waterloo, ON",
  "exp2-dates": "Sep 2024 – Dec 2024",
  "exp2-b1":
    "Resolved networking and hardware tickets for students and staff across three campus buildings.",
  "exp2-b2":
    "Documented recurring issues into a shared knowledge base used by the rest of the support team.",

  "proj1-name": "FillerZero",
  "proj1-stack": "PyTorch · FastAPI · React",
  "proj1-dates": "2025",
  "proj1-b1":
    "Implemented an MCTS-based reinforcement learning agent trained against a custom simulation environment.",
  "proj1-b2":
    "Exposed the trained model through a FastAPI backend with a React front end for live evaluation.",

  "edu1-school": "University of Waterloo",
  "edu1-degree": "B.A.Sc. in Computer Engineering",
  "edu1-location": "Waterloo, ON",
  "edu1-dates": "Expected 2028",

  "skill-lang-label": "Languages",
  "skill-lang-items": "Python, TypeScript, C++, SQL",
  "skill-frame-label": "Frameworks",
  "skill-frame-items": "React, Next.js, Spring Boot, FastAPI",
  "skill-tools-label": "Tools",
  "skill-tools-items": "Git, Docker, PostgreSQL, Linux",
};

export const INITIAL_AI_CHANGES = {
  "overview-summary": {
    original:
      "Computer Engineering student interested in software and automation, looking for a co-op placement.",
    reason:
      "Rewrote the summary in outcome-oriented language and surfaced automation + full-stack experience, since both are emphasized in the posting.",
    status: "pending",
  },
  "exp1-b1": {
    original: "Built a tool to log sensor data from test rigs.",
    reason:
      "Reworded to name the language used (Python) and quantify the benefit qualitatively, matching phrasing patterns common in the job's requirements.",
    status: "pending",
  },
  "exp1-b2": {
    original:
      "Helped debug hardware communication issues with the firmware team.",
    reason:
      'Adjusted terminology to "CAN bus interface" since that\'s the specific system involved — makes the automation/controls overlap with the role explicit.',
    status: "accepted",
  },
  "skill-lang-items": {
    original: "Python, TypeScript, C++",
    reason:
      "Added SQL, which appears elsewhere on your base resume, since the role lists database familiarity as a plus.",
    status: "pending",
  },
};