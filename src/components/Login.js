import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import client from '../lib/client.js';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  login() {
    var loginParams = client.getPostData({
      username: this.state.username,
      password: this.state.password,
    });

    delete localStorage.access_token;
    client.post('/auth/login', loginParams)
    .then((res) => {
      if (!res.data.success) {
        alert(res.data.error.message);
        return false;
      }
      localStorage.access_token = res.data.access_token;

      this.props.history.push('/timelines');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  changeValue(e) {
    var state = this.state;
    switch (e.target.name) {
      case 'username':
        state.username = e.target.value;
        break;
      case 'password':
        state.password = e.target.value;
        break;
      default:
        state.username = '';
        state.password = '';
        break;
    }

    this.setState(state);
  }

  render() {
    return (
      <div className="login">
        <div>
          <TextField name="username" floatingLabelText="username" value={this.state.username} onChange={this.changeValue} />
        </div>
        <div>
          <TextField name="password" floatingLabelText="password" value={this.state.password} onChange={this.changeValue} />
        </div>
        <div>
          <RaisedButton onTouchTap={this.login} label="Login" primary/>
          <RaisedButton onTouchTap={this.changeValue} label="Clear" />
        </div>
      </div>
    );
  }
}
