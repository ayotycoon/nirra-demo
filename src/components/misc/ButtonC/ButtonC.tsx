import React, { ButtonHTMLAttributes, useRef, useState } from 'react'
import './ButtonC.scss'
export default function ButtonC(props: ButtonHTMLAttributes<any>) {

    
    const className = props.className+' Button'
    const [loading, setLoading] = useState(false);
    const children = !loading ? props.children : <div className='text-center'> <i className="fa fa-spinner spin"></i></div>
    const  onClick = async() => {
        if(!props.onClick) return 

        try{

        
        setLoading(true)
        // @ts-ignore
         props.onClick().finally(()=> setLoading(false))

     
        }catch(e){
            setLoading(false)
        }
    
    }
    return (
        <button {...props} onClick={onClick} children={children} className={className} disabled={loading || props.disabled} />

    )
}