/* eslint-disable no-shadow */
import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./common/adminLTE/dependences";
import Header from "./common/adminLTE/header";
import Main from "./common/adminLTE/main";
import Footer from "./common/adminLTE/footer";
import Messages from "./common/msg/messages";
import Dashboard from "./dashboard/dashboard";
import {
  dispatchDataCharts,
  editorBlock,
  editorUnblock
} from "./editor/actions";
import reinicialize from "./chart/actions";

class App extends Component {
  init = () => {
    const {
      editor,
      dispatchDataCharts,
      editorBlock,
      editorUnblock
    } = this.props;
    if (editor.inputs === "") {
      toastr.info("Information", "No more data to process.");
      return;
    }
    if (editor.inputs[editor.inputs.length - 1] !== "}") {
      toastr.error("Error", "JSON invalid");
      return;
    }
    editorBlock();
    dispatchDataCharts(editor.inputs);
    editorUnblock();
  };

  reinicialize = () => {
    const { reinicialize } = this.props;
    reinicialize();
  };

  render() {
    const {
      chart: { executing, haveEventsPlotted }
    } = this.props;
    let btnHandleClick = null;
    let btnText = null;
    if (!executing && !haveEventsPlotted) {
      btnHandleClick = this.init;
      btnText = "GENERATE CHART";
    } else {
      btnHandleClick = this.reinicialize;
      btnText = "REINICIALIZE";
    }
    return (
      <div className="wrapper">
        <Header />
        <Main>
          <div className="content-wrapper">
            <Dashboard />
          </div>
          <Footer btnHandleClick={btnHandleClick} btnText={btnText} />
          <Messages />
        </Main>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { reinicialize, dispatchDataCharts, editorBlock, editorUnblock },
    dispatch
  );
const mapStateToProps = state => ({ editor: state.editor, chart: state.chart });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
