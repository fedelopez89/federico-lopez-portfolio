export interface Company {
  name: string;
  href: string;
}

export interface DatePeriod {
  month: string;
  year: string;
}

export interface EndDate extends DatePeriod {
  active: boolean;
}

export interface Place {
  remote: boolean;
  province: string;
  country: string;
}

export interface Experience {
  id: string;
  rol: string;
  company: Company;
  start: DatePeriod;
  end: EndDate;
  place: Place;
  notes: string;
}

export interface ExperienceConfig {
  sectionId: string;
  experiences: Experience[];
}
