export interface Job {
  id: string;
  title: string;
  employer: string;
  workTerm: string;
  jobType: string;
  employerJobNumber: string;
  openings: number;
  levels: string[];
  region: string;
  province: string;
  postalCode: string;
  country: string;
  locationArrangement: string;
  duration: string;
  compensation: string;
  summary: string;
  responsibilities: string;
  requiredSkills: string[];
}