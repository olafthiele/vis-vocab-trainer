import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';
import { Common } from '../lib/common.js';

import './settings.html';

Template.SettingsLayout.onCreated( function() {
  this.content = new ReactiveVar( '...' );
} );

Template.SettingsLayout.events( {

  'click .changeLang' ( event, template ) {
    Common.switchLanguage();
    template.content.set( 'Switched language' );
  },

  'click .change20' ( event, template ) {
    Session.set( 'numberOfVocabs', 20 );
    Session.set( 'currentWordList', Repo.getSomeWords( Session.get( 'numberOfVocabs' ) ) );
    template.content.set( 'Changed to 20 words' );
  },

  'click .change50' ( event, template ) {
    Session.set( 'numberOfVocabs', 50 );
    Session.set( 'currentWordList', Repo.getSomeWords( Session.get( 'numberOfVocabs' ) ) );
    template.content.set( 'Changed to 50 words' );
  },

  'click .changeColors' ( event, template ) {
    console.log( 'Changing to other color' );
    Common.switchColor();
    template.content.set( 'Switched colors' );
    // $( "head" ).append( '<style>.type1 { background-color: purple !important }</style>' );
  },

} );

Template.SettingsLayout.helpers( {
  content: function() {
    return Template.instance().content.get();
  },

  newLang: function() {
    var lang = Session.get( 'language' ) === 'de' ? 'English' : 'German';
    return lang;
  },

  getColor: function( color ) {
    console.log( 'color gesucht: ' + color );
    return Session.get( 'colors' )[ color ];
  },
} );
