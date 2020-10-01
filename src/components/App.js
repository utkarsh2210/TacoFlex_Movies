import React from 'react';
import { connect } from 'react-redux';
import { data as moviesList } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';


class App extends React.Component {
  
  componentDidMount () {
    // make api call
    // dispatch action
    this.props.dispatch(addMovies(moviesList));

    // console.log(this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
    {
      // found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  }

  render() {
    
    const { movies, search } = this.props; // { movies: {}, search: {} }
    const { list, favourites, showFavourites } = movies; 
    
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
      <Navbar search={search} />
      <div className="main">
        <div className="tabs">
          <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
        </div>

        <div className="list">
          {displayMovies.map((movie, index) => (
            <MovieCard 
              movie={movie} 
              key={`movies-${index}`} 
              dispatch={this.props.dispatch} 
              isFavourite={this.isMovieFavourite(movie)}
            />
          ))}
        </div>
        {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
      </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render () {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps (state) {
  return {
    movies: state.movies,
    search: state.movies
  }
};

const connectedAppComponent = connect(mapStateToProps)(App)
export default connectedAppComponent;
