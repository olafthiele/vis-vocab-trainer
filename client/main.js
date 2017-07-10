import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Repo } from '../imports/data/getWord.js';
import { Common } from '../imports/lib/common.js';
import '../imports/lib/routes.js';
import '../imports/ui/single.js';
import '../imports/ui/word.js';
import '../imports/ui/colors.js';
import '../imports/ui/test.js';
import '../imports/ui/settings.js';
import '../imports/ui/colorword.js';

import './main.html';

// TODO: - bessere Darstellung von Ergebnis !!!
//  -Tinder paging

if ( Meteor.isClient ) {
  Session.set( 'language', 'de' ); // <---
  Session.set( 'isdebug', true );
  Session.set( 'numberOfVocabs', 20 );
  Session.set( 'currentWordList', Repo.getSomeWords( Session.get( 'numberOfVocabs' ) ) );
  // console.log( 'word list: ' + Session.get( 'currentWordList' ).toSource() );
  // console.log( 'Language set to: ' + Session.get( 'language' ) );
  // set colors so they can be used from session
  Common.setColors( 0 );
}

Template.HomeLayout.helpers( {
  aword() {
    return Repo.getAll();
    // var tester = [ { original: 'test_olaf_1', translation: 'test_olaf_2' }, { original: 'test_olaf_3', translation: 'test_olaf_4' } ];
  },
} );

// Template.hello.onCreated( function helloOnCreated() {
//   // counter starts at 0 test
//   this.counter = new ReactiveVar( 0 );
// } );

// Template.hello.helpers( {
//   counter() {
//     return Template.instance().counter.get();
//   },
//   test33() {
//     test = Repo.getNewWord();
//     console.log( 'Original: ' + test.toSource() );
//     console.log( 'Original: ' + test.original );
//     // try {
//     //   test2 = JSON.parse( test );
//     //   console.log( 'Original: ' + test2.original );
//     // } catch ( e ) {
//     //   alert( e ); //error in the above string(in this case,yes)!
//     // }
//     return test.original;
//   },
// } );

// Template.hello.events( {
//   'click button' ( event, instance ) {
//     // increment the counter when button is clicked
//     instance.counter.set( instance.counter.get() + 1 );
//   },
// } );
