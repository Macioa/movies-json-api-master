import React from 'react'
import EditableMovie from '../../Input/EditableInput'


const Movies = (props)=>{



    return(
        <div>
            <h3>Movies:</h3>
            <ul>
     
            {props.movies}
            </ul>
        </div>
    )
}

export default Movies