import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {firestore} from './components/Firebase/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';
import Account from './components/Account';
import Budget from './components/Budget';
import Home from './components/Home';
import Modules from './components/Modules';
import Partners from './components/Partners';
import Resource from './components/Resources';
import Webinar from './components/Webinars';
import Search from './components/Search';
import Login from './components/Login';
import reset from './components/resetPassword';
import Signup from './components/SignUp';
import Landing from './components/Landing';
import About from './components/About';
import Contact from './components/Contact';
import Book from './components/Book';
import Blog from './components/Blog';
import Live from './components/Live';
import Rewards from './components/Rewards';


import PrivateRoute from './components/PrivateRoute';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
    this.getState();
  }

  render() {
      return (
        <BrowserRouter>
          <div>
            <Switch>
            <Route path="/" component={Landing} exact/> 
              <Route path="/login" component={Login}/> 
              <Route path="/reset" component={reset}/> 
              <Route path="/signup" component={Signup}/> 
              <Route path="/landing" component={Landing}/> 
              <Route path="/about" component={About}/> 
              <Route path="/contact" component={Contact}/>      
              <PrivateRoute path="/home" component={Home}/>  
              {this.state.accountState &&    
              <PrivateRoute path="/account" component={Account}/> }
              {this.state.budgetState && 
              <PrivateRoute path="/budget" component={Budget}/> }
              {this.state.moduleState && 
              <PrivateRoute path="/modules" component={Modules}/> }
              {this.state.partnersState && 
              <PrivateRoute path="/partners" component={Partners}/> }
              {this.state.resourceState && 
              <PrivateRoute path="/resources" component={Resource}/> }
              {this.state.webinarState && 
              <PrivateRoute path="/webinars" component={Webinar}/> }
              <PrivateRoute path="/search" component={Search}/>
              {this.state.blogState && 
              <PrivateRoute path="/blog" component={Blog}/> }
              {this.state.liveState && 
              <PrivateRoute path="/live" component={Live}/> }
              {this.state.bookState && 
              <PrivateRoute path="/book" component={Book}/> }
              {this.state.rewardsState && 
              <PrivateRoute path="/rewards" component={Rewards}/> }
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
