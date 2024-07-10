const imageData = [
  {
    id: 1,
    src: "./src/assets/image-select-1.webp",
    alt: "Descrição da Imagem",
    lazyloading: true,
  },
  {
    id: 2,
    src: "./src/assets/image-select-2.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 3,
    src: "./src/assets/image-select-3.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 4,
    src: "./src/assets/image-select-4.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 5,
    src: "./src/assets/image-select-5.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 6,
    src: "./src/assets/image-select-6.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 7,
    src: "./src/assets/image-select-7.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 8,
    src: "./src/assets/image-select-8.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 9,
    src: "./src/assets/image-select-9.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 10,
    src: "./src/assets/image-select-10.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 11,
    src: "./src/assets/image-select-11.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 12,
    src: "./src/assets/image-select-12.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 13,
    src: "./src/assets/image-select-13.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 14,
    src: "./src/assets/image-select-14.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 15,
    src: "./src/assets/image-select-15.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 16,
    src: "./src/assets/image-select-16.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 17,
    src: "./src/assets/image-select-17.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
  {
    id: 18,
    src: "./src/assets/image-select-18.webp",
    alt: "Descrição da Imagem",
    lazyLoading: true,
  },
];

const pageSize = 9;
let currentPage = 1;
let selectedImageId = sessionStorage.getItem("selectedImage");

function renderImages(startIndex, endIndex) {
  const imageContainer = document.querySelector(".gallery-images");
  imageContainer.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < imageData.length; i++) {
    const image = imageData[i];
    const card = document.createElement("div");
    card.classList.add("card-image");

    if (image.id.toString() === selectedImageId) {
      card.classList.add("selected");
    };

    const imgElement = document.createElement("img");
    imgElement.id = image.id;
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.loading = image.lazyloading ? "lazy" : "eager";

    card.appendChild(imgElement);
    imageContainer.appendChild(card);

    card.addEventListener("click", () => {
      selectImage(card, image.id);
    });
  };

  selectVotingImage();
};

function createPaginationButtons(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.classList.add("btn-pagination");
    button.textContent = i;

    if (i === currentPage) {
      button.classList.add("active");
    };

    button.addEventListener("click", () => {
      currentPage = i;
      renderImages((currentPage - 1) * pageSize, currentPage * pageSize);
    });

    paginationContainer.appendChild(button);
  };
};

function selectImage(card, id) {
  const cardImages = document.querySelectorAll(".card-image");
  cardImages.forEach((otherCard) => otherCard.classList.remove("selected"));

  card.classList.add("selected");
  selectedImageId = id;
  sessionStorage.setItem("selectedImage", selectedImageId);

  cardImages.forEach((otherCard) => {
    if (parseInt(otherCard.firstChild.id) !== selectedImageId) {
      otherCard.style.opacity = 0.4;
    } else {
      otherCard.style.opacity = 1;
    };
  });

  const btnVote = document.querySelector(".btn-vote");
  btnVote.classList.add("enabled");
  btnVote.disabled = false;
};

const totalPages = Math.ceil(imageData.length / pageSize);
renderImages(0, pageSize);
createPaginationButtons(totalPages);

function selectVotingImage() {
  const cardImages = document.querySelectorAll(".card-image");
  cardImages.forEach((card) => {
    if (parseInt(card.firstChild.id) === parseInt(selectedImageId)) {
      card.classList.add("selected");
      card.style.opacity = 1;
    };
  });

  const btnVote = document.querySelector(".btn-vote");
  if (selectedImageId) {
    btnVote.classList.add("enabled");
    btnVote.disabled = false;
  };

  btnVote.addEventListener("click", () => {
    const targetUrl = `./src/pages/result-voting.html?selectedImage=${selectedImageId}`;
    window.location.href = targetUrl;

    // const imageVoted = document.querySelector(".image-voted");
    // const imageCardVoted = imageVoted.querySelector(".card-image");
    // const ImgElementVoted = imageCardVoted.querySelector("img");
    // const selectedImageData = imageData.find(image => image.id === selectedImageId);

    // if (selectedImageData) {
    //   ImgElementVoted.id = selectedImageData.id;
    //   ImgElementVoted.src = selectedImageData.src;
    //   ImgElementVoted.alt = selectedImageData.alt;
    // }
  });
};

const btnRestart = document.querySelector(".btn-restart");
btnRestart.addEventListener("click", () => {
  window.location.href = "index.html";
});