import '../data/all_colors.js';
import '../data/all_i18ns.js';
import { Repo } from '../data/getWord.js';

class CommonFunctions {

  switchLanguage() {
    // if German, switch to en, all else switch to en
    if ( Session.get( 'language' ) === 'en' ) {
      Session.set( 'language', 'de' );
    } else {
      Session.set( 'language', 'en' );
    }
    Session.set( 'currentWordList', Repo.getSomeWords( Session.get( 'numberOfVocabs' ) ) );
  }

  setWordNumber( nr ) {
    Session.set( 'numberOfVocabs', nr );
    Session.set( 'currentWordList', Repo.getSomeWords( Session.get( 'numberOfVocabs' ) ) );
  }

  getIntWord( key ) {
    var lang = Session.get( 'language' );
    var local = i18ns[ key ][ lang ];
    if ( local === '' || local === undefined ) {
      return 'X-X-X';
    } else {
      return i18ns[ key ][ lang ];
    }
  }

  setColors( nr ) {
    var currentColor = all_colors[ nr ];
    var colorString = { 'name': currentColor.name, 'type1': currentColor.type1, 'type2': currentColor.type2, 'type3': currentColor.type3, 'type4': currentColor.type4, 'type5': currentColor.type5, 'special': currentColor.special };
    Session.set( 'colors', colorString );
  }

  switchColor() {
    if ( Session.get( 'colors' ).name === 'Giant Goldfish' ) {
      this.setColors( 0 );
    } else {
      this.setColors( 1 );
    }
  }

}

export const Common = new CommonFunctions();
