import React from 'react';
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <div className="box box-danger">
            <label htmlFor={props.name}>{props.label}</label>
            <textarea {...props.input} className='form-control' placeholder={props.placeholder} readOnly={props.readOnly} rows={props.rows} />
        </div>
    </Grid>
)