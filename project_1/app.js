//global variables
let randomGenreNumber = Math.floor(Math.random() * Math.floor(6))
let randomSongNumber = Math.floor(Math.random() * Math.floor(200))
let userInput = ''
let timeOfPlayList = 0;
let duration = 0;
let newDay = false;
//arrays of music genres for random searching to
// populate playlist, each one associated with a level of musical intensity

const level1 = ['chants', 'raga', 'oceansounds', 'harp', 'birdsongs']
const level2 = ['classical', 'ambientmusic', 'acoustic', 'folk', 'bluegrass']
const level3 = ['traditionaljazz', 'ragtime', 'swingmusic', 'smoothjazz', "bigBand"]
const level4 = ['blues', 'gospel', 'electricjazz', 'bebop', 'jazzfusion']
const level5 = ['randb', 'regeaton', 'regea', 'disco','ska' ]
const level6 = ['funk', 'classicrock', 'rock', 'folkrock', 'singerSongwriter']
const level7 = ['pop', 'poppunk', 'Dance-pop‎', 'house', '90spop']
const level8 = ['dancemusic', 'chillwave', 'electro', 'drumandbass', 'triphop']
const level9 = ['hiphop', 'eastcoasthiphop', 'westcoasthiphop', 'hardcore', 'trap']
const level10 = ['EDM', 'dubstep', 'heavymetal', 'metal', 'EDM']

$(() => {
//begin button,//begins carousel of divs of user input
$('#addEventButton').on('click',() => {
  $('#addEventButton').hide();
   $('.calendar').show();
})
//calendar info
$("#setDateButton").on('click',() => {
  $('#playlistInWaitingData').children().eq(0).text($('#day').val()).css('border-bottom','1px solid black')
  $(".calendar").hide();
  $('.nameEvent').show();
})
//namebutton
$('#setNameButton').on('click',() => {
  $('.nameEvent').hide();
  $(".whatTime").show()
  let $name = $('#nameEventInput').val();
  const $nameInfo = $('<h4>'+ $name + '</h4>')
  $nameInfo.appendTo($('#playlistInWaitingData'))
})
//time logic
  $('#setTimebutton').on('click', () => {
    $('.whatTime').hide();
    $('.slider').show();
    const startData = $('#startTime').val();
    const endData = $('#endTime').val();
    const timeInfo = $('<h4>'+startData+' till '+ endData+'</h4>')
 $('#playlistInWaitingData').append(timeInfo)


//converting data from about time input into miliseconds to compare to track length
    const startTime = $('#startTime').val().replace(':', '');
    const endTime = $('#endTime').val().replace(':', '');
    const startTimeArray = startTime.split('');
    const endTimeArray = endTime.split('');

    const startTimeInMins = () => {
    const hours1 = Number(startTimeArray[0] * 60);
    const hours2 = Number(startTimeArray[1] * 60);
    const minutesArray = startTimeArray.slice(2, 4);
    const minutesString = minutesArray.join('');
    const minutes = Number(minutesString);
    const startTimeInMiliseconds = (hours1 + hours2 + minutes) * 60000;
    return startTimeInMiliseconds;
    }
    const endTimeInMins = () => {
    const endHours1 = Number(endTimeArray[0] * 60);
    const endHours2 = Number(endTimeArray[1] * 60);
    const endMinutesArray = endTimeArray.slice(2, 4);
    const endMinutesString = endMinutesArray.join('');
    const endMinutes = Number(endMinutesString);
    const endTimeInMiliseconds = (endHours1 + endHours2 + endMinutes) * 60000;
    return endTimeInMiliseconds;
    }
    duration = endTimeInMins() - startTimeInMins()
    console.log(duration);

    // console.log(duration);
  })
  //slider logic // add blurb about intensity levels during mouseover
  $('#intensitySelector').on('mouseenter mouseleave', () => {

  })
  // changing userInput based on slider positon
  //
 const converUserInput = (num) => {
   let userInput = ''
   if (num === "1") {
     userInput = level1[randomGenreNumber]
     console.log(userInput);
   } else if (num === '2') {
     userInput = level2[randomGenreNumber]
   } else if (num === '3') {
     userInput = level3[randomGenreNumber]
   } else if (num === '4') {
     userInput = level4[randomGenreNumber]
   } else if (num === '5') {
     userInput = level5[randomGenreNumber]
   } else if (num === '6') {
     userInput = level6[randomGenreNumber]
   } else if (num === '7') {
     userInput = level7[randomGenreNumber]
   } else if (num === '8') {
     userInput = level8[randomGenreNumber]
   } else if (num === '9') {
     userInput = level9[randomGenreNumber]
   } else if (num === '10') {
     userInput = level10[randomGenreNumber]
   }
   return userInput
}

$('#setMusic').on('click', () => {
    $('.slider').hide();
    $('.donebuttons').show();
    $('#submitPlayList').hide();
    $('#addEventToDay').show().text('Click here to add this playlist and generate music based on your input.')
    //add level to playlist in waiting
    const $musicLevel = $('#intensitySelector').val()
    const $musicData = $('<h4>'+'Music Intensity Level: '+'</h4>'  + '<h4>'+ $musicLevel + '</h4>')
    $('#playlistInWaitingData').append($musicData)

  userInput = converUserInput($('#intensitySelector').val());

  })
//declaring varibales outside click event



  //final button for each days playlist
  $('#addEventToDay').on('click', () => {

  const $playlistDiv = $('<div>').addClass('playlist'+$('#day').val())
  if (newDay === false){
  $('#activePlayListContianer').append($playlistDiv);
  }else {$('.playlist'+$('#day').val()).append($playlistDiv)}

  const $dayDropDownButton = $('<button>').addClass('dayDropDownButton');
  $playlistDiv.append($dayDropDownButton);
  const $dayDropDownContent = $('<div>').addClass('dayDropDownContent');
  $playlistDiv.append($dayDropDownContent);
  const $playlistDropDownButton = $('<button>').addClass('dropDown');
  $dayDropDownContent.append($playlistDropDownButton);
  const $nameOfEvent = $('#nameEventInput').val();
  $dayDropDownContent.append($nameOfEvent);
  const $dropDownContent = $('<div>').addClass('dropDownContent');
  $dayDropDownContent.append($dropDownContent);
  $playlistDropDownButton.text($('#startTime').val());
  if (newDay ===false) {
    $dayDropDownButton.text($('#day').val());
  }else {$dayDropDownButton.text('')}



  $('#addEventToDay').hide();
  $('#submitPlayList').show();
  $('#addAnotherEvent').show();
  $('#deleteAndStartOverButton').hide();
  $playlistDiv.append($dayDropDownButton,$dayDropDownContent)
  dayDropDownContent.append($playlistDropDownButton,$dropDownContent)


  //dropDowns
    $playlistDropDownButton.on('click',(event) => {
      $(event.target).siblings().toggleClass('hide')
    })
    $dayDropDownButton.on('click',(event) => {
      $(event.target).siblings().toggleClass('hide')
    })


    //api call
    $.ajax({
      url: 'https://itunes.apple.com/search?term=' + userInput + '&meida=music&entity=song&limit=200'
    }).then(
      (data) => {
        const parsedData = JSON.parse(data)
        console.log(parsedData);

        // this works now need to populate the containers with the data
        for (var i = 0; i < 200; i++) {
          let time = parsedData.results[i].trackTimeMillis
          timeOfPlayList += time;
          if (timeOfPlayList < duration) {

            let $image = $('<img>').addClass('albumImage').attr('src',parsedData.results[i].artworkUrl100)
            $dropDownContent.append($image)
            let trackTitle = parsedData.results[i].trackName
            $dropDownContent.append(trackTitle)
          } else {
            break
          }
        }
        //reseting the values of duration and time of playlist
        duration = 0;
        timeOfPlayList = 0;

      },
      () => {
        console.log('bad request');
      }
    )

})


//add day to active playlists
 $('#submitPlayList').on('click',() => {
  $('#playlistInWaitingData').children().remove()
  newDay = false;
  $('#addAnotherEvent').hide()
  $('#nameEventInput').val('');
  $('#startTime').val('');
  $('#endTime').val('');
  $('#addEventButton').show()
  $('.donebuttons').hide();

 })

//add another button
$('#addAnotherEvent').on('click',() => {
  //reseting values
  newDay = true;
  $('#addAnotherEvent').hide()
  $('#nameEventInput').val('');
  $('#startTime').val('');
  $('#endTime').val('');
  $('.nameEvent').show();
})
//back buttons

$('#backToDateButton').on('click',() => {
  $('.nameEvent').hide();
  $('.calendar').show()
  $('#playlistInWaitingData').children().eq(1).remove()
})

$("#backToNameButton").on('click',() => {
   $('.whatTime').hide();
   $('.nameEvent').show();
   $('#playlistInWaitingData').children().eq(2).remove()
})

$('#backToTimeButton').on('click',() => {
  $('.slider').hide();
  $('.whatTime').show();
  $('#playlistInWaitingData').children().eq(3).remove()
})

$('#deleteAndStartOverButton').on('click',() => {
  $('#playlistInWaitingData').children().remove()
  $('#nameEventInput').val('');
  $('#startTime').val('');
  $('#endTime').val('');
  $('.calendar').show();
  $('.donebuttons').hide();

})


})
