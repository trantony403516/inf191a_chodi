import swal from 'sweetalert2';
import React from 'react';
import {auth, firestore} from './Firebase/firebase';

import {storageRef} from './Firebase/firebase';

var signUpRef = storageRef.child('home2.jpg');
var logoRef = storageRef.child('Logo.png');

function checkUserFullName(){
    var userSurname = document.getElementById("userFullName");
    if(userSurname != null) {
        userSurname = document.getElementById("userFullName").value;
        var flag = false;
        if(userSurname === ""){
            flag = true;
        }
        if(flag){
            document.getElementById("userFullNameError").style.display = "block";
        }else{
            document.getElementById("userFullNameError").style.display = "none";
        }
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
    var userSurname = document.getElementById("userSurname");
    if(userSurname != null) {
        userSurname = document.getElementById("userSurname").value;
        var flag = false;
        if(userSurname === ""){
            flag = true;
        }
        if(flag){
            document.getElementById("userSurnameError").style.display = "block";
        }else{
            document.getElementById("userSurnameError").style.display = "none";
        }
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail != null) {
        if(userEmail.value.match(userEmailFormate)){
            flag = false;
        }else{
            flag = true;
        }
        if(flag){
            document.getElementById("userEmailError").style.display = "block";
        }else{
            document.getElementById("userEmailError").style.display = "none";
        }
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword != null) {
        if(userPassword.value.match(userPasswordFormate)){
            flag = false;
        }else{
            flag = true;
        }    
        if(flag){
            document.getElementById("userPasswordError").style.display = "block";
        }else{
            document.getElementById("userPasswordError").style.display = "none";
        }
    }
}

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName");
    var userSurname = document.getElementById("userSurname");
    var userEmail = document.getElementById("userEmail");
    var userPassword = document.getElementById("userPassword");
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    if(userFullName != null && userSurname != null && userEmail != null && userPassword != null) {
        userFullName = document.getElementById("userFullName").value;
        userSurname = document.getElementById("userSurname").value;
        userEmail = document.getElementById("userEmail").value;
        userPassword = document.getElementById("userPassword").value;

        var checkUserFullNameValid = userFullName.match(userFullNameFormate);
        var checkUserEmailValid = userEmail.match(userEmailFormate);
        var checkUserPasswordValid = userPassword.match(userPasswordFormate);

        if(checkUserFullNameValid == null){
            return checkUserFullName();
        }else if(userSurname === ""){
            return checkUserSurname();
        }else if(checkUserEmailValid == null){
            return checkUserEmail();
        }else if(checkUserPasswordValid == null){
            return checkUserPassword();
        }else{
            //  ask Ariana what this part is used for
                // var user = auth.currentUser;
                //     var uid;
                //     if (user != null) {
                //         uid = user.uid;
                //     }
                //     var firebaseRef = auth.database().ref();
                //     var userData = {
                //         userFullName: userFullName,
                //         userSurname: userSurname,
                //         userEmail: userEmail,
                //         userPassword: userPassword,
                //         userFb: "https://www.facebook.com/",
                //         userTw: "https://twitter.com/",
                //         userGp: "https://plus.google.com/",
                //         userBio: "User biography",
                //     }
                //firebaseRef.child(uid).set(userData);
            auth.createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
                
                firestore.collection("users").doc(auth.currentUser.uid).set({
                    first: userFullName,
                    last: userSurname,
                    email:userEmail,
                    rewards:0,
                    comment:"enter your comment",
                    admincomment:"we will respond to you whenever we can",
                    wages: ["enter value", "enter value"],
                    bonus: ["enter value", "enter value"],
                    commission: ["enter value", "enter value"],
                    reimbursements: ["enter value", "enter value"],
                    "alimony income": ["enter value", "enter value"],
                    "401k": ["enter value", "enter value"],
                    medical: ["enter value", "enter value"],
                    dental: ["enter value", "enter value"],
                    vision: ["enter value", "enter value"],
                    "health savings (hsa)": ["enter value", "enter value"],
                    "emergency fund": ["enter value", "enter value"],
                    investments: ["enter value", "enter value"],
                    ira: ["enter value", "enter value"],
                    vacation: ["enter value", "enter value"],
                    gifts: ["enter value", "enter value"],
                    groceries: ["enter value", "enter value"],
                    "dining out": ["enter value", "enter value"],
                    rent: ["enter value", "enter value"],
                    "real estate": ["enter value", "enter value"],
                    insurance: ["enter value", "enter value"],
                    "home maintenance": ["enter value", "enter value"],
                    security: ["enter value", "enter vvalue"],
                    water: ["enter value", "enter value"],
                    gas: ["enter value", "enter value"],
                    electric: ["enter value", "enter value"],
                    sewer: ["enter value", "enter value"],
                    trash: ["enter value", "enter value"],
                    phone: ["enter value", "enter value"],
                    internet: ["enter value", "enter value"],
                    cable: ["enter value", "enter value"],
                    "music and books": ["enter value", "enter value"],
                    credit: ["enter value", "enter value"],
                    "store cards": ["enter value", "enter value"],
                    "student loans": ["enter value", "enter value"],
                    "business expenses": ["enter value", "enter value"],
                    "vet bills": ["enter value", "enter value"],
                    "alimony debt": ["enter value", "enter value"],
                    "auto payment": ["enter value", "enter value"],
                    "auto insurance": ["enter value", "enter value"],
                    gasoline: ["enter value", "enter value"],
                    maintenance: ["enter value", "enter value"],
                    "parking and tolls": ["enter value", "enter value"],
                    clothing: ["enter value", "enter value"],
                    laundry: ["enter value", "enter value"],
                    vitamins: ["enter value", "enter value"],
                    memberships: ["enter value", "enter value"],
                    prescriptions: ["enter value", "enter value"],
                    recreation: ["enter value", "enter value"],
                    "hair and nails": ["enter value", "enter value"],
                    term: ["enter value", "enter value"],
                    permanent: ["enter value", "enter value"],
                    "long-term care": ["enter value", "enter value"]
                }, { merge: true 
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                
                swal.fire('Your Account Created','Your account was created successfully, you can log in now.',
                ).then((value) => {
                    setTimeout(function(){
                        window.location.replace("/login");
                    }, 1000)
                });
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                swal.fire({
                    type: 'error',
                    title: errorCode,
                    text: errorCode,
                })
            });
        }
    }
}

class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', surname: '', isLoading:true,
        home:null,
        Logo:null,
      }
    }
    getData = () => {
      return signUpRef.getDownloadURL().then(url => {
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
                    <div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 bg-white shadow mb-5 border">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 p-4 divCover" style = {{"background-color":"#d8f3fa"}}>
                                <img src= {this.state.home} alt="picture of kids"/>
                            </div>
                            <div class="col-lg-6 col-md-6 p-lg-5 p-md-5 px-3 py-4" style = {{"background-color":"#f5fcff"}}>
                                <div id="signUpForm">
                                    <h2 class="h2 text-center mb-3" style = {{"color":"#ff4f00", "font-weight":"bold"}}>Sign Up</h2>
                                    <div class="form-group">
                                        <label for="userFullName">Name<span class="text-danger ml-1">*</span></label>
                                        <input type="text" name = "name" value = {this.state.name} class="form-control" id="userFullName" onblur={checkUserFullName()} placeholder="name" onChange = {this.handleChange}/>
                                        <small id="userFullNameError" class="form-text text-danger">This Field must be filled.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="userSurname">Lastname<span class="text-danger ml-1">*</span></label>
                                        <input type="text" name = "surname" value = {this.state.surname} class="form-control" id="userSurname" onblur={checkUserSurname()} placeholder="lastname" onChange = {this.handleChange}/>
                                        <small id="userSurnameError" class="form-text text-danger">This Field must be filled.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="userEmail">Email address<span class="text-danger ml-1">*</span></label>
                                        <input type="email" name = "email" value = {this.state.email} class="form-control" id="userEmail" onblur={checkUserEmail()} placeholder="mail@mail.com" onChange = {this.handleChange}/>
                                        <small id="userEmailError" class="form-text text-danger">Please check your email address.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="userPassword">Password<span class="text-danger ml-1">*</span></label>
                                        <input type="password" name = "password" value = {this.state.password} class="form-control" id="userPassword" onblur={checkUserPassword()} placeholder="**********" onChange = {this.handleChange}/>
                                        <small id="userPasswordError" class="form-text text-danger">Your password must be uppercase, lowercase, more than 10 characters, with a number.</small>
                                    </div>
                                    <button class="btn text-uppercase mb-3" onClick = {() => {signUp()}} style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}}> Sign Up </button>
                                    <p>Already a member? Sign in: <a href="/login"><strong class="text-uppercase showSignInForm" style = {{"color":"#2dd2f4"}}>Sign In</strong></a></p>
                                </div>
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

export default signup;