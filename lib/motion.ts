/**
 * Shared flags for the motion layer.
 *
 * Two attributes on <html> drive the CSS in globals.css:
 * - `data-js`: JS is running, so hidden "before" states (line reveals) may apply.
 * - `data-intro`: the intro loader is playing; its value is the stage
 *   ("pending" before hydration, then "words", then "wipe").
 *
 * Both are set by `MOTION_BOOT_SCRIPT` while the HTML is parsed, so the first
 * paint is already correct, and re-applied by `IntroLoader` after hydration
 * (React's dev Strict Mode remount clears attributes it doesn't own on <html>).
 */

export const INTRO_SESSION_KEY = "premium-arq:intro";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Window flags shared between the boot script and the client components. */
export type MotionWindow = Window & {
  /** The boot script decided the intro should play on this page load. */
  __introPending?: boolean;
  /** A client motion component has hydrated; cancels the boot failsafe. */
  __motionReady?: boolean;
};

/** If nothing has hydrated by then, drop every hidden state so content is never stuck. */
const FAILSAFE_MS = 5000;

/**
 * Runs in <head> before first paint. The intro plays once per session, never
 * under reduced motion, and never without JS (the overlay is hidden by default).
 */
export const MOTION_BOOT_SCRIPT = `(function(){var d=document.documentElement,w=window;d.setAttribute("data-js","");try{if(!matchMedia(${JSON.stringify(REDUCED_MOTION)}).matches&&!sessionStorage.getItem(${JSON.stringify(INTRO_SESSION_KEY)})){sessionStorage.setItem(${JSON.stringify(INTRO_SESSION_KEY)},"1");d.setAttribute("data-intro","pending");w.__introPending=true}}catch(e){}setTimeout(function(){if(!w.__motionReady){d.removeAttribute("data-js");d.removeAttribute("data-intro")}},${FAILSAFE_MS})})()`;
