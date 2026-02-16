export interface Institute {
  name: string;
  href: string;
}

export interface EducationDatePeriod {
  month: string;
  year: string;
}

export interface EducationPlace {
  province: string;
  country: string;
}

export interface Education {
  id: string;
  title: string;
  institute: Institute;
  start: EducationDatePeriod;
  end: EducationDatePeriod;
  place: EducationPlace;
  notes: string;
}

export interface EducationConfig {
  sectionId: string;
  educations: Education[];
}
