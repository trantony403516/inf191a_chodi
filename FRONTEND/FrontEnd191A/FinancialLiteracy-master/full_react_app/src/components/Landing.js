import React from 'react';

import LandingHeader from './LandingHeader';

import {storageRef} from './Firebase/firebase';

var homeRef = storageRef.child('home2.jpg');

function RenderImage(props) {
  return (<div className="image"><img src={props.url} alt="picture"/>
  </div>);
}

function Header1(props) {
  return (
    <div className="title"><h1>{props.name}</h1></div>
  )
}

class landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      homeImg:null
    }
  }
  getData = () => {
    return homeRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({homeImg:url});    
    }).catch(function(error) {
          console.log("error occurred");
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
        <LandingHeader/>
        <hr></hr>
        <RenderImage class = "bookImg" url={this.state.homeImg}/>
        <Header1 name = "Let’s lift our knowledge up-RIGHT"/>
        <p>“An investment in knowledge, pays the best interest” – Benjamin Franklin"</p>
        <br/>
        <table style = {{"width":"100%", "height":"600px"}} class = "LandingTable">
            <tr>
              <td style = {{"width":"33%"}} class = "login"><a style = {{"display":"block", "height":"600px"}} href = "/login" title = "sign up">Reach IN</a></td>
                <td style = {{"width":"33%"}}class = "about"><a style = {{"display":"block", "height":"600px"}} href = "/about" title = "about us">Reach UP</a></td>
                <td style = {{"width":"33%"}}class = "contact"><a style = {{"display":"block", "height":"600px"}} href = "/contact" title = "contact us">Reach OUT</a></td>
            </tr>
        </table>
      </div>
    );
    }
    else {
      return (<p>loading</p>);
    }
  }
} 

export default landing;