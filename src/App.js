import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {

  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state ={
      token: "",
      deviceId: "",
      loggedIn: params.access_token ? true : false,
      error: "",
      nowPlaying: {
        trackName: 'Track Name',
        artistName: "Artist Name",
        albumName: "Album Name",
        image: ''
      },
      playing: false,
      position: 0,
      duration: 0,
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  // getPlaylist() {

  // }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      })
    })
  }

  render() {
    const { token } = this.state;
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button> Login With Spotify </button>
        </a>
        <div> Now Playing: { this.state.nowPlaying.name } </div>
        <div>
          <img src={ this.state.nowPlaying.image } style={{width: 100}} />
        </div>
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>
    );
  }
}

export default App;
