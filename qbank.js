/* meta data
---=========================
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
                 console.log(arguments);
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

  function printAnswers(answers) {
    $.each(answers, function(index, value) {
      $('input.form-check-input[type="checkbox"][value="' + value + '"]').prop('checked', true);
    });
  }

  function validateQuestion(question){
      if(question.answers == null || question.answers.length == 0){
        question.status = "SKIPPED"
      }else{
        const correctOptions = question.correctOptions.slice().sort();
        const answers = question.answers.slice().sort();
        const allMatch = correctOptions.every((value, index) => {
          return value === answers[index];
        });
        if(allMatch)question.status = "CORRECT"
        else question.status = "WRONG"
      }
  }
  function validateAllQuestions(questions){
    $.each(questions, function(index,question){
      validateQuestion(question);
    });

    score = 0;
    failedQuestions=[]
    $.each(questions, function(index,question){
      if(question.status == 'CORRECT')score++;
      else failedQuestions.push(question);
    });
    console.log("failed Questions = ",failedQuestions);
    console.log("stats = ",score,"/", questions.length, " percentile = ", (score*100/questions.length));
  }

let QUESTION_BLOCK = ''                           +
   '<div class="question ml-sm-5 pl-sm-5 pt-2">' +
   '   <div class="py-2 h5">'+
   '      <b>!@#$%___QUESTION_DATA___%$#@!</b>' +
   '   </div>'+
   '   !@#$%___OPTION_BLOCK___%$#@! '+
   '</div>';

let OPTION_BLOCK = ''+
   '<div class="form-check">' +
   '   <input class="form-check-input" type="checkbox" value="" id="option" />' +
   '   <label class="form-check-label" for="flexCheckChecked">' +
   '      !@#$%___OPTION_DATA___%$#@!' +
   '   </label>'+
   '</div>';

  const getAnswers = (htmlElementClassname) => {
    var array = [];
    $(htmlElementClassname).each(function(){
      array.push($(this).val());
    });
    return array;
  }

function getExam(){
   return {
      index: 0,
      getQuestionHtml: function(){
           var displayOptionsHtml = '';
           this.questions[this.index].displayOptions.forEach(function(item,index){
              displayOptionsHtml = displayOptionsHtml + OPTION_BLOCK.
                 replace('!@#$%___OPTION_DATA___%$#@!',item).
                 replace('value=""','value="'+item+'" ');
           });
           return QUESTION_BLOCK.
              replace('!@#$%___QUESTION_DATA___%$#@!',this.questions[this.index].question).
              replace('!@#$%___OPTION_BLOCK___%$#@!' ,displayOptionsHtml);
         },
      prevQ: function(divId ){
           if(this.index > 0){
             this.index--;
             $(divId ).empty();
             $(divId ).append(this.getQuestionHtml());
             printAnswers(this.questions[this.index].answers);
           }
         },
      nextQ: function(divId ){
           var answers=getAnswers('.form-check-input:checkbox:checked');
           this.questions[this.index].answers = answers;
           if( this.index < this.questions.length-1){
             this.index++;
             $(divId ).empty();
             $(divId ).append(this.getQuestionHtml());
             printAnswers(this.questions[this.index].answers);
          }
         },
      logStatus:function(){
           console.log('----------------------')
           console.log('exam.index = ', this.index);
           console.log('questoin = ', this.questions[exam.index]);
         }
   };
}

