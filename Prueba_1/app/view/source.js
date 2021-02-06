
addEventListener('load',() =>{
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(response =>{
      const usuarios = document.getElementById('usuarios')
      const fragment = document.createDocumentFragment()
      for(const user of response){
        const listUser = document.createElement('option')
        listUser.setAttribute('value',`${user.id}`)
        listUser.textContent = `${user.name}`
        fragment.appendChild(listUser)
      }
      usuarios.appendChild(fragment)
    })/*.then*/
})/*.addEventListener*/

const nombre = document.createElement('li')
nombre.classList.add("list-group-item")
const alias = document.createElement('li')
alias.classList.add("list-group-item")
const correo = document.createElement('li')
correo.classList.add("list-group-item")
const telefono = document.createElement('li')
telefono.classList.add("list-group-item")
const web = document.createElement('li')
web.classList.add("list-group-item")
const bttnTodos = document.createElement('button')
bttnTodos.id='todos';
const bttnPosts = document.createElement('button')
bttnPosts.id='posts';


addEventListener('change', () => {
  var usuario = document.getElementById('usuarios')
  fetch(`https://jsonplaceholder.typicode.com/users/${usuario.value}`)
  .then(response => response.json())
  .then(response => {
    nombre.textContent = response.name
    listarUsuario.appendChild(nombre)

    alias.textContent = response.username
    listarUsuario.appendChild(alias)

    correo.textContent = response.email
    listarUsuario.appendChild(correo)

    telefono.textContent = response.phone
    listarUsuario.appendChild(telefono)

    bttnPosts.innerText = 'Posts'
    listarUsuario.appendChild(bttnPosts);

    bttnTodos.innerText = 'Todos'
    listarUsuario.appendChild(bttnTodos)
  })/*.then*/
})/*.addEventListener*/



bttnPosts.addEventListener('click',() => {
  const usuario = document.getElementById('usuarios')
  const posts = document.getElementById('posts-list')
  const comentarios = document.getElementById('posts-comentarios')
  fetch(`https://jsonplaceholder.typicode.com/users/${usuario.value}/posts`)
  .then(response => response.json())
  .then(response => {
    for(let p of response){
      const ts = document.createElement('div')
      ts.classList.add("p-2", "bg-light", "border","disable")
      ts.innerText = `${p.id}---${p.title} `
      posts.appendChild(ts)
      fetch(`https://jsonplaceholder.typicode.com/post/${p.id}/comments`)
      .then(res => res.json())
      .then(res => {
        for(let c of res){
          const comm = document.createElement('div')
          comm.innerText = `${c.name}`
          ts.append(comm)
        }/*for*/
      })/*.then*/
    }/*for*/
  })/*.then*/
})/*bttnPosts.addEventListener*/


bttnTodos.addEventListener('click',() =>{
  const usuario = document.getElementById('usuarios')
  const todos = document.getElementById('desordenarTodos')
  const div = document.getElementById('form-div')
  const title = document.createElement('input')
  const completed = document.createElement('input')
  const bttn1 = document.createElement('button')
  const labelTitle = document.createElement('label')
  labelTitle.classList.add("form-label")
  labelTitle.innerText = "Checkbox "
  title.type = 'text'
  completed.type = 'checkbox'
  completed.checked  = true
  bttn1.innerText = 'Guardar'
  bttn1.classList.add("btn", "btn-primary")

  //const fragment = document.createDocumentFragment();
  fetch(`https://jsonplaceholder.typicode.com/users/${usuario.value}/todos`)
  .then(response => response.json())
  .then(response => {
    for(let t of response){
      const ts = document.createElement('div')
      ts.classList.add("p-2", "bg-light", "border","disable")
      ts.innerText = `${t.id}---${t.title} `
      //fragment.prepend(ts)
      todos.prepend(ts)
    }/*for*/
    todos.appendChild(labelTitle)
    todos.appendChild(completed)
    todos.appendChild(title)
    todos.appendChild(bttn1)
  })/*.then*/


  bttn1.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        userId: usuario.value,
        title: title.value,
        completed: completed.checked
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })/*fetch*/
    .then((response) => response.json())
    .then((json) => console.log(json));
  })/*bttn1.addEventListener*/

})/*bttn.addEventListener*/
