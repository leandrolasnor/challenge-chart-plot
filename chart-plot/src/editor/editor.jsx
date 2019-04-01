import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CodeEditor from "react-simple-code-editor";
import { DebounceInput } from "react-debounce-input"
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-json";
import Grid from "../common/layout/grid";
import { setInputs, dispatchDataCharts } from "./actions";
import "./style.css";

class Editor extends Component {
  render() {
    const { editor, cols, setInputs, dispatchDataCharts } = this.props;
    return (
      <Grid cols={cols ? cols : "12"}>
        <DebounceInput
          element={CodeEditor}
          debounceTimeout={1000}
          onValueChange={inputs => {return}}
          onChange={event => {
            if (!editor.blocked) {
              setInputs(event.target.value);
              if (editor.executing) {
                dispatchDataCharts(event.target.value);
              }
            }
          }}
          value={editor.inputs}
          highlight={code => highlight(code, languages.json)}
          padding={10}
          style={{
            backgroundColor: "#FFF",
            minHeight: "300px",
            marginBottom: "10px",
            marginTop: "10px",
            fontSize: "14px"
          }}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setInputs, dispatchDataCharts }, dispatch);
const mapStateToProps = state => ({ editor: state.editor });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
