//Ryan Hutchings
//Unit 18.3 Exercise: AJAX Giphy Party

console.log("Let's get this party started!");

//My DOM and other variables
const myAPIKey = 'qN0fkQGzvQYUjY4XyBrysL3SQyurTuGZ'; //needed to use giphy
let gifLimit = 50; //default limit
const searchBar = document.querySelector('#searchBar');
const searchForm = document.querySelector('#searchGIFForm');
const divOfGIFS = document.querySelector('.gifGallery');
const removeBtn = document.querySelector('#removeGIFSBtn');

//possible gifLimit parameter
async function getGIF(APIKey, keyWord) {
  const response = await axios.get('https://api.giphy.com/v1/gifs/search', { params: { api_key: APIKey, q: keyWord } });
  //console.log(response);
  putGIFOnscreen(response);
}

//gets the image onscreen
function putGIFOnscreen(response) {
  //prevents looking up empty search bars
  if (response.data.data.length) {
    //pick random picture from the total sent
    let randomGifNumber = Math.floor(Math.random() * gifLimit);
    //console.log(response.data.data[0].images.original.url); //takes first one only; orignal size

    //creates the new imgae element for the gif
    let gif = document.createElement('img');
    gif.src = response.data.data[randomGifNumber].images.original.url; //image's url (keeps original size)
    gif.className = 'p-2'; //gives some spacing for each image made
    divOfGIFS.append(gif); //add image onto the screen
  } else {
    alert('Fill in the search bar or enter proper words'); //result of empty search bar or written gibberish
  }
}

//event for submiting the form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); //prevents reloading the page
  getGIF(myAPIKey, searchBar.value);
  searchBar.value = ''; //empty search results
});

//event for removing all GIFs onscreen
removeBtn.addEventListener('click', () => {
  divOfGIFS.innerHTML = '';
});