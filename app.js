let userInput = 'poop'
let time =0
$(() => {
  $.ajax(
    {
    url: 'https://itunes.apple.com/search?term='+userInput+'&meida=music&entity=song&limit10'
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
})
