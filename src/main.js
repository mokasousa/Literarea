import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/home.js';

function locationHashChanged() {
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
      if (window.location.hash === '#home') {
        document.querySelector('main').innerHTML = Home();
      } else if (window.location.hash === '#login' || window.location.hash === '') {
        document.querySelector('main').innerHTML = Login();
      } else if (window.location.hash === '#signup') {
        document.querySelector('main').innerHTML = Signup();
      } 
    // } else (!user) {
    //   if (window.location.hash === '#login' || window.location.hash === '') {
    //     document.querySelector('main').innerHTML = Login();
    //   } else if (window.location.hash === '#signup') {
    //     document.querySelector('main').innerHTML = Signup();
      // }
  //   }
  // });
}
window.addEventListener('load', locationHashChanged);
window.addEventListener('hashchange', locationHashChanged, false);