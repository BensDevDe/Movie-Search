//Query Selectors#########################################


const headLine = document.querySelector('#head');
const blood = document.querySelector('.blood');

const search = document.querySelector('.search');

const searchForm = document.querySelector('#search-form');
const formLabel = document.querySelector('#form-label');
const searchInput = document.querySelector('#search-input');

const movieResult = document.querySelector('.movie-result');
const movieBox = document.querySelector('.movie-box');
const movieImg = document.querySelector('#movie-img');

const detail = document.querySelector('.detail');


// Event Listener SEARCH###########################################

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    if(searchInput.value !== '') {
        searchMovies(searchInput.value);
        searchInput.value = '';

        headLine.style.fontSize = '15px';
        movieResult.innerHTML='';
    }
})

async function searchMovies(search) {
    try {
        const movie = await (await fetch(`http://www.omdbapi.com/?apikey=871fc2a6&s=${search}`)).json();

        movie.Search.map(element=>{
        const div = document.createElement('div');
           div.innerHTML += `<div class='movie-box'> 
           <h1> ${element.Title}</h1> 
           <p> Year: ${element.Year} </p>
           <img id="movie-img" src='${element.Poster}'>
           </div>`;

           const button = document.createElement('button');
           button.innerText = "More Info";
           button.classList.add('btn-more');
           button.type = 'button';
           div.appendChild(button)
           movieResult.appendChild(div);


           button.addEventListener('click',()=>{
              
            const movieObject = getMovieDetail(element.imdbID);
         
            movieObject.then( data =>{
               
                headLine.style.fontSize = '15px';
                headLine.style.textAlign = 'right';

                document.querySelector('.blood').innerHTML = '';

                document.body.style.backgroundImage = `linear-gradient(rgba(97, 97, 97, 0.5), rgba(0, 0, 0, 0.9)),url("${Object.values(data)[13]}")`;
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundSize = 'cover';

                

                
                const movieDetail = document.createElement('div');
                detail.appendChild(movieDetail);
                movieDetail.classList.add('movie-detail');

                movieDetail.innerHTML = 
                `
                <div id="movie-text">

                <h1 id='head-movie-detail'>${Object.values(data)[0]} </h1>
                <p> <span> ${Object.keys(data)[1]} </span> : ${Object.values(data)[1]} </p>
                <p> <span> ${Object.keys(data)[2]} </span> : ${Object.values(data)[2]} </p>
                <p> <span> ${Object.keys(data)[3]} </span> : ${Object.values(data)[3]} </p>
                <p> <span> ${Object.keys(data)[4]} </span> : ${Object.values(data)[4]} </p>
                <p> <span> ${Object.keys(data)[5]} </span> : ${Object.values(data)[5]} </p>
                <p> <span> ${Object.keys(data)[6]} </span> : ${Object.values(data)[6]} </p>
                <p> <span> ${Object.keys(data)[7]} </span> : ${Object.values(data)[7]} </p>
                <p> <span> ${Object.keys(data)[8]} </span> : ${Object.values(data)[8]} </p>
                <p> <span> ${Object.keys(data)[9]} </span> : ${Object.values(data)[9]} </p>
                <p> <span> ${Object.keys(data)[10]} </span> : ${Object.values(data)[10]} </p>
                <p> <span> ${Object.keys(data)[11]} </span> : ${Object.values(data)[11]} </p>
                <p> <span> ${Object.keys(data)[12]} </span> : ${Object.values(data)[12]} </p>
                <p> <span> ${Object.keys(data)[19]} </span> : ${Object.values(data)[19]} </p>
                <p> <span> ${Object.keys(data)[20]} </span> : ${Object.values(data)[20]} </p>
                <p> <span> ${Object.keys(data)[21]} </span> : ${Object.values(data)[21]} </p>

                </div>


                <div class="movie-img">

                <img src="${Object.values(data)[13]} " alt="coming soon">

                </div>`;
             });

           })
       }) 
    } catch (error) {
        console.log(error.message);
        
    }
}
async function getMovieDetail(movieId) {
    try {
        const movie = await (await fetch(`http://www.omdbapi.com/?apikey=871fc2a6&i=${movieId}`)).json();
       return movie
          
    } catch (error) {
        console.log(error.message);
        
    }
}



