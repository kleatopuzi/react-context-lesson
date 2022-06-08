import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import createUserContext from "./contexts/current-user/current-user.context";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      createUserContext: null,
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      this.setState(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <createUserContext.Provider value={this.state.currentUser}>
          <Header />
        </createUserContext.Provider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shop/*" element={<ShopPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          {/* <Route exact path="/signin" element={<Navigate replace to="/" />} /> */}

          <Route
            path="/signin"
            element={
              this.state.currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          ></Route>

          {/* <Route exact path="/signin" render={<SignInAndSignUpPage />}></Route> */}
        </Routes>
      </div>
    );
  }
}

export default App;
