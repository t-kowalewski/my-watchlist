// Movie Constructor
function Movie(title, director, imdb) {
  this.title = title;
  this.director = director;
  this.imdb = imdb;
}

// UI Constructor
function UI() {}

// Prototype - Add Movie to List
UI.prototype.addMovieToList = function(movie) {
  const list = document.querySelector('#movie-list');
  
  // Create <tr> element
  const row = document.createElement('tr');
  
  // Insert cols - <td>
  row.innerHTML = `
  <td>${movie.title}</td>
  <td>${movie.director}</td>
  <td>${movie.imdb}</td>
  <td><i class="delete fas fa-times"></i></td>
  `;

  // Append to the List
  list.appendChild(row);
}

// Prototype - Clear Input
UI.prototype.clearInput = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#director').value = '';
  document.querySelector('#imdb').value = '';
}

// Event Listeners ===============================
document.querySelector('#movie-form').addEventListener('submit', function(e) {

  // Get form values
  const title = document.querySelector('#title').value,
        director = document.querySelector('#director').value,
        imdb = document.querySelector('#imdb').value;
  
  // Instantiate Movie
  const movie = new Movie(title, director, imdb);
  
  // Instantiate UI
  const ui = new UI();

  // UI - Add Movie to List
  ui.addMovieToList(movie);

  // UI - Clear Input
  ui.clearInput();

  e.preventDefault();
});
