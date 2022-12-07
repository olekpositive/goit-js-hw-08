
import { galleryItems } from "./gallery-items";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector(".gallery");

const images = galleryItems.map((image) =>
    `<a class="gallery__link" href="${image.original}"><img class="gallery__image" 
        src="${image.preview}" data-source="${image.original}" alt="${image.description}"/></a>`).join("");

gallery.insertAdjacentHTML("afterbegin", images);


const lightbox = new SimpleLightbox(".gallery a", {
    captionPosition: 'outside',
    captionsData: "alt",
    captionDelay: 250,
});