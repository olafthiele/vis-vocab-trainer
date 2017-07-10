import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Repo } from '../data/getWord.js';

import './colors.html';

Template.ColorsLayout.helpers( {
  words() {
    return Repo.getAll();
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
