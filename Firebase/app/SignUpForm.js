import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import {auth}from './firebase.js'

const signupForm = document.querySelector('#Signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['Signup-email'].value;
    const password = signupForm['Signup-password'].value;  
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredentials)

       const SignUpModal = document.querySelector('#SignUpModal')
        const modal = bootstrap.Modal.getInstance(SignUpModal)
        modal.hide()
    } catch (error) {
        console.log(error)
    }
});
//continuar en minuto 45 tutorial

