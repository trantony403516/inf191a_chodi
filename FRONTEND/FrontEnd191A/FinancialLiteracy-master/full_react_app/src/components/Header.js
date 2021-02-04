import React from 'react';
import { NavLink } from 'react-router-dom';


import 'font-awesome/css/font-awesome.min.css';
import Signout from './Signout';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

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

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visibility: false,
        isLoading:true,
        admin:false,
        Logo:null
      };
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

    toggleModule = () => {
      return moduleRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          moduleRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleWebinar = () => {
      return webinarRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          webinarRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleBudget = () => {
      return budgetRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          budgetRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleResource = () => {
      return resourceRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          resourceRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    togglePartners = () => {
      return partnersRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          partnersRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleLive = () => {
      return liveRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          liveRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleBook = () => {
      return bookRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          bookRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleBlog = () => {
      return blogRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          blogRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }
  
    toggleRewards = () => {
      return rewardsRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          rewardsRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }

    toggleAccount = () => {
      return accountRef.get().then(doc => {
        if (doc.exists) {
          let item = doc.data();
          item['toggled'] = !item['toggled'];
          accountRef.update(item).then (() => {
            window.location.reload();
          });
        }
        else {
          alert("item doesn't exist");
        }
      });
    }

    componentDidMount(){
      this.setState({isLoading:true});
      this.getData().then(() => {
      this.getAdmin().then(() => {
      this.getState().then(() => {
      this.setState({isLoading:false});
      });});});
    }
  
    render() {
      if(this.state.visibility && this.state.admin) {
    return (
      <div class = "Menu">
        <button class="closebutton" onClick={this.toggleVisibility}><i class="fa fa-times" aria-hidden="true"></i></button>
        <header className="Header">
          <NavLink to="/home"><img class = "logoImg" src={this.state.Logo}/></NavLink>
            {this.state.moduleState ?        
                    <div><NavLink to="/modules">modules</NavLink> <input type = "checkbox" name = "modules" onChange={this.toggleModule} checked="true"></input></div> :
                    <div><p>modules off (check to turn on)</p><input type = "checkbox" name = "modules" onChange={this.toggleModule}></input></div>
            }
            {this.state.webinarState ?        
                    <div><NavLink to="/webinars">webinars</NavLink> <input type = "checkbox" name = "webinars" onChange={this.toggleWebinar} checked="true"></input></div> :
                    <div><p>webinars off (check to turn on)</p><input type = "checkbox" name = "webinars" onChange={this.toggleWebinar}></input></div>
            }
            {this.state.budgetState ?        
                    <div><NavLink to="/budget">budget</NavLink> <input type = "checkbox" name = "budget" onChange={this.toggleBudget} checked="true"></input></div> :
                    <div><p>budget off (check to turn on)</p><input type = "checkbox" name = "budget" onChange={this.toggleBudget}></input></div>
            }
            {this.state.resourceState ?        
                    <div><NavLink to="/resources">resources</NavLink> <input type = "checkbox" name = "resources" onChange={this.toggleResource} checked="true"></input></div> :
                    <div><p>resources off (check to turn on)</p><input type = "checkbox" name = "resources" onChange={this.toggleResource}></input></div>
            }
            {this.state.partnersState ?        
                    <div><NavLink to="/partners">partners</NavLink> <input type = "checkbox" name = "partners" onChange={this.togglePartners} checked="true"></input></div> :
                    <div><p>partners off (check to turn on)</p><input type = "checkbox" name = "partners" onChange={this.togglePartners}></input></div>
            }
            {this.state.liveState ?        
                    <div><NavLink to="/live">live</NavLink> <input type = "checkbox" name = "live" onChange={this.toggleLive} checked="true"></input></div> :
                    <div><p>live stream off (check to turn on)</p><input type = "checkbox" name = "live" onChange={this.toggleLive}></input></div>
            }
            {this.state.bookState ?        
                    <div><NavLink to="/book">book</NavLink> <input type = "checkbox" name = "book" onChange={this.toggleBook} checked="true"></input></div> :
                    <div><p>book club off (check to turn on)</p><input type = "checkbox" name = "book" onChange={this.toggleBook}></input></div>
            }
            {this.state.blogState ?        
                    <div><NavLink to="/blog">blog</NavLink> <input type = "checkbox" name = "blog" onChange={this.toggleBlog} checked="true"></input></div> :
                    <div><p>blog off (check to turn on)</p><input type = "checkbox" name = "blog" onChange={this.toggleBlog}></input></div>
            }
            {this.state.rewardsState ?        
                    <div><NavLink to="/rewards">rewards</NavLink> <input type = "checkbox" name = "rewards" onChange={this.toggleRewards} checked="true"></input></div> :
                    <div><p>rewards off (check to turn on)</p><input type = "checkbox" name = "rewards" onChange={this.toggleRewards}></input></div>
            }
            {this.state.accountState ?        
                    <div><NavLink to="/account">account</NavLink> <input type = "checkbox" name = "account" onChange={this.toggleAccount} checked="true"></input></div> :
                    <div><p>manage account off (check to turn on)</p><input type = "checkbox" name = "account" onChange={this.toggleAccount}></input></div>
            }
            <Signout/>
          </header>
        </div>
      ); }
      else if(this.state.visibility && !this.state.admin) {
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
                <Signout/>
              </header>
            </div>
          );
      }
      else {
        return (
          <div>
          <header className="VisibleHeader">
            <p style={{color:"transparent"}}>buffertocenter</p>
            <button className="threebars" onClick={this.toggleVisibility}>
              <i className="fa fa-bars" aria-hidden="true"></i></button>
              <NavLink to="/home"><img style = {{"margin-top":".5%"}} className = "logoImg" src={this.state.Logo}/></NavLink>
              <div>
              <h1 style = {{"margin-top":"2%"}} className="Site">up-RIGHT</h1>
              </div>
              <div className="search-container">
                <form action="/search">
                  <input style = {{"margin-top":"10%"}} type="text" placeholder="search..." name="search"/>
                  <button style = {{"margin-top":"10%"}} type="submit"><i className="fa fa-search" aria-hidden="false"></i></button>
                </form>  
              </div>
              <Signout/>
          </header>
          <hr></hr>
          </div>
        );
      }
    }
  }

  export default Header;