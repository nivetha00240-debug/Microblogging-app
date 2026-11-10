// Load saved posts
let posts = JSON.parse(localStorage.getItem('miniblog') || '[]');

function addPost(){
  let name = document.getElementById('username').value || 'Anonymous';
  let text = document.getElementById('postText').value.trim();
  let img = document.getElementById('postImage').value.trim();

  if(!text){
    alert('Please type something!');
    return;
  }

  let newPost = {
    name: name,
    text: text,
    img: img,
    likes: 0,
    time: new Date().toLocaleString()
  };

  posts.unshift(newPost);
  localStorage.setItem('miniblog', JSON.stringify(posts));

  document.getElementById('postText').value = '';
  document.getElementById('postImage').value = '';
  showPosts();
}

function likePost(index){
  posts[index].likes++;
  localStorage.setItem('miniblog', JSON.stringify(posts));
  showPosts();
}

function deletePost(index){
  if(confirm('Delete this post?')){
    posts.splice(index, 1);
    localStorage.setItem('miniblog', JSON.stringify(posts));
    showPosts();
  }
}

function showPosts(){
  let feed = document.getElementById('feed');

  if(posts.length === 0){
    feed.innerHTML = '<p style="text-align:center;color:gray">No posts yet. Be the first to post!</p>';
    return;
  }

  feed.innerHTML = posts.map((p, i) => `
    <div class="post">
      <span class="delete-btn" onclick="deletePost(${i})">✖</span>
      <div class="meta"><b>${p.name}</b> • ${p.time}</div>
      <p>${p.text}</p>
      ${p.img ? `<img src="${p.img}">` : ''}
      <div class="actions">
        <span onclick="likePost(${i})">❤️ ${p.likes} Like</span>
        <span>💬 Comment</span>
        <span>🔁 Share</span>
      </div>
    </div>
  `).join('');
}

showPosts();
