import React from 'react';

export default props => (
    <footer className='main-footer'>
            <button className="btn btn-primary" onClick={props.btnHandleClick}>{props.btnText}</button>
    </footer>
)