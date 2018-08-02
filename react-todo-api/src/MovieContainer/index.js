import React, {Component} from 'react'
import Movies from '../Presentational/Movies'
import CreateMovie from '../Input/CreateMovie';
import { create } from 'domain';

class MovieContainer extends Component{
    constructor(props){
        super(props)
        this.state={movies:[]}
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
    render(){
        return(
            <div>
                <CreateMovie lift={this.createMovie}/>
                <Movies movies={this.state.movies} lift={this.deleteMovie}/>
                
            </div>
        )
    }
}

export default MovieContainer