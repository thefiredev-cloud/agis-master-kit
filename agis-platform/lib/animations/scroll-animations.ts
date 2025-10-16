import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize scroll animations with prefers-reduced-motion check
 */
export function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Disable all scroll-triggered animations
    ScrollTrigger.config({ autoRefreshEvents: "none" });
    return { enabled: false };
  }

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  return { enabled: true };
}

/**
 * Split text into characters for letter-by-letter animation
 */
export function splitTextIntoChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || "";
  const chars: HTMLSpanElement[] = [];
  
  element.innerHTML = "";
  
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    
    // Preserve spaces
    if (char === " ") {
      span.style.width = "0.3em";
    }
    
    chars.push(span);
    element.appendChild(span);
  });
  
  return chars;
}

/**
 * Animate split letters on scroll (stagger reveal)
 */
export function animateSplitText(
  selector: string | HTMLElement,
  options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    triggerStart?: string;
  } = {}
) {
  const {
    stagger = 0.02,
    duration = 0.8,
    ease = "power3.out",
    triggerStart = "top 80%",
  } = options;

  const elements =
    typeof selector === "string"
      ? document.querySelectorAll(selector)
      : [selector];

  elements.forEach((element) => {
    const chars = splitTextIntoChars(element as HTMLElement);

    gsap.set(chars, {
      opacity: 0,
      y: 50,
      rotationX: -90,
    });

    ScrollTrigger.create({
      trigger: element,
      start: triggerStart,
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration,
          stagger,
          ease,
        });
      },
    });
  });
}

/**
 * Fade up animation for sections/cards
 */
export function animateFadeUp(
  selector: string,
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    triggerStart?: string;
  } = {}
) {
  const {
    stagger = 0.1,
    duration = 1,
    y = 60,
    triggerStart = "top 85%",
  } = options;

  const elements = document.querySelectorAll(selector);

  gsap.set(elements, {
    opacity: 0,
    y,
  });

  ScrollTrigger.batch(elements, {
    start: triggerStart,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
      });
    },
  });
}

/**
 * Pin section with scrubbed animation
 */
export function animatePinSection(
  triggerElement: string | HTMLElement,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    animation?: gsap.core.Timeline;
  } = {}
) {
  const {
    start = "top top",
    end = "+=2000",
    scrub = 1,
    pin = true,
    animation,
  } = options;

  return ScrollTrigger.create({
    trigger: triggerElement,
    start,
    end,
    scrub,
    pin,
    animation,
  });
}

/**
 * Create horizontal scroll section
 */
export function createHorizontalScroll(
  containerSelector: string,
  itemsSelector: string
) {
  const container = document.querySelector(containerSelector);
  const items = gsap.utils.toArray(itemsSelector) as HTMLElement[];

  if (!container || items.length === 0) return;

  const totalWidth = items.reduce((acc: number, item: HTMLElement) => {
    return acc + item.offsetWidth;
  }, 0);

  gsap.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${totalWidth}`,
    },
  });
}

/**
 * Image sequence animation (pinned)
 */
export function animateImageSequence(
  containerSelector: string,
  images: string[],
  options: {
    start?: string;
    end?: string;
  } = {}
) {
  const { start = "top top", end = "+=3000" } = options;
  const container = document.querySelector(containerSelector);

  if (!container) return;

  // Create image elements
  const imageElements = images.map((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = index === 0 ? "1" : "0";
    container.appendChild(img);
    return img;
  });

  // Animate opacity based on scroll
  ScrollTrigger.create({
    trigger: container,
    start,
    end,
    pin: true,
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = self.progress;
      const imageIndex = Math.floor(progress * images.length);

      imageElements.forEach((img, index) => {
        img.style.opacity = index === imageIndex ? "1" : "0";
      });
    },
  });
}

/**
 * Parallax effect for elements
 */
export function animateParallax(
  selector: string,
  options: {
    speed?: number;
    start?: string;
    end?: string;
  } = {}
) {
  const { speed = 0.5, start = "top bottom", end = "bottom top" } = options;
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    });
  });
}

/**
 * Cleanup all ScrollTriggers
 */
export function cleanupScrollAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

