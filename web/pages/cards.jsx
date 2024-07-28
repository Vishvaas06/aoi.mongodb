import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Cards = ({ cardsData }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    // Ensure cardsData is an array before trying to filter
    const filteredCards = Array.isArray(cardsData)
        ? cardsData.filter(card =>
            card.name.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <>
            <Head>
                <title>Cards | Sukuna Bot</title>
            </Head>
            <nav className='navbar' style={{ position: 'relative' }}>
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
                <h1>Search Cards</h1>
                <input
                    type="text"
                    placeholder="Enter card name to search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-bar"
                />
                <div className="cards-grid">
                    {filteredCards.map((card, index) => (
                        <div key={`${card.id}-${index}`} className="card" style={getCardStyle(card.rank)}>
                            <img src={card.card} alt={card.name} className="card-image" />
                            <h2>{card.name}</h2>
                            <div className="card-details">
                                <p><strong>ID:</strong> {card.id}</p>
                                <p><strong>Rank:</strong> {card.rank}</p>
                                <p><strong>Type:</strong> {card.type}</p>
                                <p><strong>Upgradeable:</strong> {card.aceable ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const getCardStyle = (rank) => {
    switch (rank) {
        case 'X':
            return { background: 'linear-gradient(135deg, #fe50fc, #fe50fc)' };
        case 'U':
            return { background: 'linear-gradient(135deg, #ff4013, #ff4013)' };
        case 'S':
            return { background: 'linear-gradient(135deg, #fad23b, #fad23b)' };
        case 'A':
            return { background: 'linear-gradient(135deg, #80d56a, #80d56a)' };
        case 'B':
            return { background: 'linear-gradient(135deg, #4d63c7, #4d63c7)' };
        case 'C':
            return { background: 'linear-gradient(135deg, #70388a, #70388a)' };
        case 'D':
            return { background: 'linear-gradient(135deg, #957a97, #957a97)' };
        default:
            return { background: 'rgba(255, 255, 255, 0.1)' };
    }
};

export const getStaticProps = async () => {
    try {
        console.log('Fetching card list...');
        const response = await fetch('https://jjkapi.vercel.app/cards');
        if (!response.ok) {
            throw new Error(`Error fetching cards list: ${response.statusText}`);
        }
        const data = await response.json();

        const cardPromises = data.map(card =>
            fetch(`https://jjkapi.vercel.app/card/${card.value}`).then(res => {
                if (!res.ok) {
                    throw new Error(`Error fetching card ${card.value}: ${res.statusText}`);
                }
                return res.json();
            })
        );

        const cardDetails = await Promise.all(cardPromises);

        return {
            props: {
                cardsData: cardDetails,
            },
            revalidate: 12*3600, // Revalidate data every 60 seconds
        };
    } catch (error) {
        console.error('Error fetching card data:', error);
        return {
            props: {
                cardsData: [],
            },
        };
    }
};

export default Cards;