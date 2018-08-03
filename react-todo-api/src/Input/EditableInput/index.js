import React from 'react'

const EditableInput =(props)=>{
    let EIstyle = props.editable? {}:{borderWidth:'0px', outline:'none'}
    console.log('props',props)
    if (props.style)     EIstyle=Object.assign(props.style, EIstyle)
    console.log(EIstyle)
    return (
            <input type='text' {...props} style={EIstyle}/>
    )
}

export default EditableInput