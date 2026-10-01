// Get elements

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// Store currently visible images

let visibleImages = [];

let currentIndex = 0;


// Update visible images

function updateVisibleImages() {

    visibleImages = Array.from(galleryItems)
        .filter(item => item.style.display !== "none");

}


// Filter images

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class

        this.classList.add("active");


        const category = this.dataset.category;


        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });


        updateVisibleImages();

    });

});


// Open lightbox

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        updateVisibleImages();

        currentIndex = visibleImages.indexOf(this);

        showImage();

    });

});


// Show image in lightbox

function showImage() {

    const item = visibleImages[currentIndex];

    const image = item.querySelector("img");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightbox.classList.add("show");

}


// Close lightbox

closeBtn.addEventListener("click", function () {

    lightbox.classList.remove("show");

});


// Previous image

prevBtn.addEventListener("click", function () {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = visibleImages.length - 1;

    }

    showImage();

});


// Next image

nextBtn.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {

        currentIndex = 0;

    }

    showImage();

});


// Close when clicking outside image

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

    }

});


// Keyboard navigation

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("show")) {
        return;
    }


    if (event.key === "ArrowRight") {

        nextBtn.click();

    }


    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }


    if (event.key === "Escape") {

        closeBtn.click();

    }

});


// Initial setup

updateVisibleImages();