const API_KEY = "nrmjIR3aRn_4MfiKm733WhPLD8BejigKq0GZqcgGNN0";

const searchBtn = document.querySelector(".search-btn");
const searchBox = document.querySelector(".search-box");
const popUp = document.querySelector(".pop-up");
const popUpImg = document.querySelector(".pop-up-img");

let query = "";

const URL = "https://api.unsplash.com/photos/?client_id=";

const random_photo = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=30`;

const gallery = document.querySelector(".gallery");

let allImages;

const getImages = async () => {
  if (query) {
    const Search_photo = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query="${query}&per_page=30"`;

    fetch(Search_photo)
      .then((res) => res.json())
      .then((data) => {
        allImages = data;
        // console.log(allImages.results);
        makeImages(allImages.results);
      });
  } else {
    fetch(random_photo)
      .then((res) => res.json())
      .then((data) => {
        allImages = data;
        makeImages(allImages);
      });
  }
};

const makeImages = (data) => {
  gallery.innerHTML = "";

  data.forEach((item, index) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.className = "gallery-img";

    gallery.appendChild(img);

    //pop up window
    // img.addEventListener("click", () => {
    //   popUpImg.src = item.urls.regular;
    //   popUp.classList.remove("hide");
    // });

    // console.log(index, item.urls.regular);
  });
};

// lestener for search btn

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  query = searchBox.value;

  getImages();
});

getImages();
