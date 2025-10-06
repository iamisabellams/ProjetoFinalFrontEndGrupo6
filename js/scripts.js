const url =
  "https://api.themoviedb.org/3/discover/movie?api_key=860791a45dc8afd8c08a1257751913f5&include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&year=2020";

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "860791a45dc8afd8c08a1257751913f5",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results.slice(0, 6);
    const carouselInner = document.getElementById("carousel-inner");
    carouselInner.innerHTML = "";

    for (let i = 0; i < movies.length; i += 2) {
      const div = document.createElement("div");
      div.classList.add("carousel-item");

      if (i === 0) {
        div.classList.add("active");
      }
      const larguraDaTela = window.innerWidth;
      if (larguraDaTela <= 1025) {
        const movie = movies[i];
        div.innerHTML = `
          <div class="row justify-content-center">
            <div class="col-md">
              <div class="card d-flex flex-row align-items-center border-0 rounded-4" style="background-color:#1A1A1A">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                     class="w-25 d-block object-fit-cover rounded-start-4" style="height:290px;" alt="${movie.title}">
                <div class="card-body text-center">
                  <h5 class="card-title" style="color:#fffffc">${movie.title}</h5>
                  <p class="card-description" style="color:#c2c2c2">${movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        const movie1 = movies[i];
        const movie2 = movies[i + 1];
        div.innerHTML = `
          <div class="row justify-content-center">
            <div class="col-6">
              <div class="card d-flex flex-row align-items-center border-0 rounded-4" style="background-color:#1A1A1A">
                <img src="https://image.tmdb.org/t/p/w500${movie1.poster_path}" 
                     class="w-25 d-block object-fit-cover rounded-start-4" style="height:290px;" alt="${
                       movie1.title
                     }">
                <div class="card-body text-center">
                  <h5 class="card-title" style="color:#fffffc">${
                    movie1.title
                  }</h5>
                  <p class="card-description" style="color:#c2c2c2">${
                    movie1.overview
                  }</p>
                </div>
              </div>
            </div>
  
            ${
              movie2
                ? `
            <div class="col-6">
              <div class="card d-flex flex-row align-items-center border-0 rounded-4" style="background-color:#1A1A1A">
                <img src="https://image.tmdb.org/t/p/w500${movie2.poster_path}" 
                     class="w-25 d-block object-fit-cover rounded-start-4" style="height:290px;" alt="${movie2.title}">
                <div class="card-body text-center">
                  <h5 class="card-title" style="color:#fffffc">${movie2.title}</h5>
                  <p class="card-description" style="color:#c2c2c2">${movie2.overview}</p>
                </div>
              </div>
            </div>
            `
                : ""
            }
          </div>
        `;
      }
      carouselInner.appendChild(div);
    }
  })
  .catch((error) => console.error("Erro ao buscar dados do filme:", error));
