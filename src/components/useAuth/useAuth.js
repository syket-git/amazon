import React, { useState, createContext, useContext, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export function PrivateRoute({ children, ...rest }){
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }







const Auth = () => {
  const [user, setUser] = useState(null);
  console.log(user);


  const getUser = (user) => {
    const { displayName, email } = user;
    return { name: displayName, email };
  };

  const createUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            const signedIn = getUser(res.user);
            setUser(signedIn);
            window.history.back();
          });
      })
      .catch((err) => {
        setUser({ err: err.message });
      });
  };

  const signedInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const signedIn = getUser(res.user);
        setUser(signedIn);
        window.history.back();
      })
      .catch((err) => {
        setUser({ err: err.message });
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setUser(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const signedIn = getUser(usr);
        setUser(signedIn);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return {
    user,
    createUser,
    signedInUser,
    signOut,
  };
};

export default Auth;
