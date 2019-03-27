import React from 'react';
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <button onClick={props.handleClick} className={`btn btn-${props.type}`}><i className={`fa fa-${props.icon}`}></i>{props.text}</button>
    </Grid>
)