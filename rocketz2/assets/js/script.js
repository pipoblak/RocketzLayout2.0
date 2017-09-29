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


// Posições da Header

$(window).scroll(function(){
  var sticky = $('.sticky'),
      scroll = $(window).scrollTop();

  if (scroll >= 1) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});

$(window).scroll(function(){
  var sticky = $('.navdrop'),
      scroll = $(window).scrollTop();

  if (scroll >= 1) sticky.addClass('navlift');
  else sticky.removeClass('navlift');
});

$(window).scroll(function(){
  var sticky = $('.sticky2'),
      scroll = $(window).scrollTop();

  if (scroll >= 1) sticky.addClass('fixed2');
  else sticky.removeClass('fixed2');
});

 window.onscroll = function (oEvent) {
  var mydivpos = document.getElementById("pricelowered").offsetTop;
  var scrollPos = document.getElementsByTagName("body")[0].scrollTop;
  
  if(scrollPos >= mydivpos)
    document.getElementById("pricelifted").className = "wow animated fadeInDown";
  else
    document.getElementById("pricelifted").className = "hidden wow animated fadeOutUp";
};

