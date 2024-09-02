  var LOG_LEVEL = "info";

  function debug(str, obj){
    if(LOG_LEVEL = "info")
      console.log( str, obj );
  }

  const shuffle = ( array ) => {
//    console.log("array.length = ", array.length);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
//      console.log(i,j," = ",j, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  const prepareOptions = ( array ) => {
    array.forEach(function(item, index){
      item.displayOptions = shuffle(item.options.concat(item.correctOptions));
//      console.log("item = ",item);
    });
  }
  var shuffledArray = shuffle(temp);
  debug(" log  === > ", shuffledArray);

  prepareOptions(shuffledArray);
  debug(" log  === > ", shuffledArray);
