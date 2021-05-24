import React, { InputHTMLAttributes, useRef, useState } from 'react'
import './InputC.scss'
export default function InputC(props:  InputHTMLAttributes<any> & { title: string, subType?:'phone'}) {
const title = props.title || ''
const type = props.type || 'text'
const placeholder = props.placeholder || ''
    
    return (
        <div  className='Input'>
           <label>{title}</label>

           {props.subType == 'phone' &&
           
<div className="input-group sub-type-phone">
  <div className="input-group-prepend">
    <span className="input-group-text"> <div>+234</div></span>
  </div>
  <input className='form-control' {...props} type={type} placeholder={placeholder} />
</div>

           
           }
           {!props.subType  &&<input className='form-control' {...props} type={type} placeholder={placeholder} />}
        </div>

    )
}