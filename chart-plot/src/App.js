import React, { Component } from 'react'
import './common/adminLTE/dependences'
import Header from "./common/adminLTE/header"
import Main from "./common/adminLTE/main"
import Footer from "./common/adminLTE/footer"
import Messages from "./common/msg/messages"
import { toastr } from 'react-redux-toastr'
import Dashboard from './dashboard/dashboard'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { dispatch_data_charts, editor_block } from './editor/actions'
import {reinicialize} from './chart/actions'

class App extends Component {

    init = () => {
        const {editor,dispatch_data_charts, editor_block} = this.props
        if(editor.inputs === ''){
            toastr.info("Information", "No more data to process.")
            return
        }
        if (editor.inputs[editor.inputs.length - 1] !== '}') {
            toastr.error("Error", "JSON invalid")
            return
        }
        editor_block()
        dispatch_data_charts(editor.inputs)
    }

    reinicialize = () => {
        this.props.reinicialize()
    }

    render() {
        var btnHandleClick = null
        var btnText = null
        if (this.props.chart.events.length === 0) {
            btnHandleClick = this.init
            btnText = "GENERATE CHART"
        } else {
            btnHandleClick = this.reinicialize
            btnText = "REINICIALIZE"
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
const mapDispatchToProps = dispatch => bindActionCreators({reinicialize,dispatch_data_charts, editor_block}, dispatch)
const mapStateToProps = state => ({editor: state.editor,chart:state.chart})
export default connect(mapStateToProps, mapDispatchToProps)(App)
