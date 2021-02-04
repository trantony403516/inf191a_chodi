import React from 'react';

import Header from './Header';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

var rewardsRef = storageRef.child('rewards.jpg');

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

class rewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      rewardsImg:null,
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
    return rewardsRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({rewardsImg:url});    
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  onChange = (e) => {
    this.setState({picture : e.target.files});
  }

  uploadHandler = () => {
    console.log(this.state.picture[0]);
    var file = new File(this.state.picture, "rewards.jpg");
    rewardsRef.put(file).then(function(snapshot) {
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
        <RenderImage class = "rewardsImg" url={this.state.rewardsImg}/>
        <Header1 name = "my rewards"/>
        <div class="container-fluid">
        <div class="row mx-1">
        <div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 shadow mb-5 border">
                <div class="row">
                    <div class="col-lg-6 col-md-6 p-4 divCover" style = {{"background-color":"#d8f3fa"}}>
                    <p>This section tells how many points accumulated</p>
                    </div>
                    <div class="col-lg-6 col-md-6 p-lg-5 p-md-5 px-3 py-4" style = {{"background-color":"#f5fcff"}}>
                    <Link name = "One of the products you could gain from rewards? pic or link"/>
                    <p>Description of products/rewards</p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        <Footer/>
      </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin) {
      return (
        <div>
        <Header/>

        <div class = "imageinput">
        <input type = "file" onChange = {this.onChange}/>
        <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
        </div>

        <RenderImage class = "rewardsImg" url={this.state.rewardsImg}/>
        <Header1 name = "my rewards"/>
        <div class="container-fluid">
        <div class="row mx-1">
        <div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 shadow mb-5 border">
                <div class="row">
                    <div class="col-lg-6 col-md-6 p-4 divCover" style = {{"background-color":"#d8f3fa"}}>
                    <p>This section tells how many points accumulated</p>
                    </div>
                    <div class="col-lg-6 col-md-6 p-lg-5 p-md-5 px-3 py-4" style = {{"background-color":"#f5fcff"}}>
                    <Link name = "One of the products you could gain from rewards? pic or link"/>
                    <p>Description of products/rewards</p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        <Footer/>
      </div>
      );
    }
  else {
    return (<p>loading</p>);
  }
}
} 

export default rewards;     