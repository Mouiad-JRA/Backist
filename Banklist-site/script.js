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
tabsContainer.addEventListener('click',function (event){
    const clicked = event.target.closest('.operations__tab');
    // Guard clause
    if (!clicked) return;
    tabs.forEach(t=>t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    tabsContent.forEach(tb=>tb.classList.remove('operations__content--active'));
document.querySelector(`.operations__content--${clicked.dataset.tab}`).
classList.add('.operations__content--active');
});
// Styles
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