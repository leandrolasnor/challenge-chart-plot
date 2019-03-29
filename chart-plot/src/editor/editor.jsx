import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import Grid from '../common/layout/grid'
import {set_inputs} from './actions'
import './style.css'

class InputJson extends React.Component{

    render(){
        const {editor} = this.props
        return(
            <Grid cols={this.props.cols}>
                <Editor
                    value={editor.inputs}
                    onValueChange={inputs => {
                        if (!editor.blocked) {
                            this.props.set_inputs(inputs)
                        }
                    }}
                    highlight={code => highlight(code, languages.json)}
                    padding={10}
                    style={{
                        backgroundColor:"#FFF",
                        minHeight: '300px',
                        marginBottom: '10px',
                        marginTop: '10px'
                    }}
                />
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({set_inputs }, dispatch)
const mapStateToProps = state => ({editor: state.editor})
export default connect(mapStateToProps, mapDispatchToProps)(InputJson)