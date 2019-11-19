import Button from '../Components/button.js';
import Input from '../Components/input.js';

function newUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const name = document.querySelector('.name-input').value;
  const address = document.querySelector('.address-input').value;
  const errorMessageField = document.getElementById('errorMessageSignup');
  if (email.length > 0 && password.length > 0 && name.length > 0) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        if (resp.user) {
          resp.user.updateProfile({
            displayName: name,
          })
            .then(() => {
              firebase.firestore().collection('users').doc(resp.user.uid).set({
                name,
                address,
              })
                .then(() => {
                  window.location = '#login';
                });
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          errorMessageField.textContent = 'Email inválido.';
        } else if (errorCode === 'auth/weak-password') {
          errorMessageField.textContent = 'A senha deve conter 6 caracteres ou mais.';
        }
      });
  } else {
    errorMessageField.textContent = 'Preencha todos os campos para realizar seu cadastro!';
  }
}

function Signup() {
  const userInfo = `
    <p class='name'>Nome</p>
    ${Input({
    type: 'text',
    class: 'name-input',
    placeholder: 'Nome',
    value: '',
  })}
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
    <p class='address'>Endereço</p>
    ${Input({
    type: 'text',
    class: 'address-input',
    placeholder: 'Endereço para troca',
    value: '',
  })}
  <div class='register-btns-container'>
    ${Button({
    class: 'btn-register',
    id: 'btn-new-user',
    onclick: newUser,
    title: 'CADASTRAR',
  })}
  ${Button({
    class: 'btn-back',
    id: 'btn-back',
    onclick: () => window.location.hash = '#login',
    title: 'VOLTAR',
  })}
  </div>
`;
  
  const template = `
  <form class="form-content-signup">
  <div class='logo-container'><img class='register-logo' src='/images/logo2.png'/></div>
    <main class="register-input">
      <p class="register-text">Faça parte da nossa comunidade de leitores!</p>
      ${userInfo}
        <div id="errorMessageSignup" class="error-message"></div>
    </main>
  </form>
    `;
  return template;
}

export default Signup;