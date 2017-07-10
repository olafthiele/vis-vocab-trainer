import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';
import { Common } from '../lib/common.js';

import './test.html';

Template.TestLayout.onCreated( function() {
  this.content = new ReactiveVar( '...' );
} );

Template.TestLayout.events( {
  'click .check' ( event, template ) {
    console.log( 'Starting check' );
    template.content.set( Repo.checkAllWords() );
  },

  'click .changeLang' ( event, template ) {
    console.log( 'Switch language' );
    Common.switchLanguage();
  },

  'click .change20' ( event, template ) {
    console.log( 'Change to 20' );
    Session.set( 'numberOfVocabs', 20 );
  },

  'click .change50' ( event, template ) {
    console.log( 'Change to 50' );
    Session.set( 'numberOfVocabs', 50 );
  },

  'click .changeColors' ( event, template ) {
    console.log( 'Changing to other color' );
    Common.switchColor();
    // $( "head" ).append( '<style>.type1 { background-color: purple !important }</style>' );
  },

} );

Template.TestLayout.helpers( {
  content: function() {
    return Template.instance().content.get();
  },

  newLang: function() {
    var lang = Session.get( 'language' ) === 'de' ? 'English' : 'German';
    return lang;
  },
} );
