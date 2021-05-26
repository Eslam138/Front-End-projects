/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let section1=document.getElementById('section1');
let section2=document.getElementById('section2');
let section3=document.getElementById('section3');
const sections = document.querySelectorAll('section')
let navbar__list=document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function clickMe(section){
    section.scrollIntoView();
}
function activeButton(button){
    let buttons=document.getElementsByClassName('active');
        for(let i=0;i<buttons.length;i++){
            buttons[i].className='menu__link';
        }
        if(button!=null)
            button.className='menu__link active';
}
function activeInScroll () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveSection();
        //active viewport section
        activeSection(section);
        console.log(section.id.substr(0,7)+"-"+section.id.substr(7)+'-a');
        const active = document.getElementById(section.id.substr(0,7)+"-"+section.id.substr(7)+'-a');
        //active section button in navBar 
        activeButton(active);
    });
}
function getActiveSection() {
    for (let item=0;item<sections.length;item++) {
        let bound = sections[item].getBoundingClientRect();
        if (bound.top > -300 & bound.top < 1000) {
            return sections[item];
        };
    };
}




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function navBuilder(i){
        let li=document.createElement('li');
        let a=document.createElement('a');
        a.setAttribute('id','section-'+i+'-a');
        a.setAttribute('class','menu__link');
        a.style.cursor='pointer';
        let textNode=document.createTextNode('section'+i);
        a.appendChild(textNode);
        li.appendChild(a);
        return li;
}

// Add class 'active' to section when near top of viewport

function activeSection(activeSection){
    let sections=document.getElementsByClassName('your-active-class');
        for(let i=0;i<sections.length;i++){
            sections[i].className='';
        }
        if(activeSection != null)
            activeSection.className='your-active-class';
}
// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildMenu(){
    for(let i=1;i<=4;i++){
        navbar__list.appendChild(navBuilder(i));
    }
    let li=document.createElement('li');
    let a=document.createElement('a');
    a.setAttribute('id','top-page');
    a.style.cursor='pointer';
    a.setAttribute('class','menu__link');
    let textNode=document.createTextNode('top');
    a.appendChild(textNode);
    li.appendChild(a);
    navbar__list.appendChild(li);
}
buildMenu();
// Scroll to section on link click

// Set sections as active
for(let i=1;i<=4;i++){
    document.getElementById("section-"+i+"-a").addEventListener('click',()=>{
        document.getElementById("section"+i).scrollIntoView();
    }); 
}
document.getElementById("top-page").addEventListener('click',()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
activeInScroll();