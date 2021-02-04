import React from 'react';

import Header from './LandingHeader';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}
var aboutRef = firestore.collection('about').doc('text');

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

class about extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading:true,
      admin:false,
      text:null
    }
  }

  handleChange = (e) => {
    this.setState({text:e.target.value});
  }

  updateAbout = () => {
    return aboutRef.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['words'] = this.state.text;
        aboutRef.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  getText = () => {
    return aboutRef.get().then(about => {
      if (about.exists) {
        let text = about.data();
        this.setState({text:text['words']});
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
        <Header1 name = "About Us"/>
      <p> {this.state.text} </p>
      <div  style = {{"position":"fixed", "bottom":"0", "width":"100%", "margin-left":"auto", "margin-right":"auto"}}>
          <Footer/>
          </div>
      </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin){
      return (
        <div>
          <Header/>
          <hr></hr>
          <Header1 name = "About Us"/>
          <p> {this.state.text}</p>
          
          <div class = "listinput">
          <label>Edit About Text: </label>
          <textarea class="form-control" onChange={this.handleChange}></textarea><br/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick = { () => {this.updateAbout()} }>upload!</button>
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

export default about;