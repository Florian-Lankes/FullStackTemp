import { v4 } from "uuid";

let playlists = [];

// Ich habe jetzt ein track array hinzugefügt, in dem alle Tracks von der Playlist sind. Ein track selbst hat auch die Playlist id.
export const playlistMemStore = {
  async getAllPlaylists() {
    return playlists;
  },

  // Add UserID field
  async addPlaylist(playlist, userId) {
    playlist._id = v4();
    playlist.tracks = [];
    playlist.userid = userId;
    playlists.push(playlist);
    // console.log(playlist);
    return playlist;
  },

  async getPlaylistById(id) {
    return playlists.find((playlist) => playlist._id === id);
  },

  // Because of a different approach by me, I dont need to add the tracks to the playlist, because I have already done that in the addPlaylist function
  async getPlaylistById2(id) {
    const list = playlists.find((playlist) => playlist._id === id);
    list.tracks = await trackMemStore.getTracksByPlaylistId(list._id);
    return list;
  },

  // added not tested
  async addTrackToPlaylists(id, track) {
    const playlist = playlists.find((item) => item._id === id);
    // console.log("--------------------------------------------------------");
    // console.log(track);
    // console.log(track.title);
    playlist.tracks.push(track);
    // console.log(playlist);
    // console.log(playlist.tracks);
    // return playlist;
    return id;
  },
  // Should not Forget about the Tracks of the Playlist which need to be deleted
  async deletePlaylistById(id) {
    const index = playlists.findIndex((playlist) => playlist._id === id);
    playlists.splice(index, 1);
  },
  async deleteTrackFromPlaylistById(id) {
    const index = playlists.findIndex((playlist) => playlist.tracks.find((track) => track._id === id));
    const playlist = playlists[index];
    const trackIndex = playlist.tracks.findIndex((track) => track._id === id);
    playlist.tracks.splice(trackIndex, 1);
  },

  async deleteAllPlaylists() {
    playlists = [];
  },

  async getUserPlaylists(userid) {
    return playlists.filter((playlist) => playlist.userid === userid);
  },
};
