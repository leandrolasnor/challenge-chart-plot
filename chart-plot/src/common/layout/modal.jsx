import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from '../operator/if'

export default class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    static propTypes = {
        children: PropTypes.any.isRequired,
        LabelButtonSubmit: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }
    render() {
        return (
            //Trigger modal
            // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            // Launch demo modal
            // </button>
            <div className={`modal fade`} id={`${this.props.id}`} role="dialog" aria-labelledby={`${this.props.id}Title`} aria-hidden="true" >
                <div className={`modal-dialog modal-dialog-centered modal-lg ${this.props.dimension}`} role="document">
                    <div className={`modal-content`}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" id={`${this.props.id}LongTitle`}>{this.props.title}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                {this.props.children}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <If test={this.props.handleClickBtnSubmit}>
                                <button type="button" data-dismiss="modal" onClick={() => this.props.handleClickBtnSubmit()} className="btn btn-success">{this.props.LabelButtonSubmit}</button>
                            </If>
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">FECHAR</button> */}
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}