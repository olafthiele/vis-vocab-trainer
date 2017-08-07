import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';
import { Common } from '../lib/common.js';

import './colorword.html';

Template.ColorWordLayout.onCreated( function() {
  Session.set( 'gt', Repo.getSingleWord( FlowRouter.getQueryParam( 'goto' ) ) );
} );

Template.ColorWordLayout.onRendered( function() {
  Session.set( 'showOrig', true );
  Session.set( 'transIsRead', false );
  // Repo.sleep( 2000 );
  // window.scrollTo( 0, document.body.scrollHeight );

  // initialize vars to null
  Session.set( 'colorWordX', null );
  Session.set( 'colorWordY', null );
} );

Template.ColorWordLayout.events( {
  'click .prev' () {
    var search = decodeURIComponent( Session.get( 'prev' ) );
    if ( Common.shouldWeShowTranslationFirst() ) {
      return;
    }
    Session.set( 'gt', Repo.getSingleWord( search ) );
    window.scrollTo( 0, 0 );
  },

  'click .next' () {
    var search = decodeURIComponent( Session.get( 'next' ) );
    if ( Common.shouldWeShowTranslationFirst() ) {
      return;
    }
    Session.set( 'gt', Repo.getSingleWord( search ) );
    window.scrollTo( 0, 0 );
  },

  'click .content' () {
    var show = Session.get( 'showOrig' );
    Session.set( 'showOrig', !show );
    Session.set( 'transIsRead', true );
  },

  'touchstart' ( event ) {
    var x = event.originalEvent.touches[ 0 ].clientX;
    Session.set( 'colorWordX', x );
    var y = event.originalEvent.touches[ 0 ].clientY;
    Session.set( 'colorWordY', y );
  },

  'touchmove' ( event ) {
    var xDown = Session.get( 'colorWordX' );
    var yDown = Session.get( 'colorWordY' );

    if ( !xDown || !yDown ) {
      return;
    }

    var xUp = event.originalEvent.touches[ 0 ].clientX;
    var yUp = event.originalEvent.touches[ 0 ].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
      if ( xDiff > 0 ) {
        /* left swipe next*/
        search = decodeURIComponent( Session.get( 'next' ) );
        if ( Common.shouldWeShowTranslationFirst() ) {
          return;
        }
        Session.set( 'gt', Repo.getSingleWord( search ) );
        window.scrollTo( 0, 0 );
      } else {
        /* right swipe prev*/
        search = decodeURIComponent( Session.get( 'prev' ) );
        if ( Common.shouldWeShowTranslationFirst() ) {
          return;
        }
        Session.set( 'gt', Repo.getSingleWord( search ) );
        window.scrollTo( 0, 0 );
      }
    } else {
      if ( yDiff > 0 ) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    Session.set( 'colorWordX', null );
    Session.set( 'colorWordY', null );
  },

  test() {
    alert( 'test' );
  },

} );

Template.ColorWordLayout.helpers( {
  original() {
    return Session.get( 'gt' ).original;
  },

  translation() {
    var trans = Session.get( 'gt' ).translation;
    return trans;
  },

  encTranslation() {
    var trans = Session.get( 'gt' ).translation;
    return encodeURIComponent( trans );
  },

  color() {
    // var colors = Session.get( 'colors' );
    // var typp = Session.get( 'gt' ).type;
    // console.log( "getting color " + Session.get( 'gt' ).type + " with value " + colors[ typp ] );
    return Session.get( 'colors' )[ Session.get( 'gt' ).type ];
  },

  extra() {
    var extra = Session.get( 'gt' ).extra;
    return extra;
  },

  previous() {
    var prev = Repo.getPreviousWord( Session.get( 'gt' ).original ).original;
    Session.set( 'prev', encodeURIComponent( prev ) );
    return prev;
  },

  next() {
    var next = Repo.getNextWord( Session.get( 'gt' ).original ).original;
    Session.set( 'next', encodeURIComponent( next ) );
    return next;
  },

  showOriginal() {
    return Session.get( 'showOrig' );
  },

  words() {
    return Repo.getAll();
  },

} );

Template.RenderColorRowLayout.helpers( {

  color() {
    if ( Session.get( 'gt' ).original == this.original ) {
      // changed from [ 'special' ]
      return Session.get( 'colors' ).special;
    }
    return Session.get( 'colors' )[ this.type ];
  },

} );
