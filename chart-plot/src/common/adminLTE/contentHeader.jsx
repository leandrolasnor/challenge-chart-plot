import React from 'react';

export default props => (
    <section className='content-header'>
        <h1>{props.title} <small>{props.small}</small></h1><h1>{props.children}</h1>
    </section>
)