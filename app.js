gsap.registerPlugin(ScrollTrigger);

// lenis scrool basic setup -------------------------------------------

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// navbar burger toggle mobile version -------------------------------------------

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

    const tlLeave = gsap.timeline({
      default: { duration: 0.75, ease: "Power2.easeOut" },
    });

    const tlEnter = gsap.timeline({
      default: { duration: 0.75, ease: "Power2.easeOut" },
    });

    // CHARACTER PAGE TRANSITION animation  -------------------------------------------

    barba.init({
      preventRunning: true,
      sync: true,
      transitions: [
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
          name: "home-showchase-transition",
          from: {
            namespace: [
              "home",
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
        },
      ],
    });

    function enterTransitionBackToHome(next) {
      tlEnter.fromTo(next, { y: 20, opacity: 0 }, { y: 0, opacity: 1.5 });
    }

    function enterTransition(next) {
      tlEnter
        .fromTo(next, { x: -10 }, { x: 0 })
        .fromTo(
          [
            ".page-1-img-about img",
            ".page-1-title-about h1",
            ".page-1-title-about",
          ],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 1, delay: 0.2 },
          "<"
        )
        .fromTo(
          [
            ".page-2-image-1",
            ".page-2-image-2",
            ".page-2-image-3",
            ".page-2-image-title",
            ".page-2-image-title-2",
            ".page-2-image-4",
            ".page-3-image-title",
            ".page-3-image-1",
            ".page-3-image-2",
            ".page-3-image-3",
            ".page-3-image-4",
            ".page-3-image-5",
            ".page-3-image-6",
            ".page-4-title-about",
          ],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 1, delay: 0.5 },
          "<"
        );
    }

    function leaveTransition(current, done) {
      tlLeave.fromTo(
        current,
        { opacity: 1 },
        { opacity: 0, duration: 1, onComplete: done }
      );
    }

    function enterShowchase() {
      tlEnter.fromTo(
        [
          ".main-image-showchase",
          ".main-video-showchase",
          ".main-title-showchase",
          ".about-me-showchase",
          ".bounty-poster-showchase",
          ".pirates-flag-showchase",
        ],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
      );
    }

    // home opening animation ---------------------------------------------------------------

    const tl = gsap.timeline({
      default: { duration: 0.75, ease: "Power3.easeOut" },
    });

    gsap.set(".main-container", {
      display: "none",
    });

    gsap.set([".thousand-sunny-img", ".main-video-home-container"], {
      yPercent: -5,
      opacity: 0,
      scale: 1.2,
    });

    gsap.set(".character-showchase-img", {
      scale: 1.2,
    });

    function showDescriptionMainHome() {
      gsap.to([".thousand-sunny-img"], {
        scale: 1,
        duration: 2,
      });
    }

    // animation opening animation -----------------------------------------

    tl.to(".loader", { width: "100%", duration: 2.5, ease: "power1.inOut" });

    tl.from(
      [".opening-image img", ".image-title-animation h1"],
      {
        y: "-20%",
        ease: "elastic.out(1, 0.3)",
        duration: 1.5,
      },
      "<"
    );
    tl.to(".loader", { height: "100vh", top: 0, duration: 1.5 });
    tl.to(".opening-animation", { display: "none" });
    tl.to(".main-container", { display: "block" }, "<");

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
      .to(
        [".thousand-sunny-img", ".main-video-home-container"],
        {
          yPercent: 0,
          duration: 1,
          opacity: 1,
          stagger: 0.2,
          ease: "bounce.out",
          onComplete: showDescriptionMainHome,
        },
        "<"
      )
      .from(
        [".explore-showchase-bg", ".character-showchase"],
        {
          y: -20,
          duration: 1,
          opacity: 0,
          stagger: 0.2,
          ease: "bounce.out",
        },
        "<"
      )
      .from(
        [".svg-text", ".main-title", ".character-showchase-button"],
        {
          y: -30,
          duration: 1.5,
          opacity: 0,
          stagger: 0.2,
          delay: 1,
        },
        "<"
      );
  }
);
