import React from 'react';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="form sign-in" style={styles.form}>
        <h2>Welcome back,</h2>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <p className="forgot-pass">Forgot password?</p>
        <button type="button" className="submit">Sign In</button>
        <button type="button" className="fb-btn">Connect with <span>Facebook</span></button>
      </div>
    );
  }
}

class SignUpForm extends React.Component {
  render() {
    return (
      <div className="form sign-up" style={styles.form}>
        <h2>Time to feel like home,</h2>
        <label>
          <span>Name</span>
          <input type="text" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <button type="button" className="submit">Sign Up</button>
        <button type="button" className="fb-btn">Join with <span>Facebook</span></button>
      </div>
    );
  }
}

class LoginRegistrationForm extends React.Component {

  componentDidMount() {
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }

  render() {
    return (
      <div>
        <div className="cont" style={styles.form}>
          <LoginForm />
          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>New here?</h2>
                <p>Sign up and discover a great number of new opportunities!</p>
              </div>
              <div className="img__text m--in">
                <h2>One of us?</h2>
                <p>If you already have an account, just sign in. We've missed you!</p>
              </div>
              <div className="img__btn">
                <span className="m--up">Sign Up</span>
                <span className="m--in">Sign In</span>
              </div>
            </div>
            <SignUpForm />
          </div>
        </div>
        <a href="https://dribbble.com/shots/3306190-Login-Registration-form" target="_blank" rel="noopener noreferrer" className="icon-link">
          <img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png" alt="Dribbble" />
        </a>
        <a href="https://twitter.com/NikolayTalanov" target="_blank" rel="noopener noreferrer" className="icon-link icon-link--twitter">
          <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png" alt="Twitter" />
        </a>
      </div>
    );
  }
}

const styles = {
  cont: {
    overflow: 'hidden',
    position: 'relative',
    width: '900px',
    height: '550px',
    margin: '0 auto 100px',
    background: '#fff',
  },
  form: {
    position: 'relative',
    width: 'calc(900px - 260px)',
    height: '100%',
    transition: 'transform 1.2s ease-in-out',
    padding: '50px 30px 0',
  },
  iconLink: {
    position: 'absolute',
    left: '5px',
    bottom: '5px',
    width: '32px',
  },
  tip: {
    fontSize: '20px',
    margin: '40px auto 50px',
    textAlign: 'center',
  },
  subCont: {
    overflow: 'hidden',
    position: 'absolute',
    left: 'calc(900px - 260px)',
    top: '0',
    width: '900px',
    height: '100%',
    paddingLeft: '260px',
    background: '#fff',
    transition: 'transform 1.2s ease-in-out',
  },
  img: {
    overflow: 'hidden',
    zIndex: '2',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '260px',
    height: '100%',
    paddingTop: '360px',
  },
  imgBefore: {
    content: '',
    position: 'absolute',
    right: '0',
    top: '0',
    width: '900px',
    height: '100%',
    backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg")',
    backgroundSize: 'cover',
    transition: 'transform 1.2s ease-in-out',
  },
  imgAfter: {
    content: '',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.6)',
  },
  imgText: {
    zIndex: '2',
    position: 'absolute',
    left: '0',
    top: '50px',
    width: '100%',
    padding: '0 20px',
    textAlign: 'center',
    color: '#fff',
    transition: 'transform 1.2s ease-in-out',
  },
  imgTextH2: {
    marginBottom: '10px',
    fontWeight: 'normal',
  },
  imgTextP: {
    fontSize: '14px',
    lineHeight: '1.5',
  },
  imgTextMUp: {
    transform: 'translateX(520px)',
  },
  imgTextMIn: {
    transform: 'translateX(-520px)',
  },
  imgBtn: {
    overflow: 'hidden',
    zIndex: '2',
    position: 'relative',
    width: '100px',
    height: '36px',
    margin: '0 auto',
    background: 'transparent',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '15px',
    cursor: 'pointer',
  },
  imgBtnAfter: {
    content: '',
    zIndex: '2',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    border: '2px solid #fff',
    borderRadius: '30px',
  },
  imgBtnSpan: {
    position: 'absolute',
    left: '0',
    top: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    transition: 'transform 1.2s',
  },
  imgBtnSpanMIn: {
    transform: 'translateY(-72px)',
  },
  imgBtnSpanMUp: {
    transform: 'translateY(72px)',
  },
};

export default LoginRegistrationForm;


export default LoginRegistrationForm;

