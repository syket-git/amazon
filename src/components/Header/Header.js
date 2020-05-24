import React, { useContext } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import img from '../../images/logo.png';
import { cartContext } from '../../App';
import { useAuth } from '../useAuth/useAuth';

const Header = (props) => {
  const auth = useAuth();
  console.log(auth);

  const items = useContext(cartContext);
  const handleOpen = () => {
    document.querySelector('.bar-part').classList.toggle('open');
  };
  return (
    <div>
      <div className="header">
        <div className="first">
          <span onClick={handleOpen} className="bar">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <div className="h2">
            <Link to="/">
              <img
                style={{ marginTop: '6px', marginLeft: '10px' }}
                src={img}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="bar-part">
          <h2>Shopping Category</h2>
          <ul>
            <li>
              <Link to="/shirts">Shirts</Link>
            </li>
            <li>
              <Link to="/shirts">Pants</Link>
            </li>
            <li>
              <Link to="/shirts">Shoes</Link>
            </li>
            <li>
              <Link to="/shirts">Blezer</Link>
            </li>
            <li>
              <Link to="/shirts">Cosmetics</Link>
            </li>
            <li>
              <Link to="/shirts">Ladies Shoes</Link>
            </li>
          </ul>
        </div>
        <div className="third-part">
          <ul className="ml-auto">
            <li>
              <Link to="/cart">
                Cart <Badge variant="warning">{items.length}</Badge>
              </Link>
            </li>

            <li>
              {auth.user ? <span>{auth.user.name}</span> : <Link to="/signin">Sign in</Link>}
            </li>
            <li>
              {auth.user ? <Link onClick={auth.signOut}>Sing out</Link> :  <Link to="/signup">Sign up</Link>}
             
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
