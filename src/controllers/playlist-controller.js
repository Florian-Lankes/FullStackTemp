import { db } from "../models/db.js";
import { trackMemStore } from "../models/mem/track-mem-store.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      // console.log(request.params._id);
      // console.log(h);
      const playlist = await db.playlistStore.getPlaylistById(request.params._id);
      // console.log("YEAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
      // console.log(playlist);
      // console.log(playlist.tracks);
      // const tracks = await db.trackStore.getAllTracksOfPlaylist(request.params._id);
      // console.log("---------------------------------------------------------------------");
      // console.log(request.params._id);
      const viewData = {
        title: "Playlist",
        playlist: playlist,
      };
      return h.view("playlist-view", viewData);
    },
  },

  addTrackToPlaylist: {
    handler: async function (request, h) {
      const info = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: request.payload.duration,
      };
      // console.log("---------------------------------------------------------------------");
      // console.log(info);
      const track = await db.trackStore.addTrack(info, request.params._id);
      // console.log("Track");
      // console.log(track);
      await db.playlistStore.addTrackToPlaylists(request.params._id, track); // I solve the Problem by adding the Tracks to the playlist and the trackstore, not only to the trackstore
      return h.redirect(`/playlist/${request.params._id}`);
    },
  },
  deletePlaylist: {
    handler: async function (request, h) {
      const playlistId = request.params._id;
      console.log(playlistId);
      await db.playlistStore.deletePlaylistById(playlistId);
      return h.redirect("/dashboard");
    },
  },
  deleteTrack: {
    handler: async function (request, h) {
      // created an URL with PlaylistId and TrackId to redirect to the Playlist after deleting the Track
      const trackId = request.params._id;
      await db.trackStore.deleteTrackById(trackId);
      await db.playlistStore.deleteTrackFromPlaylistById(trackId);
      return h.redirect(`/playlist/${request.params.playlistId}`);
    },
  },
};
