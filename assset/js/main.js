fetch('https://api.tvmaze.com/shows')
    .then(res => res.json())
    .then(data => {
        getMovies(data);
    });

var area = document.getElementById("films");

function getMovies(movies) {
    let html = '<div class="row">';
    for (let i = 0; i < movies.length && i < 10; i++) {
        html += `
            <div class="col-md-4">
                <div class="film">
                    <img src="${movies[i].image.medium}" class="filmsimgtop" alt="${movies[i].name}"data-bs-toggle="modal" data-bs-target="#info" data-image ="${movies[i].image.original}">
                    <div class="movie-body">
                        <h5 class="movie-title">${movies[i].name}</h5>
                    </div>
                </div>
            </div>`;
    }
    html += '</div>';
    area.innerHTML = html;

    var filmsimgtops = document.querySelectorAll(".filmsimgtop");
    filmsimgtops.forEach(img => {
        img.addEventListener("click", function() {
            var modalImage = document.getElementById("modalImage");
                modalImage.src = this.getAttribute("data-image");
        });
    });
}