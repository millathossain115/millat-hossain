import { IconType } from 'react-icons';
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/millathossain115',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/millathossain115/',
    icon: FaLinkedinIn,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/millathossain115',
    icon: FaFacebookF,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8801948257217',
    icon: FaWhatsapp,
  },
];

export default SOCIAL_LINKS;
