import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      confirm: null,
      confirmationCode: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  render() {
    const error = this.state.error
       ? (
           <div className="sign-up-error">
             <p>{this.state.error}</p>
             <p><Link to="/signin">Click here to sign in.</Link></p>
           </div>
         )
       : null;
    const confirm = this.state.confirm
      ? (
          <div className="confirmation">
            <p>Please check your email for your confirmation code.</p>
            <p>Code:</p>
            <input
              value={this.state.confirmationCode}
              onChange={e => this.onChange('confirmationCode', e.target.value)}
              placeholder="code"
            />
            <button onClick={this.handleConfirm}>confirm</button>
          </div>
        )
      : null;
    return (
      <div className="sign=up">
        <form>
          <p>email:</p>
          <input
             value={this.state.email}
             onChange={e => this.onChange('email', e.target.value)}
             placeholder="email"
          />
          <p>password:</p>
          <input
             value={this.state.password}
             onChange={e => this.onChange('password', e.target.value)}
             placeholder="password"
             type="password"
           />
           <button onClick={this.handleSubmit}>sign up</button>
        </form>
        {
          error
        }
        {
          confirm
        }
      </div>
    )
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    this.props.store.user.signUp(email, password).then(result => {
                                                   this.setState({
                                                     confirm: true,
                                                     error: null,
                                                   });
                                                 })
                                                 .catch(error => {
                                                   this.setState({error: error.message});
                                                 });
  }
  handleConfirm(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const code = this.state.confirmationCode.trim();
    this.props.store.user.confirmAccount(this.state.email, code).then(result => {
                                                                  // automagically log the user in
                                                                  console.log(result);
                                                                })
                                                                .catch(error => {
                                                                  // prompt to re-enter code
                                                                  // offer alternative to resend code
                                                                  console.log(error);
                                                                })
  }
}

export default SignUp;
