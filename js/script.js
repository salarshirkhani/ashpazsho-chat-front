///menu-bar-mobile js
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
        
let showMenu = false;
        
menuBtn.addEventListener('click', toggleMenu);
        
function toggleMenu() {
  if (!showMenu) {
    menu.classList.add('show');
    showMenu = true;
  } 
  else {
    menu.classList.remove('show');
    showMenu = false;
  }
}
//   
const viewportWidth = screen.width;
if (viewportWidth >= 1000) {
  $('#side').stick_in_parent(); 
}     
