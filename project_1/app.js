//global variables
let randomGenreNumber = Math.floor(Math.random() * Math.floor(6))
let randomSongNumber = Math.floor(Math.random() * Math.floor(200))
let userInput = ''
let timeOfPlayList = 0;
let duration = 0;

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
  $(".calendar").hide();
  $('.nameEvent').show();
  const $date = $('#day').val()
  const $dateInfo = $('<h4>'+ $date + '</h4>')
  $('#playlistInWaitingData').append($dateInfo)
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


//converting data from about into miliseconds to compare to track length
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
  $('#setMusic').on('click', () => {
    $('.slider').hide();
    $('.donebuttons').show();
    $('#submitPlayList').hide();
    $('#addEventToDay').show().text('confirm your event')
    //add level to playlist in waiting
    const $musicLevel = $('#intensitySelector').val()
    const $musicData = $('<h4>'+'Music Intensity Level: '+'</h4>'  + '<h4>'+ $musicLevel + '</h4>')
    $('#playlistInWaitingData').append($musicData)


    if ($('#intensitySelector').val() === "1") {
      userInput = level1[randomGenreNumber]
      console.log(userInput);
    } else if ($('#intensitySelector').val() === '2') {
      userInput = level2[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '3') {
      userInput = level3[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '4') {
      userInput = level4[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '5') {
      userInput = level5[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '6') {
      userInput = level6[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '7') {
      userInput = level7[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '8') {
      userInput = level8[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '9') {
      userInput = level9[randomGenreNumber]
    } else if ($('#intensitySelector').val() === '10') {
      userInput = level10[randomGenreNumber]
    } else{return}
  })
//declaring varibales outside click event



  //final button for each days playlist
  $('#addEventToDay').on('click', () => {
   const $playlistDropDownButton = $('<button>').addClass('dropDown')
  const $playlistDiv = $('<div>').addClass('playlist')
  const $dropDownContent = $('<div>').addClass('dropDownContent')
  $playlistDropDownButton.text($('#day').val())



  $('#addEventToDay').hide();
  $('#submitPlayList').show();
  $('#addAnotherEvent').show();
  $('#deleteAndStartOverButton').hide();
// creating a div for the confirmed playlist
 $('#activePlayListContianer').append($playlistDiv)
  $($playlistDiv).append($playlistDropDownButton)
  $($playlistDiv).append($dropDownContent)

  //dropDown
    $playlistDropDownButton.on('click',(event) => {
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
          } else {
            break
          }
        }



        // let songLocation = test.results[randomGenreNumber].trackViewUrl
        // const link = $('<a>',{href:songLocation})
        // const trackInfo = test.results[randomGenreNumber].trackName
        // const artist = test.results[randomGenreNumber].artistName
        // const imageTest = $("<img>").attr('src',test.results[randomGenreNumber].artworkUrl100)
        // $('body').append(link)
        // imageTest.appendTo(link)
        // $('body').append(trackInfo)
        // $('body').append(artist)
        //
        //
        // console.log(time);
      },
      () => {
        console.log('bad request');
      }
    )

})


//add day to active playlists
 $('#submitPlayList').on('click',() => {
   const cloneOfData = $('#playlistInWaitingData').children().clone();
  $('#playlistInWaitingData').children().remove()
  const $playlist = $('<div>').addClass('activePlayLists')
  $('#activePlayListContianer').append($playlist)
  $playlist.append(cloneOfData)
 })

//add another button
$('#addAnotherEvent').on('click',() => {
  //reseting values
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
