import {
  resetFormValidation,
  validationConfig,
  disableButton,
  enableValidation,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";

let userId;

// profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Avatar
const avatarEditBtn = document.querySelector(".profile__edit-avatar-btn");
const avatarModal = document.querySelector("#avatar__edit-modal");
const avatarForm = document.forms["edit__avatar-form"];
const avatarInput = document.querySelector("#profile__avatar-input");
const profileAvatar = document.querySelector(".profile__avatar");

// New Post Elements
const newPostButton = document.querySelector(".profile__add-button-post");
const newPostLink = document.querySelector(".new__post-link");
const newPostCaption = document.querySelector(".new__post-caption");

// Preview Image Elements
const imageModal = document.querySelector(
  ".modal__modal__container_type_preview"
);
const previewCaption = document.querySelector(".modal__caption");
const previewModal = document.querySelector("#modal__preview");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewImage = previewModal.querySelector(".modal__image");

// Profile Modal Elements
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditModalCloseButton =
  profileEditModal.querySelector(".modal__close-btn");

// New Post Modal Elements
const newPostModal = document.querySelector("#new__post-modal");
const newPostModalCloseButton = newPostModal.querySelector(".modal__close-btn");

// Profile Form Elements
const profileEditFormElement = document.querySelector(".modal__form");

// New Post Form Elements
const newPostFormElement = newPostModal.querySelector(".modal__form");

const modals = document.querySelectorAll(".modal");
const newPostSubmitbtn = newPostModal.querySelector(".modal__submit-btn");

// Profile Input Elements for Modals
const profileEditModalNameInput = profileEditModal.querySelector(
  "#profile__name-input"
);
const profileEditModalDescriptionInput = profileEditModal.querySelector(
  "#profile__description-input"
);

// New Post Input Elements for Modals
const newPostModalLinkInput = newPostModal.querySelector(
  "#new__post-link-input"
);
const newPostModalCaptionInput = newPostModal.querySelector(
  "#new__post-caption-input"
);

// Card Elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template");

// Function to open a Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

// Function to close a Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-btn")
    ) {
      closeModal(modal);
    }
  });
});

// cancel delete confirmation modal

const cancelCardModal = document.querySelector(
  ".modal__button.modal__button_type_cancel"
);
cancelCardModal.addEventListener("click", function () {
  closeModal(deleteCardModal);
});
// Delete modal logic
const deleteCardModal = document.querySelector("#delete__card-modal");
const deleteForm = deleteCardModal.querySelector(".modal__form");
const deleteButton = deleteForm.querySelector(".modal__button_type_delete"); // Store button reference

let selectedCard;
let selectedCardId;

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteCardModal);
}

const handleDeleteSubmit = (evt) => {
  evt.preventDefault();

  deleteButton.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch((err) => {
      console.error(`Error: Failed to delete card - ${err}`);
    })
    .finally(() => {
      deleteButton.textContent = "Delete";
    });
};
deleteForm.addEventListener("submit", handleDeleteSubmit);

// Create card element
function getCardElement(data, userId) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  cardElement.id = `card-${Date.now()}`;

  const cardElementDescription =
    cardElement.querySelector(".card__description");
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardElementDescription.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    const isLiked = cardLikeButton.classList.contains(
      "card__like-button_liked"
    );
    const likeAction = isLiked ? api.deleteLike : api.addLike;

    likeAction
      .call(api, data._id)
      .then((updatedCard) => {
        cardLikeButton.classList.toggle("card__like-button_liked");
      })
      .catch(console.error);
  });

  cardElementImage.addEventListener("click", () => {
    previewImage.src = cardElementImage.src;
    previewImage.alt = cardElementImage.alt;
    previewCaption.textContent = cardElementImage.alt;
    openModal(previewModal);
  });

  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  return cardElement;
}

// Handle profile form
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileEditModal = document.querySelector("#profile__edit-modal");
  const submitButton = profileEditModal.querySelector(".modal__submit-btn");
  submitButton.textContent = "Save...";
  api
    .editUserInfo({
      name: profileEditModalNameInput.value,
      about: profileEditModalDescriptionInput.value,
    })
    .then(() => {
      profileName.textContent = profileEditModalNameInput.value;
      profileDescription.textContent = profileEditModalDescriptionInput.value;
      closeModal(profileEditModal);
      avatarForm.reset();
      disableButton(submitButton, validationConfig);
    })
    .catch((err) => {
      console.error(`Error: Failed to update profile information - ${err}`);
    })
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

// Handle new post form
function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const newPostModal = document.querySelector("#new__post-modal");
  const submitButton = newPostModal.querySelector(".modal__submit-btn");
  submitButton.textContent = "Saving...";
  const link = newPostModalLinkInput.value.trim();
  const name = newPostModalCaptionInput.value.trim();
  const newCard = { name, link };

  api
    .addCard(newCard)
    .then((card) => {
      const cardElement = getCardElement(card, userId);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostFormElement.reset();
      disableButton(newPostSubmitbtn, validationConfig);
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

// Open avatar modal
avatarEditBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

// Handle avatar form submission
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(".modal__submit-btn");
  submitButton.textContent = "Saving...";

  api
    .setUserAvatar({ avatar: avatarInput.value })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
      disableButton(submitButton, validationConfig);
    })
    .catch((err) => {
      console.error(`Error: Failed to update avatar - ${err}`);
    })
    .finally(() => {
      submitButton.textContent = "Save";
    });
});

// Open profile edit modal
profileEditButton.addEventListener("click", () => {
  profileEditModalNameInput.value = profileName.textContent;
  profileEditModalDescriptionInput.value = profileDescription.textContent;
  resetFormValidation(profileEditFormElement, validationConfig);
  openModal(profileEditModal);
});

// Open new post modal
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

// Submit handlers
profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);
newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

// Initialize API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d281195a-2927-4998-9155-1ddf6322a50b",
    "Content-Type": "application/json",
  },
});

// Load user and card data
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    // Process user info
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    // Process cards
    const userId = userInfo._id;
    cards.forEach((card) => {
      const cardElement = getCardElement(card, userId);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(`Error: Failed to load page data - ${err}`);
  });

enableValidation(validationConfig);
