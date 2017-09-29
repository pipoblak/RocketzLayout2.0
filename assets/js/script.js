// Preloader //

var sidewrapper;
closeSidewrapper=function(){
  sidewrapper.close();
}
var deltaX=0;
var deltaY=0;
jQuery(document).ready(function($) {
  var navMobile = $(".container .nav-items-mobile")[0];
  var mc = new Hammer.Manager(navMobile);
  var Pan = new Hammer.Pan();
  mc.add(Pan);

  mc.on('panmove', function(e) {
    var dX = deltaX + (e.deltaX);
     $.Velocity.hook(navMobile, 'translateX', dX + 'px');
  });
  mc.on('panend', function(e) {
    deltaX = deltaX + e.deltaX;
    var navContainerWidth =  $(".container.nav-items-mobile").width();
    var navMaxTranslate = ($(".container .nav-items-mobile").width() - navContainerWidth ) * (-1);
    if(deltaX>0){
       $.Velocity.hook(navMobile, 'translateX', 0 + 'px');
       deltaX=0;
    }
    else if(deltaX<navMaxTranslate){
      $.Velocity.hook(navMobile, 'translateX', navMaxTranslate + 'px');
      deltaX=navMaxTranslate;
    }
  });
  if($("#content-slider").length)
  $("#content-slider").lightSlider({
    loop:false,
    auto:false,
    pause:4000,
    keyPress:true,
    pager:false,
    responsive : [
      {
        breakpoint:1000,
        settings: {
          item:2,
          slideMove:1,
          slideMargin:6,
        }
      },
      {
        breakpoint:610,
        settings: {
            item:1,
            slideMove:1
          }
      }
    ]
  });
  if($("#content-slider2").length)
  $("#content-slider2").lightSlider({
    loop:false,
    auto:false,
    pause:4000,
    keyPress:true,
    pager:false,
    responsive : [
      {
        breakpoint:1000,
        settings: {
        item:2,
        slideMove:1,
        slideMargin:6,
        }
      },
      {
        breakpoint:480,
        settings: {
          item:1,
          slideMove:1
        }
      }
    ]
  });



$(window).load(function(){
  $('#preloader').fadeOut('slow',function(){$(this).remove();});
   sidewrapper = new Slideout({
    'panel': document.getElementById('content'),
    'menu': document.getElementById('sidebar-wrapper'),
    'padding': 256,
    'tolerance': 70,
    'side': 'left'
  });
  sidewrapper.on('beforeopen', function() {
    this.panel.classList.add('content-open');
  })
  .on('open', function() {
    this.panel.addEventListener('click', closeSidewrapper);
  })
  .on('beforeclose', function() {
    this.panel.classList.remove('content-open');
    // this.menu.classList
    $("html").removeClass("slideout-open");
    this.panel.removeEventListener('click', closeSidewrapper);
  });
  sidewrapper.disableTouch();

});

});


// Futuro sidebar
$("#menu-close").click(function(e) {
    e.preventDefault();
    closeSidewrapper();
});

// Futuro sidebar
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    sidewrapper.toggle();

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
var lastScroll=0;
$(".body-holder").scroll(function(event){
  var scroll = $(event.target).scrollTop();
  if($("*[assist-bar-trigger]").length>=1){
    var elementPos =$("*[assist-bar-trigger]").offset().top;
    var assistBar= $("div[name*=assistBar]");
    var footerAssistBar=$(".footer-assist-bar[active]");
    if(elementPos<0){
      if(assistBar.hasClass("hidden")){
        assistBar.removeClass("hidden");
        if(footerAssistBar){
          footerAssistBar.removeClass("hidden");
        }
      }
    }
    else{
      if(!assistBar.hasClass("hidden")){
        assistBar.addClass("hidden");
        if(footerAssistBar){
          footerAssistBar.addClass("hidden");
        }
      }
    }


  }

  if ((scroll >= 10) && lastScroll<scroll){
    isCategoriesMenuOnTop=false;
    if(isCategoriesShowing){
      toggleCategoriesNav();
    }
  }
  else if(scroll==0 || scroll<lastScroll ){
    if(!isCategoriesShowing){
      toggleCategoriesNav();
    }
    if(scroll==0){
      isCategoriesMenuOnTop=true;
    }

  }

  lastScroll=scroll;
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
  var matrix = target.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
  var x = matrix[12] || matrix[4];
  var y = matrix[13] || matrix[5];
  x = (x===undefined? 0:x);
  var navContainerWidth =  $(".container.nav-items-mobile").width();
  var navMaxTranslate = ($(".container .nav-items-mobile").width() - navContainerWidth ) * (-1);
  if(button=="right"){
    var dx = x-72;
    dx = (dx<navMaxTranslate? navMaxTranslate:dx);
    $.Velocity.hook(target, 'translateX', + dx + 'px');
  }else{
    var dx=(parseInt(x) + parseInt(x===0? 0:72));
    dx = (dx>=0? 0:dx);
    $.Velocity.hook(target, 'translateX',  + dx + 'px');
  }
});

//search
$(".search-input").on("keyup",function(event){
  var term = $(this).val();
  var length = $(this).val().length;
  var searchResultsHolder=$(".search-results-holder");
  var searchResults=$(".search-results");
  var closeSearch=$(".close-search");
  var searchTerm=$(".search-term");
  var resultsNotFound=$(".results-not-found");
  var results=0;
  searchTerm.text('"'+term+'"');
  if(length>0){
    searchResultsHolder.removeClass("hidden");
  }
  else{
    if(!searchResultsHolder.hasClass("hidden"))
      searchResultsHolder.addClass("hidden");
  }
  if(length>=2){
    searchResultsHolder.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
      if($(".search-input").val().length>=2){
        searchResults.removeClass("empty");
      }

    });
    closeSearch.addClass("inverted");
    if(term.toLowerCase()=="mouse"){
      if(!resultsNotFound.hasClass("hidden"))
        resultsNotFound.addClass("hidden");
    }
    else{
      resultsNotFound.removeClass("hidden");
    }
  }
  else{
    if(!searchResults.hasClass("empty")){
      closeSearch.removeClass("inverted");
      searchResults.addClass("empty");
    }
  }
});
$(".search-input-mobile-input").on("keyup",function(event){
  var term = $(this).val();
  var length = $(this).val().length;
  var searchResultsHolder=$(".search-results-holder");
  var searchResults=$(".search-results");
  var closeSearch=$(".close-search");
  var searchTerm=$(".search-term");
  var resultsNotFound=$(".results-not-found");
  var results=0;
  searchTerm.text('"'+term+'"');
  if(length>0){
    searchResultsHolder.removeClass("hidden");
  }
  else{
    if(!searchResultsHolder.hasClass("hidden"))
      searchResultsHolder.addClass("hidden");
  }
  if(length>=2){
    searchResults.removeClass("empty");
    closeSearch.addClass("inverted");
    if(term.toLowerCase()=="mouse"){
      if(!resultsNotFound.hasClass("hidden"))
        resultsNotFound.addClass("hidden");
    }
    else{
      resultsNotFound.removeClass("hidden");
    }
  }
  else{
    if(!searchResults.hasClass("empty")){
      closeSearch.removeClass("inverted");
      searchResults.addClass("empty");
    }
  }
});
$(".close-search").on("click",function(event){
  var searchResultsHolder=$(".search-results-holder");
  var searchResults=$(".search-results");
  $(this).removeClass("inverted");
  searchResults.addClass("empty");
  searchResultsHolder.addClass("hidden");

});
$(".search-holder-mobile").on("click",function(){
  var searchResultsHolder=$(".search-results-holder");
  if(searchResultsHolder.hasClass("hidden"))
    searchResultsHolder.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
      $(".search-input-mobile").find(".search-input-mobile-input").focus();
    });
  searchResultsHolder.toggleClass("hidden");
});

//NAV ITEM
$("*[data-link]").on("click",function(event){
  var link = $(event.delegateTarget).attr("data-link");
  if(link){
   window.location=link;
  }
});
