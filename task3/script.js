'use strict';

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

class CarouselSection extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.isSwiperActive = false;
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    // Create carousel
    const carousel = document.createElement('div');
    carousel.setAttribute('class', 'carousel');

    // Create carousel wrapper
    const carouselWrapper = document.createElement('div');
    carouselWrapper.setAttribute('class', 'carousel__wrapper swiper');

    // Create carousel inner wrapper
    const carouselInnerWrapper = document.createElement('div');
    carouselInnerWrapper.setAttribute(
      'class',
      'carousel__inner-wrapper swiper-wrapper'
    );

    // Create swiper slides
    const slides = [
      'img/1440.jpeg',
      'img/1440_2.jpeg',
      'img/1440_3.jpeg',
      'img/1440_4.jpeg',
    ];
    slides.forEach(src => {
      const swiperSlide = document.createElement('div');
      swiperSlide.setAttribute('class', 'carousel__item swiper-slide');
      const img = document.createElement('img');
      img.src = src;
      swiperSlide.appendChild(img);
      carouselInnerWrapper.appendChild(swiperSlide);
    });

    // Create control buttons
    const prevButton = document.createElement('div');
    prevButton.setAttribute('class', 'carousel__button prevEl');
    const prevButtonImg = document.createElement('img');
    prevButtonImg.src = 'img/nav-left.png';
    prevButton.appendChild(prevButtonImg);

    const nextButton = document.createElement('div');
    nextButton.setAttribute('class', 'carousel__button nextEl');
    const nextButtonImg = document.createElement('img');
    nextButtonImg.src = 'img/nav-right.png';
    nextButton.appendChild(nextButtonImg);

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Swiper';
    toggleButton.setAttribute('class', 'toggle-button');

    // Apply external styles to the shadow DOM
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style.css');

    // Attach the created elements to the shadow DOM
    shadow.appendChild(linkElem);
    shadow.appendChild(wrapper);
    wrapper.appendChild(carousel);
    carousel.appendChild(carouselWrapper);
    carouselWrapper.appendChild(carouselInnerWrapper);
    carouselWrapper.appendChild(prevButton);
    carouselWrapper.appendChild(nextButton);
    wrapper.appendChild(toggleButton);

    // Initialize swiper function
    const initializeSwiper = () => {
      if (!this.isSwiperActive) {
        this.swiper = new Swiper(carouselWrapper, {
          direction: 'horizontal',
          slidesPerView: 'auto',
          spaceBetween: 8,
          freeMode: true,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
        });

        // Event listener for slide change
        this.swiper.on('slideChange', () => {
          console.log(`Active slide: ${this.swiper.activeIndex}`);
        });

        this.isSwiperActive = true;
        toggleButton.classList.add('swiper-active');
      }
    };

    // Destroy swiper function
    const destroySwiper = () => {
      if (this.isSwiperActive && this.swiper) {
        this.swiper.destroy(false, false);
        this.swiper = null;
        this.isSwiperActive = false;
        toggleButton.classList.remove('swiper-active');
      }
    };

    // Toggle button functionality
    toggleButton.addEventListener('click', () => {
      if (this.isSwiperActive) {
        destroySwiper();
      } else {
        initializeSwiper();
      }
    });

    // Initialize swiper initially
    initializeSwiper();
  }
}

customElements.define('carousel-section', CarouselSection);
