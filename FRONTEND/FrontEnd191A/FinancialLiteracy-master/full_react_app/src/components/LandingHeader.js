import React from 'react';
import { NavLink } from 'react-router-dom';


import 'font-awesome/css/font-awesome.min.css';
import Signout from './Signout';

import {firestore, storageRef} from './Firebase/firebase';

var homeRef = firestore.collection('home');

var moduleRef = homeRef.doc("modules");
var webinarRef = homeRef.doc("webinars");
var budgetRef = homeRef.doc("budget");
var resourceRef = homeRef.doc("resources");
var partnersRef = homeRef.doc("partners");
var liveRef = homeRef.doc("live");
var bookRef = homeRef.doc("book");
var blogRef = homeRef.doc("blog");
var rewardsRef = homeRef.doc("rewards");
var accountRef = homeRef.doc("account");

var logoRef = storageRef.child('Logo.png');

class LandingHeader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visibility: false,
        isLoading:true,
        Logo:null
      };
    }

    toggleVisibility = () => {
      if (this.state.visibility){
        this.setState ({ 
          visibility: false });
      } else {
          this.setState ({ 
            visibility: true});
        }
    }

    getData = () => {
      return logoRef.getDownloadURL().then(url => {
        // Insert url into an <img> tag to "download"
        this.setState({Logo:url});    
      }).catch(function(error) {
            console.log("error occurred");
        });
    }
  
    getState = () => {
      return(
      resourceRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({resourceState:item["toggled"]});    
      }).then(
      webinarRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({webinarState:item["toggled"]});    
      }).then(
      moduleRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({moduleState:item["toggled"]});    
      }).then(
      partnersRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({partnersState:item["toggled"]});    
      }).then(
      budgetRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({budgetState:item["toggled"]});    
      }).then(
      accountRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({accountState:item["toggled"]});    
      }).then(
      blogRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({blogState:item["toggled"]});    
      }).then(
      liveRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({liveState:item["toggled"]});    
      }).then(
      bookRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({bookState:item["toggled"]});    
      }).then(
      rewardsRef.get().then(doc => {
        let item = doc.data();
        // Insert url into an <img> tag to "download"
        this.setState({rewardsState:item["toggled"]});    
      })))))))))));
    }

    componentDidMount(){
      this.setState({isLoading:true});
      this.getData().then(() => {
      this.getState().then(() => {
      this.setState({isLoading:false});
      });});
    }
  /*<a href="#home">reach up</a>
          <a href="#resources">reach out</a>
          <a href="#webinars">reach in</a>*/ //reach up reach out reach in are on a separate home screen that the user will be sent to by default if theyre not logged in
    render() {
      if(this.state.visibility) {
        return (
          <div class = "Menu">
            <button class="closebutton" onClick={this.toggleVisibility}><i class="fa fa-times" aria-hidden="true"></i></button>
            <header className="Header">
              <NavLink to="/home"><img class = "logoImg" src={this.state.Logo}/></NavLink>
              { this.state.moduleState && 
              <NavLink to="/modules">modules</NavLink> }
              { this.state.webinarState && 
                <NavLink to="/webinars">webinars</NavLink> }
              { this.state.budgetState && 
                <NavLink to="/budget">your budget</NavLink> }
                { this.state.resourceState && 
                <NavLink to="/resources">resources</NavLink> }
                { this.state.partnersState && 
                <NavLink to="/partners">partners</NavLink> }
                { this.state.liveState && 
                <NavLink to="/live">catch us live</NavLink> }
                { this.state.bookState && 
                <NavLink to="/book">book club</NavLink> }
                { this.state.blogState && 
                <NavLink to="/blog">blog</NavLink> }
                { this.state.rewardsState && 
                <NavLink to="/rewards">your rewards</NavLink> }
                { this.state.accountState && 
                <NavLink to="/account">your account</NavLink> }
              </header>
            </div>
          ); }
  
      else {
        return (
          <header className="LandingHeader">
            <p style={{color:"transparent"}}>buffertocenter</p>
            <button class="threebars" onClick={this.toggleVisibility}>
              <i class="fa fa-bars" aria-hidden="true"></i></button>
              <img style = {{"margin-top":".5%"}} class = "logoImg" src={this.state.Logo}/>
              <h1 style = {{"margin-top":"0.5%"}} class="Site">up-RIGHT</h1>
              <div class="search-container">
                <form action="/search">
                  <input style = {{"margin-top":"10%"}} type="text" placeholder="search..." name="search"/>
                  <button style = {{"margin-top":"10%"}} type="submit"><i class="fa fa-search" aria-hidden="false"></i></button>
                </form>  
              </div>
          </header>
        );
      }
    }
  }

  export default LandingHeader;
