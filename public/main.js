const updateButton = document.querySelector('#update-button')
const updateName = document.querySelector('#updateName')
const updateQuote = document.querySelector('#updateQuote')

updateButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: String(updateName.value),
      quote: String(updateQuote.value)
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(response => {
    window.location.reload(true);
  })
});


const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const deleteName = document.querySelector('#deleteName')

deleteButton.addEventListener('click',_=>{
  fetch('/quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: String(deleteName.value)
    })
  })
  .then(res=>{
    if (res.ok) return res.json();
  })
  .then (response => {
    if (response ===  'No quote to delete') {
      messageDiv.textContent = 'No ' + String(deleteName.value) + '\'s quote to delete'
    } else {
      window.location.reload(true)
    }
  })
});
