import React from 'react';
import {firestore} from './Firebase/firebase';
if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc("Book1");
  }
  //using book1 for now, change to more books eventually?

// class Post extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading:true,
//       modules:[],
//       docRef: firestore.collection(props.page)
//   }
// }
// getData = () => {
//     return this.state.docRef.get().then(querySnap => {
//       const data = querySnap.docs.map(doc => doc.data());
//       data.forEach(entry => {
//         this.setState({modules:[...this.state.modules,{item:entry["item"], desc:entry["desc"], link:entry["link"]}]});
//       });
//     });
//   }

//   componentDidMount(){
//     this.setState({isLoading:true});
//     this.getData().then(() => {
//     this.setState({isLoading:false});
//     });
//   }

//   render = () => {
//     const children = [];
//     this.state.modules.forEach(item => {
//       children.push(<div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 bg-white shadow mb-5 border border-primary">
//         <Element key = {item["link"]} item = {item["item"]} link = {item["link"]} desc = {item["desc"]}/></div>);
//     });

//     return (
//       <div>
//         {children}
//         <br></br>
//       </div>
//     );}
// } 

class Post extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numChildren: 0,
        messages:[],
        docRef: firestore.collection(props.page).doc("Book1")
      }
    }
  // getData = () => {
//     return this.state.docRef.get().then(querySnap => {
//       const data = querySnap.docs.map(doc => doc.data());
//       data.forEach(entry => {
//         this.setState({modules:[...this.state.modules,{item:entry["item"], desc:entry["desc"], link:entry["link"]}]});
//       });
//     });
//   }
  AddElement = () => {
    return this.state.docRef.collection("comments").get().then(querySnap => {
      const data = querySnap.docs.map(doc => doc.data());
      console.log(data);
    });
  }
  handleChange = ({target}) =>  {
    this.setState({[target.name]: target.value});
};  
// docRef.get().then(function(doc) {
//   if (doc.exists) {
// let item = doc.data();
//   item[income] = [estimated, actual];
//   docRef.update(item);
//   }
//   else {
//     alert("item doesn't exist");
//   }
// });
// getData = () => {
//     return this.state.docRef.get().then(querySnap => {
//       const data = querySnap.docs.map(doc => doc.data());
//       data.forEach(entry => {
//         this.setState({modules:[...this.state.modules,{item:entry["item"], desc:entry["desc"], link:entry["link"]}]});
//       });
//     });
//   }

//   componentDidMount(){
//     this.setState({isLoading:true});
//     this.getData().then(() => {
//     this.setState({isLoading:false});
//     });
//   }
  render () {
    const children = [];
    //     this.state.modules.forEach(item => {
    //       children.push(<div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 bg-white shadow mb-5 border border-primary">
    //         <Element key = {item["link"]} item = {item["item"]} link = {item["link"]} desc = {item["desc"]}/></div>);
    //     });

    for (var i = 0; i < this.state.numChildren; i += 1) {
      children.push(<tr><td>{this.state.message}</td></tr>);
    };

    return (
      <div>
        <table id="forum">
            <tr>
                <td>
                    Entry that someone has written
                </td>
            </tr>
        {children}
        </table>
        <br/><br/>
        <div class = "input-form">
        <label>Message: </label>
        <input style = {{"width":"40%", "height":"200px", "margin-left": "auto", "margin-right": "auto"}} class="form-control" name = "message" type = "text" onChange = {this.handleChange}/> <br/>
        <button class="btn btn-outline-primary text-uppercase mb-3" onClick = { () => {this.AddElement()}} >add something</button>
        </div>
        <br></br>
      </div>
    );}
} 

export default Post;