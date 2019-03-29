import React, { Component } from 'react'
import './common/adminLTE/dependences'
import Header from "./common/adminLTE/header"
import Main from "./common/adminLTE/main"
import Footer from "./common/adminLTE/footer"
import Messages from "./common/msg/messages"
import Dashboard from './dashboard/dashboard'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {dispatch_data_charts, editor_block} from './editor/actions'

class App extends Component {

    init = () => {
        const {toastr,editor,dispatch_data_charts, editor_block} = this.props
        if(editor.inputs === ''){
            toastr.info("Information", "No more data to process.")
            return
        }
        editor_block()
        dispatch_data_charts(editor.inputs)
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <Main>
                    <div className="content-wrapper">
                        <Dashboard />
                    </div>
                    <Footer btnHandleClick={this.init} btnText="GENERATE CHART" />
                    <Messages />
                </Main>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({dispatch_data_charts, editor_block}, dispatch)
const mapStateToProps = state => ({editor: state.editor,toastr:state.toastr})
export default connect(mapStateToProps, mapDispatchToProps)(App)
