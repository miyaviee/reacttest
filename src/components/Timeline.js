import React, { Component } from 'react';
import client from '../lib/client.js';

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data;
  }

  render() {
    var doc = this.state;
    return (
      <div>
        <img src={'http://localhost' + doc.content.images.thumbnail3.path} alt="thumbnail" />
        <p>
          {doc.content.user.nickname}
          {(() => {
            if (doc.content.is_like) {
              return <span>♥</span>;
            } else {
              return <span>♡</span>;
            }
          })()}
        </p>
      </div>
    )
  }
}

export default class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      docs: [],
    }
    var query = client.getQueryData({
      access_token: localStorage.access_token,
    });

    client.get('/timelines/allpost', query)
    .then((res) => {
      if (!res.data.success) {
        alert(res.data.error.message);
      }

      this.setState({docs: res.data.docs});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    var docs = this.state.docs.map((doc) => {
      return (
        <Item key={doc.id} data={doc} />
      )
    })

    return (
      <div>
        {docs}
      </div>
    )
  }
}
