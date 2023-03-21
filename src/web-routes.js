import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplaylist", config: dashboardController.addPlaylist },

  { method: "GET", path: "/playlist/{_id}", config: playlistController.index },
  { method: "POST", path: "/playlist/{_id}/addtrack", config: playlistController.addTrackToPlaylist },
  { method: "GET", path: "/playlist/{_id}/deletePlaylist", config: playlistController.deletePlaylist },
  { method: "GET", path: "/playlist/{playlistId}/deleteTrack/{_id}", config: playlistController.deleteTrack },
];
