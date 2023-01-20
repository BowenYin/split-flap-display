import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-split-flap-effect/extras/themes.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { FlapDisplay, Presets } from 'react-split-flap-effect'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAL7Oj24B5AWisNUoj3ArpniaxkuB9mtNg",
  authDomain: "splitflap-display.firebaseapp.com",
  databaseURL: "https://splitflap-display-default-rtdb.firebaseio.com",
  projectId: "splitflap-display",
  storageBucket: "splitflap-display.appspot.com",
  messagingSenderId: "279802897796",
  appId: "1:279802897796:web:4a63d221b44a0caeb629d1"
};
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "hi",
      row1: "",
      row2: "",
      row3: "",
      row4: "",
    };

    onValue(ref(db, "message/header"), snapshot => {
      this.setState({header: snapshot.val()});
    });
    onValue(ref(db, "message/row1"), snapshot => {
      this.setState({row1: snapshot.val()});
    });
    onValue(ref(db, "message/row2"), snapshot => {
      this.setState({row2: snapshot.val()});
    });
    onValue(ref(db, "message/row3"), snapshot => {
      this.setState({row3: snapshot.val()});
    });
    onValue(ref(db, "message/row4"), snapshot => {
      this.setState({row4: snapshot.val()});
    });
  }
  render() {
    return (
      <div className="container">
        <FlapDisplay
          className="M display-row"
          chars={Presets.ALPHANUM + ":-.,()/"}
          length={64}
          value={this.state.header}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,()/"}
          length={32}
          value={this.state.row1}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,()/"}
          length={32}
          value={this.state.row2}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,()/"}
          length={32}
          value={this.state.row3}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,()/"}
          length={32}
          value={this.state.row4}
          timing={100}
          hinge={false}
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Display />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
