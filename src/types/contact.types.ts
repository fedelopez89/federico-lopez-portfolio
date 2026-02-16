export interface ContactItem {
  id: string;
  href: string;
  classname: string;
}

export interface ContactConfig {
  sectionId: string;
  itemContacts: ContactItem[];
}
