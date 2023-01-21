import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-split-flap-effect/extras/themes.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { FlapDisplay, Presets } from 'react-split-flap-effect'
import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAL7Oj24B5AWisNUoj3ArpniaxkuB9mtNg",
  authDomain: "splitflap-display.firebaseapp.com",
  databaseURL: "https://splitflap-display-default-rtdb.firebaseio.com",
  projectId: "splitflap-display",
  storageBucket: "splitflap-display.appspot.com",
  messagingSenderId: "279802897796",
  appId: "1:279802897796:web:4a63d221b44a0caeb629d1"
};
// const app = initializeApp(firebaseConfig);

// const db = getDatabase(app);

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      row1: "",
      row2: "",
      row3: "",
      row4: "",
      apiKey: {
        lastFm: localStorage.getItem("lastFmApiKey"),
      }
    };

    // onValue(ref(db, "message"), snapshot => {
    //   const val = snapshot.val();
    //   this.setState({
    //     header: val.header,
    //     row1: val.row1,
    //     row2: val.row2,
    //     row3: val.row3,
    //     row4: val.row4,
    //   });
    // });
    
    if (!this.state.apiKey.lastFm) {
      let key = prompt("Last.fm API Key:");
      localStorage.setItem("lastFmApiKey", key);
      this.state.apiKey.lastFm = key;
    }
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=bowenyin&api_key="+this.state.apiKey.lastFm+"&format=json&limit=1").then((response) => response.json()).then((data) => console.log(data));
    fetch("https://test.cors.workers.dev/?https://capmetro.hafas.cloud/bin/mgate.exe", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
      },
      "body": "{\"id\":\"q74w5mkim8s794wg\",\"ver\":\"1.59\",\"lang\":\"eng\",\"auth\":{\"type\":\"AID\",\"aid\":\"web9j2nak29uz41irb\"},\"client\":{\"id\":\"CMTA\",\"type\":\"WEB\",\"name\":\"webapp\",\"l\":\"vs_webapp\",\"v\":\"1.5.1\"},\"formatted\":false,\"svcReqL\":[{\"req\":{\"stbLoc\":{\"name\":\"31st Street Station (NB), Stop ID 603\",\"lid\":\"A=1@O=31st Street Station (NB), Stop ID 603@X=-97741151@Y=30297783@U=80@L=603@B=1@p=1674199296@\"},\"jnyFltrL\":[{\"type\":\"PROD\",\"mode\":\"INC\",\"value\":4648}],\"type\":\"DEP\",\"sort\":\"RT\",\"maxJny\":40},\"meth\":\"StationBoard\",\"id\":\"1|9|\"}]}",
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.error(err));
    fetch("https://test.cors.workers.dev/?https://capmetro.hafas.cloud/bin/mgate.exe", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
      },
      "body": "{\"id\":\"fu68vmgg6g43xm8x\",\"ver\":\"1.59\",\"lang\":\"eng\",\"auth\":{\"type\":\"AID\",\"aid\":\"web9j2nak29uz41irb\"},\"client\":{\"id\":\"CMTA\",\"type\":\"WEB\",\"name\":\"webapp\",\"l\":\"vs_webapp\",\"v\":\"1.5.1\"},\"formatted\":false,\"svcReqL\":[{\"req\":{\"stbLoc\":{\"name\":\"31st Street Station (SB), Stop ID 5357\",\"lid\":\"A=1@O=31st Street Station (SB), Stop ID 5357@X=-97741267@Y=30298025@U=80@L=5357@B=1@p=1674199296@\",\"extId\":\"5357\"},\"jnyFltrL\":[{\"type\":\"PROD\",\"mode\":\"INC\",\"value\":4648}],\"type\":\"DEP\",\"sort\":\"RT\",\"maxJny\":40},\"meth\":\"StationBoard\",\"id\":\"1|3|\"}]}",
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.error(err));
    
    this.getLastFm();
  }
  getLastFm() {
    fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=bowenyin&api_key="+this.state.apiKey.lastFm+"&format=json&limit=1").then((response) => response.json()).then((data) => {
      console.log(data);
      const entry = data.recenttracks.track[0];
      if (entry["@attr"]?.nowplaying) {
        this.setState({
          header: "Now Playing",
          row1: entry.name,
          row2: entry.artist["#text"],
          row3: "",
          row4: "",
        });
      } else {
        this.setState({
          header: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
        });
      }
      setTimeout(() => this.getLastFm(), 10000);
    });
  }
  render() {
    return (
      <div className="container">
        <FlapDisplay
          className="M display-row"
          chars={Presets.ALPHANUM + ":-.,'()/"}
          length={64}
          value={this.state.header}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,'()/"}
          length={32}
          value={this.state.row1}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,'()/"}
          length={32}
          value={this.state.row2}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,'()/"}
          length={32}
          value={this.state.row3}
          timing={100}
          hinge={false}
        />
        <FlapDisplay
          className="XL display-row"
          chars={Presets.ALPHANUM + ":-.,'()/"}
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
