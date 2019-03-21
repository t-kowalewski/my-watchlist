// Movie Constructor
function Movie(title, director, imdb) {
  this.title = title;
  this.director = director;
  this.imdb = imdb;
}

// UI Constructor
function UI() {}

// Add Movie to List
UI.prototype.addMovieToList = function(movie) {
	// console.log('TCL: UI.prototype.addMovieToList -> movie', movie);
  
}

// Event Listeners
document.querySelector('#movie-form').addEventListener('submit', function(e) {

  // Get form values
  const title = document.querySelector('#title').value,
        director = document.querySelector('#director').value,
        imdb = document.querySelector('#imdb').value;
  
  // Instantiate movie
  const movie = new Movie(title, director, imdb);
  
  // Instantiate UI
  const ui = new UI();
	console.log('TCL: ui', ui);

  // Add Movie to List
  ui.addMovieToList(movie);

  e.preventDefault();
});
