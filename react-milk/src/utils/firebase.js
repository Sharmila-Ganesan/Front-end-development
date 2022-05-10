import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAMOyhvMHGaIxI14Nwapolrzx8pUStaG2c",
  authDomain: "level-footing-288902.firebaseapp.com",
  databaseURL: "https://level-footing-288902.firebaseio.com",
  projectId: "level-footing-288902",
  storageBucket: "level-footing-288902.appspot.com",
  messagingSenderId: "445813268704",
  appId: "1:445813268704:web:13735b2576e6b039347085",
  measurementId: "G-NKPW4M01F3"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function setupRecaptcha(){
  return new Promise((resolve,reject)=>{
    if( !window.recaptchaVerifier){
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible'
      });
    }
    resolve();
  })
  
}
export function onOtpRequest(phoneNumber){
  console.log("called")
  return new Promise((resolve,reject)=>{
    setupRecaptcha().then( ()=>{
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      resolve();
      }).catch(function (error) {
      // Error; SMS not sent
      console.log(error)
      reject();
      // ...
      });
    }).catch(()=>{
      reject()
    })
    // phoneNumber = "";
    
  })
  
}

export function validateOtp(code){
  return new Promise((resolve,reject)=>{
    window.confirmationResult.confirm(code).then(function (result) {
      resolve();
      // ...
      }).catch(function (error) {
        console.log(error);
        reject();
      });
  })
 
}
// usage
// onOtpRequest("+919788145142").then(()=>{
//   var code = prompt("code","");
//   validateOtp(code).then(()=>{
//       console.log("success")
//   }).catch((err)=>{
//       console.log("failure")
//   })
// }).catch((err)=>{
//   console.log("something went wrong");
// })
export default firebase;