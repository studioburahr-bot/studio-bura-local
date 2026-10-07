import { useInView } from "@/hooks/use-in-view";
import "./ForkliftAnimation.css";

// Forklift animation for the risk triage case study: a forklift carries a box to the conveyor belt.
// The SVG and its keyframes come from "src/assets/projects/Fork lift animation.svg" (see the CSS file);
// it loops on its own, exactly as the source does.
// It only runs while on screen, and stays on its first frame under reduced motion.
const ForkliftAnimation = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="rt-fork w-full" data-playing={inView}>
      <svg
        viewBox="0 0 2000 422"
        fill="none"
        className="block h-auto w-full"
        style={{ aspectRatio: "2000 / 422" }}
        aria-hidden="true"
      >
        <g id="rt-fork-Fork_lift_animation" clipPath="url(#rt-fork-clip0_78_2584)">
          <rect width="2000" height="422" id="rt-fork-Fork_lift_animation_bg_0" fill="white">
          </rect>
          <g id="rt-fork-box_3" transform="translate(1046.78 191.297)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-box_3_bg_0" fill="#1D5FD1">
            </rect>
            <g id="rt-fork-box_2">
            </g>
          </g>
          <g id="rt-fork-box_2_2" transform="translate(1125.48 191.297)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-box_2_2_bg_0" fill="#1D5FD1">
            </rect>
            <g id="rt-fork-box_2_3">
            </g>
          </g>
          <g id="rt-fork-box_1" transform="translate(1125.48 114.908)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-box_1_bg_0" fill="#1D5FD1">
            </rect>
            <g id="rt-fork-box_2_4">
            </g>
          </g>
          <path id="rt-fork-convey_belt" transform="translate(1033.35 267.686)" d="M0 11.5741C0 5.18189 5.18189 0 11.5741 0H385.648V23.1481H11.5741C5.18187 23.1481 0 17.9663 0 11.5741V11.5741Z" fill="#2E2E2E"/>
          <g id="rt-fork-box_5" transform="translate(1046.78 -403.611)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-box_5_bg_0" fill="#3680F6">
            </rect>
            <g id="rt-fork-box_2_5">
            </g>
          </g>
          <g id="rt-fork-box_6" transform="translate(1125.48 -403.611)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-box_6_bg_0" fill="#3680F6">
            </rect>
            <g id="rt-fork-box_2_6">
            </g>
          </g>
          <g id="rt-fork-box_7" transform="translate(1125.48 -480)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-box_7_bg_0" fill="#3680F6">
            </rect>
            <g id="rt-fork-box_2_7">
            </g>
          </g>
          <g id="rt-fork-moving_box" transform="translate(812.056 174.63)">
            <rect width="69.4444" height="67.1296" rx="3.7037" id="rt-fork-moving_box_bg_0" fill="#1D5FD1">
            </rect>
            <g id="rt-fork-box_2_8">
            </g>
          </g>
          <g id="rt-fork-Lift" transform="translate(609.741 119.537)">
            <path id="rt-fork-fork_vertical" transform="matrix(1 0 0 -1 184.722 135.186)" d="M0 3.7037C0 1.6582 1.6582 0 3.7037 0H13.8889V160.185C13.8889 161.208 13.0598 162.037 12.037 162.037H1.85185C0.829102 162.037 0 161.208 0 160.185L0 3.7037Z" fill="#2E2E2E"/>
            <path id="rt-fork-fork_bottom" transform="translate(189.352 125.926)" d="M0 3.7037C0 1.65821 1.6582 0 3.7037 0H42.5926C43.6153 0 44.4444 0.829102 44.4444 1.85185V7.40741C44.4444 8.43016 43.6153 9.25926 42.5926 9.25926H3.7037C1.6582 9.25926 0 7.60106 0 5.55556V3.7037Z" fill="#2E2E2E"/>
            <g id="rt-fork-Frame_12" transform="translate(-6.48136 -12.4997)">
              <path id="rt-fork-Rectangle_1" transform="translate(12.963 66.435)" d="M14.7479 21.3437C16.9661 8.99036 27.7147 0 40.2656 0H78.282C86.4721 0 93.1083 6.64549 93.0968 14.8356L93.0556 44.213H150.694V25.6944H159.259C165.396 25.6944 170.37 30.6691 170.37 36.8056V103.472H30.9961C14.8437 103.472 2.62354 88.8621 5.47836 72.9641L14.7479 21.3437Z" fill="#1D5FD1" fillOpacity="0.45"/>
              <path id="rt-fork-Rectangle_2" transform="translate(78.7037 -0.000176244)" d="M56.1553 7.40723L83.333 73.2275V106.019H33.333V83.3994C33.333 79.4122 31.1971 75.7302 27.7354 73.752L7.40723 62.1357V7.40723H56.1553Z" stroke="#2E2E2E" strokeWidth="14.8148" strokeLinejoin="round"/>
              <path id="rt-fork-Ellipse_5" transform="translate(128.704 120.833)" d="M58.2363 13.06C59.6827 11.6136 59.6936 9.25131 58.105 7.96272C53.6201 4.32484 48.3028 1.81877 42.6028 0.684968C35.6877 -0.690522 28.52 0.0154308 22.0062 2.71356C15.4923 5.41168 9.92486 9.98079 6.00779 15.8431C2.77899 20.6753 0.79111 26.2074 0.192213 31.951C-0.0199235 33.9855 1.6582 35.6482 3.7037 35.6482L34.114 35.6481C35.0963 35.6481 36.0384 35.2579 36.7329 34.5634L58.2363 13.06Z" fill="#1D5FD1"/>
              <circle id="rt-fork-Ellipse_1" transform="translate(137.963 130.092)" cx="26.3889" cy="26.3889" r="26.3889" fill="#2E2E2E"/>
              <path id="rt-fork-Ellipse_4" transform="translate(8.79637 134.259)" d="M55.0926 29.3981C57.1381 29.3981 58.8203 27.7335 58.5633 25.7042C58.2351 23.1129 57.5623 20.5713 56.5585 18.148C55.0811 14.5812 52.9156 11.3404 50.1858 8.61052C47.4559 5.88065 44.2151 3.7152 40.6483 2.2378C37.0816 0.760405 33.2588 -1.68753e-07 29.3981 0C25.5375 1.68753e-07 21.7147 0.760406 18.148 2.2378C14.5812 3.7152 11.3404 5.88065 8.61052 8.61052C5.88065 11.3404 3.71519 14.5812 2.2378 18.148C1.23401 20.5713 0.561206 23.1129 0.232998 25.7042C-0.0240252 27.7335 1.6582 29.3981 3.7037 29.3981L29.3981 29.3981H55.0926Z" fill="#1D5FD1"/>
              <circle id="rt-fork-Ellipse_2" transform="translate(18.0557 143.518)" cx="20.1389" cy="20.1389" r="20.1389" fill="#2E2E2E"/>
            </g>
          </g>
          <rect id="rt-fork-Rectangle_7" transform="translate(0 291)" width="2000" height="131" fill="#ECECEC"/>
        </g>
        <defs>
        <clipPath id="rt-fork-clip0_78_2584">
        <rect width="2000" height="422" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ForkliftAnimation;
