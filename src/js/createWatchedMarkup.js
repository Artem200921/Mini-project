import renderFilmsCards from '../templates/watchedAndQueueTpl.hbs';
import { apiService } from '../index';
import genres from '../genres.json';
import deleteFromWatchedList from './deleteFromWatchedList';
import getRefs from './get-refs';
const refs = getRefs();

export default async function createWatchedMarkup() {
  let dataArr = [];
  const watchedArr = JSON.parse(localStorage.getItem('Watched'));
  if (watchedArr === null) {
    refs.movies.innerHTML = '';
    return;
  } else {
    for (let i = 0; i < watchedArr.length; i++) {
      const data = await apiService.getMovieByID(watchedArr[i]);
      dataArr.push(data);
    }
    refs.movies.innerHTML = renderFilmsCards(createMarkup(dataArr));
    refs.movies.addEventListener('click', deleteFromWatchedList);
  }
}

function createMarkup(dataArr) {
  let list = [];

  dataArr.forEach(data => {
    const genreList = [];
    data.genres.forEach(id => {
      const genreId = id.id;
      const genre = genres.find(genre => genre.id === genreId);
      if (genre && genreList.length <= 2) {
        if (genreList.length < 2) genreList.push(genre.name);
        else genreList[2] = 'others...';
      }
    });
    return list.push({
      genres: genreList.join(', '),
      original_title: data.original_title,
      release_date: data.release_date.substring(0, 4),
      vote_average: data.vote_average,
      id: data.id,
      poster_path: data.poster_path,
    });
  });
  return list;
}

export { createMarkup };
