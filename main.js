// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

document.getElementById('modal').className = 'hidden';


const postCollection = document.querySelectorAll('.media-post');
postCollection.forEach(post => {
  post.addEventListener('click', function(event) {
    let likeButtonIsPressed = event.target.className === "like-glyph"
    if (likeButtonIsPressed) {
      mimicServerCall()
      .then(function(response){
        let heart = event.target;
        heart.innerHTML = FULL_HEART;
        heart.className = 'activated-heart';
        heart.style.cursor = 'pointer';
        console.log(response)
      })
      .catch(function(e) {
        let modal = document.getElementById('modal');
        modal.className = '' 
        let message = document.getElementById('modal-message')
        message.innerHTML = e;
        setTimeout(function() {
          modal.className = 'hidden' 
        }, 3000);
      })
    }
  })
})

postCollection.forEach(post => {
  post.addEventListener('click', function(event) {
    let likeButtonIsPressed = event.target.className === 'activated-heart';
    if (likeButtonIsPressed) {
      event.target.className = 'like-glyph';
      event.target.innerHTML = EMPTY_HEART;
    }
  })
})





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
