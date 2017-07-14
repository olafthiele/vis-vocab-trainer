import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';
import { Common } from '../lib/common.js';

import './settings.html';

function showMsg( msg, template ) {
  template.contentStyle.set( 'white' );
  template.content.set( msg );
}

Template.SettingsLayout.onCreated( function() {
  this.content = new ReactiveVar( '...' );
  this.contentStyle = new ReactiveVar( 'grey' );
} );

Template.SettingsLayout.events( {

  'click .changeLang' ( event, template ) {
    Common.switchLanguage();
    showMsg( Common.getIntWord( 'switchedLang' ), template );
  },

  'click .change20' ( event, template ) {
    Common.setWordNumber( 20 );
    showMsg( Common.getIntWord( 'switchedWords' ) + ' 20', template );
  },

  'click .change30' ( event, template ) {
    Common.setWordNumber( 30 );
    showMsg( Common.getIntWord( 'switchedWords' ) + ' 30', template );
  },

  'click .changeColors' ( event, template ) {
    // console.log( 'Changing to other color' );
    Common.switchColor();
    showMsg( Common.getIntWord( 'switchedColors' ), template );
    // $( "head" ).append( '<style>.type1 { background-color: purple !important }</style>' );
  },

  'click .changeLevel' ( event, template ) {
    console.log( 'Changing level' );
    // TODO switch level
    showMsg( Common.getIntWord( 'switchedLevel' ), template );
  },

} );

Template.SettingsLayout.helpers( {
  content: function() {
    return Template.instance().content.get();
  },

  contentStyle: function() {
    return Template.instance().contentStyle.get();
  },

  newLang: function() {
    var lang = Session.get( 'language' ) === 'de' ? 'English' : 'German';
    return lang;
  },

  getColor: function( color ) {
    // console.log( 'color gesucht: ' + color );
    return Session.get( 'colors' )[ color ];
  },

  getIntWord: function( key ) {
    // console.log( 'key gesucht: ' + key );
    return Common.getIntWord( key );
  },

} );
