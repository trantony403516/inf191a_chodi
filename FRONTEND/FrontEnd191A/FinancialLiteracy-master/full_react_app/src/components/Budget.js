import React from 'react';
import swal from 'sweetalert2';

import Header from './Header';
import Footer from './Footer';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {firestore, storageRef} from './Firebase/firebase';

var budgetRef = storageRef.child('budget.jpg');

if(localStorage.getItem("userId") != null) {
var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}
var userId;

function RenderImage(props) {
      return (<div className="image"><img src={props.url} alt="picture"/>
      </div>);
}

function Header1(props) {
  return (
    <div className="title"><h1>{props.name}</h1></div>
  )
}

var income;
var benefits;
var savings;
var food ;
var housing;
var utilities;
var debts;
var transportation;
var personal;
var lifeinsurance;
var monthly;
var comment;
var admin = false;

function onAfterSaveCell(row, cellName, cellValue) {

  var income = null;
  let estimated = null;
  let actual = null;
  var comment = null;
  var admincomment = null;

  for (var prop in row) {
    if(prop == "income") {
      income = row[prop];
    }
    else if(prop == "estimated") {
      estimated = row[prop];
    }
    else if(prop == "actual") {
      actual = row[prop];
    }
    else if(prop == "admincomment") {
      admincomment = row[prop];
    }
    else if(prop == "comment") {
      comment = row[prop];
    }
  }
  if(admin)
    docRef = firestore.collection('users').doc(userId);
  docRef.get().then(function(doc) {
    if (doc.exists) {
      let item = doc.data();
      //we ge the item from the table and set the respective value in the database
      if(comment == null) {
        item[income][0] = Number(estimated);
        item[income][1] = Number(actual); 
      }
      if(comment != null)
        item["comment"] = comment;
      if(admincomment != null)  {
        item["admincomment"] = admincomment;
      }
      docRef.update(item);
    }
    else {
      alert("item doesn't exist");
    }
  });
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};


class Budget extends React.Component {
  constructor(props) {
      super();
      this.state = {
        isLoading:true,
        admin:false,
        userDoc: firestore.collection("users"),
        users:[],
        userId: 'nothing',
        budgetImg:null,
        url:null,
        picture:null,
      }
  }
  myData = () => {
    var ref;
    if(this.state.userId != 'nothing') {
      ref = this.state.userDoc.doc(this.state.userId);
      userId = this.state.userId;
    }
    else {
      ref = docRef; 
    }
    return ref.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        let incomeDelta = 0;
        let expenseDelta = 0;
        let totalEstimatedIncome = 0;
        let totalActualIncome = 0;
        let totalEstimatedExpense = 0;
        let totalActualExpense = 0;
        if(item["admin"] == null) {

          incomeDelta += (Number(item["wages"][1]) - Number(item["wages"][0]) || 0) + (Number(item["bonus"][1]) - Number(item["bonus"][0]) || 0)
          + (Number(item['commission'][1]) - Number(item['commission'][0]) || 0) + (Number(item['reimbursements'][1]) - Number(item['reimbursements'][0]) || 0)
          + (Number(item['alimony income'][1]) - Number(item['alimony income'][0]) || 0);

          totalEstimatedIncome += (Number(item["wages"][0]) || 0) + (Number(item["bonus"][0]) || 0)
          + (Number(item['commission'][0]) || 0) + (Number(item['reimbursements'][0]) || 0)
          + (Number(item['alimony income'][0]) || 0);

          totalActualIncome += (Number(item["wages"][1]) || 0) + (Number(item["bonus"][1]) || 0)
          + (Number(item['commission'][1]) || 0) + (Number(item['reimbursements'][1]) || 0)
          + (Number(item['alimony income'][1]) || 0);

          income = [{
            income: 'wages',
            estimated: item["wages"][0],
            actual: item["wages"][1],
            delta: Number(item["wages"][1]) - Number(item["wages"][0]) || 0
          }, {
            income: 'bonus',
            estimated: item['bonus'][0],
            actual: item['bonus'][1],
            delta: Number(item["bonus"][1]) - Number(item["bonus"][0]) || 0
          },{
            income: 'commission',
            estimated: item['commission'][0],
            actual: item['commission'][1],
            delta: Number(item['commission'][1]) - Number(item['commission'][0]) || 0
          },{
            income: 'reimbursements',
            estimated: item['reimbursements'][0],
            actual: item['reimbursements'][1],
            delta: Number(item['reimbursements'][1]) - Number(item['reimbursements'][0]) || 0
          },{
            income: 'alimony income',
            estimated: item['alimony income'][0],
            actual: item['alimony income'][1],
            delta: Number(item['alimony income'][1]) - Number(item['alimony income'][0]) || 0
          }
          ];

          incomeDelta += (Number(item['401k'][1]) - Number(item['401k'][0]) || 0) + (Number(item['medical'][1]) - Number(item['medical'][0]) || 0)
          + (Number(item['dental'][1]) - Number(item['dental'][0]) || 0) + (Number(item['vision'][1]) - Number(item['vision'][0]) || 0)
          + (Number(item['health savings (hsa)'][1]) - Number(item['health savings (hsa)'][0]) || 0);

          totalEstimatedIncome += (Number(item['401k'][0]) || 0) + (Number(item['medical'][0]) || 0)
          + (Number(item['dental'][0]) || 0) + (Number(item['vision'][0]) || 0) + (Number(item['health savings (hsa)'][0]) || 0);

          totalActualIncome += (Number(item['401k'][1]) || 0) + (Number(item['medical'][1]) || 0)
          + (Number(item['dental'][1]) || 0) + (Number(item['vision'][1]) || 0)
          + (Number(item['health savings (hsa)'][1]) || 0);

          benefits = [{
            income: '401k',
            estimated: item['401k'][0],
            actual: item['401k'][1],
            delta: Number(item['401k'][1]) - Number(item['401k'][0]) || 0
          },
          {
            income: 'medical',
            estimated: item['medical'][0],
            actual: item['medical'][1],
            delta: Number(item['medical'][1]) - Number(item['medical'][0]) || 0
          },
          {
            income: 'dental',
            estimated: item['dental'][0],
            actual: item['dental'][1],
            delta: Number(item['dental'][1]) - Number(item['dental'][0]) || 0
          },
          {
            income: 'vision',
            estimated: item['vision'][0],
            actual: item['vision'][1],
            delta: Number(item['vision'][1]) - Number(item['vision'][0]) || 0
          },
          {
            income: 'health savings (hsa)',
            estimated: item['health savings (hsa)'][0],
            actual: item['health savings (hsa)'][1],
            delta: Number(item['health savings (hsa)'][1]) - Number(item['health savings (hsa)'][0]) || 0
          }
          ]

          incomeDelta += (Number(item['emergency fund'][1]) - Number(item['emergency fund'][0]) || 0) + (Number(item['investments'][1]) - Number(item['investments'][0]) || 0)
          + (Number(item['ira'][1]) - Number(item['ira'][0]) || 0) + (Number(item['vacation'][1]) - Number(item['vacation'][0]) || 0) + 
          (Number(item['gifts'][1]) - Number(item['gifts'][0]) || 0);

          totalEstimatedIncome += (Number(item['emergency fund'][0]) || 0) + (Number(item['investments'][0]) || 0)
          + (Number(item['ira'][0]) || 0) + (Number(item['vacation'][0]) || 0) + (Number(item['gifts'][0]) || 0);

          totalActualIncome += (Number(item['emergency fund'][1]) || 0) + (Number(item['investments'][1]) || 0)
          + (Number(item['ira'][1]) || 0) + (Number(item['vacation'][1]) || 0) + 
          (Number(item['gifts'][1]) || 0);


          savings = [{
            income: 'emergency fund',
            estimated: item['emergency fund'][0],
            actual: item['emergency fund'][1],
            delta: Number(item['emergency fund'][1]) - Number(item['emergency fund'][0]) || 0
          },
          {
            income: 'investments',
            estimated: item['investments'][0],
            actual: item['investments'][1],
            delta: Number(item['investments'][1]) - Number(item['investments'][0]) || 0
          },
          {
            income: 'ira',
            estimated: item['ira'][0],
            actual: item['ira'][1],
            delta: Number(item['ira'][1]) - Number(item['ira'][0]) || 0
          },
          {
            income: 'vacation',
            estimated: item['vacation'][0],
            actual: item['vacation'][1],
            delta: Number(item['vacation'][1]) - Number(item['vacation'][0]) || 0
          },
          {
            income: 'gifts',
            estimated: item['gifts'][0],
            actual: item['gifts'][1],
            delta: Number(item['gifts'][1]) - Number(item['gifts'][0]) || 0
          }
          ]

          expenseDelta += (Number(item['groceries'][0]) - Number(item['groceries'][1]) || 0) + (Number(item['dining out'][0]) - Number(item['dining out'][1]) || 0);

          totalEstimatedExpense += (Number(item['groceries'][0]) || 0) + (Number(item['dining out'][0]) || 0);

          totalActualExpense += (Number(item['groceries'][1]) || 0) + (Number(item['dining out'][1]) || 0);

          food = [{
            income: 'groceries',
            estimated: item['groceries'][0],
            actual: item['groceries'][1],
            delta: Number(item['groceries'][0]) - Number(item['groceries'][1]) || 0
          },
          {
            income: 'dining out',
            estimated: item['dining out'][0],
            actual: item['dining out'][1],
            delta: Number(item['dining out'][0]) - Number(item['dining out'][1]) || 0
          }
          ]

          expenseDelta += (Number(item['rent'][0]) - Number(item['rent'][1]) || 0) + (Number(item['real estate'][0]) - Number(item['real estate'][1]) || 0)
          + (Number(item['insurance'][0]) - Number(item['insurance'][1]) || 0) + (Number(item['home maintenance'][0]) - Number(item['home maintenance'][1]) || 0 )
          + (Number(item['security'][0]) - Number(item['security'][1]) || 0);

          totalEstimatedExpense += (Number(item['rent'][0])|| 0) + (Number(item['real estate'][0]) || 0)
          + (Number(item['insurance'][0]) || 0) + (Number(item['home maintenance'][0]) || 0 )
          + (Number(item['security'][0]) || 0);

          totalActualExpense += (Number(item['rent'][1]) || 0) + (Number(item['real estate'][1]) || 0)
          + (Number(item['insurance'][1]) || 0) + (Number(item['home maintenance'][1]) || 0 )
          + (Number(item['security'][1]) || 0);

          housing = [{
            income: 'rent',
            estimated: item['rent'][0],
            actual: item['rent'][1],
            delta: Number(item['rent'][0]) - Number(item['rent'][1]) || 0
          },
          {
            income: 'real estate',
            estimated: item['real estate'][0],
            actual: item['real estate'][1],
            delta: Number(item['real estate'][0]) - Number(item['real estate'][1]) || 0
          },
          {
            income: 'insurance',
            estimated: item['insurance'][0],
            actual: item['insurance'][1],
            delta: Number(item['insurance'][0]) - Number(item['insurance'][1]) || 0
          },
          {
            income: 'home maintenance',
            estimated: item['home maintenance'][0],
            actual: item['home maintenance'][1],
            delta: Number(item['home maintenance'][0]) - Number(item['home maintenance'][1]) || 0
          },
          {
            income: 'security',
            estimated: item['security'][0],
            actual: item['security'][1],
            delta: Number(item['security'][0]) - Number(item['security'][1]) || 0
          }
          ]

          expenseDelta += (Number(item['water'][0]) - Number(item['water'][1]) || 0) + (Number(item['gas'][0]) - Number(item['gas'][1]) || 0)
          + (Number(item['electric'][0]) - Number(item['electric'][1]) || 0) + (Number(item['sewer'][0]) - Number(item['sewer'][1]) || 0)
          + (Number(item['trash'][0]) - Number(item['trash'][1]) || 0) + (Number(item['phone'][0]) - Number(item['phone'][1]) || 0 )
          + (Number(item['internet'][0]) - Number(item['internet'][1]) || 0) + (Number(item['cable'][0]) - Number(item['cable'][1]) || 0)
          + (Number(item['music and books'][0]) - Number(item['music and books'][1]) || 0);

          totalEstimatedExpense += (Number(item['water'][0]) || 0) + (Number(item['gas'][0]) || 0)
          + (Number(item['electric'][0]) || 0) + (Number(item['sewer'][0]) || 0)
          + (Number(item['trash'][0]) || 0) + (Number(item['phone'][0]) || 0 )
          + (Number(item['internet'][0]) || 0) + (Number(item['cable'][0]) || 0)
          + (Number(item['music and books'][0]) || 0);

          totalActualExpense += (Number(item['water'][1]) || 0) + (Number(item['gas'][1]) || 0)
          + (Number(item['electric'][1]) || 0) + (Number(item['sewer'][1]) || 0)
          + (Number(item['trash'][1]) || 0) + (Number(item['phone'][1]) || 0 )
          + (Number(item['internet'][1]) || 0) + (Number(item['cable'][1]) || 0)
          + (Number(item['music and books'][1]) || 0);

          utilities = [{
            income: 'water',
            estimated: item['water'][0],
            actual: item['water'][1],
            delta: Number(item['water'][0]) - Number(item['water'][1]) || 0
          },
          {
            income: 'gas',
            estimated: item['gas'][0],
            actual: item['gas'][1],
            delta: Number(item['gas'][0]) - Number(item['gas'][1]) || 0
          },
          {
            income: 'electric',
            estimated: item['electric'][0],
            actual: item['electric'][1],
            delta: Number(item['electric'][0]) - Number(item['electric'][1]) || 0
          },
          {
            income: 'sewer',
            estimated: item['sewer'][0],
            actual: item['sewer'][1],
            delta: Number(item['sewer'][0]) - Number(item['sewer'][1]) || 0
          },
          {
            income: 'trash',
            estimated: item['trash'][0],
            actual: item['trash'][1],
            delta: Number(item['trash'][0]) - Number(item['trash'][1]) || 0
          },
          {
            income: 'phone',
            estimated: item['phone'][0],
            actual: item['phone'][1],
            delta: Number(item['phone'][0]) - Number(item['phone'][1]) || 0
          },
          {
            income: 'internet',
            estimated: item['internet'][0],
            actual: item['internet'][1],
            delta: Number(item['internet'][0]) - Number(item['internet'][1]) || 0
          },
          {
            income: 'cable',
            estimated: item['cable'][0],
            actual: item['cable'][1],
            delta: Number(item['cable'][0]) - Number(item['cable'][1]) || 0
          },
          {
            income: 'music and books',
            estimated: item['music and books'][0],
            actual: item['music and books'][1],
            delta: Number(item['music and books'][0]) - Number(item['music and books'][1]) || 0
          }
          ]

          expenseDelta += (Number(item['credit'][0]) - Number(item['401k'][1]) || 0) + (Number(item['store cards'][0]) - Number(item['store cards'][1]) || 0)
          + (Number(item['student loans'][0]) - Number(item['student loans'][1]) || 0) + (Number(item['business expenses'][0]) - Number(item['business expenses'][1]) || 0 )
          + (Number(item['vet bills'][0]) - Number(item['vet bills'][1]) || 0) + (Number(item['alimony debt'][0]) - Number(item['alimony debt'][1]) || 0);

          totalEstimatedExpense += (Number(item['credit'][0]) || 0) + (Number(item['store cards'][0]) || 0)
          + (Number(item['student loans'][0]) || 0) + (Number(item['business expenses'][0]) || 0 )
          + (Number(item['vet bills'][0]) || 0) + (Number(item['alimony debt'][0]) || 0);

          totalActualExpense += (Number(item['401k'][1]) || 0) + (Number(item['store cards'][1]) || 0)
          + (Number(item['student loans'][1]) || 0) + (Number(item['business expenses'][1]) || 0 )
          + (Number(item['vet bills'][1]) || 0) + (Number(item['alimony debt'][1]) || 0);

          debts = [{
            income: 'credit',
            estimated: item['credit'][0],
            actual: item['credit'][1],
            delta: Number(item['credit'][0]) - Number(item['401k'][1]) || 0
          },
          {
            income: 'store cards',
            estimated: item['store cards'][0],
            actual: item['store cards'][1],
            delta: Number(item['store cards'][0]) - Number(item['store cards'][1]) || 0
          },
          {
            income: 'student loans',
            estimated: item['student loans'][0],
            actual: item['student loans'][1],
            delta: Number(item['student loans'][0]) - Number(item['student loans'][1]) || 0
          },
          {
            income: 'business expenses',
            estimated: item['business expenses'][0],
            actual: item['business expenses'][1],
            delta: Number(item['business expenses'][0]) - Number(item['business expenses'][1]) || 0
          },
          {
            income: 'vet bills',
            estimated: item['vet bills'][0],
            actual: item['vet bills'][1],
            delta: Number(item['vet bills'][0]) - Number(item['vet bills'][1]) || 0
          },
          {
            income: 'alimony debt',
            estimated: item['alimony debt'][0],
            actual: item['alimony debt'][1],
            delta: Number(item['alimony debt'][0]) - Number(item['alimony debt'][1]) || 0
          }
          ]

          expenseDelta += (Number(item['auto payment'][0]) - Number(item['auto payment'][1]) || 0) + (Number(item['auto insurance'][0]) - Number(item['auto insurance'][1]) || 0 )
          + (Number(item['gasoline'][0]) - Number(item['gasoline'][1]) || 0) + (Number(item['maintenance'][0]) - Number(item['maintenance'][1]) || 0 )
          +( Number(item['parking and tolls'][0]) - Number(item['parking and tolls'][1]) || 0);

          totalEstimatedExpense += (Number(item['auto payment'][0]) || 0) + (Number(item['auto insurance'][0]) || 0 )
          + (Number(item['gasoline'][0]) || 0) + (Number(item['maintenance'][0]) || 0 )
          +( Number(item['parking and tolls'][0]) || 0);
          
          totalActualExpense += (Number(item['auto payment'][1]) || 0) + (Number(item['auto insurance'][1]) || 0 )
          + (Number(item['gasoline'][1]) || 0) + (Number(item['maintenance'][1]) || 0 )
          +(Number(item['parking and tolls'][1]) || 0);
          
          transportation = [
          {
            income: 'auto payment',
            estimated: item['auto payment'][0],
            actual: item['auto payment'][1],
            delta: Number(item['auto payment'][0]) - Number(item['auto payment'][1]) || 0
          },
          {
            income: 'auto insurance',
            estimated: item['auto insurance'][0],
            actual: item['auto insurance'][1],
            delta: Number(item['auto insurance'][0]) - Number(item['auto insurance'][1]) || 0
          },
          {
            income: 'gasoline',
            estimated: item['gasoline'][0],
            actual: item['gasoline'][1],
            delta: Number(item['gasoline'][0]) - Number(item['gasoline'][1]) || 0
          },
          {
            income: 'maintenance',
            estimated: item['maintenance'][0],
            actual: item['maintenance'][1],
            delta: Number(item['maintenance'][0]) - Number(item['maintenance'][1]) || 0
          },
          {
            income: 'parking and tolls',
            estimated: item['parking and tolls'][0],
            actual: item['parking and tolls'][1],
            delta: Number(item['parking and tolls'][0]) - Number(item['parking and tolls'][1]) || 0
          }
          ]

          expenseDelta += (Number(item['clothing'][0]) - Number(item['clothing'][1]) || 0) + (Number(item['laundry'][0]) - Number(item['laundry'][1]) || 0 )
          + (Number(item['vitamins'][0]) - Number(item['vitamins'][1]) || 0) + (Number(item['memberships'][0]) - Number(item['memberships'][1]) || 0 )
          + (Number(item['prescriptions'][0]) - Number(item['prescriptions'][1]) || 0) + (Number(item['recreation'][0]) - Number(item['recreation'][1]) || 0)
          + (Number(item['hair and nails'][0]) - Number(item['hair and nails'][1]) || 0);

          totalEstimatedExpense += (Number(item['clothing'][0]) || 0) + (Number(item['laundry'][0]) || 0 )
          + (Number(item['vitamins'][0]) || 0) + (Number(item['memberships'][0]) || 0 )
          + (Number(item['prescriptions'][0]) || 0) + (Number(item['recreation'][0]) || 0)
          + (Number(item['hair and nails'][0]) || 0);

          totalActualExpense += (Number(item['clothing'][1]) || 0) + ( Number(item['laundry'][1]) || 0 )
          + (Number(item['vitamins'][1]) || 0) + (Number(item['memberships'][1]) || 0 )
          + (Number(item['prescriptions'][1]) || 0) + (Number(item['recreation'][1]) || 0)
          + (Number(item['hair and nails'][1]) || 0);

          personal = [{
            income: 'clothing',
            estimated: item['clothing'][0],
            actual: item['clothing'][1],
            delta: Number(item['clothing'][0]) - Number(item['clothing'][1]) || 0
          },
          {
            income: 'laundry',
            estimated: item['laundry'][0],
            actual: item['laundry'][1],
            delta: Number(item['laundry'][0]) - Number(item['laundry'][1]) || 0
          },
          {
            income: 'vitamins',
            estimated: item['vitamins'][0],
            actual: item['vitamins'][1],
            delta: Number(item['vitamins'][0]) - Number(item['vitamins'][1]) || 0
          },
          {
            income: 'memberships',
            estimated: item['memberships'][0],
            actual: item['memberships'][1],
            delta: Number(item['memberships'][0]) - Number(item['memberships'][1]) || 0
          },
          {
            income: 'prescriptions',
            estimated: item['prescriptions'][0],
            actual: item['prescriptions'][1],
            delta: Number(item['prescriptions'][0]) - Number(item['prescriptions'][1]) || 0
          },
          {
            income: 'recreation',
            estimated: item['recreation'][0],
            actual: item['recreation'][1],
            delta: Number(item['recreation'][0]) - Number(item['recreation'][1]) || 0
          },
          {
            income: 'hair and nails',
            estimated: item['hair and nails'][0],
            actual: item['hair and nails'][1],
            delta: Number(item['hair and nails'][0]) - Number(item['hair and nails'][1]) || 0
          }
          ]

          expenseDelta += (Number(item['term'][0]) - Number(item['term'][1]) || 0) + (Number(item['permanent'][0]) - Number(item['permanent'][1]) || 0 )
          + (Number(item['long-term care'][0]) - Number(item['long-term care'][1]) || 0);

          totalEstimatedExpense += (Number(item['term'][0]) || 0) + (Number(item['permanent'][0]) || 0 )
          + (Number(item['long-term care'][0]) || 0);

          totalActualExpense += (Number(item['term'][1]) || 0) + (Number(item['permanent'][1]) || 0 )
          + (Number(item['long-term care'][1]) || 0);

          lifeinsurance = [{
            income: 'term',
            estimated: item['term'][0],
            actual: item['term'][1],
            delta: Number(item['term'][0]) - Number(item['term'][1]) || 0
          },
          {
            income: 'permanent',
            estimated: item['permanent'][0],
            actual: item['permanent'][1],
            delta: Number(item['permanent'][0]) - Number(item['permanent'][1]) || 0
          },
          {
            income: 'long-term care',
            estimated: item['long-term care'][0],
            actual: item['long-term care'][1],
            delta: Number(item['long-term care'][0]) - Number(item['long-term care'][1]) || 0
          }
          ]
          monthly= [{
            income: 'total income',
            estimated: totalEstimatedIncome,
            actual: totalActualIncome,
            delta: incomeDelta
          },
          {
            income: 'total expenses',
            estimated: totalEstimatedExpense,
            actual: totalActualExpense,
            delta: expenseDelta
          }
          ]
          if(this.state.admin)
          comment = [{comment: item['comment'], admincomment: item['admincomment']}]
          else
          comment = [{comment: item['comment'], admincomment: item['admincomment']}]
        }
        else {
          return this.state.userDoc.get().then(querySnap => {
            querySnap.forEach(entry => {
              var doc = entry.data();
              if(doc["admin"] == null)
              this.setState({users:[...this.state.users,{id:entry.id, name:String(doc["first"] + " " + doc["last"])}]});
            });
            console.log(this.state.users);
            this.state.admin=true;
            admin = this.state.admin;
          });
        }
      }
      else {
        console.log("doesn't exist");
      }
    });
  }

getImg = () => {
  return budgetRef.getDownloadURL().then(url => {
    // Insert url into an <img> tag to "download"
    this.setState({budgetImg:url});    
  }).catch(function(error) {
        console.log("error occurred");
    });
}

updateUser = (id) => {
  this.state.userId = id;
  this.setState({isLoading:true});
  this.myData().then(() => {
  this.setState({isLoading:false});
  });
}

resetUser = () => {
  this.setState({userId:"nothing"});
}

onChange = (e) => {
  this.setState({picture : e.target.files});
}

uploadHandler = () => {
  console.log(this.state.picture[0]);
  var file = new File(this.state.picture, "budget.jpg");
  budgetRef.put(file).then(function(snapshot) {
    window.location.reload();
  });
}

componentDidMount = () => {
  this.setState({isLoading:true});
  this.myData().then(() => {
  this.getImg().then(() => {
  this.setState({isLoading:false});
  });});
}



render (){
  if(!this.state.isLoading && !this.state.admin) {
    return (
      <div>
        <Header/>
        <RenderImage class = "budgetImg" url={this.state.budgetImg}/>
        <Header1 name = "your budget"/>
        <p> any comments or concerns about your budget? We will try to respond to you promptly.</p>
        <BootstrapTable data={ comment } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='comment'>Your comments</TableHeaderColumn>
          <TableHeaderColumn dataField='admincomment' isKey>Responses</TableHeaderColumn>
        </BootstrapTable>
        <br/>
        <br/> 
        <div style = {{"display": "flex", "justify-content": "center"}}>
        <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick = { () => {window.location.reload()}}>submit</button>
        </div>
        {this.print_tables()}
      </div>
    );
    
  }
  else if(!this.state.admin) {
    return (<p>loading</p>);
  }
  else {
    const users = [];
    this.state.users.forEach(item => {
      users.push(<div style = {{"display": "flex", "justify-content": "center"}}><button  
        class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick = {() => {this.updateUser(item["id"])}}>
          {item["name"]}</button><br></br></div>);
    });
    if(this.state.userId == 'nothing') {
      return (
        <div>
          <Header/>

          <div class = "imageinput">
          <label>Edit "Budget" Picture: </label><br/>
          <input type = "file" onChange = {this.onChange}/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
          </div>

          <RenderImage class = "budgetImg" url={this.state.budgetImg}/>
          <p>admin page, select a user</p>
          {users}
        </div>
      )
    }
    else {
      return (
        <div>
          <Header/>
          <RenderImage class = "budgetImg" url={this.state.budgetImg}/>
          <p>admin page</p>
          <div style = {{"display": "flex", "justify-content": "center"}}>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick = { () => {this.resetUser()}} >Go back to user list</button>
          </div>
          <div class = "budget_table">
            <BootstrapTable data={ comment } cellEdit = {cellEditProp}>
              <TableHeaderColumn dataField='comment'isKey>Their comments</TableHeaderColumn>
              <TableHeaderColumn dataField='admincomment' >Your comments</TableHeaderColumn>
            </BootstrapTable>
          <br/>
          </div> 
          {this.user_tables()}
        </div>
      )
    }
  }
}
  print_tables() {
    return (
      <div>
        <div class = "budget_table">
        <BootstrapTable data={ income } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Income</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ benefits } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Benefits</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ savings } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Savings</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ food } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Food</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ housing } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Housing</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ utilities } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Utilities</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ debts } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Debt</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ transportation } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Transportation</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ personal } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Personal</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ lifeinsurance } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Life Insurance</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated'>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual'>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ monthly } cellEdit = {cellEditProp}>
          <TableHeaderColumn dataField='income' isKey>Monthly Cash flow</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick = {() => {window.location.reload()}}>submit</button>
        </div>
        <Footer/>
      </div>
    );
  }
  user_tables() {
    return (
      <div>
        <div class = "budget_table">
        <BootstrapTable data={ income }>
          <TableHeaderColumn dataField='income' isKey>Income</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ benefits }>
          <TableHeaderColumn dataField='income' isKey>Benefits</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ savings }>
          <TableHeaderColumn dataField='income' isKey>Savings</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ food }>
          <TableHeaderColumn dataField='income' isKey>Food</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ housing }>
          <TableHeaderColumn dataField='income' isKey>Housing</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ utilities }>
          <TableHeaderColumn dataField='income' isKey>Utilities</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ debts }>
          <TableHeaderColumn dataField='income' isKey>Debt</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ transportation }>
          <TableHeaderColumn dataField='income' isKey>Transportation</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ personal }>
          <TableHeaderColumn dataField='income' isKey>Personal</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ lifeinsurance }>
          <TableHeaderColumn dataField='income' isKey>Life Insurance</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        <BootstrapTable data={ monthly }>
          <TableHeaderColumn dataField='income' isKey>Monthly Cash flow</TableHeaderColumn>
          <TableHeaderColumn dataField='estimated' editable={ false }>Estimated</TableHeaderColumn>
          <TableHeaderColumn dataField='actual' editable={ false }>Actual</TableHeaderColumn>
          <TableHeaderColumn dataField='delta' editable={ false }>Delta</TableHeaderColumn>
        </BootstrapTable>
        <br></br>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Budget;     