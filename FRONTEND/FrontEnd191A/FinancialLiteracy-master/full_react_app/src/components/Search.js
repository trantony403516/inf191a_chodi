import React from 'react';

import Header from './Header';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

var searchRef = storageRef.child('search.jpg');

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

class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      searchImg:null,
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
    return searchRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({searchImg:url});    
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  onChange = (e) => {
    this.setState({picture : e.target.files});
  }

  uploadHandler = () => {
    console.log(this.state.picture[0]);
    var file = new File(this.state.picture, "search.jpg");
    searchRef.put(file).then(function(snapshot) {
      window.location.reload();
    });
  }

  componentDidMount(){
    this.setState({isLoading:true});
    this.getData().then(() => {
    this.setState({isLoading:false});
    });
  }

  render() {
    if(!this.state.isLoading) {
    return (
      <div>
        <Header/>

        <div class = "imageinput">
        <label>Edit "Search" Picture: </label><br/>
        <input type = "file" onChange = {this.onChange}/>
        <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
        </div>

        <RenderImage class = "searchImg" url={this.state.searchImg}/>
        <Header1 name = "search results"/>
        <Footer/>
      </div>
    );
    }
    else {
      return (<p>loading</p>);
    }
  }
} 

export default search;