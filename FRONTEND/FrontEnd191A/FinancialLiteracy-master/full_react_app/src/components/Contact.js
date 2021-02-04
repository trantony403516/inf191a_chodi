import React from 'react';

import Header from './LandingHeader';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}
var contactRef = firestore.collection('contact').doc('info');

function RenderImage(props) {
      return (<div className="image"><img src={props.url} alt="picture"/>
      </div>);
}

function Header1(props) {
  return (
    <div className="title"><h1>{props.name}</h1></div>
  )
}

function Link(props) {
  return (
    <div className="links"><a href="#url/props.name??">{props.name}</a></div>
  )
}

class contact extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading:true,
      admin:false,
      email:null,
      phone:null
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  updateContact = () => {
    return contactRef.get().then(contact => {
      if (contact.exists) {
        let info = contact.data();
          info['email'] = this.state.email;
        info['phone'] = this.state.phone;
        contactRef.update(info);
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  getText = () => {
    return contactRef.get().then(contact => {
      if (contact.exists) {
        let info = contact.data();
        this.setState({email:info['email']});
        this.setState({phone:info['phone']});
      }
    });
  }

  myData = () => {
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

  componentDidMount(){
    this.setState({isLoading:true});
    if(localStorage.getItem("userId") != null) {
      this.myData().then(() => {
      this.getText().then(() => {
      this.setState({isLoading:false});
      });});
    }
    else {
      this.getText().then(() => {
      this.setState({isLoading:false});
      });
    }
  }

  render () {
    if(!this.state.isLoading && !this.state.admin){
      return (
        <div>
          <Header/>
          <hr></hr>
          <Header1 name = "Contact Us"/>
          <p>{this.state.email}<br></br>
            {this.state.phone}</p>
          <Footer/>
        </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin){
      return (
        <div>
          <Header/>
          <hr></hr>
          <Header1 name = "Contact Us"/>
            <p>{this.state.email}<br></br>
            {this.state.phone}</p>
          
          <div class = "listinput">
          <label>Edit "Contact Us" Information: </label><br/>
          <label>email</label>
          <input class="form-control" name = "email" type = "text" onChange={this.handleChange}></input>

          <label>phone</label>
          <input class="form-control" name = "phone" type = "text" onChange={this.handleChange}></input><br/>

          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick = { () => {this.updateContact()} }>upload!</button>
          </div>

          <div  style = {{"position":"fixed", "bottom":"0", "width":"100%", "margin-left":"auto", "margin-right":"auto"}}>
          <Footer/>
          </div>

        </div>
      );
    }
    else {
      return (<p>loading</p>);
    }
  }
} 

export default contact;
