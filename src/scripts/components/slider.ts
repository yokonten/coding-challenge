function enableDragScroll(track: HTMLElement) {
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX: number;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("touchmove", (e) => {
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX) * -1;
    track.scrollLeft = scrollLeft + walk;
  });
}

export const initSlider = (selector = ".favorites-slider") => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((sliderSection) => {
    const track = sliderSection.querySelector(".track") as HTMLElement | null;
    const leftArrow = sliderSection.querySelector(
      ".arrow--left"
    ) as HTMLElement | null;
    const rightArrow = sliderSection.querySelector(
      ".arrow--right"
    ) as HTMLElement | null;

    if (track && window.matchMedia("(max-width: 1024px)").matches) {
      enableDragScroll(track);
    }

    if (track && leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () => {
        track.scrollBy({ left: -300, behavior: "smooth" });
      });

      rightArrow.addEventListener("click", () => {
        track.scrollBy({ left: 300, behavior: "smooth" });
      });
    }
  });
};

export const scrollToPosition = (): void => {
  const track = document.querySelector(".track") as HTMLElement | null;
  if (!track) return;

  const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;

  if (isSmallScreen) {
    const middle = (track.scrollWidth - track.clientWidth) / 2;
    track.scrollTo({
      left: middle,
      behavior: "smooth",
    });
  } else {
    track.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
};
