// we wait until the document is ready
jQuery(document).ready(function($){
 
  // find the list items that are parents and for each, add the + button
  // does not matter window width, we handle the visibility of the button through media queries
  $('.nav.menu').find('.parent').each(function(){
    // we create a simple <a> tag that has a plus icon as content
    $(this).prepend('<a href="#" class="sub-menu-opener"> <span class="icon-plus"> </span> </a>')
  });
 
  // on clicking the button, find the dropdown menu (which should be a sibling of the anchor) and open it
  $('.sub-menu-opener').click(function(event){
    event.preventDefault();
    $(this).toggleClass('opened');
    $(this).siblings('.dropdown-menu').slideToggle();
  });
 
});