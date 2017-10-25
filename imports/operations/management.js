import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';
import { Common } from '../lib/common.js';

import './management.html';

Template.ManagementLayout.onCreated( function() {
  this.content = new ReactiveVar( '...' );
} );

Template.ManagementLayout.events( {
  'submit form': function( event ) {
    event.preventDefault();
    var word = event.target.searchWord.value;
    console.log( "Opening word : " + word );
    window.open( "http://ordbog.gyldendal.dk.bib101.bibbaser.dk/#/pages/result/daen/" + word + "/expert", "english" );
    window.open( "http://ordbog.gyldendal.dk.bib101.bibbaser.dk/#/pages/result/dade/" + word + "/expert", "german" );
  }

} );
Template.ManagementLayout.helpers( {
  content: function() {
    return Template.instance().content.get();
  },
  vokabUrl: function() {
    return Meteor.settings.public.vokabUrl;
  },

} );
