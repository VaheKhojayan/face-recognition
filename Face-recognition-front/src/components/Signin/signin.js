import React from 'react';
//import './signin.css';

class Signin extends React.Component {


  constructor(props){
    super(props);
    this.state={
      signInEmail: '',
      signInPassword: ''
    }
  }
  

  onEmailChange = (event) => {
    this.setState({signInEmail:event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword:event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://10.7.0.17:3050/back/signin',{
      method:'post',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.id)  {
        this.props.loadUser(data);
        this.props.onroutechange('home')}
    })
 
  }


   render(){
    const {onroutechange}=this.props;
    return (
<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

  <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0">Sign Inn</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange}
               className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
               type="email" name="email-address"  
               id="email-address"
               />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange}
               className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
               type="password" 
               name="password"  
               id="password"
               />
      </div>
    </fieldset>
    <div className="">
      <input onClick={this.onSubmitSignIn} 
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
             type="submit" 
             value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <a onClick={() => onroutechange('register')} href="#0" className="f6 link dim black db">Registration</a>
    </div>
  </div>
 </main>
 </article>
  );

   }

  
}

export default Signin;
