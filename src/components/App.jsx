import { Component } from 'react';

const API = 'https://pixabay.com/api/?key=30615642-0c3410a518698d6d783d2cae0';

export class App extends Component {
  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(resonse => console.log(resonse));
  }

  render() {
    return <div>Hello</div>;
  }
}
