//global variables
let randomGenreNumber = Math.floor(Math.random() * Math.floor(6))
let randomSongNumber =  Math.floor(Math.random() * Math.floor(6))
let userInput = 'folk'
let duration;
let timeofPlayList;

//arrays of music genres for random searching to
 // populate playlist, each one associated with a level of musical intensity

 const level1 = ['chants','raga','oceansounds','harp','birdsongs']
 const level2 = ['classical','ambientmusic','acoustic','folk','bluegrass']
 const level3 = ['traditionaljazz','ragtime','swingmusic','smoothjazz',"bigBand"]
 const level4 = ['blues','gospel','electricjazz','bebop','jazzfusion']
 const level5 = ['randb','regeaton','regea','disco',]
 const level6 = ['funk','classicrock','rock','folkrock','singerSongwriter']
 const level7 = ['pop','poppunk','Dance-pop‎','house','90spop']
 const level8 = ['dancemusic','chillwave','electro','drumandbass','triphop']
 const level9 = ['hiphop','eastcoasthiphop','westcoasthiphop','hardcore']
 const level10 = ['EDM','dubstep','heavymetal','metal']


$(() => {

$('#setTimebutton').on('click',() => {

  // console.log($('#day').val());
  // console.log($('#endTime').val())
  // console.log($('#intensitySelector').val());


  //time logic
  const startTime = $('#startTime').val().replace(':','');
  const endTime = $('#endTime').val().replace(':','');
  const startTimeArray = startTime.split('');
  const endTimeArray = endTime.split('');

  const startTimeInMins = () => {
    const hours1 = Number(startTimeArray[0]*60);
    const hours2 = Number(startTimeArray[1]*60);
    const minutesArray = startTimeArray.slice(2,4);
    const minutesString = minutesArray.join('')
    const minutes = Number(minutesString)
    const startTimeInMiliseconds = (hours1+hours2+minutes)*60000
    return startTimeInMiliseconds;
}
const endTimeInMins = () => {
  const endHours1 = Number(endTimeArray[0]*60);
  const endHours2 = Number(endTimeArray[1]*60);
  const endMinutesArray = endTimeArray.slice(2,4);
  const endMinutesString = endMinutesArray.join('')
  const endMinutes = Number(endMinutesString)
  const endTimeInMiliseconds = (endHours1+endHours2+endMinutes)*60000
  return endTimeInMiliseconds;
}
  let duration = endTimeInMins() - startTimeInMins()
  console.log(duration);

  // console.log(duration);


})
//slider logic // add blurb about intensity levels during mouseover
$('#intensitySelector').on('mouseenter mouseleave',() => {

})
// changing userInput based on slider positon
//
$('#setMusic').on('click',() => {

  if ($('#intensitySelector').val()==="1"){
    userInput = level1[randomSongNumber]
    console.log(userInput);
  } else if ($('#intensitySelector').val()==='2'){
    userInput = level2[randomSongNumber]
  }

})
//final button for each days playlist
// need to add functionaliy to add songs = to length of evetn
$('#addEventToDay').on('click',() => {
  //api call
  $.ajax(
    {
    url: 'https://itunes.apple.com/search?term='+userInput+'&meida=music&entity=song&limit=2'
    }
  ).then(
    (data) => {
      let test = JSON.parse(data)
      console.log(test);
      let songLocation = test.results[randomGenreNumber].trackViewUrl
      const link = $('<a>',{href:songLocation})
      const trackInfo = test.results[randomGenreNumber].trackName
      const artist = test.results[randomGenreNumber].artistName
      const imageTest = $("<img>").attr('src',test.results[randomGenreNumber].artworkUrl100)
      $('body').append(link)
      imageTest.appendTo(link)
      $('body').append(trackInfo)
      $('body').append(artist)

      let time=test.results[randomSongNumber].trackTimeMillis
      console.log(time);
    },
    ()=>{
      console.log('bad request');
    }
  )

})









})
