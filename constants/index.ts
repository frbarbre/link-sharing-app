import { Platforms } from '@/types';
import github from '../public/icon-github.svg';
import frontendMentor from '../public/icon-frontend-mentor.svg';
import twitter from '../public/icon-twitter.svg';
import linkedin from '../public/icon-linkedin.svg';
import youtube from '../public/icon-youtube.svg';
import facebook from '../public/icon-facebook.svg';
import twitch from '../public/icon-twitch.svg';
import devTo from '../public/icon-devto.svg';
import codewars from '../public/icon-codewars.svg';
import codepen from '../public/icon-codepen.svg';
import freeCodeCamp from '../public/icon-freecodecamp.svg';
import gitlab from '../public/icon-gitlab.svg';
import hashnode from '../public/icon-hashnode.svg';
import stackOverflow from '../public/icon-stack-overflow.svg';
import onlyFans from '../public/icon-onlyfans.svg';

export const linksData = [
  {
    name: Platforms.github,
    img: github,
    backgroundColor: '#1A1A1A',
  },
  {
    name: Platforms.frontendMentor,
    img: frontendMentor,
    backgroundColor: '#FFFFFF',
  },
  {
    name: Platforms.twitter,
    img: twitter,
    backgroundColor: '#43B7E9',
  },
  {
    name: Platforms.linkedin,
    img: linkedin,
    backgroundColor: '#2D68FF',
  },
  {
    name: Platforms.youtube,
    img: youtube,
    backgroundColor: '#EE3939',
  },
  {
    name: Platforms.facebook,
    img: facebook,
    backgroundColor: '#2442AC',
  },
  {
    name: Platforms.twitch,
    img: twitch,
    backgroundColor: '#9146FF',
  },
  {
    name: Platforms.devto,
    img: devTo,
    backgroundColor: '#333333',
  },
  {
    name: Platforms.codewars,
    img: codewars,
    backgroundColor: '#8A1A50',
  },
  {
    name: Platforms.codepen,
    img: codepen,
    backgroundColor: '#7EB646',
  },
  {
    name: Platforms.freeCodeCamp,
    img: freeCodeCamp,
    backgroundColor: '#302267',
  },
  {
    name: Platforms.gitlab,
    img: gitlab,
    backgroundColor: '#EB4925',
  },
  {
    name: Platforms.hashnode,
    img: hashnode,
    backgroundColor: '#0330D1',
  },
  {
    name: Platforms.stackOverflow,
    img: stackOverflow,
    backgroundColor: '#EC7100',
  },
  {
    name: Platforms.onlyfans,
    img: onlyFans,
    backgroundColor: "#00AEEF"
  }
];

export const navLinks = [
  {
    name: 'Links',
    path: '/',
    img: '/icon-links-header.svg',
    imgActive: '/icon-links-header-active.svg',
  },
  {
    name: 'Profile Details',
    path: '/profile',
    img: '/icon-profile-details-header.svg',
    imgActive: '/icon-profile-details-header-active.svg',
  },
];
