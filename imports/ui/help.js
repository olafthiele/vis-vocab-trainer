import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';
import { Common } from '../lib/common.js';

import './help.html';

Template.HelpLayout.helpers( {
  content: function() {
    return Template.instance().content.get();
  },

  getColor: function( color ) {
    return Session.get( 'colors' )[ color ];
  },

  getIntWord: function( key ) {
    return Common.getIntWord( key );
  },

} );
