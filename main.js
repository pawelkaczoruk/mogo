// collapsible expanding and shrinking
function expand(elem) {
  // get active element
  const expanded = document.getElementsByClassName('active'),
        activeBtn = expanded[0].previousElementSibling.getElementsByTagName('button'),
        all = document.getElementsByClassName('collapsible-title');
  
  // expand and shrink
  expanded[0].classList.toggle('active');
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
        startCounting(statItems[i], 0, Number(statItems[i].innerHTML), 3000)
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