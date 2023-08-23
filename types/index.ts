export enum Platforms {
  github = 'Github',
  frontendMentor = 'Frontend Mentor',
  twitter = 'Twitter',
  linkedin = 'LinkedIn',
  youtube = 'YouTube',
  facebook = 'Facebook',
  twitch = 'Twitch',
  devto = 'Dev.to',
  codewars = 'Codewars',
  codepen = 'Codepen',
  freeCodeCamp = 'freeCodeCamp',
  gitlab = 'GitLab',
  hashnode = 'Hashnode',
  stackOverflow = 'Stack Overflow',
  onlyfans = "OnlyFans"
}

export interface User {
  _id: string;
  id: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  links: Link[];
  onboarded: boolean;
}

export interface Link {
  _id: string;
  link: string;
  platform: Platforms | "empty";
  author: string;
  createdAt: number;
}
