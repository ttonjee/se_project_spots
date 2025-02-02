# se_project_spots

Spots is a simple web application that showcases a user profile along with a photo gallery. Users can view photos with descriptions, and they can interact with the "like" buttons for each photo. The app also includes functionality to edit the user's profile and add new posts.

# Table of Contents

1. Project Overview
2. Features
3. Installation
4. File Structure
5. Responsive Design
6. Credits

## Project Overview

The Spots Photo Gallery consists of a profile page and a gallery of images. The profile page includes the user's name, profession, avatar, and buttons to edit the profile and add new posts. Below the profile section is a photo gallery with images of various places, each with descriptions and like buttons.

## Key Sections:

1. Profile Section: Displays the user’s profile information, avatar, and options to edit the profile or add a new post.
2. Photo Gallery Section: Displays a series of photos with descriptions and like buttons.
3. Footer: Contains the copyright information.

## Features

- User Profile: Includes profile picture, name, and description with the option to edit.
- Photo Gallery: A grid of photos with descriptions and like buttons.
- Responsive Layout: The layout is designed to work well on both desktop and mobile devices using CSS media queries for different screen sizes.
- Buttons: Options to edit the profile and add new posts are included, with accompanying icons.

## Installation

To use this project locally, follow the steps below:

## Prerequisites

- Web Browser (Chrome, Firefox, etc.)
- Text Editor (VSCode, Sublime Text, etc.)
- Local Server (Optional for dynamic content, or simply open in a browser)

## Steps:

- Clone the Repository:

- Clone the repository to your local machine:

- git clone git@github.com:ttonjee/se_project_spots.git

- Navigate to the Project Directory:
- cd spots-photo-gallery

- Open in a Browser:
  You can open the index.html file directly in your browser to view the application.

- Edit Profile or Add New Post:
  These are placeholder buttons, and the functionality to edit or add posts can be implemented with JavaScript if needed.

## File Structure

/spots-photo-gallery
│
├── /images
│ ├── ./images/Logo.svg # Logo image
│ ├── ./images/avatar.jpg # Profile avatar
│ ├── ./images/Edit.svg # Edit icon
│ ├── ./images/Plusbutton.svg # New Post button icon
│ ├── ./images/LikeIcon.svg # Like button icon
│ ├── 1-./images/1-photo-by-moritz-feldmann-from-pexels.jpg # Photo in gallery (Val Thorens)
│ ├── 2-./images/2-photo-by-ceiline-from-pexels.jpg # Photo in gallery (Restaurant terrace)
│ ├── 3-./images/3-photo-by-tubanur-dogan-from-pexels.jpg # Photo in gallery (Outdoor cafe)
│ ├── 4-./images/4-photo-by-maurice-laschet-from-pexels.jpg # Photo in gallery (Bridge over forest)
│ ├── 5-./images/5-photo-by-van-anh-nguyen-from-pexels.jpg # Photo in gallery (Tunnel with light)
│ └── 6-./images/6-photo-by-moritz-feldmann-from-pexels.jpg # Photo in gallery (Mountain house)
│
├── index.html # Main HTML file
├── styles.css # Main CSS file
└── README.md # Project documentation

## Images Folder:

Contains all the image files used in the application, such as profile avatars, icons, and the photos displayed in the gallery.

## index.html:

The HTML structure of the page, including the profile, gallery, and footer.

## styles.css:

Contains the styles for the layout and design of the page. CSS media queries are used in this file to adapt the design for various screen sizes.

## Responsive Design:

The layout is designed to be responsive, ensuring that it looks good on devices of all sizes. This is achieved by using CSS media queries.

## Media Queries:

- Mobile View: For smaller screens (e.g., smartphones), the layout adjusts to display the profile and gallery in a more compact format. The profile section will stack its content, and the photo gallery will switch from multiple columns to a single column for better readability and interaction.

- Tablet View: On medium-sized screens (e.g., tablets), the layout transitions to a more grid-like structure with two or three columns for the photo gallery.

- Desktop View: For larger screens, the photo gallery is displayed with multiple columns, and the profile section maintains a horizontal layout.

## Here is an example of a basic media query setup in styles.css:

/_ Mobile-first styles (default) _/
body {
font-family: 'Poppins', sans-serif;
padding: 20px;
}

/_ For tablets and larger screens _/
@media (min-width: 600px) {
.photo\_\_gallery {
display: grid;
grid-template-columns: repeat(2, 1fr); /_ Two columns _/
gap: 20px;
}

.profile {
display: flex;
justify-content: space-between;
}
}

/_ For large screens (desktops) _/
@media (min-width: 1024px) {
.photo\_\_gallery {
grid-template-columns: repeat(3, 1fr); /_ Three columns _/
}

.profile\_\_column {
width: 50%;
}
}

## This ensures that the application looks great across all devices, adapting seamlessly from mobile phones to desktops.

## Credits

Images: The photos used in the gallery are sourced from Figma.
Icons: Icons such as the edit and like buttons are sourced from Figma.
Fonts: Fonts user were from google fonts.

## Deployment

This webpage is deployed to GitHub Pages

- [Deployment Link](https://ttonjee.github.io/se_project_spots/)

## Video recorded:

https://drive.google.com/file/d/1aJURJRTT82R8cNPMud3Ja6o1ci8Ak-8q/view?usp=drivesdk
