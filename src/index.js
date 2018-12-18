let giftsList = () => document.querySelector('.gift-list')
let giftForm  = () => document.querySelector('#new-gift-form')
let editForm = () => document.querySelector('#edit-gift-form')

// event that happen after DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM has been fully loaded')
  listItems()
  giftForm().addEventListener('submit', createNewGift)
  giftsList().addEventListener('click', deleteElement)
  editForm().addEventListener('submit', updateGift)
})


function deleteElement(event){
  if (event.target.className === 'delete button'){
    fetch(`http://localhost:3000/gifts/${event.target.parentElement.dataset.id}`, {
          method: "DELETE" }).then(event.target.parentElement.remove())
        }

else if (event.target.className === 'edit button'){
  editElement(event.target.parentElement)
}
}

//list all the items when page loads
function listItems(){
  const gifts = fetch('http://localhost:3000/gifts')
  .then(response => response.json())
  .then(data => {
    data.forEach(function(element){
    let name = element.name
    let image = element.image
    let id = element.id
    li = createLi(name, image, id)
    console.log(li)
    giftsList().prepend(li)
  })
})
}


//create new gift from form
function createNewGift(event){
let name = document.querySelector('#gift-name-input')
let image = document.querySelector('#gift-image-input')
event.preventDefault()
fetch(`http://localhost:3000/gifts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name.value,
        "image": image.value
      })
    }).then(giftsList().prepend(createLi(name.value, image.value)))
name.value = " "
image.value = " "
}


// helper method to create new element
function createLi(name, image, id){
li = document.createElement('li')
li.innerHTML = `<h1>${name}</h1><img src=${image}>`
li.innerHTML += '<button id="gift-delete-button" name="button" class="delete button">Delete This Gift</button>'
li.innerHTML += '<button id="gift-edit-button" name="button" class="edit button">Edit This Gift</button>'
li.dataset.id = id
return li
}

function editElement(element){
  elementToUpdate = element
  x = document.getElementById("edit-gift-form")
  x.style.display = "block";
  let name = element.querySelector('#gift-name-input')
  let image = element.querySelector('#gift-image-input')
  // x.style.display = "none";
}

function updateGift(event){
  event.preventDefault()
  let name = document.querySelector('#edit-gift-name-input')
  let image = document.querySelector('#edit-gift-image-input')
  fetch(`http://localhost:3000/gifts/${elementToUpdate.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // "id": giftId,
        "name": name.value,
        "image": image.value
      })
    }).then(resp => {
      //let elementToUpdate = document.querySelector("[data-id='1']")
      elementToUpdate.querySelector('h1').innerHTML = name.value;
      elementToUpdate.querySelector('img').src = image.value;
  x.style.display = "none";})
}
