const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditFormElement = document.querySelector(".modal__form");
const profileEditModalCloseButton =
  profileEditModal.querySelector(".modal__close-btn");
const profileEditModalNameInput = profileEditModal.querySelector(
  "#profile__name-input"
);
const profileEditModalDescriptionInput = profileEditModal.querySelector(
  "#profile__description-input"
);

const cardsList = document.querySelector(".cards__list");

const cardTemplate = document.querySelector("#card__template");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardElementDescription =
    cardElement.querySelector(".card__description");
  cardElementDescription.textContent = data.name;

  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementImage.src = data.link;

  cardElementImage.alt = data.name;

  return cardElement;
}

function openModal() {
  profileEditModalNameInput.value = profileName.textContent;
  profileEditModalDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditModalNameInput.value;
  profileDescription.textContent = profileEditModalDescriptionInput.value;
  closeModal();
}

profileEditButton.addEventListener("click", function () {
  openModal();
});
profileEditModalCloseButton.addEventListener("click", function () {
  closeModal();
});
profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  console.log(getCardElement(initialCards[i]));
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}
