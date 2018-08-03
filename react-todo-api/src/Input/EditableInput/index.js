import React from 'react'

const EditableInput =(props)=>{
    let EIstyle = props.editable? {}:{borderWidth:'0px', outline:'none'}
    if (props.style)     EIstyle=Object.assign(props.style, EIstyle)
    return (
            <input type='text' {...props} style={EIstyle}/>
    )
}

export default EditableInput