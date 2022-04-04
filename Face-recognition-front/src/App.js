import React,{Component} from 'react';
import './App.css';
import Navigation from './components/navigation/navigation.js'
import Logo from './components/logos/logo.js'
import ImageLinkForm from './components/imagelinkform/imagelinkform.js'
import Rank from './components/rank/rank.js'
import Particles from 'react-particles-js';
import Clarifai  from 'clarifai';
import FaceRecognition from './components/faceRecognition/faceRecognition.js'
import Signin from './components/Signin/signin.js'
import Registration from './components/registration/Registration.js'

const app = new Clarifai.App({
 apiKey: 'f388cbd9e0864d48911049ac6cce938a'
});



const particlesOptions={
                particles: {
                  number:{
                    value:150,
                    density:{
                      enable:true,
                      value_area:1000
                    }
                  }
                }
              };

              



class App extends Component {


  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      user: {
         id:'',
         name:'',
         email:'',
         entries:0,
         joined: '',
      }
    }
  }
   


   loadUser = (user) => {
    this.setState({user: {
         id:user.id,
         name:user.name,
         email:user.email,
         entries:user.entries,
         joined: user.joined,
      }})
   }


   oninputchange = (event) => {
    this.setState({input:event.target.value})
   }

   boxPoints = (data) => {
    const clarifai=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('face'); 
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol:clarifai.left_col*width,
      topRow: clarifai.top_row*height,
      rightCol:width-(clarifai.right_col*width),
      bottomRow:height-(clarifai.bottom_row*height),
    }    
   }

   displayFaceBox= (box) => {
    this.setState({box:box});
   }


   onsubmitdetect = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict
    (Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => {
      if (response){
        fetch('http://localhost:3001/image',{
                            method:'put',
                            headers:{'content-type':'application/json'},
                            body:JSON.stringify({id:this.state.user.id})
      })
        .then(response => response.json() )
        .then(count => {this.setState(Object.assign(this.state.user,{entries:count}))})
                      }
                        this.displayFaceBox(this.boxPoints(response))})
    .catch(err => console.log(err));

 }
   

   onRouteChange = (route) =>{
    this.setState({imageUrl:''});
    this.setState({route:route})
   }

  render(){
  return (
    <div className="App">
    <Particles className='particles'
               params={particlesOptions}
            />
     { this.state.route==='signin' ?
       <Signin loadUser={this.loadUser}  
               onroutechange={this.onRouteChange}/>
      : this.state.route==='register' ?
         <Registration loadUser={this.loadUser} 
                       onroutechange={this.onRouteChange} />
         :
      <div> 
        <Navigation onroutechange={this.onRouteChange} />
        <Logo />
        <Rank name={this.state.user.name} 
              entries={this.state.user.entries}/>
        <ImageLinkForm oninchange={this.oninputchange}
                       onsubmit={this.onsubmitdetect}/>
        <FaceRecognition box={this.state.box} 
                         imageurl={this.state.imageUrl} />
      </div>}
    </div>
  );
}}

export default App;
