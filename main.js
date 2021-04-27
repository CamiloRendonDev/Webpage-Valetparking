
// registro
const signupForm = document.querySelector("#registrarse-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const Email = document.querySelector("#signup-email").value;
  const Password = document.querySelector("#signup-password").value;
  

  auth.createUserWithEmailAndPassword(Email, Password).then(userCredential => {
    //clear  form
    signupForm.reset();
    //close form
    $("#registromodal").modal("hide");
  }).catch(error =>{
    console.log(error)
    
  alert(error)
  })  
})

// login

const signinForm = document.querySelector("#iniciarsesion-form");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const Email = document.querySelector("#login-email").value;

  const Password = document.querySelector("#login-password").value;

  auth.signInWithEmailAndPassword(Email, Password).then(userCredential => {
    //clear form
    signinForm.reset();
    //close form
    $("#loginmodal").modal("hide");
  }).catch(error =>{
    console.log(error)
    
  alert(error)
  }) 
})

//logOut

const logout= document.querySelector('#logout');
logout.addEventListener('click',e =>{
  e.preventDefault();
  auth.signOut().then(()=>{
      console.log('Saliste de la App')
  })
})

//google login

const googleLogin = document.querySelector('#googleLogin')
const googleRegistro = document.querySelector('#googleregistro')

//login google

googleLogin.addEventListener('click', (e)=>{
  e.preventDefault()
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    console.log(result)
    console.log('google')

    //clear form
    signinForm.reset();
    //close form
    $("#loginmodal").modal("hide");
    
  })  
  .catch(error =>{
    console.log(error)
    
  alert("Error al iniciar sesión")
  })
})

//Registro
googleRegistro.addEventListener('click', (e)=>{
  e.preventDefault()
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    console.log(result)
    console.log('google')

    //clear form
    signupForm.reset();
    //close form
    $("#registromodal").modal("hide");

  })
  .catch(error =>{
    console.log(error)
    
  alert("Error Al registrarse")
  })
})

//Facebook login

const FacebookLogin = document.querySelector('#FacebookLogin')
FacebookLogin.addEventListener('click', (e)=>{
  e.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();

  auth.signInWithPopup(provider)
  .then(result => {
    $('#avatar').attr('src',result.user.photoURL)
    $('.modal').modal('close')
    Materialize.toast('Bienvenido ${result.user.displayName} !!',4000)

    console.log(result)
    console.log('Facebook login')
 
    //clear form
    signinForm.reset();
    //close form
    $("#loginmodal").modal("hide");
  })
  .catch(error =>{
    console.log(error)
    alert(error)
  })
})

//Facebook Register

const Facebookregistro = document.querySelector('#Facebookregistro')
Facebookregistro.addEventListener('click', (e)=>{
  e.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();

  auth.signInWithPopup(provider)
  .then(result => {
    $('#avatar').attr('src',result.user.photoURL)
    $('.modal').modal('close')
    Materialize.toast('Bienvenido ${result.user.displayName} !!',4000)

    console.log(result)
    console.log('Facebook registro')
 
    //clear form
    signinForm.reset();
    //close form
    $("#registromodal").modal("hide");
  })
  .catch(error =>{
    console.log(error)
    alert(error)
  })
})


//eventos verifica si esta logeado

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

auth.onAuthStateChanged(user =>{
  if(user){
    loginCheck(user);
    var email = user.email;
    document.getElementById('emaillogin').innerHTML=user.email;
  }else{
    loginCheck(user);
  }
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    loginCheck(user);
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    document.getElementById('emaillogin').innerHTML= user.email;
    // ...
  } else {
    loginCheck(user);
  }
});
