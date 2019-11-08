/*                   HAMBURGER                    */
const menu = document.getElementById('hamburger-menu');
const hb = document.getElementById('hamburger');

function hamburger() {
  hb.classList.toggle('active');
  menu.classList.toggle('active');
}

const content = document.querySelectorAll('header, main, footer, #hamburger-menu a');
for(const el of content) {
  el.addEventListener('click', () => {
    hb.classList.remove('active');
    menu.classList.remove('active');
  });
}



/*                   HEADER                    */

const headerTitles = document.querySelectorAll('#titles-container li'),
      progressBars = document.querySelectorAll('#indicators .fill'),
      header = document.querySelector('header'),
      backgrounds = [
  'url(images/bannerBackground1.jpg)',
  'url(images/bannerBackground2.jpg)',
  'url(images/bannerBackground3.jpg)',
  'url(images/bannerBackground4.jpg)'
];
let current = 0;

// header animations
setInterval(() => {
  // remove active class from previously active elements
  progressBars[current].classList.toggle('active');
  headerTitles[current].classList.toggle('active');
  
  // modify current index value
  switch(current) {
    case 0: 
    case 1:
    case 2:
      current++;
      break;
    case 3:
      current = 0;
      break;
    default:
      current = 0;
  }

  // add new active class to next progress bar
  progressBars[current].classList.toggle('active');

  // add active class to next header title and set new background image
  headerTitles[current].classList.toggle('active');
  header.style.backgroundImage = backgrounds[current];
}, 6000);



/*                   COLLAPSIBLE                    */

// collapsible expanding and shrinking
function expand(elem) {
  // get active element
  const expanded = document.querySelector('#collapsible-set .active');
        activeBtn = expanded.previousElementSibling.getElementsByTagName('button'),
        all = document.getElementsByClassName('collapsible-title');
  
  // expand and shrink
  expanded.classList.toggle('active');
  elem.parentNode.nextElementSibling.classList.toggle('active')

  // change button icons
  elem.children[0].textContent = 'keyboard_arrow_up';
  activeBtn[0].children[0].textContent = 'keyboard_arrow_down'

  // set active button to disabled and rest to enabled
  for(let i = 0; i < all.length; i++) {
    all[i].getElementsByTagName('button')[0].disabled = false;
    all[i].getElementsByTagName('button')[0].style.cursor = 'pointer';
  }
  elem.disabled = true;
  elem.style.cursor = 'default';
}



/*                   COUNTER                    */

// get all elements that should be counted up
const statistics = document.getElementById('statistics'),
      statItems = statistics.querySelectorAll('h3');
let isVisible = false;

// event listener for scroll
window.addEventListener('scroll', () => {
  if(isInViewport(statistics)) {
    if(isVisible === false) {
      isVisible = true;
      for(let i = 0; i < statItems.length; i++) {
        startCounting(statItems[i], 0, Number(statItems[i].innerHTML), 2000)
      }
    }
  }
}, false);

// check if statistics element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom - 80 <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// start counting
function startCounting(el, start, end, duration) {
  const range = end - start,
        startTime = new Date().getTime(), 
        endTime = startTime + duration;
  
  let timer,
      stepTime = Math.abs(Math.floor(duration / range));

  // count up
  function run() {
    const now = new Date().getTime(),
          remaining = Math.max((endTime - now) / duration, 0),
          value = Math.round(end - (remaining * range));

    el.innerHTML = value;
    if(value == end) {
      clearInterval(timer);
    }
  }

  // run count up function
  timer = setInterval(run, stepTime);
  run();
}



/*                   CAROUSEL                    */

// get li elemets
const liServ = document.querySelectorAll('#service-carousel ul li'),
      liTeam = document.querySelectorAll('#team-carousel ul li');
// add index var
let indexS = 0,
    indexT = 0;

function show(direction, el) {
  let index, li;

  // check which carousel was activated, set proper variables
  if(el == 'serv') {
    li = liServ;
    index = indexS;
  } else if(el == 'team') {
    li = liTeam;
    index = indexT;
  }

  // get previous index value
  const prevIndex = index;

  // modify index value
  direction == 'next' ? index++ : index--;

  // deal with last and first element wrapping around
  index = index >= li.length ? 0 : (index < 0 ? li.length -1 : index);

  // toggle active class on new and old element, add class for leaving element
  li[prevIndex].classList.toggle('active');
  li[index].classList.toggle('active');

  // update index value
  el == 'serv' ? indexS = index : indexT = index;
}


/*                   MAP                    */

const mapOpen = document.getElementById('open-map');
const mapClose = document.getElementById('map-close');
const container = document.getElementById('map');
const mapContainer = document.getElementById('g-map');

// map opening
mapOpen.addEventListener('click', () => {
  container.style.height = '400px';
  mapContainer.style.display = 'block';
  mapOpen.style.display = 'none';
  mapClose.style.display = 'block';
});

// map closing
mapClose.addEventListener('click', () => {
  container.style.height = '200px';
  mapContainer.style.display = 'none';
  mapOpen.style.display = 'flex';
  mapClose.style.display = 'none';
});