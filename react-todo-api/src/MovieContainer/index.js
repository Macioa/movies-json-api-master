import React, {Component} from 'react'
import Movies from '../Presentational/Movies'
import CreateMovie from '../Input/CreateMovie';
import EditableInput from '../Input/EditableInput'
import { create } from 'domain';

class MovieContainer extends Component{
    constructor(props){
        super(props)
        this.state={movies:[], editIndex:null}
    }

    getMovies=async ()=>{
        const movies = await fetch('http://localhost:9000/api/v1/movies').catch(err=>console.error('Error getting movielist:',err));
        const moviesjson = await movies.json();
        return moviesjson;
    }

    createMovie=async (movie)=>{
        try{
            const response = await fetch('http://localhost:9000/api/v1/movies', {
                method: 'post',
                body: JSON.stringify(movie),
                headers: {'content-type': 'application/json'}
            })
            const createdmovie = await response.json();
            createdmovie.then(console.log(this.getMovies().then(response=>this.setState({movies:response.data}))))
        } catch (err) {console.error('Error creating movie:',err)}
    }

    deleteMovie=async (e)=>{
        try{
            const response = await fetch(`http://localhost:9000/api/v1/movies/${e.target.id}`, { method: 'delete' })
            const deletedmovie = await response.json();
            deletedmovie.then(this.getMovies().then(response=>this.setState({movies:response.data})))
        } catch (err) {console.error('Error deleting movie:',err)}     
    }
    componentDidMount(){
        this.getMovies().then(response=>this.setState({movies:response.data})).catch(err=>console.error(err));
    }
    createMovieList=()=>{
        let movielist=this.state.movies.map((movie,i)=>
            <li key='movie._id'>
                <EditableInput name='title' index={i} id={movie._id} value={movie.title} style={{fontSize:'16px'}}/>-
                <EditableInput name='description' index={i} id={movie._id} value={movie.description}/>
                <button id={movie._id} onClick={this.deleteMovie}>X</button>
            </li>
        )
        return movielist
    }
    render(){
        return(
            <div>
                <CreateMovie lift={this.createMovie}/>
                <Movies movies={this.createMovieList()}/>
            </div>
        )
    }
}

export default MovieContainer