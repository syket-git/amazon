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
import { AuthContextProvider } from './components/useAuth/useAuth';
import { PrivateRoute } from './components/useAuth/useAuth';
import Shipment from './components/Shipment/Shipment';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import ChangeEmailAddress from './components/ChangeEmailAddress/ChangeEmailAddress';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import MessengerCustomerChat from 'react-messenger-customer-chat';

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

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>

    
    <AuthContextProvider>
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
            <PrivateRoute path="/profile/:email">
              <Header></Header>
              <Profile></Profile>
            </PrivateRoute>
            <PrivateRoute path="/updateProfile">
              <Header></Header>
              <UpdateProfile></UpdateProfile>
            </PrivateRoute>
            <PrivateRoute path="/shipment">
              <Header></Header>
              <Shipment clearCart={clearCart} cart={cart}></Shipment>
            </PrivateRoute>
            <PrivateRoute path="/changeEmailAddress">
              <Header></Header>
              <ChangeEmailAddress></ChangeEmailAddress>
            </PrivateRoute>
            <PrivateRoute path="/changePassword">
              <Header></Header>
              <ChangePassword></ChangePassword>
            </PrivateRoute>
            <Route path="/forgotPassword">
              <Header></Header>
              <ForgotPassword></ForgotPassword>
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
    </AuthContextProvider>
    <div>
    <MessengerCustomerChat
          pageId="569663633384208"
          appId="3502355216449313"
      />
      </div>
    </div>
  );
};

export default App;
