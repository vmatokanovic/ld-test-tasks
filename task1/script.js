'use strict';

// Create a class for the element
class SectionInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    /* Toggle button functionality */
    this.toggleText = function (element) {
      element.classList.contains('section__content--hidden')
        ? element.classList.remove('section__content--hidden')
        : element.classList.add('section__content--hidden');
    };
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create section
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    // Create img
    const img = document.createElement('img');
    img.setAttribute('class', 'section__img');
    img.src = 'img/1440.png';

    // Create container
    const container = document.createElement('div');
    container.setAttribute('class', 'section__container');

    // Create heading
    const heading = document.createElement('h3');
    heading.setAttribute('class', 'section__heading');
    // Take attribute heading text
    const heading_text = this.getAttribute('heading-text');
    heading.textContent = heading_text;

    // Create paragraph content
    const content = document.createElement('p');
    content.setAttribute('class', 'section__content');
    const contentText = this.getAttribute('content-text');
    content.textContent = contentText;

    // Create button
    const button = document.createElement('button');
    button.setAttribute('class', 'section__button');
    const buttonText = this.getAttribute('button-text');
    button.textContent = buttonText;
    button.addEventListener('click', this.toggleText.bind(this, content));

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style.css');

    /* Intersection observer - reveal section functionality */
    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: '-100px',
    };

    function sectionCallbackFunction(entries) {
      const [entry] = entries;
      entry.isIntersecting
        ? section.classList.remove('hidden')
        : section.classList.add('hidden');
    }

    const sectionObserver = new IntersectionObserver(
      sectionCallbackFunction,
      options
    );

    sectionObserver.observe(section);

    // Attach the created elements to the shadow dom
    shadow.appendChild(linkElem);
    shadow.appendChild(section);
    section.appendChild(img);
    section.appendChild(container);
    container.appendChild(heading);
    container.appendChild(content);
    container.appendChild(button);
  }
}

customElements.define('section-info', SectionInfo);
