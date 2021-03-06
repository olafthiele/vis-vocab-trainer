import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// common libs and repos
import { Repo } from '../imports/data/getWord.js';
import { Common } from '../imports/lib/common.js';
import '../imports/lib/routes.js';

// main user components
// import '../imports/ui/word.js';
import '../imports/ui/colors.js';
import '../imports/ui/settings.js';
import '../imports/ui/colorword.js';
import '../imports/ui/help.js';

// management components - non-production
import '../imports/operations/management.js';
import '../imports/operations/test.js';

import './main.html';

if ( Meteor.isClient ) {
  Session.set( 'language', 'de' );
  if ( Meteor.settings.public.debug ) {
    Session.set( 'isdebug', true );
  } else {
    Session.set( 'isdebug', false );
  }
  Session.set( 'numberOfVocabs', 20 );
  Session.set( 'level', 2 );
  Session.set( 'currentWordList', Repo.getSomeWords( Session.get( 'numberOfVocabs' ), Session.get( 'level' ) ) );

  // Set whether users have to view translation before moving on
  Session.set( 'mustViewTranslation', false );

  // console.log( 'word list: ' + Session.get( 'currentWordList' ).toSource() );
  // console.log( 'Language set to: ' + Session.get( 'language' ) );
  // set colors so they can be used from session
  Common.setColors( 1 );
  // console.log( 'test' + Meteor.settings.public.debug );
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
