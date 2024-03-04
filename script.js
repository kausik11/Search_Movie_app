const myapikey = `d1626f06`;

const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');


const getMovieInfo = async (movie)=>{
    try {
        const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("unable to fetch movie data")
        }
          const data =  await response.json();
          
          showMovieData(data);
        
    } catch (error) {
        showErrorMsg("no movie found");
    }
   
}

//function to show movie details on screen
const showMovieData = (data)=>{
    moviecontainer.innerHTML = '';
    moviecontainer.classList.remove('nobackground');
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = 
    `<h2>${Title}</h2>
    <p><strong>Ratings: &#11088;<strong>${imdbRating}</p>`;
    

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(',').forEach(element => {
        const p = document.createElement('p');
        p.innerText =element;
        movieGenreElement.appendChild(p)
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += 
    `<p><strong>Release Date:</strong>${Released}</p>
    <p><strong>Duration:</strong>${Runtime}</p>
    <p><strong>Cast:</strong>${Actors}</p>
    <p><strong>plot:</strong>${Plot}</p>
    `;
    
    //creating a div for movie poster
    const moviePoster = document.createElement('div');
    moviePoster.classList.add('movie-poster');
    moviePoster.innerHTML = `<img src=${Poster}/>`;


    moviecontainer.appendChild(moviePoster);
    moviecontainer.appendChild(movieElement);


}

//function to show error msg
const showErrorMsg = (msg)=>{
    moviecontainer.innerHTML=`<h2>${msg}</h2>`;
    moviecontainer.classList.add('nobackground');
}


//function to handle form submission
const HandleFormSubmission = (e)=>{
    e.preventDefault();

    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMsg("fetching movie information...");
        getMovieInfo(movieName);
    }else{
        showErrorMsg("Enter movie name to get the movie details");
    }
}

//when from is submit event listner works
searchForm.addEventListener('submit',HandleFormSubmission)




