import { Template } from 'meteor/templating';
import './word.html';

Template.RenderWordLayout.helpers( {
  pageCode() {
    return encodeURIComponent( this.original );
  },
} );
