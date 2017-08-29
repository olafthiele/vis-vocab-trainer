import { Common } from './common.js';

FlowRouter.route( '/classic', { // was /
  name: 'home',
  action() {
    BlazeLayout.render( 'HomeLayout' );
  }
} );

FlowRouter.route( '/', { // was /colors
  name: 'colors',
  action() {
    BlazeLayout.render( 'ColorsLayout' );
  }
} );

FlowRouter.route( '/en', { // start in english
  name: 'english',
  action() {
    Common.switchLanguage();
    BlazeLayout.render( 'ColorsLayout' );
  }
} );

FlowRouter.route( '/word/', {
  name: 'word',
  action: function( params, queryParams ) {
    BlazeLayout.render( 'ColorWordLayout' );
  }
} );

FlowRouter.route( '/test', {
  name: 'TestPage',
  action: function( params, queryParams ) {
    BlazeLayout.render( 'TestLayout' );
  }
} );

FlowRouter.route( '/settings', {
  name: 'SettingsPage',
  action: function( params, queryParams ) {
    BlazeLayout.render( 'SettingsLayout' );
  }
} );

FlowRouter.route( '/help', {
  name: 'HelpPage',
  action: function( params, queryParams ) {
    BlazeLayout.render( 'HelpLayout' );
  }
} );

FlowRouter.route( '/mgmt', {
  name: 'ManagementPage',
  action: function( params, queryParams ) {
    BlazeLayout.render( 'ManagementLayout' );
  }
} );

// FlowRouter.route( '/single/', {
//   name: 'SinglePage',
//   action: function( params, queryParams ) {
//     BlazeLayout.render( 'SingleLayout' );
//     // console.log( "Params:", params );
//     // console.log( "Query Params:", queryParams );
//   }
// } );
