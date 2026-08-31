"use client";

import { JobCard } from "@/frontend/pages/jobs-list/components/job-list-card";
import { JobsSearch } from "@/frontend/pages/jobs-list/components/job-search";
import { useRef, useEffect, useState } from "react";
import { type Job } from "@/frontend/types/types";
import JobInfo from "@/frontend/pages/jobs-list/components/job-info";

export const DEFAULT_JOBS: Job[] = [
  {
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
  },

  {
    id: "job-figma-product-designer",
    employer: "Figma",
    title: "Product Design Intern",
    employerJobNumber: "FIG-2027-014",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "San Francisco Bay Area",
    province: "California",
    postalCode: "94107",
    country: "United States",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$38–$50/hr",
    summary:
      "Figma is looking for a Product Design Intern to help create intuitive tools for people who build and collaborate on digital products. You will work closely with designers, engineers, and product managers throughout the product development process.",
    responsibilities:
      "Create wireframes, prototypes, and high-fidelity product designs. Conduct design exploration and iterate based on feedback. Collaborate with product and engineering teams to bring concepts into production. Help maintain design systems and contribute to user research activities.",
    requiredSkills: [
      "Currently pursuing an undergraduate degree in Design, Human-Computer Interaction, or a related field",
      "Experience with Figma or comparable design tools",
      "Understanding of user-centered design principles",
      "Strong visual, interaction, and communication skills",
      "Portfolio demonstrating product or interface design work",
    ],
  },

  {
    id: "job-anthropic-ml-research",
    employer: "Anthropic",
    title: "Machine Learning Research Intern",
    employerJobNumber: "ANTH-2027-008",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior", "Intermediate"],
    region: "San Francisco Bay Area",
    province: "California",
    postalCode: "94105",
    country: "United States",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$50–$65/hr",
    summary:
      "Work with Anthropic's research and engineering teams on problems related to large language models, machine learning, and AI safety. Interns have the opportunity to conduct experiments, analyze model behavior, and contribute to research projects.",
    responsibilities:
      "Design and run machine learning experiments. Implement and evaluate research ideas. Analyze model behavior and experimental results. Develop tooling for training and evaluation workflows. Collaborate with researchers and engineers and communicate findings through technical documentation and presentations.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, Mathematics, or a related undergraduate program",
      "Strong Python programming skills",
      "Understanding of machine learning fundamentals",
      "Experience with PyTorch, TensorFlow, or another machine learning framework",
      "Strong mathematical and analytical problem-solving skills",
    ],
  },

  {
    id: "job-stripe-backend-engineer",
    employer: "Stripe",
    title: "Backend Software Engineer Intern",
    employerJobNumber: "STRP-2027-031",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "Northeastern United States",
    province: "New York",
    postalCode: "10011",
    country: "United States",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$40–$55/hr",
    summary:
      "Join Stripe's engineering organization and help build infrastructure that powers payments and financial services for businesses around the world. You will work on backend systems with a focus on reliability, scalability, and developer experience.",
    responsibilities:
      "Build and maintain backend services and APIs. Write reliable, well-tested code and participate in code reviews. Investigate production issues and improve system reliability. Collaborate with product and engineering teams to design scalable solutions.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, Software Engineering, or a related program",
      "Experience with Java, Ruby, Python, Go, or another backend programming language",
      "Understanding of object-oriented programming and data structures",
      "Interest in distributed systems and backend infrastructure",
    ],
  },

  {
    id: "job-notion-frontend-engineer",
    employer: "Notion",
    title: "Frontend Software Engineer Intern",
    employerJobNumber: "NOT-2027-019",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "North America",
    province: "Ontario",
    postalCode: "M5V 2T6",
    country: "Canada",
    locationArrangement: "Remote",
    duration: "4 month work term",
    compensation: "$35–$48/hr",
    summary:
      "Help build the collaborative workspace experience at Notion. As a Frontend Software Engineer Intern, you will work on user-facing features and interfaces while collaborating closely with product designers and backend engineers.",
    responsibilities:
      "Develop responsive and accessible user interfaces using React and TypeScript. Build reusable frontend components. Improve application performance and usability. Work with designers and engineers to ship new product features and participate in code reviews.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, or a related undergraduate program",
      "Experience with JavaScript or TypeScript",
      "Experience with React or another modern frontend framework",
      "Understanding of HTML, CSS, and responsive web development",
      "Strong attention to user experience and interface quality",
    ],
  },

  {
    id: "job-airbnb-data-analyst",
    employer: "Airbnb",
    title: "Data Analytics Intern",
    employerJobNumber: "ABNB-2027-012",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 1,
    levels: ["Junior"],
    region: "Greater Toronto Area",
    province: "Ontario",
    postalCode: "M5H 2N2",
    country: "Canada",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$30–$42/hr",
    summary:
      "Join Airbnb's analytics organization and help teams make data-informed decisions across the platform. You will work with large datasets, develop analytical insights, and communicate findings to business and product stakeholders.",
    responsibilities:
      "Analyze product and business datasets using SQL and Python. Build dashboards and reports to communicate trends. Identify opportunities through exploratory data analysis. Work with product managers and business teams to answer analytical questions and support decision-making.",
    requiredSkills: [
      "Currently enrolled in Statistics, Computer Science, Mathematics, Engineering, Economics, or a related program",
      "Strong SQL skills",
      "Experience with Python, R, or another data analysis language",
      "Understanding of statistics and data visualization",
      "Strong written and verbal communication skills",
    ],
  },

  {
    id: "job-shopify-devops",
    employer: "Shopify",
    title: "DevOps Engineering Intern",
    employerJobNumber: "SHOP-2027-024",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "Canada",
    province: "Ontario",
    postalCode: "K2P 2L8",
    country: "Canada",
    locationArrangement: "Remote",
    duration: "4 month work term",
    compensation: "$34–$47/hr",
    summary:
      "Work with Shopify's infrastructure teams to improve the reliability, scalability, and automation of systems supporting millions of merchants. This role provides hands-on experience with cloud infrastructure, deployment systems, and developer tooling.",
    responsibilities:
      "Automate infrastructure and deployment workflows. Monitor system performance and reliability. Build and maintain CI/CD pipelines. Investigate infrastructure issues and develop long-term solutions. Collaborate with developers and infrastructure engineers to improve developer productivity.",
    requiredSkills: [
      "Currently enrolled in Computer Engineering, Computer Science, Software Engineering, or a related program",
      "Experience with Linux and command-line tools",
      "Familiarity with Git and CI/CD concepts",
      "Basic understanding of cloud infrastructure and networking",
      "Experience with Python, Go, Bash, or another scripting language",
    ],
  },

  {
    id: "job-duolingo-ios-engineer",
    employer: "Duolingo",
    title: "iOS Software Engineer Intern",
    employerJobNumber: "DUO-2027-017",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 1,
    levels: ["Junior"],
    region: "North America",
    province: "Ontario",
    postalCode: "M5J 2N8",
    country: "Canada",
    locationArrangement: "Remote",
    duration: "4 month work term",
    compensation: "$32–$45/hr",
    summary:
      "Help build Duolingo's mobile learning experience as an iOS Software Engineer Intern. You will work on features used by millions of learners while collaborating with product designers, engineers, and learning scientists.",
    responsibilities:
      "Develop and maintain iOS application features using Swift. Write unit and UI tests. Collaborate with designers and product managers to implement engaging learning experiences. Debug application issues and improve performance, reliability, and accessibility.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, Software Engineering, or a related program",
      "Experience with Swift or another object-oriented programming language",
      "Interest in mobile application development",
      "Understanding of software testing and debugging",
      "Strong problem-solving and collaboration skills",
    ],
  },
  {
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
    ],
  },

  {
    id: "job-figma-product-designer",
    employer: "Figma",
    title: "Product Design Intern",
    employerJobNumber: "FIG-2027-014",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "San Francisco Bay Area",
    province: "California",
    postalCode: "94107",
    country: "United States",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$38–$50/hr",
    summary:
      "Figma is looking for a Product Design Intern to help create intuitive tools for people who build and collaborate on digital products. You will work closely with designers, engineers, and product managers throughout the product development process.",
    responsibilities:
      "Create wireframes, prototypes, and high-fidelity product designs. Conduct design exploration and iterate based on feedback. Collaborate with product and engineering teams to bring concepts into production. Help maintain design systems and contribute to user research activities.",
    requiredSkills: [
      "Currently pursuing an undergraduate degree in Design, Human-Computer Interaction, or a related field",
      "Experience with Figma or comparable design tools",
      "Understanding of user-centered design principles",
      "Strong visual, interaction, and communication skills",
      "Portfolio demonstrating product or interface design work",
    ],
  },

  {
    id: "job-anthropic-ml-research",
    employer: "Anthropic",
    title: "Machine Learning Research Intern",
    employerJobNumber: "ANTH-2027-008",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior", "Intermediate"],
    region: "San Francisco Bay Area",
    province: "California",
    postalCode: "94105",
    country: "United States",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$50–$65/hr",
    summary:
      "Work with Anthropic's research and engineering teams on problems related to large language models, machine learning, and AI safety. Interns have the opportunity to conduct experiments, analyze model behavior, and contribute to research projects.",
    responsibilities:
      "Design and run machine learning experiments. Implement and evaluate research ideas. Analyze model behavior and experimental results. Develop tooling for training and evaluation workflows. Collaborate with researchers and engineers and communicate findings through technical documentation and presentations.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, Mathematics, or a related undergraduate program",
      "Strong Python programming skills",
      "Understanding of machine learning fundamentals",
      "Experience with PyTorch, TensorFlow, or another machine learning framework",
      "Strong mathematical and analytical problem-solving skills",
    ],
  },

  {
    id: "job-stripe-backend-engineer",
    employer: "Stripe",
    title: "Backend Software Engineer Intern",
    employerJobNumber: "STRP-2027-031",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "Northeastern United States",
    province: "New York",
    postalCode: "10011",
    country: "United States",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$40–$55/hr",
    summary:
      "Join Stripe's engineering organization and help build infrastructure that powers payments and financial services for businesses around the world. You will work on backend systems with a focus on reliability, scalability, and developer experience.",
    responsibilities:
      "Build and maintain backend services and APIs. Write reliable, well-tested code and participate in code reviews. Investigate production issues and improve system reliability. Collaborate with product and engineering teams to design scalable solutions.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, Software Engineering, or a related program",
      "Experience with Java, Ruby, Python, Go, or another backend programming language",
      "Understanding of object-oriented programming and data structures",
      "Interest in distributed systems and backend infrastructure",
    ],
  },

  {
    id: "job-notion-frontend-engineer",
    employer: "Notion",
    title: "Frontend Software Engineer Intern",
    employerJobNumber: "NOT-2027-019",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "North America",
    province: "Ontario",
    postalCode: "M5V 2T6",
    country: "Canada",
    locationArrangement: "Remote",
    duration: "4 month work term",
    compensation: "$35–$48/hr",
    summary:
      "Help build the collaborative workspace experience at Notion. As a Frontend Software Engineer Intern, you will work on user-facing features and interfaces while collaborating closely with product designers and backend engineers.",
    responsibilities:
      "Develop responsive and accessible user interfaces using React and TypeScript. Build reusable frontend components. Improve application performance and usability. Work with designers and engineers to ship new product features and participate in code reviews.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, or a related undergraduate program",
      "Experience with JavaScript or TypeScript",
      "Experience with React or another modern frontend framework",
      "Understanding of HTML, CSS, and responsive web development",
      "Strong attention to user experience and interface quality",
    ],
  },

  {
    id: "job-airbnb-data-analyst",
    employer: "Airbnb",
    title: "Data Analytics Intern",
    employerJobNumber: "ABNB-2027-012",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 1,
    levels: ["Junior"],
    region: "Greater Toronto Area",
    province: "Ontario",
    postalCode: "M5H 2N2",
    country: "Canada",
    locationArrangement: "Hybrid",
    duration: "4 month work term",
    compensation: "$30–$42/hr",
    summary:
      "Join Airbnb's analytics organization and help teams make data-informed decisions across the platform. You will work with large datasets, develop analytical insights, and communicate findings to business and product stakeholders.",
    responsibilities:
      "Analyze product and business datasets using SQL and Python. Build dashboards and reports to communicate trends. Identify opportunities through exploratory data analysis. Work with product managers and business teams to answer analytical questions and support decision-making.",
    requiredSkills: [
      "Currently enrolled in Statistics, Computer Science, Mathematics, Engineering, Economics, or a related program",
      "Strong SQL skills",
      "Experience with Python, R, or another data analysis language",
      "Understanding of statistics and data visualization",
      "Strong written and verbal communication skills",
    ],
  },

  {
    id: "job-shopify-devops",
    employer: "Shopify",
    title: "DevOps Engineering Intern",
    employerJobNumber: "SHOP-2027-024",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 2,
    levels: ["Junior"],
    region: "Canada",
    province: "Ontario",
    postalCode: "K2P 2L8",
    country: "Canada",
    locationArrangement: "Remote",
    duration: "4 month work term",
    compensation: "$34–$47/hr",
    summary:
      "Work with Shopify's infrastructure teams to improve the reliability, scalability, and automation of systems supporting millions of merchants. This role provides hands-on experience with cloud infrastructure, deployment systems, and developer tooling.",
    responsibilities:
      "Automate infrastructure and deployment workflows. Monitor system performance and reliability. Build and maintain CI/CD pipelines. Investigate infrastructure issues and develop long-term solutions. Collaborate with developers and infrastructure engineers to improve developer productivity.",
    requiredSkills: [
      "Currently enrolled in Computer Engineering, Computer Science, Software Engineering, or a related program",
      "Experience with Linux and command-line tools",
      "Familiarity with Git and CI/CD concepts",
      "Basic understanding of cloud infrastructure and networking",
      "Experience with Python, Go, Bash, or another scripting language",
    ],
  },

  {
    id: "job-duolingo-ios-engineer",
    employer: "Duolingo",
    title: "iOS Software Engineer Intern",
    employerJobNumber: "DUO-2027-017",
    workTerm: "2027 — Winter",
    jobType: "Co-op Main",
    openings: 1,
    levels: ["Junior"],
    region: "North America",
    province: "Ontario",
    postalCode: "M5J 2N8",
    country: "Canada",
    locationArrangement: "Remote",
    duration: "4 month work term",
    compensation: "$32–$45/hr",
    summary:
      "Help build Duolingo's mobile learning experience as an iOS Software Engineer Intern. You will work on features used by millions of learners while collaborating with product designers, engineers, and learning scientists.",
    responsibilities:
      "Develop and maintain iOS application features using Swift. Write unit and UI tests. Collaborate with designers and product managers to implement engaging learning experiences. Debug application issues and improve performance, reliability, and accessibility.",
    requiredSkills: [
      "Currently enrolled in Computer Science, Computer Engineering, Software Engineering, or a related program",
      "Experience with Swift or another object-oriented programming language",
      "Interest in mobile application development",
      "Understanding of software testing and debugging",
      "Strong problem-solving and collaboration skills",
    ],
  },
];

export default function JobsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const MIN_SCALE = 0.82;
    const MIN_OPACITY = 0.35;

    let frame = 0;

    const update = () => {
      const containerRect = container.getBoundingClientRect();

      for (const card of cardRefs.current) {
        if (!card) continue;

        const rect = card.getBoundingClientRect();

        const visibleTop = Math.max(rect.top, containerRect.top);
        const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        const progress =
          rect.height > 0 ? (visibleHeight * 1.05) / rect.height : 0;

        const scale = MIN_SCALE + progress * (1 - MIN_SCALE);
        const opacity = MIN_OPACITY + progress * (1 - MIN_OPACITY);

        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity.toString();
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="px-24 pt-[72px]">
        <JobsSearch />
      </div>
      <div
        ref={containerRef}
        className="px-24 w-full relative z-10 h-[85vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {DEFAULT_JOBS.map((j, index) => (
          <JobCard
            key={`${j.employer}-${j.title}`}
            job={j}
            accent={
              index % 4 === 0
                ? "#00e5ff"
                : index % 4 === 1
                  ? "#7b5cf5"
                  : index % 4 === 2
                    ? "#1a8fff"
                    : "#00ffc8"
            }
            selectJob={setSelectedJob}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          />
        ))}
      </div>

      {selectedJob && (
        <JobInfo job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}
