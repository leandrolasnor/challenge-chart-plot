import React from 'react';
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label>{props.text}</label>
        </div>
    </Grid>
)