import React from 'react'
import './LogoC.scss'
export default function LogoC(props: { size?: number }) {
    const size = props.size || 25;
    return (
        <div style={{ fontSize: size + 'px' }} className='Logo d-inline-block text-muted2'>
            <span className='d-inline-block pl-5 bg-danger'> N</span>IRRA
        </div>

    )
}