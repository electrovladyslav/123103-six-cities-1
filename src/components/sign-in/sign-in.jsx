import React from "react";
import PropTypes from "prop-types";

const SignIn = (props) => {
  if (props.isAuthorized) {
    return props.redirectToMain();
  }
  return (
    <React.Fragment>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(event) => {
                props.onSignIn(event.target[0].value, event.target[1].value);
              }}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  pattern="^([a-z0-9_\+\.-]+)@([a-z0-9\.-]+)\.([a-z\.]{2,6})"
                  placeholder="Email"
                  title="Exaple: email@box.com"
                  required={true}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={true}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  redirectToMain: PropTypes.func.isRequired,
};

export default SignIn;
