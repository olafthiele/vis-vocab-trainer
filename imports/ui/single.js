import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';

import './single.html';

Template.SingleLayout.onCreated( function() {
  Session.set( 'gt', Repo.getSingleWord( FlowRouter.getQueryParam( 'goto' ) ) );
} );

Template.SingleLayout.events( {
  'click .prev' () {
    console.log( 'clicked !!!!!!!!!!!!!!!!!' + Session.get( 'prev' ) );
    var search = decodeURIComponent( Session.get( 'prev' ) );
    Session.set( 'gt', Repo.getSingleWord( search ) );
  },
  'click .next' () {
    console.log( 'clicked next !!!!!!!!!!!!!!!!!' + Session.get( 'next' ) );
    var search = decodeURIComponent( Session.get( 'next' ) );
    Session.set( 'gt', Repo.getSingleWord( search ) );
  },
} );

Template.SingleLayout.helpers( {
  original() {
    return Session.get( 'gt' ).original;
  },
  translation() {
    // var gt = FlowRouter.getQueryParam( 'goto' );
    // console.log( 'test' + Repo.getSingleWord( FlowRouter.getQueryParam( 'goto' ) ).translation );
    // var gt = 'ddd';
    var trans = Session.get( 'gt' ).translation;
    return trans;
  },
  type() {
    // return encodeURIComponent( this.original );
    var typ = Session.get( 'gt' ).type;
    return typ;
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

} );
