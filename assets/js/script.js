// Preloader //

jQuery(document).ready(function($) {

$(window).load(function(){
  $('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});


// Futuro sidebar
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Futuro sidebar
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Futuro sidebar
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// animações

new WOW().init();


//FUNCTION TOGGLE-CATEGORYS
function toggleCategoriesNav(){
  var sticky = $('.sticky'),
      stickyLogo = $('.logo'),
      navBarCategories = $('.navdrop');
  if(stickyLogo.hasClass("fixed2")){
    sticky.removeClass('fixed');
    stickyLogo.removeClass("fixed2");
    navBarCategories.removeClass('navlift');
  }
  else{
    stickyLogo.addClass('fixed2');
    sticky.addClass('fixed');
    navBarCategories.addClass('navlift');
  }
  isCategoriesShowing= !isCategoriesShowing;

}

// Posições da Header
var isCategoriesShowing=true;
$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  if (scroll >= 1){
    if(isCategoriesShowing){
      toggleCategoriesNav();
    }
  }
  else if(scroll==0){
    toggleCategoriesNav();
  }
});
$(document).on("click",".logo",function(event){
  toggleCategoriesNav();
});

$(window).scroll(function(event){
  var mydivpos = document.getElementById("pricelowered").offsetTop;
  var scrollPos = $(event.target).scrollTop();

  if(scrollPos >= mydivpos)
    document.getElementById("pricelifted").className = "wow animated fadeInDown";
  else
    document.getElementById("pricelifted").className = "hidden wow animated fadeOutUp";

});
