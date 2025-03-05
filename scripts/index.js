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

//profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//New Post Elements
const newPostButton = document.querySelector(".profile__add-button-post");
const newPostLink = document.querySelector(".new__post-link");
const newPostCaption = document.querySelector(".new__post-caption");

//preview Image Elements
const imageModal = document.querySelector(
  ".modal__modal__container_type_preview"
);
const previewCaption = document.querySelector(".modal__caption");
const previewModal = document.querySelector("#modal__preview");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewImage = previewModal.querySelector(".modal__image");

//Profile Modal Elements
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditModalCloseButton =
  profileEditModal.querySelector(".modal__close-btn");

//New Post Modal Elements
const newPostModal = document.querySelector("#new__post-modal");
const newPostModalCloseButton = newPostModal.querySelector(".modal__close-btn");

//Profile Form Elements
const profileEditFormElement = document.querySelector(".modal__form");

//New Post Form Elements
const newPostFormElement = newPostModal.querySelector(".modal__form");
console.log(newPostFormElement);

//Profile Input Elements for Modals
const profileEditModalNameInput = profileEditModal.querySelector(
  "#profile__name-input"
);
const profileEditModalDescriptionInput = profileEditModal.querySelector(
  "#profile__description-input"
);

//New Post Input Elements for Modals
const newPostModalLinkInput = newPostModal.querySelector(
  "#new__post-link-input"
);
const newPostModalCaptionInput = newPostModal.querySelector(
  "#new__post-caption-input"
);

//Card Elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template");

//Funtion to open a Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

//Function to close a modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

//Function to create a new card element
function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  //get Card Elements Function:
  const cardElementDescription =
    cardElement.querySelector(".card__description");
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  //Set Card Data
  cardElementDescription.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;

  //Add Like Button Functionality
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  //Open Card Image Preview
  cardElementImage.addEventListener("click", () => {
    previewImage.src = cardElementImage.src;
    previewImage.alt = cardElementImage.alt;
    previewCaption.textContent = cardElementImage.alt;

    openModal(previewModal);
  });

  //Add Delete Button Functionality
  if (cardDeleteButton) {
    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  return cardElement;
}

//Handle Profile Form Submission
function handleProfileFormSubmit(evt) {
  // debugger;
  evt.preventDefault();
  profileName.textContent = profileEditModalNameInput.value;
  profileDescription.textContent = profileEditModalDescriptionInput.value;
  closeModal(profileEditModal);
}

//Handle New Post Form Submission
function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const link = newPostModalLinkInput.value.trim();
  const name = newPostModalCaptionInput.value.trim();

  //Validate Inputs
  const newCard = { name, link };
  console.log(newCard);
  const cardElement = getCardElement(newCard);

  cardsList.prepend(cardElement);
  closeModal(newPostModal);

  newPostModalLinkInput.value = "";
  newPostModalCaptionInput.value = "";
}

//Open Profile Edit Modal
profileEditButton.addEventListener("click", () => {
  profileEditModalNameInput.value = profileName.textContent;
  profileEditModalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

//Open New Post Modal
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

//Close Card Image Preview
previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

//Close Profile Edit Modal
profileEditModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

//Close New Post Modal
newPostModalCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

//Handle Profile Form Submission
profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);

//Handle New Post Form Submission
newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

//InitialCards
initialCards.forEach((card) => {
  console.log(getCardElement(card));
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});
