import './App.css';
const url = 'https://api.themoviedb.org/3/authentication';
const urlList = 'https://api.themoviedb.org/3/account/null/lists?page=1';
const urlMovie = 'https://api.themoviedb.org/3/account/null/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
const urlTrendingMovie = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQyYzkyNmQ4NDc4ZDEyYTExNTdhMjU2ZTZmZTBiZSIsIm5iZiI6MTczODc2ODI2MC4zNTgsInN1YiI6IjY3YTM3Zjg0YmUzNDU5ZDQ4MjgxMjBhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6oVexvXJObN_wbggn0WxpxIIFtgxZGD6_TZ_ww2fpLY'
  }
};

fetch(urlTrendingMovie, options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
  

function App() {
  return (
    <div className="App">
      <p>hello</p>
    </div>
  );
}

export default App;
