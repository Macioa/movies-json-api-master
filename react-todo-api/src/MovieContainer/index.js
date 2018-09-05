import React, {Component} from 'react'
import Movies from '../Presentational/Movies'
import CreateMovie from '../Input/CreateMovie';
import EditableInput from '../Input/EditableInput'
import { create } from 'domain';

class MovieContainer extends Component{
    constructor(props){
        super(props)
        this.state={movies:[], editMovie:{id:null,name:null,i:null}, lastMovieId:null, server:process.env.SERVER|'http://localhost:9000'}
    }

    getMovies=async ()=>{
        const movies = await fetch(`${this.state.server}/api/v1/movies`).catch(err=>console.error('Error getting movielist:',err));
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

    updateMovie=async (movie)=>{
        try{
            const response = await fetch(`http://localhost:9000/api/v1/movies/${movie._id}`, {
                method: 'PUT',
                body: JSON.stringify(movie),
                headers: {'content-type': 'application/json'}
            })
            const updatedmovie = await response.json();
            try { updatedmovie.then(console.log(this.getMovies().then(response=>this.setState({movies:response.data})))) }catch(err){}
        } catch (err) {console.error('Error updating movie:',err)}
    }

    toggleEdit=(e)=>{
        if (this.state.editMovie.id&&this.state.editMovie.name){
            let selectedmovie=this.state.movies.find(movie=>movie._id===this.state.editMovie.id);
            selectedmovie[this.state.name]=this.state.editMovie.t.value;
            this.updateMovie(selectedmovie)
        }
        this.setState({editMovie:{id:e.target.id, name:e.target.name, t:e.target}})
    }

    onEditChange=(e)=>{
        let movies = this.state.movies.slice(0);
        let movie = movies.find(movie=>movie._id===this.state.editMovie.id);
        movie[e.target.name]=e.target.value;
        this.setState({movies:movies})
    }

    createMovieList=()=>{
        let movielist=this.state.movies.map((movie,i)=>
            <li key='movie._id'>
                <EditableInput editable={((this.state.editMovie.id===movie._id)&&(this.state.editMovie.name==='title'))} onClick={this.toggleEdit} onChange={this.onEditChange} name='title' i={i} id={movie._id} value={movie.title} style={{fontSize:'16px'}}/>-
                <EditableInput editable={((this.state.editMovie.id===movie._id)&&(this.state.editMovie.name==='description'))} onClick={this.toggleEdit} onChange={this.onEditChange} name='description' i={i} id={movie._id} value={movie.description}/>
                <button id={movie._id} onClick={this.deleteMovie}>X</button>
            </li>
        )
        return movielist
    }

    logState=()=>{console.log(this.state)}
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