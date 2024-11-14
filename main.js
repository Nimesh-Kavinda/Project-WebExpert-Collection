const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-items");

hamburger.addEventListener("click", event => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

const newsLetterButton = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

newsLetterButton.forEach(button => {
    button.addEventListener("click", () => {
        modal.classList.add("show");
    });
});

closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
});


const accordions = document.querySelectorAll(".accordions .title");
accordions.forEach(accordion => {
    accordion.addEventListener("click", event => {
        accordion.classList.toggle("active");
        event.target.nextElementSibling.classList.toggle("active");
    });
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });