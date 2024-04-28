fetch('https://api.tvmaze.com/shows')
    .then(res => res.json())
    .then(data => {
        getMovies(data);
    });
var area = document.getElementById("films");
function getMovies(movies) {
    let html = '<div class="row">';
    for (let i = 0; i < movies.length && i < 12; i++) {
        html += `
            <div class="col-md-4">
                <div class="film">
                    <img src="${movies[i].image.medium}" class="filmsimgtop" alt="${movies[i].name}"data-bs-toggle="modal" data-bs-target="#info" data-image ="${movies[i].image.original}">
                    
                    <div class="movie-body">
                        <h5 class="movie-title">${movies[i].name}</h5>
                    </div>
                    <a href="detail.html?id=${movies[i].id}" class="btn btn-primary"target=_blank>More Info</a>
                </div>
            </div>`;
    }
    html += '</div>';
    area.innerHTML = html;

    ///modal
    var filmsimgtops = document.querySelectorAll(".filmsimgtop");
    filmsimgtops.forEach(img => {
        img.addEventListener("click", function () {
            var modalImage = document.getElementById("modalImage");
            modalImage.src = this.getAttribute("data-image");
        });
    });
}

var dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach(item => {
    item.addEventListener("click", function () {
        if (this.id === "a-z") {
            sortAlphabetically(this.textContent);
        } else if (this.id === "z-a") {
            sortReverseAlphabetically(this.textContent);
        }
    });
});

function sortAlphabetically(sortBy) {
    alert("Sorting by: " + sortBy);
    fetch('https://api.tvmaze.com/shows')
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                
                return 0;
            });
            getMovies(data);
    });
}
function sortReverseAlphabetically(sortBy) {
    alert("Sorting by: " + sortBy);
    fetch('https://api.tvmaze.com/shows')
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });
            getMovies(data);
    });
}

function sortMovies(sortBy) {
    alert("Sorting by: " + sortBy);
    fetch('https://api.tvmaze.com/shows')
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => b.rating.average - a.rating.average);
            getMovies(data);
        });
}

function sortReverse(sortBy) {
    alert("Sorting by: " + sortBy);
    fetch('https://api.tvmaze.com/shows')
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => a.rating.average - b.rating.average);
            getMovies(data);
        });
}
document.getElementById("search").addEventListener("keyup", function(event) {
    var searchInput = event.target.value;
    
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                getMoviesSearch(data)
                console.log(item.show); 
            });
        })
    // axios.get(`https://api.tvmaze.com/search/shows?q=${searchInput}`).then(response => {
    //     html += ``   
    // getMovies(response.data); 
    // })
});
function getMoviesSearch(movies) {
    let html = '<div class="row">';
    for (let i = 0; i < movies.length && i < 12; i++) {
        html += `
            <div class="col-md-4">
                <div class="film">
                    <img src="${movies[i].show.image.medium}" class="filmsimgtop" alt="${movies[i].show.name}"data-bs-toggle="modal" data-bs-target="#info" data-image ="${movies[i].show.image.original}">
                    <div class="movie-body">
                        <h5 class="movie-title">${movies[i].show.name}</h5>
                    </div>
                    <a href="detail.html?id=${movies[i].show.id}" class="btn btn-primary"target=_blank>More Info</a>
                </div>
            </div>`;
    }
    html += '</div>';
    area.innerHTML = html;

    var filmsimgtops = document.querySelectorAll(".filmsimgtop");
    filmsimgtops.forEach(img => {
        img.addEventListener("click", function () {
            var modalImage = document.getElementById("modalImage");
            modalImage.src = this.getAttribute("data-image");
        });
    });
}
// Tam basa dusmemisem nece isleyir ama yazdim elave ozellik olsun )
var currentPage = 1; 

function loadMoreMovies() {
    fetch(`https://api.tvmaze.com/shows`)
        .then(res => res.json())
        .then(data => {
            
            getMovies(data.slice((currentPage-1)* 12, currentPage * 12));
            currentPage++; 
        })
}

document.getElementById("loadMoreBtn").addEventListener("click", function() {
    loadMoreMovies();
});

// var searchInput = document.getElementById("search");
// searchInput.addEventListener("keyup");
// function search(event) {
//     axios.get('https://api.tvmaze.com/search/shows?q=' + )
//         .then(elements => fillHtml(elements.data))
//     getMoviesSearch(data);
// }
/////////////////
// var searchInput = document.getElementById("search");

// function searchingMovie(e) {
//     var query = searchInput.value.trim(); // Arama sorgusunu giriş alanından al
//     axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
//         .then(elements => fillHtml(elements.data))
//         getMovies();
//         .catch(error => console.error('Hata:', error));
// }

// // Arama giriş alanındaki keyup etkinliği için olay dinleyicisi
// searchInput.addEventListener("keyup", searchingMovie);

// searchInput.addEventListener()
// function getMoviesSearch(movies) {
//     let html = '<div class="row">';
//     for (let i = 0; i < movies.length && i < 11; i++) {
//         html += `
//             <div class="col-md-4">
//                 <div class="film">
//                     <img src="${movies[i].image.medium}" class="filmsimgtop" alt="${movies[i].name}"data-bs-toggle="modal" data-bs-target="#info" data-image ="${movies[i].image.original}">
//                     <div class="movie-body">
//                         <h5 class="movie-title">${movies[i].name}</h5>
//                     </div>
//                 </div>
//             </div>`;
//     }
//     html += '</div>';
//     area.innerHTML = html;

//     var filmsimgtops = document.querySelectorAll(".filmsimgtop");
//     filmsimgtops.forEach(img => {
//         img.addEventListener("click", function () {
//             var modalImage = document.getElementById("modalImage");
//             modalImage.src = this.getAttribute("data-image");
//         });
//     });
// }