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
const level5 = ['randb', 'regeaton', 'regea', 'disco', ]
const level6 = ['funk', 'classicrock', 'rock', 'folkrock', 'singerSongwriter']
const level7 = ['pop', 'poppunk', 'Dance-pop‎', 'house', '90spop']
const level8 = ['dancemusic', 'chillwave', 'electro', 'drumandbass', 'triphop']
const level9 = ['hiphop', 'eastcoasthiphop', 'westcoasthiphop', 'hardcore', 'trap']
const level10 = ['EDM', 'dubstep', 'heavymetal', 'metal', 'EDM']


$(() => {

  $('#setTimebutton').on('click', () => {

    // console.log($('#day').val());
    // console.log($('#endTime').val())
    // console.log($('#intensitySelector').val());

    //time logic
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
  //final button for each days playlist
  // need to add functionaliy to add songs = to length of evetn
  $('#addEventToDay').on('click', () => {
    //api call
    $.ajax({
      url: 'https://itunes.apple.com/search?term=' + userInput + '&meida=music&entity=song&limit=200'
    }).then(
      (data) => {
        const parsedData = JSON.parse(data)


        // this works now need to populate the containers with the data
        for (var i = 0; i < 200; i++) {
          let time = parsedData.results[i].trackTimeMillis
          timeOfPlayList += time;
          if (timeOfPlayList < duration) {



            console.log(parsedData.results[i].artistName);
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

})
