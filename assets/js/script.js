
var businessHours = 20;
$( document ).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  var saveButtonEle = $('.saveBtn');
  // handle displaying the time
  var timeDisplayEl = $('#currentDay')
  const hours = $('#hours');

  function displayTime() {
    var dateToday = dayjs().format('dddd, MM/DD/YYYY');
    timeDisplayEl.text(dateToday);
    timeTenseClass();

  }


  //populate standard business hours.
  //assume standard business hours are 7AM - 6PM local time - AMERICA!!


    //if current hour, append present. if past, append past. if future, append future
    //if the id is earlier in the day, past
    //if id is the current hour, present
    //else future

    function timeTenseClass() {
    const currentHour = dayjs();
    for (let i=0; i < businessHours; i++) {
    const rowId = `#hour-${i}`;
    const hour = dayjs().hour(7).add(i, 'hour');
    if (hour.isBefore(currentHour, 'hour')) {
      $(rowId).removeClass('future present').addClass('past');
    } else if (hour.isSame(currentHour, 'hour')) {
      $(rowId).removeClass('past future').addClass('present');
    } else {
      $(rowId).removeClass('past present').addClass('future');
    }
  }
}
    //const rowId = `#hour-${time}`;
    //$(rowId).addClass(classToAdd);

  setInterval(displayTime, 1000);


  for (let i = 0; i < businessHours; i++) {
    //convert from military time - hh a

    //var startOfDay = dayjs().startOf('day').hour(7);
    //var printedTime = startOfDay.add(i, 'hour').format("hA");
    //var tense = timeTenseClass(printedTime);
    //console.log(printedTime);
    var rowTemplate = `
    <div id="hour-${i}" class="row time-block">
      <div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(7).add(i, 'hour').format('hA')}</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`;

    var hourEle = $($.parseHTML(rowTemplate));
    hourEle.appendTo(hours);





    //timeWhen(printedTime);




  }

  //timeTenseClass();


  saveButtonEle.on('click', function() {
    var hourText = $(this).siblings('.hour').text();
    var descriptionText = $(this).siblings('.description').val();
    console.log('save button clicked');
    //save userInput to localstorage
    localStorage.setItem(hourText, descriptionText);


    console.log(hourText, descriptionText);

  });



  //HINT: What does `this` reference in the click listener
  // function?

  //How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  //colorize!

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


});
