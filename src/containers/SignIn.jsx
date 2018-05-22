import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.store.user.getSession().then(result => console.log(result))
                                      .catch(error => console.log(error));
  }

  render() {
    return (
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
         <button onClick={this.handleSubmit}>sign in</button>
      </form>
    )
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    this.props.store.user.signIn(email, password).then(result => {
                                                   this.props.store.user.setAuthenticated();
                                                 })
                                                 .catch(error => {
                                                   console.log(error);
                                                 });
  }
}

export default SignIn;
