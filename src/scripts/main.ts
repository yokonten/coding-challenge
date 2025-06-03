import { initSlider, scrollToPosition } from "./components/slider";
import "../styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  scrollToPosition();
});

let resizeTimeout: number | null = null;
window.addEventListener("resize", () => {
  if (resizeTimeout !== null) clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    scrollToPosition();
  }, 150);
});
