import { links, navLinks } from '@/constants';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import NavLink from './NavLink';

export default function Navbar() {
  return (
    <header>
      <Image
        src={'/logo-devlinks-small.svg'}
        alt="logo"
        width={27}
        height={27}
        className="md:hidden"
      />
      <Image
        src={'/logo-devlinks-large.svg'}
        alt="logo"
        width={146}
        height={32}
        className="hidden md:block"
      />

      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={nanoid()}>
              <NavLink
                name={link.name}
                img={link.img}
                imgActive={link.imgActive}
                path={link.path}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
