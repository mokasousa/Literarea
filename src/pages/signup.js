import Button from '../Components/button.js';
import Input from '../Components/input.js';

function newUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const name = document.querySelector('.name-input').value;
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
                endereco: '',
                livros: '',
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
    ${Input({
    type: 'text',
    class: 'name-input',
    placeholder: 'Nome',
    value: '',
  })}
    ${Input({
    type: 'email',
    class: 'email-input',
    placeholder: 'Email',
    value: '',
  })}
    ${Input({
    type: 'password',
    class: 'password-input',
    placeholder: 'Senha',
    value: '',
  })}
  ${Input({
    type: 'text',
    class: 'adress-input',
    placeholder: 'Endereço para troca',
    value: '',
  })}
    ${Button({
    class: 'btn-register',
    id: 'btn-new-user',
    onclick: newUser,
    title: 'Cadastrar',
  })}
  ${Button({
    class: 'btn-back',
    onclick: 
    title: 'Cadastrar',
  })}
  `;
  const template = `
    <header class="main-header">
      <img src='/images/logo2.png'/>
    </header>
    <form class="form-content-signup">
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