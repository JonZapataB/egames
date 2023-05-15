  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB6Ux6d4qL0gfVOkfDcSm9QNtwKYmTC72Y",
    authDomain: "egames-6fb2a.firebaseapp.com",
    projectId: "egames-6fb2a",
    storageBucket: "egames-6fb2a.appspot.com",
    messagingSenderId: "178618972886",
    appId: "1:178618972886:web:7fc5fca0c9b6ab497a2777"
  };

  // Initialize Firebase
   export const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
