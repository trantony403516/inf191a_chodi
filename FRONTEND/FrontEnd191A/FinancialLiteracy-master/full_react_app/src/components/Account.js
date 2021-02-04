import React from 'react';

import Header from './Header';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

var accountRef = storageRef.child('account.jpg');

function RenderImage(props) {
      return (<div className="image"><img src={props.url} alt="picture"/>
      </div>);
}

function Header1(props) {
  return (
    <div className="title"><h1>{props.name}</h1></div>
  )
}

class account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      accountImg:null,
      admin:false,
      url:null,
      picture:null
    }
  }

  getAdmin = () => {
    return docRef.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        if(item["admin"] == null) {
          this.setState({admin:false});
        }
        else {
          this.setState({admin:true});
        }
      }
    });
  }

  getData = () => {
    return accountRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({accountImg:url});    
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  onChange = (e) => {
    this.setState({picture : e.target.files});
  }

  uploadHandler = () => {
    console.log(this.state.picture[0]);
    var file = new File(this.state.picture, "account.jpg");
    accountRef.put(file).then(function(snapshot) {
      window.location.reload();
    });
  }

  componentDidMount(){
    this.setState({isLoading:true});
    this.getData().then(() => {
    this.getAdmin().then(() => {
    this.setState({isLoading:false});
    });});
  }

  render() {
    if(!this.state.isLoading && !this.state.admin){
      return (
        <div>
          <Header/>
          <RenderImage class = "accountImg" url={this.state.accountImg}/>
          <Header1 name = "manage account"/>
          <div class="editProfileForm">
                <div class="form-group">
                  <label for="userFullName">Name<span class="text-danger ml-1"></span></label>
                  <input type="text" class="form-control" id="userFullName" onBlur="checkUserFullName()" placeholder="Firma Adı"/>
                </div>
                <div class="form-group">
                  <label for="userSurname">Lastname<span class="text-danger ml-1"></span></label>
                  <input type="text" class="form-control" id="userSurname" onBlur="checkUserSurname()" placeholder="Firma Faliyet Alanı"/>
                  <small id="userSurnameError" class="form-text text-danger">Please fill the field.</small>
                </div>
                <div class="form-group">
                    <label for="userBio">Password<span class="text-danger ml-1"></span></label>
                    <input type="password" class="form-control" id="userSurname" onBlur="checkUserSurname()" placeholder="*********"/>
                </div>
                <br/>
                <button type="button" class="btn btn-block text-uppercase mb-3" onClick="saveProfile()" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}}>Save</button>
                <button type="button" class="btn btn-outline-secondary btn-block text-uppercase" onClick="hideEditProfileForm()">Cancel</button>
          </div>
          <br></br>
          <Footer/>
        </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin) {
      return (
        <div>
          <Header/>
          
          <div class = "imageinput">
          <label>Edit "Manage Account" Picture: </label><br/>
          <input type = "file" onChange = {this.onChange}/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
          </div>
        
          <RenderImage class = "accountImg" url={this.state.accountImg}/>
          <Header1 name = "manage account"/>
          <div class="editProfileForm">
                <div class="form-group">
                  <label for="userFullName">Name<span class="text-danger ml-1"></span></label>
                  <input type="text" class="form-control" id="userFullName" onBlur="checkUserFullName()" placeholder="Firma Adı"/>
                </div>
                <div class="form-group">
                  <label for="userSurname">Lastname<span class="text-danger ml-1"></span></label>
                  <input type="text" class="form-control" id="userSurname" onBlur="checkUserSurname()" placeholder="Firma Faliyet Alanı"/>
                  <small id="userSurnameError" class="form-text text-danger">Please fill the field.</small>
                </div>
                <div class="form-group">
                    <label for="userBio">Password<span class="text-danger ml-1"></span></label>
                    <input type="password" class="form-control" id="userSurname" onBlur="checkUserSurname()" placeholder="*********"/>
                </div>
                <br/>
                <button type="button" class="btn btn-block text-uppercase mb-3" onClick="saveProfile()" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}}>Save</button>
                <button type="button" class="btn btn-outline-secondary btn-block text-uppercase" onClick="hideEditProfileForm()">Cancel</button>
          </div>
          <br></br>
        <Footer/>
      </div>
      );
    }
    else {
      return (<p>loading</p>);
    }
  } 
}

export default account;