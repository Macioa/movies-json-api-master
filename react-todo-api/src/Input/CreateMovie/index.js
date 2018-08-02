import React, {Component} from 'react'

class CreateMovie extends Component{
    constructor(props){
        super(props)
        this.lift=props.lift;
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target)
        console.log(`attempting to create ${e.target.title.value}`)
        this.lift({title: e.target.title.value, description: e.target.description.value})}
    render(){return(
            <form onSubmit={this.handleSubmit}>
                <h5>Create a Movie</h5>
                <input type="text" name="title" placeholder="Title..."/>
                <input type="text" name="description" placeholder="Description..."/>
                <input type="submit" value="Create"/>
            </form>
    )}
}

export default CreateMovie