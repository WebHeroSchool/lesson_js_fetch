let body = document.body;
let preloaderEl = document.getElementById('preloader');
let url = window.location.toString();
function checkUsername(url) {
  let urlSplit = url.split('=');
  let name = urlSplit[1];
  if (name == undefined) {
    name = 'Stanislav20';
  }
  return name;
}

console.log(checkUsername(url));
 
const getTime = new Promise((resolve, reject) => {
  setTimeout(() => resolve(new Date()), 3000)
})

const getInformation = fetch(`https://api.github.com/users/${checkUsername(url)}`);

Promise.all([getInformation, getTime]) 
.then(([res, date]) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let time = hours + ":" + minutes + ":" + seconds;
  console.log(time);
  return res.json()
})

.then(json => {
  preloaderEl.classList.add('hidden');
  console.log(json.avatar_url);
  console.log(json.name);
  console.log(json.bio);
  console.log(json.html_url);

  let img = new Image();
  img.src = json.avatar_url;
  body.append(img);

  let name = document.createElement('p');
  if (json.name != null) { 
    name.innerHTML = json.name;
  } else {
    name.innerHTML = 'Информация об имени пользователе недоступна';
  }
  body.append(name);
  name.addEventListener("click", () => location.assign(`https://github.com/${checkUsername(url)}`));
  
  let bio = document.createElement('p');
  if (json.bio != null) {
    bio.innerHTML = json.bio;
  } else {
    bio.innerHTML = 'Информация о bio пользователя недоступна';
  }
  body.append(bio);

  let times = document.createElement('h3');
  times.innerHTML = Date();
  body.append(times);
})

.catch(err => alert('Информация о пользователе недоступна'));