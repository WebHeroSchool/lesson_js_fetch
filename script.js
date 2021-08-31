let body= document.body;
let url = window.location.toString();
function checkUsername(url) {
  let urlSplit=url.split('=');
  let name=urlSplit[1];
  if (name == undefined) {
    name='Stanislav20';
  }
  return name;
}
console.log(checkUsername(url));
fetch(`https://api.github.com/users/${checkUsername(url)}`)
	.then(res => res.json())
	.then(json => {
		console.log(json.avatar_url);
		console.log(json.name);
		console.log(json.bio);
    console.log(json.html_url);
    let img = new Image();
    img.src = json.avatar_url;
    body.append(img);
    let name = document.createElement('p');
    if(json.name !=null) {
      name.innerHTML = json.name;
    } else {
      name.innerHTML = 'Информация об имени недоступна';
    }
    body.append(name);
    name.addEventListener("click", () => location.assign('https://github.com/${checkUsername(url)}'));
    let bio = document.createElement('p');
    if (json.bio !=null) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Информация о bio пользователя недоступна';
    }
    body.append(bio);
	})
.catch(err => alert('Информация о пользователе недоступна'));