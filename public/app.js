const list = document.getElementById('list');
const out = document.getElementById('out');
const msg = document.getElementById('msg');

function show(x){ out.textContent = JSON.stringify(x, null, 2); }

function getForm(){
  return {
    id: document.getElementById('id').value.trim(),
    title: document.getElementById('title').value,
    body: document.getElementById('body').value,
    author: document.getElementById('author').value
  };
}

function clearForm(){
  document.getElementById('id').value = '';
  document.getElementById('title').value = '';
  document.getElementById('body').value = '';
  document.getElementById('author').value = '';
  msg.textContent = '';
}

async function loadBlogs(){
  try{
    const res = await fetch('/blogs');
    const data = await res.json();
    show(data);

    list.innerHTML = '';
    data.forEach(b=>{
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <b>${b.title}</b><br/>
        <small>${b._id} | ${b.author} | ${new Date(b.createdAt).toLocaleString()}</small>
        <p>${b.body}</p>
        <button onclick="editBlog('${b._id}')">Edit</button>
        <button onclick="deleteBlog('${b._id}')">Delete</button>
      `;
      list.appendChild(div);
    });
  }catch(e){
    show(e);
  }
}

async function save(){
  const f = getForm();
  const payload = { title: f.title, body: f.body, author: f.author };
  if (!payload.author || !payload.author.trim()) delete payload.author;

  try{
    let res, data;

    if(f.id){
      res = await fetch('/blogs/' + f.id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      data = await res.json();
      if(!res.ok) throw data;
      msg.textContent = 'Updated ';
    } else {
      res = await fetch('/blogs', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      data = await res.json();
      if(!res.ok) throw data;
      msg.textContent = 'Created ';
      document.getElementById('id').value = data._id;
    }

    show(data);
    loadBlogs();
  }catch(err){
    show(err);
    msg.textContent = 'Error ';
  }
}

async function editBlog(id){
  const res = await fetch('/blogs/' + id);
  const data = await res.json();
  show(data);

  document.getElementById('id').value = data._id;
  document.getElementById('title').value = data.title;
  document.getElementById('body').value = data.body;
  document.getElementById('author').value = data.author;
  msg.textContent = 'Edit жасап Save бас ';
}

async function deleteBlog(id){
  if(!confirm('Delete?')) return;
  const res = await fetch('/blogs/' + id, { method:'DELETE' });
  const data = await res.json();
  show(data);
  loadBlogs();
}

loadBlogs();