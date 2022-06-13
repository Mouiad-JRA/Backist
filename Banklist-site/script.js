'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn)=>
    btn.addEventListener('click', openModal)
)

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'we use cookied for improved functionality and speed';
message.innerHTML =
    'we use cookied for improved functionality ' +
    'and speed. <button class="btn ' +
    'btn--close-cookie"> Got it!  </button>'

 header.append(message);

document.querySelector('.btn--close-cookie').addEventListener(
    'click',()=>message.remove() // equal to message.parentElement.removeChild
);

btnScrollTo.addEventListener('click',(event)=>{
event.preventDefault();
// const s1coords = sectionOne.getBoundingClientRect(); //visible view port
// // window.pageXOffset, window.pageYOffset
// //     document.documentElement.clientHeight
//     window.scrollTo({
//         left: s1coords.left+window.pageXOffset,
//         top: s1coords.top+window.pageYOffset,
//         behavior: 'smooth',
//     });
    // OR use scrollIntoView
    sectionOne.scrollIntoView({behavior:'smooth'});
});

// Page navigation

// Not good way so use  Event Delegation
/*
document.querySelectorAll('.nav__link').forEach(el=>{
    el.addEventListener('click', function (event){
        event.preventDefault();
        const id = this.getAttribute('href');  // this is the current element
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
    });
});
**/
// Event Delegation
// 1. add event listener to common parent element
// 2. Determine what element fire the event
document.querySelector('.nav__links').addEventListener('click',
    function (event){
    event.preventDefault();
    // Matching strategy
       if (event.target.classList.contains('nav__link')){
           const id = event.target.getAttribute('href');  // this is the current element
           document.querySelector(id).scrollIntoView({behavior:'smooth'});
       }
    });
// Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Bad Way
// tabs.forEach(tab=> tab.addEventListener('click',()=>
//
// ))
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    // Guard clause
    if (!clicked) return;
    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    // Activate tab
    clicked.classList.add('operations__tab--active');
    // Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).
    classList.add('operations__content--active');
});

// Menu fade animation
// have only one real arg event
const handlerHover = function (event){
    if (event.target.classList.contains('nav__link')){
        const clickedLink = event.target;
        const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
        const logo = clickedLink.closest('.nav').querySelector('img');
        siblings.forEach(el=>{
            if (el !== clickedLink) el.style.opacity = this; // or use this
        })
        logo.style.opacity = this;
    }
}
// Passing an "argument" into handler
nav.addEventListener('mouseover',handlerHover.bind(0.5));
// OR using Bind rerun new func where this (the currentTarget (what el we attach to)) is the first , then pass other partmter
nav.addEventListener('mouseout',handlerHover.bind(1));

// add sticky navigation // never use scroll for real

// const initialCoords = sectionOne.getBoundingClientRect();
//
// window.addEventListener('scroll', function (){
// if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
// else nav.classList.remove('sticky')
// });

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries){
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else  nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav,
    { root: null, threshold:0, rootMargin: `-${navHeight}px`});

headerObserver.observe(header);

// Reveal section
const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer){
    const [entry] = entries;
    if (!entry.isIntersecting) return;
   entry.target.classList.remove('section--hidden');
   observer.unobserve(entry.target);
}

const sectionObserver =  new IntersectionObserver(revealSection,
    { root: null, threshold:0.3});
allSections.forEach(function (section) {
    sectionObserver.observe(section)
    section.classList.add('section--hidden');
});

// Apply laze load for images
const allImages = document.querySelectorAll('.features__img')
const revealimages = function (entries, observer){
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function (){
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
}

const imageObserver =  new IntersectionObserver(revealimages,
    { root: null, threshold:0 , rootMargin: '200px'});
allImages.forEach( (image)=> imageObserver.observe(image));

// add slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');

    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');
    let curSlide = 0;
    const maxSlide = slides.length;


    const createDots = function () {
        slides.forEach(function (_, index) {
            dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`
  );
        });
    }


    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };
    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };
    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();
    // Event handlers

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();
//Styles
// To get the Style use getComputedStyle(element).property
// use style.setProperty(property, its value)

// Attributes (Work on standard prop only), use getAttribute(attrname), setAttribute
// Data attr element.dataset.attrname

//Event we can use proprty for them like onevent like onmouseenter, removeEventListener


// DOM Traversing
/*
childNodes
children
firstElementChild
lastElementChild
parentNode
parentElement
closest('.class')
previousElementSibling
nextElementSibling
previousSibling
nextSibling

 */