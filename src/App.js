import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Content from '../src/components/Content/Content';
import Footer from '../src/components/Footer/Footer';
import ClickProduct from '../src/components/ClickProduct/ClickProduct';
import CartScreen from './components/CartScree/CartScreen';
import Error from './components/Error/Error';
import SignIn from './components/SignIn/SignIn';
import Signup from './components/Signup/Signup';
import Cookies from 'js-cookie';

export const cartContext = createContext();

const App = () => {
  const [cart, setCart] = useState([]);
  Cookies.set('cart', JSON.stringify(cart));

  const cartHandler = (data) => {
    const alreadyAdded = cart.find((crt) => crt.id === data.id);
    if (alreadyAdded) {
      const remainingCart = cart.filter((crt) => crt.id !== data.id);
      setCart(remainingCart);
    } else {
      const newCart = [...cart, data];
      setCart(newCart);
    }
  };

  const cartQuantityHandler = (productId, productQuantity) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        item.quantity = productQuantity;
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };

  const DeleteFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <cartContext.Provider value={cart}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
          </Route>
          <Route exact path="/product/:id">
            <ClickProduct cartHandler={cartHandler}></ClickProduct>
          </Route>
          <Route exact path="/cart">
            <Header></Header>
            <CartScreen
              cart={cart}
              DeleteFromCart={DeleteFromCart}
              cartQuantityHandler={cartQuantityHandler}
            ></CartScreen>
          </Route>
          <Route path="/signin">
            <Header></Header>
            <SignIn></SignIn>
          </Route>
          <Route path="/signup">
            <Header></Header>
            <Signup></Signup>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </cartContext.Provider>
  );
};

export default App;
