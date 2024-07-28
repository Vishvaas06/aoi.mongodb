import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
    <nav className='navbar'>
    <div className='left' href='/'>
      <img src="/images/logo.gif" alt="Sukuna Logo" className='logo' />
      <h2>Sukuna</h2>
    </div>
    <button className='menuButton' onClick={toggleMenu}>
      &#9776;
    </button>
    <div className={`center ${menuOpen ? "showMenu" : ''}`}>
      <Link href="/">Home</Link>
      <Link href="/cards">Cards</Link>
      <Link href="https://discord.gg/3JHqnphebk">Support</Link>
      <Link href="https://discordbotlist.com/bots/sukuna-8737/upvote">Vote</Link>
    </div>
  </nav>
    <div className="container">
      <div className="banner"></div>
      <div className="button">
        <button className='prm-button'>Add To Discord</button>
        <button className='prm-button'>Browse Features</button>
      </div>
      <div className='content'>
      </div>
    </div>
    </>
  );
}
