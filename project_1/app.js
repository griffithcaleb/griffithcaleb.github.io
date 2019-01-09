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




let userInput = 'bob'
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

  console.log($('#day').val());
  console.log($('#endTime').val())
  console.log($('#intensitySelector').val());



})
//slider logic // add blurb about intensity levels during mouseover
$('#intensitySelector').on('mouseover',() => {
  console.log('yo');
})


})
