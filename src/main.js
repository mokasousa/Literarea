import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/home.js';

function locationHashChanged() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.hash === '#home') {
        document.querySelector('main').innerHTML = Home();
      } else if (window.location.hash === '#login' || window.location.hash === '') {
        document.querySelector('main').innerHTML = Login();
        document.getElementsByTagName('body')[0].className = 'login-bg';
      } else if (window.location.hash === '#signup') {
        document.querySelector('main').innerHTML = Signup();
        document.getElementsByTagName('body')[0].className = 'signup-bg'
      } 
      
    } else if (!user) {
      if (window.location.hash === '#login' || window.location.hash === '') {
        document.querySelector('main').innerHTML = Login();
      } else if (window.location.hash === '#signup') {
        document.querySelector('main').innerHTML = Signup();
      }
    }
  });
}

  // if (window.location.hash === '#home') {
  //         document.querySelector('main').innerHTML = Home();  
  //       } else if (window.location.hash === '#login' || window.location.hash === '') {
  //         document.querySelector('main').innerHTML = Login();
  //         document.getElementsByTagName('body')[0].className = 'login-bg'
  //       } else if (window.location.hash === '#signup') {
  //         document.querySelector('main').innerHTML = Signup();
  //       }


window.addEventListener('load', locationHashChanged);
window.addEventListener('hashchange', locationHashChanged, false);