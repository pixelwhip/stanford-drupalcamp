var Deck = (function (reveal, snap) {
  var deck = {},
      s = {};

  //
  // Layout: Anatomy of a Drupal Page
  //

  // Runs on page load.
  deck.layoutInit = function() {
    s.layout = snap('#layout-node-page');
    snap.load("img/layout-node-page.svg", function (f) {
      s.layout.append(f);
      s.layout.selectAll("#views, #header, #blocks, #node").attr({"opacity" : 0.3});
    });
  };

  // Runs on slide load.
  deck.layoutLoad = function() {
    //console.log(s.layout);
  };

  deck.layoutShowNodes = function() {
    s.layout.select("#node").animate({"opacity" : 1}, 300);
    deck.layoutHideViews();
    deck.layoutHideBlocks();
  };

  deck.layoutHideNodes = function() {
    s.layout.select("#node").animate({"opacity" : 0.5}, 600);
  };

  deck.layoutShowBlocks = function() {
    s.layout.select("#blocks").animate({"opacity" : 1}, 300);
  };

  deck.layoutHideBlocks = function() {
    s.layout.select("#blocks").animate({"opacity" : 0.5}, 600);
  };

  deck.layoutShowViews = function() {
    s.layout.select("#views").animate({"opacity" : 1}, 300);
    deck.layoutHideBlocks();
  };

  deck.layoutHideViews = function() {
    s.layout.select("#views").animate({"opacity" : 0.5}, 600);
    deck.layoutShowBlocks();
  };

  deck.bindUI = function() {
    reveal.addEventListener( 'ready', function( event ) {
      (deck[event.currentSlide.dataset.slideOnChange] || Function)();
    } );

    reveal.addEventListener( 'slidechanged', function( event ) {
      (deck[event.currentSlide.dataset.slideOnChange] || Function)();
    } );

    reveal.addEventListener( 'fragmentshown', function( event ) {
      (deck[event.fragment.dataset.fragmentOnShow] || Function)();
    } );

    reveal.addEventListener( 'fragmenthidden', function( event ) {
      console.log('hiding');
      console.log(event.fragment);
      (deck[event.fragment.dataset.fragmentOnHide] || Function)();
    } );
  };

  deck.init = function() {
    deck.layoutInit();
    deck.bindUI();
  };

  return deck.init();

}(Reveal, Snap));
