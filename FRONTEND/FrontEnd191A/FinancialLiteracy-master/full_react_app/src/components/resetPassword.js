import swal from 'sweetalert2';
import React from 'react';
import {auth} from './Firebase/firebase'

import {storageRef} from './Firebase/firebase';

var loginRef = storageRef.child('home2.jpg');
var logoRef = storageRef.child('Logo.png');


function resetPass(prop) { 
    return auth.sendPasswordResetEmail(
        prop).then(() =>
        swal.fire({
            type: 'success',
            title: 'Reset email successfully sent', 
        })).then((value) => {
            setTimeout(function(){
                window.location.replace("/login");
            }, 1000)
        }).catch(() => {
            swal.fire({
                type: 'error',
                title: 'Error',
                text: "check your email",
            })
        });
}

class reset extends React.Component {
constructor(props) {
    super(props);
    this.state = { email: '', isLoading:true,
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
                        <h2 class="h2 text-center mb-3" style = {{"color":"#ff4f00", "font-weight":"bold"}}>Reset password</h2>
                        <div class="form-group">
                            <label for="userSIEmail">Email address<span class="text-danger ml-1">*</span></label>
                            <input name = "email" value = {this.state.email} type="email" class="form-control" id="userSIEmail" placeholder="mail@mail.com" onChange = {this.handleChange}/>
                            <small id="userSIEmailError" class="form-text text-danger">Please check your login information.</small>
                        </div>
                        <button class="btn text-uppercase mb-3" onClick = { () => {resetPass(this.state.email)}} style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}}>Send</button>
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

export default reset;