document.getElementById('form').onsubmit = function(e) {
    e.preventDefault();
    fetch('/todos/create', {
    // send info that include description that come from the form when click submit 
    method: 'POST',
    body: JSON.stringify({
     'description': document.getElementById('description').value
    }),
    // specify content type header
    headers: {
    'Content-Type': 'application/json'  
 }
})
// manipulate the response
.then(function(response) {
    return response.json();
 })
 // manipulate json response
.then(function(jsonResponse) {
    console.log(jsonResponse);
    // append object to our list
    const liItem = document.createElement('LI');
    liItem.innerHTML = jsonResponse['description'];
    document.getElementById('todos').appendChild(liItem);
    document.getElementById('error').className = 'hidden';
})
.catch(function() {
    document.getElementById('error').className = '';
})
}