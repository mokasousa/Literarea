
import Button from '../Components/button.js';
import Input from '../Components/input.js';

function loginRegisteredUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      if (cred.user) {
        window.location = '#home';
      }
    }).catch(() => {
      const errorMessageField = document.getElementById('errorMessage');
      errorMessageField.textContent = 'Email e/ou senha inválidos.';
      document.querySelector('.email-input').addEventListener('focus', () => {
        errorMessageField.textContent = '';
      });
    });
}

function signInWithAccount(provider) {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
        if (doc.data()) {
          window.location.hash = '#home';
        } else {
          firebase.firestore().collection('users').doc(user.uid).set({
            name: user.displayName,
            biography: '',
          });
          window.location.hash = '#home';
        }
      });
    });
}

function loginGoogleUser() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithAccount(provider);
}

function Login() {
  const userLogin = `

  <p class='email'>E-mail</p>
  ${Input({
    type: 'email',
    class: 'email-input',
    placeholder: 'exemplo@email.com',
    value: '',
  })}

  <p class='password'>Senha</p>
  ${Input({
    type: 'password',
    class: 'password-input',
    placeholder: 'Senha',
    value: '',
  })}

  <div class='login-btns'>
  ${Button({
    class: 'btn-login',
    id: 'btn-log-in',
    onclick: loginRegisteredUser,
    title: 'ENTRAR',
  })}
  </div>
  `;
  const template = `
  
  <article class='login-page'>
  <form class="form-content-login">
    <div class='logo-container'><img class='login-logo' src='/images/Logo.png'/></div><br>
    ${userLogin}
    <div id="errorMessage" class="error-message"></div>
    <p class='register-call'>É novo por aqui?<a class='register-link' href="#signup">REGISTRE-SE!</a></p> 
  </form>
  </article>
  `;
  return template;
}

export default Login;

window.signInWithAccount = signInWithAccount;



  // ${Button({
  //   id: 'authGoogleButton',
  //   class: 'btn-google',
  //   onclick: loginGoogleUser,
  //   title: `<img src='/images/google-btn.png'>`,
  // })}