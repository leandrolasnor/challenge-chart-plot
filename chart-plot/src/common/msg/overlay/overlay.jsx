import React from 'react'
import If from '../../operator/if'
import { connect } from 'react-redux'
import './styles.css'

class Overlay extends React.Component {
    render(){
        return (
            <If test={this.props.overlay.show}>
                <div className="overlay fade-in fade-out-in">
                    <If test={!this.props.icon}>
                        <i className="fa fa-refresh fa-spin"></i>
                    </If>
                    <If test={this.props.icon}>
                        {this.props.icon}
                    </If>
                </div>
            </If>
        )
    }
}

const mapStateToProps = state => ({overlay: state.overlay})
export default connect(mapStateToProps)(Overlay);