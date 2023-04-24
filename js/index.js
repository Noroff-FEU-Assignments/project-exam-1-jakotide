import { getPosts } from "./components/api.js";
import { navScroll } from "./components/navbar.js";
import { toTopButton } from "./components/totopbtn.js";

getPosts();
toTopButton();
navScroll();