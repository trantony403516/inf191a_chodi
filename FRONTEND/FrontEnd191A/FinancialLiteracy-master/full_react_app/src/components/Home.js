import React from 'react';

import Header from './Header';
import Footer from './Footer';

import {firestore, storageRef} from './Firebase/firebase';

if(localStorage.getItem("userId") != null) {
  var docRef = firestore.collection('users').doc(localStorage.getItem("userId"));
}

var homeRef = firestore.collection('home');

var moduleText = homeRef.doc("modules");
var webinarText = homeRef.doc("webinars");
var budgetText = homeRef.doc("budget");
var resourceText = homeRef.doc("resources");
var partnersText = homeRef.doc("partners");
var liveText = homeRef.doc("live");
var bookText = homeRef.doc("book");
var blogText = homeRef.doc("blog");
var rewardsText = homeRef.doc("rewards");
var accountText = homeRef.doc("account");
var taglineText = homeRef.doc("tagline");

var moduleRef = storageRef.child('Modules.jpg');
var webinarRef = storageRef.child('webinars.jpg');
var budgetRef = storageRef.child('budget.jpg');
var resourceRef = storageRef.child('resources.jpg');
var partnersRef = storageRef.child('partners.jpg');
var liveRef = storageRef.child('live_stream.jpg');
var bookRef = storageRef.child('book_club.jpg');
var blogRef = storageRef.child('blog.jpg');
var rewardsRef = storageRef.child('rewards.jpg');
var accountRef = storageRef.child('account.jpg');
var home2Ref = storageRef.child('home2.jpg');
var logoRef = storageRef.child('Logo.png');


function RenderImage(props) {
      return (<div className="image"><img src={props.url} alt="picture"/>
      </div>);
}

function Header1(props) {
  return (
    <div className="title"><h1>{props.name}</h1></div>
  )
}

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      homeImg:null,
      resourceImg:null,
      webinarsImg:null,
      modulesImg:null,
      partnersImg:null,
      budgetImg:null,
      accountImg:null,
      blogImg:null,
      liveImg:null,
      bookImg:null,
      rewardsImg:null,
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

  getPics = () => {
    return(
      home2Ref.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({homeImg:url});    
    }).then(
    resourceRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({resourceImg:url});    
    }).then(
    webinarRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({webinarsImg:url});    
    }).then(
    moduleRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({modulesImg:url});    
    }).then(
    partnersRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({partnersImg:url});    
    }).then(
    budgetRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({budgetImg:url});    
    }).then(
    accountRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({accountImg:url});    
    }).then(
    blogRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({blogImg:url});    
    }).then(
    liveRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({liveImg:url});    
    }).then(
    bookRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({bookImg:url});    
    }).then(
    rewardsRef.getDownloadURL().then(url => {
      // Insert url into an <img> tag to "download"
      this.setState({rewardsImg:url});    
    }))))))))))));
  }

  getText = () => {
    return(
      taglineText.get().then(doc => {
        let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({tagTitle:item["title"]});    
      this.setState({tagText:item["quote"]});  
    }).then(
    resourceText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({resourceDesc:item["text"]});  
      this.setState({resourceState:item["toggled"]});  
    }).then(
    webinarText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({webinarDesc:item["text"]});  
      this.setState({webinarState:item["toggled"]});   
    }).then(
    moduleText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({moduleDesc:item["text"]});   
      this.setState({moduleState:item["toggled"]});  
    }).then(
    partnersText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({partnersDesc:item["text"]});  
      this.setState({partnersState:item["toggled"]});   
    }).then(
    budgetText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({budgetDesc:item["text"]});   
      this.setState({budgetState:item["toggled"]});  
    }).then(
    accountText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({accountDesc:item["text"]});  
      this.setState({accountState:item["toggled"]});   
    }).then(
    blogText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({blogDesc:item["text"]});   
      this.setState({blogState:item["toggled"]});  
    }).then(
    liveText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({liveDesc:item["text"]});  
      this.setState({liveState:item["toggled"]});   
    }).then(
    bookText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({bookDesc:item["text"]});    
      this.setState({bookState:item["toggled"]}); 
    }).then(
    rewardsText.get().then(doc => {
      let item = doc.data();
      // Insert url into an <img> tag to "download"
      this.setState({rewardsDesc:item["text"]});    
      this.setState({rewardsState:item["toggled"]}); 
    }))))))))))));
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.files});
  }

  uploadHandler = () => {
    var file = new File(this.state.logo, "Logo.png");
    logoRef.put(file).then(function(snapshot) {
      window.location.reload();
    });
  }

  homeUploadHandler = () => {
    var file = new File(this.state.picture, "home2.jpg");
    home2Ref.put(file).then(function(snapshot) {
      window.location.reload();
    });
  }

  onTextChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }

  TagUploadHandler = () => {
    return taglineText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['title'] = this.state.tagTitle;
        item['quote'] = this.state.tagText;
        taglineText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  ModuleUploadHandler = () => {
    return moduleText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.moduleDesc;
        moduleText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  WebinarUploadHandler = () => {
    return webinarText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.webinarDesc;
        webinarText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  BudgetUploadHandler = () => {
    return budgetText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.budgetDesc;
        budgetText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  ResourceUploadHandler = () => {
    return resourceText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.resourceDesc;
        resourceText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  PartnersUploadHandler = () => {
    return partnersText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.partnersDesc;
        partnersText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  LiveUploadHandler = () => {
    return liveText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.liveDesc;
        liveText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  BookUploadHandler = () => {
    return bookText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.bookDesc;
        bookText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  BlogUploadHandler = () => {
    return blogText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.blogDesc;
        blogText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  RewardsUploadHandler = () => {
    return rewardsText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.rewardsDesc;
        rewardsText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  AccountUploadHandler = () => {
    return accountText.get().then(doc => {
      if (doc.exists) {
        let item = doc.data();
        item['text'] = this.state.accountDesc;
        accountText.update(item).then (() => {
          window.location.reload();
        });
      }
      else {
        alert("item doesn't exist");
      }
    });
  }

  componentDidMount(){
    this.setState({isLoading:true});
    this.getPics().then(() => {
    this.getText().then(() => {
    this.getAdmin().then(() => {
    this.setState({isLoading:false});
    });});});
  }

  render() {
    if(!this.state.isLoading && !this.state.admin){
      return (
          <div>
            <Header/>
            <RenderImage class = "homeImg" url={this.state.homeImg}/>
            <br></br>
            <Header1 name = {this.state.tagTitle}/>
            <p>{this.state.tagText}</p>
            <br></br>
            
            {this.print_tables()}

            <Footer/>
          </div>
      );
    }
    else if(!this.state.isLoading && this.state.admin) {
      return (
        <div>
          <Header/>          
          <div class = "imageinput">
          <label>Edit "Logo" Picture: </label><br/>
          <input type = "file" name = "logo" onChange = {this.onChange}/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.uploadHandler}>Upload!</button>
          </div>

          <div class = "imageinput">
          <label>Edit "Home" Picture: </label><br/>
          <input type = "file" name = "picture" onChange = {this.onChange}/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.homeUploadHandler}>Upload!</button>
          </div>

          <RenderImage class = "homeImg" url={this.state.homeImg}/>
          <br></br>
          <Header1 name = {this.state.tagTitle}/>
            <p>{this.state.tagText}</p>
          <br></br>

          <div class = "imageinput">
          <label>Edit Tagline Text: </label><br/>
          <textarea type = "input" name = "tagTitle" onChange = {this.onTextChange}/>
          <br/>
          <label>Edit Quote Text: </label><br/>
          <textarea type = "input" name = "tagText" onChange = {this.onTextChange}/>
          <br/><br/>
          <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.TagUploadHandler}>Upload!</button>
          </div>

          {this.admin_tables()}

          <Footer/>
        </div>
      );
    }
    else {
      return (<p>loading</p>);
    }
  }
  print_tables = () => {
    return (
      <div>
      <table class = "HomeTable">
        {this.state.moduleState &&
            <tr class = "modules">
              <td><img src = {this.state.modulesImg} ></img></td>
              <td><a href = "/modules"><h1>modules</h1><br></br>
                {this.state.moduleDesc}
                </a></td>
            </tr>
        }
        {this.state.webinarState &&
            <tr class = "webinars">
              <td><a href = "/webinars"><h1>webinars</h1><br></br>
              {this.state.webinarDesc}
              </a></td>
              <td><img src = {this.state.webinarsImg} ></img></td>
            </tr> 
        }
        {this.state.budgetState &&
            <tr class = "budget">
            <td><img src = {this.state.budgetImg} ></img></td>
              <td><a href = "/budget"><h1>your budget</h1><br></br>
              {this.state.budgetDesc}
              </a></td>
            </tr>
        }
        {this.state.resourceState &&
          <tr class = "resources">
            <td style = {{"width":"50%"}}><a href = "/resources"><h1>resources</h1><br></br>
            {this.state.resourceDesc}
            </a></td>
            <td><img src = {this.state.resourceImg} ></img></td>
            </tr>
        }
        {this.state.partnersState &&
            <tr class = "partners">
              <td><img src = {this.state.partnersImg} ></img></td>
              <td><a href = "/partners"><h1>partners</h1><br></br>
              {this.state.partnersDesc}
              </a></td>
            </tr>
        }
        {this.state.liveState &&
            <tr class = "live">
              <td><a href = "/live"><h1>live stream - chat</h1><br></br>
              {this.state.liveDesc}
              </a></td>
                <td><img src = {this.state.liveImg} ></img></td>
            </tr>
        }
        {this.state.bookState &&
            <tr class = "book">
              <td><img src = {this.state.bookImg} ></img></td>
              <td><a href = "/book"><h1>book club</h1>
              {this.state.bookDesc}
              </a></td>
            </tr>
        }
        {this.state.blogState &&
            <tr class = "blog">
              <td><a href = "/blog"><h1>blog</h1><br></br>
              {this.state.blogDesc}
              </a></td>
                <td><img src = {this.state.blogImg} ></img></td>
            </tr>
        }
        {this.state.rewardsState &&
            <tr class = "rewards">
              <td><img src = {this.state.rewardsImg} ></img></td>
              <td><a href = "/rewards"><h1>your rewards</h1><br></br>
              {this.state.rewardsDesc}
              </a></td>
            </tr>
        }
        {this.state.accountState &&
            <tr class = "account">
              <td><a href = "/account"><h1>your account</h1><br></br>
              {this.state.accountDesc}
              </a></td>
              <td><img src = {this.state.accountImg} ></img></td>
            </tr>
        }
      </table>
    </div>
    );
  }
  admin_tables = () => {
    return (
      <div>
      <table class = "HomeTable">
        <tr class = "modules">
          <td><img src = {this.state.modulesImg} ></img></td>
          <td><a href = "/modules"><h1>modules</h1><br></br>
            {this.state.moduleDesc}
          </a></td>
        </tr>

        <tr>
          <td></td>
          <td>
            <div class = "imageinput">
              <label>Edit Module Text: </label><br/>
              <textarea type = "input" name = "moduleDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.ModuleUploadHandler}>Upload!</button>
            </div>
          </td>
        </tr>

        <tr class = "webinars">
          <td><a href = "/webinars"><h1>webinars</h1><br></br>
            {this.state.webinarDesc}
          </a></td>
          <td><img src = {this.state.webinarsImg} ></img></td>
        </tr>

        <tr>
          <td>
            <div class = "imageinput">
              <label>Edit Webinars Text: </label><br/>
              <textarea type = "input" name = "webinarDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.WebinarUploadHandler}>Upload!</button>
            </div>
          </td>
          <td></td>
        </tr>

        <tr class = "budget">
          <td><img src = {this.state.budgetImg} ></img></td>
            <td><a href = "/budget"><h1>your budget</h1><br></br>
              {this.state.budgetDesc}
            </a></td>
        </tr>

        <tr>
          <td></td>
          <td>
            <div class = "imageinput">
              <label>Edit Budget Text: </label><br/>
              <textarea type = "input" name = "budgetDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.BudgetUploadHandler}>Upload!</button>
            </div>
          </td>
        </tr>

        <tr class = "resources">
          <td style = {{"width":"50%"}}><a href = "/resources"><h1>resources</h1><br></br>
            {this.state.resourceDesc}
          </a></td>
          <td><img src = {this.state.resourceImg} ></img></td>
        </tr>
        
        <tr>
          <td>
            <div class = "imageinput">
              <label>Edit Resources Text: </label><br/>
              <textarea type = "input" name = "resourceDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.ResourceUploadHandler}>Upload!</button>
            </div>
          </td>
          <td></td>
        </tr>

        <tr class = "partners">
          <td><img src = {this.state.partnersImg} ></img></td>
          <td><a href = "/partners"><h1>partners</h1><br></br>
            {this.state.partnersDesc}
          </a></td>
        </tr>
        
        <tr>
          <td></td>
          <td>
            <div class = "imageinput">
              <label>Edit Partners Text: </label><br/>
              <textarea type = "input" name = "partnersDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.PartnersUploadHandler}>Upload!</button>
            </div>
          </td>
        </tr>

        <tr class = "live">
          <td><a href = "/live"><h1>live stream - chat</h1><br></br>
            {this.state.liveDesc}
          </a></td>
            <td><img src = {this.state.liveImg} ></img></td>
        </tr>
        
        <tr>
          <td>
            <div class = "imageinput">
              <label>Edit Live Stream Text: </label><br/>
              <textarea type = "input" name = "liveDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.LiveUploadHandler}>Upload!</button>
            </div>
          </td>
          <td></td>
        </tr>

        <tr class = "book">
          <td><img src = {this.state.bookImg} ></img></td>
          <td><a href = "/book"><h1>book club</h1>
            {this.state.bookDesc}
          </a></td>
        </tr>
        
        <tr>
          <td></td>
          <td>
            <div class = "imageinput">
              <label>Edit Book Text: </label><br/>
              <textarea type = "input" name = "bookDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.BookUploadHandler}>Upload!</button>
            </div>
          </td>
        </tr>

        <tr class = "blog">
          <td><a href = "/blog"><h1>blog</h1><br></br>
            {this.state.blogDesc}
          </a></td>
            <td><img src = {this.state.blogImg} ></img></td>
        </tr>
        
        <tr>
          <td>
            <div class = "imageinput">
              <label>Edit Blog Text: </label><br/>
              <textarea type = "input" name = "blogDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.BlogUploadHandler}>Upload!</button>
            </div>
          </td>
          <td></td>
        </tr>

        <tr class = "rewards">
          <td><img src = {this.state.rewardsImg} ></img></td>
          <td><a href = "/rewards"><h1>your rewards</h1><br></br>
            {this.state.rewardsDesc}
          </a></td>
        </tr>
        
        <tr>
          <td></td>
          <td>
            <div class = "imageinput">
              <label>Edit Rewards Text: </label><br/>
              <textarea type = "input" name = "rewardsDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.RewardsUploadHandler}>Upload!</button>
            </div>
          </td>
        </tr>

        <tr class = "account">
          <td><a href = "/account"><h1>your account</h1><br></br>
            {this.state.accountDesc}
          </a></td>
          <td><img src = {this.state.accountImg} ></img></td>
        </tr>
        
        <tr>
          <td>
            <div class = "imageinput">
              <label>Edit Account Text: </label><br/>
              <textarea type = "input" name = "accountDesc" onChange = {this.onTextChange}/>
              <br/><br/>
              <button class="btn text-uppercase mb-3" style = {{"color":"#2dd2f4", "border-color":"#2dd2f4"}} onClick={this.AccountUploadHandler}>Upload!</button>
            </div>
          </td>
          <td></td>
        </tr>
        
      </table>
    </div>
    );
  }
} 

export default home;