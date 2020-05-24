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

export function PrivateRoute({ children, ...rest }) {
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
              pathname: '/signin',
              state: { from: location },
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

  const updateName = (name) => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateEmail = (currentPassword, newEmail) => {
    reAuthenticate(currentPassword)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateEmail(newEmail)
          .then(() => {
            alert('Email was changed');
            window.location.replace('/updateProfile');
          })
          .catch(function (error) {
            alert(error.message);
          });
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const updatePassword = (currentPassword, newPassword) => {
    reAuthenticate(currentPassword)
      .then(() => {
        firebase
          .auth()
          .currentUser.updatePassword(newPassword)
          .then(() => {
            alert('Password was changes!');
            signOut();
          })
          .catch(function (error) {
            alert(error.message);
          });
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const reAuthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
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
    updateName,
    updateEmail,
    updatePassword,
  };
};

export default Auth;
