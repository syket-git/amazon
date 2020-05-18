import React from 'react';
import {BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Content from '../src/components/Content/Content';
import Footer from '../src/components/Footer/Footer';
import ClickProduct from '../src/components/ClickProduct/ClickProduct';
import CartScreen from './components/CartScree/CartScreen';

const App = () => {

  return(
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
              <Header></Header>
              <Content></Content>
              <Footer></Footer>
          </Route>
          <Route exact path="/product/:id">
            <ClickProduct></ClickProduct>
          </Route>
          <Route exact path="/cart/:id?">
            <Header></Header>
            <CartScreen></CartScreen>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;