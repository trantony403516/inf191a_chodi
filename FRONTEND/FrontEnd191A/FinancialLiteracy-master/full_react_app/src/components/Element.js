import React, {PureComponent}  from 'react';

class Element extends PureComponent {
  render() {
      return (
    <div class = "element">
      <a href = {this.props.link}>{this.props.item}</a><br></br>{this.props.desc}
    </div>
      );
    // if(this.props.type != "partners") {
    //   return (
    //     <div class = "element">
    //       <a href = {this.props.link}>{this.props.item}</a><br></br>{this.props.desc}
    //     </div>
    // );}
    // else {
    //   return (
    //             <div class="row">
    //                 <div class="col-lg-6 col-md-6 p-4 divCover" style = {{"background-color":"#d8f3fa"}}>
    //                 <img src= {this.props.img} alt="Firebase cover image"/>
    //                 </div>
    //                 <div class="col-lg-6 col-md-6 p-lg-5 p-md-5 px-3 py-4"  style = {{"background-color":"#f5fcff"}}>
    //                 <div class = "element">
    //                   <a href = {this.props.link}>{this.props.item}</a><br></br>{this.props.desc}
    //                 </div>
    //                 </div>
    //             </div>
    //   );
    // }
}
}

export default Element;