import React from 'react';

import Header from './Header';
import Footer from './Footer';
import List from './List';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

var partnerRef = storageRef.child('partners.jpg');

var cloud = firestore.collection('partners');

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

class partners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      partnersImg:null,
      admin:false,
      url:null,
      picture:null,
      desc:null,
      item:null,
      link:null,
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
    return partnerRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({partnersImg:url});    
    }).catch(function(error) {
          console.log("error occurred");
      });
  }

  onChange = (e) => {
    this.setState({picture : e.target.files});
  }

  uploadHandler = () => {
    console.log(this.state.picture[0]);
    var file = new File(this.state.picture, "partners.jpg");
    partnerRef.put(file).then(function(snapshot) {
      window.location.reload();
    });
  }

  onTextChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }

  uploadTextHandler = () => {
    console.log("hello");
    cloud.doc(String(this.state.item)).set({
    desc: String(this.state.desc),
    item: String(this.state.item),
    link: String(this.state.link),
    }).then(() => {
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
        
        <RenderImage class = "partnersImg" url={this.state.partnersImg}/>
        <Header1 name = "partners"/>
        
        <List page="partners" img = {this.state.partnersImg}/>

        <Footer/>
      </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin) {
      return (
        <div>
        <Header/>
        
        <div class = "imageinput">
        <label>Edit "Partners" Picture: </label><br/>
        <input type = "file" onChange = {this.onChange}/>
        <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
        </div>

        <RenderImage class = "partnersImg" url={this.state.partnersImg}/>
        <Header1 name = "partners"/>

        <div class = "listinput">
        <label>Add a Partner: </label><br/>
          <label>item</label>
          <input class="form-control" name = "item" type = "text" onChange = {this.onTextChange}/>
          <br/>

          <label>description</label>
          <input class="form-control" name = "desc" type = "text" onChange = {this.onTextChange}/>
          <br/>
          
          <label>link</label>
          <input class="form-control" name = "link" type = "textarea" onChange = {this.onTextChange}/>
          <br/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadTextHandler}>Upload!</button>
        </div>

        <List page="partners" img = {this.state.partnersImg}/>

        <Footer/>
      </div>
      );
    }
  else {
    return (<p>loading</p>);
  }
}
} 

export default partners;