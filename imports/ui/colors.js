import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';

import './colors.html';

Template.ColorsLayout.onCreated( function() {
  this.showRotate = new ReactiveVar( false );
  if ( window.innerWidth < window.innerHeight ) {
    // hint on using portrait mode
    this.showRotate.set( true );
  }
} );

Template.ColorsLayout.helpers( {
  words() {
    return Repo.getAll();
  },
  rotate() {
    console.log( "Rotate ist: " + Template.instance().showRotate.get() );
    return Template.instance().showRotate.get() ? 'visible' : 'hidden';
  },
} );

Template.ColorsLayout.events( {
  'click .help' () {
    FlowRouter.go( '/help' );
  },

} );

Template.RenderColorLayout.helpers( {
  pageCode() {
    return encodeURIComponent( this.original );
  },

  color() {
    return Session.get( 'colors' )[ this.type ];
  },

} );
