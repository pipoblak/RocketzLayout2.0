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
var isCategoriesMenuOnTop=true;
var isAssistBarActive;
$(".body-holder").scroll(function(event){
  var scroll = $(event.target).scrollTop();
  if(isAssistBarActive){
    var mydivpos = document.getElementById("pricelowered").offsetTop;
    if(scroll >= mydivpos)
      $("div[name*=pricelifted]").attr("class"," wow animated fadeInDown");
    else
      $("div[name*=pricelifted]").attr("class"," hidden wow animated fadeOutUp");
  }
  if (scroll >= 1){
    isCategoriesMenuOnTop=false;
    if(isCategoriesShowing){
      toggleCategoriesNav();
    }
  }
  else if(scroll==0){
    isCategoriesMenuOnTop=true;
    toggleCategoriesNav();
  }


});
$(document).on("click",".logo",function(event){
  if(!isCategoriesMenuOnTop){
      toggleCategoriesNav();
  }
});
$(document).on("click",".nav-mobile-button",function(event){
  var button = $(event.target).attr("data-id");
  var target = $($(".nav-items-mobile")[1]);
  var scroll = target.scrollLeft();
  if(button=="right")
    target.scrollLeft(target.scrollLeft()+ 56);
  else
    target.scrollLeft(target.scrollLeft()- 56);

  console.log(target );
});
