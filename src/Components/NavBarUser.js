import React, { useState } from 'react';
import { FaClipboardList, FaUserFriends, FaUserCircle, FaMoneyCheckAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../Assets/Images/logo.jpeg'; // Asegúrate de que el logo esté correctamente ubicado en la carpeta

function NavBarUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Changes');

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbaruser">
      <div className="navbaruser__logo-container">
        <img src={logo} alt="Logo" className="navbaruser__logo" />
      </div>
      <FaBars className="navbaruser__hamburger" onClick={toggleMenu} />
      <ul className={`navbaruser__list ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/movements" className="navbaruser__link">
          <li className={activeItem === 'Movimientos' ? 'navbaruser__item navbaruser__item--highlighted': 'navbaruser__item'} onClick={()=> {handleClick('Movimientos')}}>
            <FaClipboardList className="navbaruser__icon" />
            <span>Movimientos</span>
          </li>
        </Link>
        <Link to="/directory" className="navbaruser__link">
          <li className={activeItem === 'Directorio' ? 'navbaruser__item navbaruser__item--highlighted': 'navbaruser__item'} onClick={()=> {handleClick('Directorio')}}>
            <FaUserFriends className="navbaruser__icon" />
            <span>Directorio</span>
          </li>
        </Link>
        <Link to="/Profile" className="navbaruser__link">
          <li className={activeItem === 'Perfil' ? 'navbaruser__item navbaruser__item--highlighted': 'navbaruser__item'} onClick={()=> {handleClick('Perfil')}}>
            <FaUserCircle className="navbaruser__icon" />
            <span>Perfil</span>
          </li>
        </Link>
        <Link to="/changes" className="navbaruser__link">
          <li className={activeItem === 'Changes' ? 'navbaruser__item navbaruser__item--highlighted': 'navbaruser__item'} onClick={()=> {handleClick('Changes')}}>
            <FaMoneyCheckAlt className="navbaruser__icon" />
            <span>Enviar Remesa</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export { NavBarUser };
