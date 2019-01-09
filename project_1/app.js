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




let userInput = 'jazz'
let time =0
$(() => {
  $.ajax(
    {
    url: 'https://itunes.apple.com/search?term='+userInput+'&meida=music&entity=song&limit=250'
    }
  ).then(
    (data) => {
      let test = JSON.parse(data)
      console.log(test);
      let songLocation = test.results[1].trackViewUrl
      const link = $('<a>',{href:songLocation})
      const trackInfo = test.results[1].trackName
      const artist = test.results[1].artistName
      const imageTest = $("<img>").attr('src',test.results[1].artworkUrl100)
      $('body').append(link)
      imageTest.appendTo(link)
      $('body').append(trackInfo)
      $('body').append(artist)

      let time=test.results[1].trackTimeMillis
      console.log(time);


    },
    ()=>{
      console.log('bad request');
    }
  )
$('#addEventToDay').on('click',() => {

  // console.log($('#day').val());
  // console.log($('#endTime').val())
  // console.log($('#intensitySelector').val());


  //time logic
  const startTime = $('#startTime').val().replace(':','');
  const endTime = $('#endTime').val().replace(':','');
  const startTimeArray = startTime.split('');
  const endTimeArray = endTime.split('');

  const startTimeInMins = () => {
    let hours1 = Number(startTimeArray[0]*60);
    let hours2 = Number(startTimeArray[1]*60);
    let mins1 = Number(startTimeArray[2])
    let mins2 = Number(startTimeArray[3])
    let startTimeInMiliseconds = (hours1+hours2+mins1+mins2)*6000
    return startTimeInMiliseconds;

  }
  const endTimeInMins = () => {
    let hours1 = Number(endTimeArray[0]*60);
    let hours2 = Number(endTimeArray[1]*60);
    let mins1 = Number(endTimeArray[2])
    let mins2 = Number(endTimeArray[3])
    let endTimeInMiliseconds = (hours1+hours2+mins1+mins2)*6000
    return endTimeInMiliseconds
  }

  const duration = endTimeInMins() - startTimeInMins()
  // console.log(duration);

// changing userInput based on slider positon
if ($('#intensitySelector').val()==="1"){
  userInput = level1[0]
  console.log(userInput);
}


})
//slider logic // add blurb about intensity levels during mouseover


$('#intensitySelector').on('mouseenter mouseleave',() => {




})

})
