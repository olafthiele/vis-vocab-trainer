import './all_vocabs.js';

class VocabularyRepository {

  getLang() {
    return Session.get( 'language' );
  }

  isDebug() {
    return Session.get( 'isdebug' ) === true ? true : false;
  }

  debug( msg ) {
    if ( this.isDebug ) {
      console.log( msg );
    }
  }

  sleep( ms ) {
    return new Promise( resolve => setTimeout( resolve, ms ) );
  }

  getTestWord() {
    return { original: 'test_olaf_1', translation: 'test_olaf_2' };
  }

  getTestWordArray() {
    var wordarray = [];
    var cword = this.getTestWord();
    wordarray.push( cword );
    return wordarray;
  }

  getNewWord() {
    console.log( 'get new word' );
    var randomWord = all_vocabulary[ Math.floor( ( Math.random() * all_vocabulary.length ) ) ];
    return this.getSimpleWord( randomWord );
  }

  getWholeWordList( level ) {
    var allWords = [];
    for ( let w of all_vocabulary ) {
      // skip this word if not in level
      if ( level && ( w.level != level ) ) {
        this.debug( 'skipping word having wrong level: ' + w.danish );
        continue;
      }
      allWords.push( this.getSimpleWord( w ) );
    }
    return allWords;
  }

  /* Singleton to access selected words for this round */
  getAll() {
    var words = Session.get( 'currentWordList' );
    if ( typeof( words ) === 'undefined' ) {
      words = [];
      for ( let w of this.getWholeWordList() ) {
        words.push( this.getSimpleWord( w ) );
      }
    }
    return words;
  }

  getSomeWords( number, level ) {
    var someWords = [];
    var all = this.getWholeWordList( level );
    if ( number > all.length ) {
      console.log( 'not enough vocabs left in repo, therefore showing less' );
      number = all.length;
    }
    var randoms = this.getRandomValues( number, all.length );
    for ( i = 0; i < number; i++ ) {
      if ( this.isDebug() ) {
        console.log( 'word nr would be random if real ' + i + ' - ' + randoms[ i ] );
        // if debug push always the same words, so single pages can be developed
        someWords.push( all[ i ] );
      } else {
        someWords.push( all[ randoms[ i ] ] );
      }
    }
    return someWords;
  }

  getRandomValues( numberValues, upperLimit ) {
    var arr = [];
    while ( arr.length < numberValues ) {
      var randomnumber = Math.floor( Math.random() * upperLimit );
      if ( arr.indexOf( randomnumber ) > -1 ) continue;
      arr[ arr.length ] = randomnumber;
    }
    return arr;
  }

  getSingleWord( search ) {
    var all = this.getAll();
    // console.log( 'length: ' + JSON.stringify( all ) );
    for ( let w of all ) {
      // console.log( 'comparing: ' + w.original + ' and ' + search );
      if ( w.original == search ) {
        return w;
      }
    }
    return undefined;
  }

  getPreviousWord( current ) {
    var all = this.getAll();
    var prev;
    for ( let w of all ) {
      if ( w.original == current ) {
        if ( prev === undefined ) {
          // first member is hit, wait til last one
        } else {
          return prev;
        }
      }
      prev = w;
    }
    // if none fits, take last
    return prev;
  }

  getNextWord( current ) {
    var all = this.getAll();
    var found = false;
    for ( let w of all ) {
      if ( found === true ) {
        return w;
      }
      if ( w.original == current ) {
        found = true;
      }
    }
    // if none fits, take first
    return all[ 0 ];
  }

  getSimpleWord( w ) {
    // transforms json into a vocab item
    orig = this.getLang() == 'de' ? w.german : w.english;
    trans = w.danish;
    type = 0;
    extra = '';
    if ( w.noun ) {
      type = 1;
      trans = ( w.noun == 'n' ) ? 'en ' + trans : 'et ' + trans;
    }
    if ( w.adjective ) {
      type = 2;
      extra = w.adjective;
    }
    if ( w.verb ) {
      type = 3;
      trans = 'at ' + trans;
      extra = w.verb;
    }
    if ( w.other ) {
      type = 4;
    }
    return { 'original': orig, 'translation': trans, 'type': 'type' + type, 'extra': extra };
  }

  // checking all words for inconsistencies
  checkAllWords() {
    var erronousWords = [];
    var foundError = '';
    for ( let w of all_vocabulary ) {
      foundError = '';
      if ( w.danish === '' ) foundError += ' * No Danish translation * ';
      if ( w.german === '' ) foundError += ' * No German translation * ';
      if ( w.english === '' ) foundError += ' * No English translation * ';
      if ( this.getSimpleWord( w ).type === 'type0' ) foundError += ' * No type given * ';
      if ( foundError !== '' ) {
        erronousWords.push( 'Word: ' + w.danish + ' * ' + foundError );
      }
    }
    return erronousWords;
  }

}

export const Repo = new VocabularyRepository();
