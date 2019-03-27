import React, { Component } from 'react';
import './common/adminLTE/dependences'
import Header from "./common/adminLTE/header";
import Main from "./common/adminLTE/main";
import Footer from "./common/adminLTE/footer";
import Messages from "./common/msg/messages";
import Dashboard from './dashboard/dashboard';

class App extends Component {
  render() {
    return (
        <div className="wrapper">
            <Header />
            <Main>
                <div className="content-wrapper">
                    <Dashboard />
                </div>
                <Footer />
                <Messages />
            </Main>
        </div>
    );
  }
}

export default App;
