// Movie Class
class Movie {
  constructor(title, year, imdb) {
    this.title = title;
    this.year = year;
    this.imdb = imdb;
  }
}

//  UI Class + Methods
class UI {
  addMovieToList(movie) {
    const list = document.querySelector('#movie-list');

    // Create <tr> element
    const row = document.createElement('tr');

    // Insert cols - <td>
    row.innerHTML = `
    <td>${movie.title}</td>
    <td>${movie.year}</td>
    <td><a href='${movie.imdb}'>${movie.imdb}</a></td>
    <td><i class="delete fas fa-times"></i></td>
    `;

    // Append to the List
    list.appendChild(row);
  }

  showAlert(msg, alertClass) {
    // Select form
    const form = document.querySelector('#movie-form');
    // Create <div>
    const div = document.createElement('div');
    // Add Class
    div.classList.add('alert', alertClass);
    // Add Text
    // div.appendChild(document.createTextNode(msg));
    div.innerText = `${msg}`;
    // Add div inside form
    form.prepend(div);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 4000);
  }

  deleteMovie(target, alertCallback) {
    if (target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
      alertCallback();
    }
  }

  clearInput() {
    document.querySelector('#title').value = '';
    document.querySelector('#year').value = '';
    document.querySelector('#imdb').value = '';
  }
}

// Local Storage Class
class Storage {
  // Get Movies from LS
  static getMovies_LS() {
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    }
    else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  // Display Movie from LS (page load)
  static displayMovies_LS() {
    const movies = Storage.getMovies_LS();

    movies.forEach(function(movie) {
      // Instantiate UI class
      const ui = new UI();

      ui.addMovieToList(movie);
    });
  }

  // Add Movie to LS
  static addMovie_LS(movie) {
    const movies = Storage.getMovies_LS();

    movies.push(movie);

    localStorage.setItem('movies', JSON.stringify(movies));
  }

  // Delete Movie - LS
  static deleteMovie_LS(movie) {
    const movies = Storage.getMovies_LS();

    movies.forEach(function(movie_LS, index) {
      if (movie_LS.imdb === movie.children[2].textContent) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// ============ Event Listeners ==============

// Event Listener for Page Load (load movies from LS)
document.addEventListener('DOMContentLoaded', Storage.displayMovies_LS);

// Event Listener for Add / Submit
document.querySelector('#movie-form').addEventListener('submit', function (e) {

  // Get form values
  const title = document.querySelector('#title').value,
    year = document.querySelector('#year').value,
    imdb = document.querySelector('#imdb').value;

  // Instantiate Movie
  const movie = new Movie(title, year, imdb);

  // Instantiate UI
  const ui = new UI();

  // Validate input
  if (title === '' || year === '' || imdb === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  }
  else {
    // UI - Add Movie to List
    ui.addMovieToList(movie);

    // Add to LS  (we're not instantiating it -> it's static)
    Storage.addMovie_LS(movie);

    // Show Alert
    ui.showAlert('Movie successfully added!', 'success');

    // UI - Clear Input
    ui.clearInput();
  }

  e.preventDefault();
});

// Event Listener for Delete
document.querySelector('#movie-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete Movie
  ui.deleteMovie(e.target, function () {

    // Show Alert - Callback function
    ui.showAlert('Movie Removed', 'success');

    // Delete Movie - LS
    Storage.deleteMovie_LS(e.target.parentElement.parentElement);
  });
});