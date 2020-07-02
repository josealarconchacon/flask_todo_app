// lopp over the checkbox
const checkboxs = document.querySelectorAll('.check-completed');
for (let i = 0; i < checkboxs.length; i++) {
    const checkbox = checkboxs[i];
    checkbox.onchange = function(e) {
        const newCompleted = e.target.checked;
        const todoId = e.target.dataset['id'];
        fetch('/todos/' + todoId + 'set-completed', {
            method: 'POST',
            body: JSON.stringify({
                'completed': newCompleted
            }),
            headers: {
                'Content-Type': 'application/json'  
            }
        })
    }
}

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