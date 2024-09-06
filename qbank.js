/* meta data
{
-------------- given ------------
    no:                    1,
    question:              "what is demacron and cumon",
    options:               ["a option", "b option", "c option"],
    correctOptions:        ["d option", "e option", "f option"]
-------------- evaluated  ------------
    displayOptions:        []
    answers:               []
    status:                ""        ["unanswered","skipped","correct","wrong"]
}
*/


  log = {
    LOG_LEVEL: "info",
    info: function(){
            if(log.LOG_LEVEL == "info")
                 console.log(arguments.values());
//               arguments.forEach(function(item,index){
//                 console.log(item);
//               });
          }
  };


  const shuffle = ( array ) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  const shuffleOptions = ( array ) => {
    array.forEach(function(item, index){
      item.displayOptions = shuffle(item.options.concat(item.correctOptions));
    });
  }



