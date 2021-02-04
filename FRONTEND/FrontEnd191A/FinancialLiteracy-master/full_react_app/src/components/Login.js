import swal from 'sweetalert2';
import React from 'react';
import {auth} from './Firebase/firebase'

import {storageRef} from './Firebase/firebase';

var loginRef = storageRef.child('home2.jpg');
var logoRef = storageRef.child('Logo.png');

// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx

// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}

// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail != null) {
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword != null) {
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;   

    if(userSIEmail != null && userSIEmail != null) {
    userSIEmail = document.getElementById("userSIEmail").value;
    userSIPassword = document.getElementById("userSIPassword").value;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        auth.signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            localStorage.setItem("userId", auth.currentUser.uid);
            localStorage.setItem("user", null);
            swal.fire({
                type: 'success',
                title: 'Succesfully signed in', 
            }).then((value) => {
                setTimeout(function(){
                    window.location.replace('/home');
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors
            var errorCode = error.code;
            var errorMessage = error.message;
            swal.fire({
                type: 'error',
                title: 'Error',
                text: "sign in",
            })
        });
    }
}
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
// auth.onAuthStateChanged((user)=>{
//     if (user) {
//     //   User is signed in.
//         let user = auth.currentUser;
//         let uid
//         if(user != null){
//             uid = user.uid;
//         }
//         let firebaseRefKey = auth.database().ref().child(uid);
//         firebaseRefKey.on('value', (dataSnapShot)=>{
//             if(document.getElementById("userPfFullName") != null && document.getElementById("userPfSurname") != null && document.getElementById("userPfBio") != null) {
//                 document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
//                 document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
//                 // userEmail = dataSnapShot.val().userEmail;
//                 // userPassword = dataSnapShot.val().userPassword;
//                 document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
//                 document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
//                 document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
//                 document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
//             }
//         })
//     } else {
//     //   user is not signed in
//     }
    
// });
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
// function saveProfile(){
//     let userFullName = document.getElementById("userFullName").value 
//     let userSurname = document.getElementById("userSurname").value 
//     let userFacebook = document.getElementById("userFacebook").value 
//     let userTwitter = document.getElementById("userTwitter").value 
//     let userGooglePlus = document.getElementById("userGooglePlus").value 
//     let userBio = document.getElementById("userBio").value
//     var userFullNameFormate = /^([A-Za-z.\s_-])/; 
//     var checkUserFullNameValid = userFullName.match(userFullNameFormate);
//     if(checkUserFullNameValid == null){
//         return checkUserFullName();
//     }else if(userSurname === ""){
//         return checkUserSurname();
//     }else{
//         let user = firebase.auth().currentUser;
//         let uid;
//         if(user != null){
//             uid = user.uid;
//         }
//         var firebaseRef = firebase.database().ref();
//         var userData = {
//             userFullName: userFullName,
//             userSurname: userSurname,
//             userFb: userFacebook,
//             userTw: userTwitter,
//             userGp: userGooglePlus,
//             userBio: userBio,
//         }
//         firebaseRef.child(uid).set(userData);
//         swal({
//             type: 'successfull',
//             title: 'Update successfull',
//             text: 'Profile updated.', 
//         }).then((value) => {
//             setTimeout(function(){
//                 document.getElementById("profileSection").style.display = "block";

//                 document.getElementById("editProfileForm").style.display = "none";
//             }, 1000)
//         });
//     }
// }
class login extends React.Component {
constructor(props) {
    super(props);
    this.state = { email: '', password: '', isLoading:true,
    home:null};
  }

  getData = () => {
    return loginRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({home:url});    
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  getLogo = () => {
    return logoRef.getDownloadURL().then(url => {
          // Insert url into an <img> tag to "download"
          this.setState({Logo:url});   
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  componentDidMount(){
    this.setState({isLoading:true});
    this.getData().then(() => {
    this.getLogo().then(() => {
    this.setState({isLoading:false});
    });});
  }

handleChange = ({target})=>  {
    this.setState({[target.name]: target.value});
};
  render() {
    if(!this.state.isLoading) {
    return(
<body class="bg-light">
    <div class="container-fluid">
        <div class="row mx-1">
            <header className="logoTitle">
                        <img className = "logoImg" src={this.state.Logo}/>
                        <h1 style = {{"margin-top":"5%"}} className="Site">welcome to up-RIGHT</h1>
                </header>
            <div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 shadow mb-5 border">
                <div class="row">
                    <div class="col-lg-6 col-md-6 p-4 divCover" style = {{"background-color":"#d8f3fa"}}>
                    <img src= {this.state.home} alt="Firebase cover image"/>
                    </div>
                    <div class="col-lg-6 col-md-6 p-lg-5 p-md-5 px-3 py-4" style = {{"background-color":"#f5fcff"}}>
                        <h2 class="h2 text-center mb-3" style = {{"color":"#ff4f00", "font-weight":"bold"}}>Sign In</h2>
                        <div class="form-group">
                            <label for="userSIEmail">Email address<span class="text-danger ml-1">*</span></label>
                            <input name = "email" value = {this.state.email} type="email" class="form-control" id="userSIEmail" onBlur = {checkUserSIEmail()} placeholder="mail@mail.com" onChange = {this.handleChange}/>
                            <small id="userSIEmailError" class="form-text text-danger">Please check your login information.</small>
                        </div>
                        <div class="form-group">
                            <label for="userSIPassword">Password<span class="text-danger ml-1">*</span></label>
                            <input name = "password" value = {this.state.password} type="password" class="form-control" id="userSIPassword" onBlur = {checkUserSIPassword()} placeholder="password" onChange = {this.handleChange}/>
                            <small id="userSIPasswordError" class="form-text text-danger">Please check your password.</small>
                        </div>
                        <button class="btn text-uppercase mb-3" onClick = { () => {signIn()}} style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}}>Sign In</button>
                        <p>Not a member? Let's get started: <a href="/signup"><strong class="text-uppercase showSignUpForm" style = {{"color":"#2dd2f4"}}>Sign Up</strong></a></p>
                        <p>Forgot your password? Reset here: <a href="/reset"><strong class="text-uppercase showSignUpForm" style = {{"color":"#2dd2f4"}}>Reset</strong></a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>       
</body>
    );
    }
    else {
        return (<p>loading</p>);
    }
  }
}

export default login;