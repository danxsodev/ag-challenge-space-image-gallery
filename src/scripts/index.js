const cardImages = document.querySelectorAll('.card-image');
const btnVote = document.querySelector('.btn-vote');

let selectedImage;

cardImages.forEach(card => {
  card.addEventListener('click', () => {

    cardImages.forEach(otherCard => otherCard.classList.remove('selected'));

    card.classList.add('selected');
    selectedImage = card;

    cardImages.forEach(otherCard => {
      if (otherCard !== selectedImage) {
        otherCard.style.opacity = 0.4;
      } else {
        otherCard.style.opacity = 1;
      }
    });

    if (selectedImage) {
      btnVote.classList.add('enabled');
      btnVote.disabled = false;
    } else {
      btnVote.classList.remove('enabled');
      btnVote.disabled = true; 
    }
  });
});
