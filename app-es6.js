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

// ============ Event Listeners ==============

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
  });
});