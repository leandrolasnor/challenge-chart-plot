import React, { Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-json";
import Grid from "../common/layout/grid";
import { setInputs } from "./actions";
import "./style.css";

class Editor extends Component {
  render() {
    const { editor, cols, setInputs } = this.props;
    return (
      <Grid cols={cols}>
        <CodeEditor
          value={editor.inputs}
          onValueChange={inputs => {
            if (!editor.blocked) {
              setInputs(inputs);
            }
          }}
          highlight={code => highlight(code, languages.json)}
          padding={10}
          style={{
            backgroundColor: "#FFF",
            minHeight: "300px",
            marginBottom: "10px",
            marginTop: "10px"
          }}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setInputs }, dispatch);
const mapStateToProps = state => ({ editor: state.editor });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
