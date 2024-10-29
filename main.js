import "./css/style.css";
import "./css/desktop.css";
import "./css/tab.css";
import "./css/mobile.css";

import { gsap } from "gsap";
import barba from "@barba/core";
import Lenis from "lenis";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// lenis scrool basic setup -------------------------------------------

const lenisSmoothScrool = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

// navbar burger toggle mobile version -------------------------------------------

const menuBurgerAnimation = () => {
  const menuBurger = document.querySelector(".burger");
  const nav = document.querySelector(".about-project");
  const links = nav.querySelectorAll(".menu-navbar li a");

  let menuStatus = false;

  // menu tlopen --------------------------------------------------------------------

  const menuTLOpen = gsap.timeline({
    default: { duration: 0.5, ease: "power4.inOut" },
  });

  menuTLOpen.to(".about-project", {
    scaleY: 1,
    stagger: 0.5,
  });

  menuTLOpen.to(".line1", { rotateZ: "35deg" }, "<");
  menuTLOpen.to(".line3", { rotateZ: "-35deg", y: "-10px" }, "<");
  menuTLOpen.to(".line2", { opacity: 0, onComplete: fadeIn }, "<");

  function fadeIn() {
    menuTLOpen.to([".about-project h1", ".about-project p"], {
      opacity: 1,
      duration: 0.5,
    });
  }

  menuTLOpen.paused(true);

  menuBurger.addEventListener("click", () => {
    if (!menuStatus) {
      menuTLOpen.play();
      menuStatus = true;
    } else {
      menuTLOpen.reverse();
      menuStatus = false;
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (!menuStatus) {
        menuTLOpen.play();
        menuStatus = true;
      } else {
        menuTLOpen.reverse();
        menuStatus = false;
      }
    });
  });
};

// ChangeVideoBackground -------------------------------------------------------

const tlLeave = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});

const tlEnter = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});

function enterShowchase(next) {
  tlEnter.fromTo(next, { opacity: 0, y: 20 }, { opacity: 1, y: 0 });
  tlEnter.fromTo(".video-background-character", { opacity: 0 }, { opacity: 1 });
  tlEnter.fromTo(
    [
      ".main-video-showchase",
      ".main-title-showchase",
      ".arrow-left-showchase",
      ".arrow-right-showchase",
    ],
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 1.5 }
  );
}

function enterTransition(next) {
  tlEnter
    .fromTo(next, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
    .fromTo(
      [".page-1-title-about h1", ".page-1-title-about p"],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
      "<30%"
    )
    .fromTo(
      [
        ".page-2-image-1",
        ".page-2-image-2",
        ".page-2-image-title",
        ".page-2-image-title-2",
        ".page-2-image-3",
        ".page-3-image-title",
        ".page-3-image-1",
        ".page-3-image-2",
        ".page-4-img-about",
        ".page-4-title-about",
      ],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, delay: 0.5 },
      "<"
    );
}

function enterTransitionBackToHome(next) {
  tlEnter.fromTo(
    next,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  );
}

function leaveTransition(current, done) {
  tlLeave.fromTo(
    current,
    { opacity: 1 },
    { opacity: 0, duration: 1, onComplete: done }
  );
}

function refreshPage(next) {
  tlEnter.fromTo(
    next,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 2.5 }
  );
}

// ChangeColor -------------------------------------------------------

// function getVideo(name) {
//   let videoChange = document.getElementById("video-testing-background");

//   switch (name) {
//     case "luffy":
//       return (videoChange.src = "./public/videos/Luffy video.mp4");

//     case "zoro":
//       return (videoChange.src = "./public/videos/Luffy video.mp4");

//     case "nami":
//       return (videoChange.src = "./public/videos/Luffy video.mp4");
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  lenisSmoothScrool();
  menuBurgerAnimation();
});

// matchmedia responsive --------------------------------------------------

const matchMediaResponsive = gsap.matchMedia();

matchMediaResponsive.add(
  {
    isDesktop: "(min-width: 1025px)",
    isMobile: "(max-width: 1024px)",
  },
  (context) => {
    console.log(context.conditions);
    const { isDesktop, isMobile } = context.conditions;

    // BARBA GSAP animation  ------------------------------------------------------

    barba.init({
      preventRunning: true,
      sync: true,
      transitions: [
        {
          name: "refresh-transition",

          async once(data) {
            let next = data.next.container;
            refreshPage(next);
          },
        },

        {
          name: "enter-about-transition",
          from: { namespace: ["home"] },
          to: { namespace: ["about"] },
          async enter(data) {
            let next = data.next.container;
            enterTransition(next);
          },
          async leave(data) {
            const done = this.async();
            let current = data.current.container;
            leaveTransition(current, done);
          },
        },

        {
          name: "enter-character-transition",
          from: { namespace: ["about"] },
          to: { namespace: ["luffy"] },
          async enter(data) {
            let next = data.next.container;
            enterShowchase(next);
          },
        },

        {
          name: "home-showchase-transition",
          from: {
            namespace: [
              "luffy",
              "zoro",
              "nami",
              "ussop",
              "sanji",
              "chooper",
              "robin",
              "franky",
              "brook",
              "jinbe",
            ],
          },
          to: {
            namespace: [
              "luffy",
              "zoro",
              "nami",
              "ussop",
              "sanji",
              "chooper",
              "robin",
              "franky",
              "brook",
              "jinbe",
            ],
          },
          async enter(data) {
            let next = data.next.container;
            enterShowchase(next);
          },
        },

        {
          name: "enter-mainhome-transition",
          from: {
            namespace: [
              "about",
              "luffy",
              "zoro",
              "nami",
              "ussop",
              "sanji",
              "chooper",
              "robin",
              "franky",
              "brook",
              "jinbe",
            ],
          },
          to: { namespace: ["home"] },
          async enter(data) {
            let next = data.next.container;
            enterTransitionBackToHome(next);
          },

          async leave(data) {
            const done = this.async();
            let current = data.current.container;
            leaveTransition(current, done);
          },
        },
      ],
    });

    // home opening animation ---------------------------------------------------------------

    const tl = gsap.timeline({
      default: { duration: 0.75, ease: "Power3.easeOut" },
    });

    tl.to(".logo-mask img", { x: 0, opacity: 1, duration: 1 })
      .to(".logo-navbar", { x: 0, opacity: 1, duration: 1, delay: 0.5 }, "<")
      .to(
        ".burger span",
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
        },
        "<"
      )
      .from(
        [".main-title"],
        {
          y: -30,
          duration: 1.5,
          opacity: 0,
          stagger: 0.2,
          delay: 0.5,
        },
        "<"
      );
  }
);
