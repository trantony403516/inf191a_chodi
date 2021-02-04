import React from 'react';


import homeImg from '../home2.jpg'

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

const Footer = () => {
    return (
      <div>
          <h1 class = "Footer">
          <table border class = "footer">
            <tr>
                <td><a title = "sign up"  href = "/login">Reach IN</a></td>
                <td><a title = "about us" class = "center" href = "/about">Reach UP</a></td>
                <td><a title = "contact us" href = "/contact">Reach OUT</a></td>
            </tr>
        </table>
        </h1>
      </div>
    );
} 

export default Footer;


