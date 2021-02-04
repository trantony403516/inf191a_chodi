import React from 'react';

import Post from './Forum'
import Header from './Header';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

var bookRef = storageRef.child('book_club.jpg');

function RenderImage(props) {
      return (<div className="image"><img src={props.url} alt="picture"/>
      </div>);
}

function Header1(props) {
  return (
    <div className="title"><h1>{props.name}</h1></div>
  )
}

class book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      bookImg:null,
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
    return bookRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({bookImg:url});    
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  onChange = (e) => {
    this.setState({picture : e.target.files});
  }

  uploadHandler = () => {
    console.log(this.state.picture[0]);
    var file = new File(this.state.picture, "book_club.jpg");
    bookRef.put(file).then(function(snapshot) {
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
          <RenderImage class = "bookImg" url={this.state.bookImg}/>
          <Header1 name = "Book Club"/>
          <Post page="bookClub"/>
          <Footer/>
        </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin) {
      return (
        <div>
          <Header/>

          <div class = "imageinput">
          <label>Edit "Book" Picture: </label><br/>
          <input type = "file" onChange = {this.onChange}/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
          </div>

          <RenderImage class = "bookImg" url={this.state.bookImg}/>
          <Header1 name = "Book Club"/>
          <Post page="bookClub"/>
        <Footer/>
      </div>
      );
    }
    else {
      return (<p>loading</p>);
    }
  }
} 

export default book;     
