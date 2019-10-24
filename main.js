// collapsible expanding and shrinking
function expand(elem) {
  // get active element
  const expanded = document.getElementsByClassName('active');
  const activeBtn = expanded[0].previousElementSibling.getElementsByTagName('button');
  const all = document.getElementsByClassName('collapsible-title');

  // expand and shrink
  expanded[0].classList.toggle('active');
  elem.parentNode.nextElementSibling.classList.toggle('active')

  // change button icons
  elem.children[0].textContent = 'keyboard_arrow_up';
  activeBtn[0].children[0].textContent = 'keyboard_arrow_down'

  // set active button to disabled and rest to enabled
  for(var i=0; i < all.length; i++) {
    all[i].getElementsByTagName('button')[0].disabled = false;
  }
  elem.disabled = true;
}