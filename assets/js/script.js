// Preloader //

var sidewrapper;
closeSidewrapper=function(){
  sidewrapper.close();
}
jQuery(document).ready(function($) {




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
  if($("div[assist-bar-trigger=true]").length>=1){
    var mydivpos =$("div[assist-bar-trigger=true]").offset().top;
    var assistBar= $("div[name*=assistBar]");
    if(scroll >= mydivpos+300){
      if(assistBar.hasClass("hidden")){
        assistBar.removeClass("hidden");
      }
    }
    else{
      if(!assistBar.hasClass("hidden")){
        assistBar.addClass("hidden");
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
    if(!isCategoriesMenuOnTop){
      toggleCategoriesNav();
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
  if(button=="right")
    target.scrollLeft(target.scrollLeft()+ 56);
  else
    target.scrollLeft(target.scrollLeft()- 56);
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
