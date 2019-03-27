import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import Grid from '../common/layout/grid'
import {valueChange} from './actions'
import './style.css'

class Code extends React.Component{
    valueChange = (code) => {
        this.props.valueChange(code)
    }
    render(){
        const {editor} = this.props
        return(
            <Grid cols={this.props.cols}>
                <Editor
                    value={editor.code}
                    onValueChange={code => this.valueChange(code)}
                    highlight={code => highlight(code, languages.json)}
                    padding={10}
                    style={{
                        backgroundColor:"#FFF"
                    }}
                />
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({valueChange }, dispatch)
const mapStateToProps = state => ({editor: state.editor})
export default connect(mapStateToProps, mapDispatchToProps)(Code)