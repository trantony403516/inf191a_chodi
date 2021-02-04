import React from 'react';
import {firestore} from './Firebase/firebase';
import Element from './Element'

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      items:[],
      docRef: firestore.collection(props.page),
      page:props.page,
      img:props.img,
      admin:false,
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
    return this.state.docRef.get().then(querySnap => {
      const data = querySnap.docs.map(doc => doc.data());
      data.forEach(entry => {
        this.setState({items:[...this.state.items,{item:entry["item"], desc:entry["desc"], link:entry["link"]}]});
      });
    });
  }

  removeItem = (prop) => {
    this.state.docRef.doc(String(prop)).delete().then(() => {
      window.location.reload();
    });
  }

  componentDidMount() {
    this.setState({isLoading:true});
    this.getData().then(() => {
    this.getAdmin().then(() => {
    this.setState({isLoading:false});
    });});
  }

  render(){
    if(!this.state.isLoading && !this.state.admin){
    const children = [];
    this.state.items.forEach(item => {
      children.push(<div class="col-lg-4 col-md-4 offset-lg-4 offset-md-1 bg-white shadow mb-5 border">
        <Element key = {item["link"]} item = {item["item"]} link = {item["link"]} desc = {item["desc"]} type = {this.state.page} img = {this.state.img}/></div>);
    });

    return (
      <div>
        {children}
        <br></br>
      </div>
    );}
    else if(!this.state.isLoading && this.state.admin) {
      const children = [];
    this.state.items.forEach(item => {
      children.push(<div class="col-lg-4 col-md-4 offset-lg-4 offset-md-1 bg-white shadow mb-5 border">
        <Element key = {item["link"]} item = {item["item"]} link = {item["link"]} desc = {item["desc"]} type = {this.state.page} img = {this.state.img}/>
        <button class="btn text-uppercase mb-3" style = {{"color":"red"}} onClick = { () => {this.removeItem(item["item"])}}><i class="fa fa-trash" aria-hidden="true"></i></button></div>);
    });

    return (
      <div>
        {children}
        <br></br>
      </div>
    );
    }
    else {
      return (<p>loading</p>);
    }
  }
} 

export default List;