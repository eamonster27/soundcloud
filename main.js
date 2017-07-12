document.querySelector('.search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  search(document.querySelector('#query').value);
});


function search(query) {
  // Clear Old Results
  clearOldResults("users");
  clearOldResults("tracks");
  clearOldResults("playlists");

  // Query
  fetchData("users", query);
  fetchData("tracks", query);
  fetchData("playlists", query);

};

function clearOldResults(type){
  var oldData = document.getElementById(type);
  while (oldData.firstChild) {
    oldData.removeChild(oldData.firstChild);
  };
};

function fetchData(type, query){
  fetch(`https://api.soundcloud.com/${type}?client_id=8538a1744a7fdaa59981232897501e04&q=${query}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(type === "users"){
        for(let t = 0; t < json.length - 1; ++t){
          var user = {};
          user.avatar_url = json[t].avatar_url;
          user.id = json[t].id;
          user.permalink_url = json[t].permalink_url;
          user.username = json[t].username;
          //console.log(user);

          const html = `
          <div class="user" id="${user.id}">
            <div class="user-avatar">
              <a href="${user.permalink_url}">
                <img src="${user.avatar_url}" alt="${user.username}">
              </a>
            </div>

            <div class="user-username">
              <a href="${user.permalink_url}">${user.username}</a>
            </div>
          </div>
          `;
          document.querySelector("#users").insertAdjacentHTML('afterbegin', html);
        }
      }

      else if(type === "tracks"){
        for(let t = 0; t < json.length - 1; ++t){
          var track = {};
          track.artwork_url = json[t].artwork_url;
          track.id = json[t].id;
          track.stream_url = json[t].stream_url;
          track.title = json[t].title;
          track.username = json[t].user.username;
          track.user_url = json[t].user.permalink_url;
          //console.log(track);

          const html = `
          <div class="track" id="${track.id}">
            <div class="track-artwork">
              <a href="${track.stream_url}">
                <img src="${track.artwork_url}" alt="${track.title}">
              </a>
            </div>

            <div class="track-details">
              <a href="${track.stream_url}">${track.title}</a>
              <a href="${track.user_url}">
                <h3>${track.username}</h3>
              </a>
            </div>
          </div>
          `;
          document.querySelector("#tracks").insertAdjacentHTML('afterbegin', html);
        }
      }

      else if(type === "playlists"){
        for(let t = 0; t < json.length - 1; ++t){
          var playlist = {};
          playlist.id = json[t].id;
          playlist.permalink_url = json[t].permalink_url;
          playlist.title = json[t].title;
          playlist.username = json[t].user.username;
          playlist.user_url = json[t].user.permalink_url;
          //console.log(playlist);

          const html = `
          <div class="playlist" id="${playlist.id}">
            <div class="playlist-details">
              <a href="${playlist.permalink_url}">${playlist.title}</a>
              <a href="${playlist.user_url}">
                <h3>${playlist.username}</h3>
              </a>
            </div>
          </div>
          `;

          document.querySelector("#playlists").insertAdjacentHTML('afterbegin', html);

        }
      }

      //console.log("Data", json);
    });
};
