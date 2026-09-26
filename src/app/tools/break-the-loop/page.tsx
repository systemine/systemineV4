"use client";

import { useEffect, useMemo, useState } from "react";

type MoveId =
  | "scene"
  | "state"
  | "distract"
  | "connect"
  | "delay"
  | "thought";

type Stage = "rate" | "moves" | "mission" | "check" | "result";

const moves: {
  id: MoveId;
  number: string;
  title: string;
  description: string;
  actions: string[];
  duration?: number;
}[] = [
  {
    id: "scene",
    number: "01",
    title: "CHANGE THE SCENE",
    description:
      "Make drinking a little less automatic by changing where you are.",
    actions: [
      "Leave the room",
      "Go outside",
      "Take a short walk",
      "Move somewhere else",
      "Take a shower",
    ],
    duration: 120,
  },
  {
    id: "state",
    number: "02",
    title: "CHANGE YOUR STATE",
    description:
      "Give your body something else to do for the next few minutes.",
    actions: [
      "Drink some water",
      "Stretch or move",
      "Change temperature",
      "Keep your hands busy",
      "Slow your breathing",
    ],
    duration: 120,
  },
  {
    id: "distract",
    number: "03",
    title: "DISTRACT",
    description:
      "Give your attention somewhere else on purpose.",
    actions: [
      "Listen to one song properly",
      "Play a tiny game",
      "Clean one small thing",
      "Make something",
      "Watch something short",
    ],
    duration: 180,
  },
  {
    id: "connect",
    number: "04",
    title: "CONNECT",
    description:
      "Bring another person into the moment instead of handling it alone.",
    actions: [
      "Text someone",
      "Call someone",
      "Sit near someone safe",
      "Tell someone you are having a difficult moment",
    ],
    duration: 180,
  },
  {
    id: "delay",
    number: "05",
    title: "BUY SOME TIME",
    description:
      "You do not have to decide right now. Just postpone the decision.",
    actions: [],
    duration: 600,
  },
  {
    id: "thought",
    number: "06",
    title: "WORK WITH THE THOUGHT",
    description:
      "Slow down the thought that is making alcohol feel necessary right now.",
    actions: [],
  },
];

const timerMessages = [
  "Nothing needs to be solved in the next few minutes.",
  "The urge can be loud without being in charge.",
  "Your brain would like an immediate answer. We are declining the meeting.",
  "Plot twist: we are only dealing with the next few minutes.",
  "This is not a test of willpower. It is an experiment.",
  "You do not have to make the urge disappear for this to count.",
  "Your brain may have started negotiating. It can wait.",
  "Yes, we are literally waiting. That is the point.",
  "You are currently doing something different.",
  "The timer has one job. You have one job. Let us not overcomplicate the org chart.",
  "Nothing has gone wrong because the urge is still here.",
  "You do not have to win. You just have to interrupt the usual sequence.",
];

const outcomes = [
  "It got weaker",
  "It changed",
  "It stayed about the same",
  "It got stronger",
  "I am not sure",
];

const CSS = `
  .break-loop {
    --bg: #191919;
    --card: #383836;
    --card-light: #41413e;
    --yellow: #dad13b;
    --yellow-light: #e2e756;
    --red: #9f2125;
    --cream: #f1eee7;
    --muted: rgba(241,238,231,.62);
    --faint: rgba(241,238,231,.36);
    --line: rgba(241,238,231,.10);

    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(
        circle at 12% 12%,
        rgba(218,209,59,.055),
        transparent 24%
      ),
      radial-gradient(
        circle at 88% 72%,
        rgba(159,33,37,.055),
        transparent 28%
      ),
      var(--bg);
    color: var(--cream);
  }

  .break-loop *,
  .break-loop *::before,
  .break-loop *::after {
    box-sizing: border-box;
  }

  .break-loop button,
  .break-loop input,
  .break-loop textarea {
    font: inherit;
  }

  .break-loop button {
    -webkit-tap-highlight-color: transparent;
  }

  .break-loop-grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 30;
    opacity: .035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
  }

  .break-loop-inner {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .break-loop-intro {
    padding: 72px 0 46px;
    position: relative;
  }

  .break-loop-intro::after {
    content: "";
    position: absolute;
    right: 5%;
    top: 52px;
    width: 96px;
    height: 96px;
    border: 1px solid rgba(218,209,59,.22);
    transform: rotate(45deg);
    animation: blFloat 7s ease-in-out infinite;
  }

  .bl-kicker,
  .bl-eyebrow {
    display: block;
    color: var(--yellow);
    font-size: 10px;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: .17em;
    text-transform: uppercase;
  }

  .break-loop-intro h1 {
    margin: 12px 0 16px;
    max-width: 760px;
    color: var(--cream);
    font-size: clamp(52px, 8vw, 92px);
    line-height: .9;
    font-weight: 850;
    letter-spacing: -.06em;
  }

  .break-loop-intro-copy {
    max-width: 610px;
    margin: 0;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.7;
  }

  .bl-progress {
    display: flex;
    align-items: center;
    gap: 11px;
    margin-top: 46px;
    color: rgba(241,238,231,.27);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .15em;
  }

  .bl-progress span.active {
    color: var(--yellow);
  }

  .bl-progress i {
    width: 34px;
    height: 1px;
    background: rgba(241,238,231,.11);
  }

  .bl-stage {
    padding-bottom: 90px;
  }

  .bl-panel,
  .bl-result {
    border: 1px solid var(--line);
    background: rgba(56,56,54,.72);
    box-shadow: 0 28px 90px rgba(0,0,0,.22);
    backdrop-filter: blur(14px);
    animation: blReveal .42s cubic-bezier(.2,.75,.25,1) both;
  }

  .bl-panel {
    display: grid;
    grid-template-columns: 86px minmax(0,700px);
    gap: 30px;
    min-height: 500px;
    padding: 52px;
  }

  .bl-step {
    padding-top: 2px;
    color: var(--yellow);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: .14em;
  }

  .bl-content {
    max-width: 700px;
  }

  .bl-content h2,
  .bl-section-heading h2,
  .bl-result h2 {
    margin: 10px 0 13px;
    color: var(--cream);
    font-size: clamp(30px,4.2vw,50px);
    line-height: 1;
    letter-spacing: -.045em;
  }

  .bl-copy {
    max-width: 600px;
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
    font-size: 15px;
  }

  .bl-rating {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 42px 0 15px;
  }

  .bl-rating strong {
    color: var(--yellow);
    font-size: 76px;
    line-height: .9;
    font-weight: 850;
    letter-spacing: -.08em;
  }

  .bl-rating span {
    color: var(--faint);
    font-size: 17px;
  }

  .bl-range {
    display: block;
    width: 100%;
    max-width: 600px;
    height: 5px;
    accent-color: var(--yellow);
    cursor: pointer;
  }

  .bl-range-labels {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    margin-top: 9px;
    color: rgba(241,238,231,.31);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .bl-target,
  .bl-result-note,
  .bl-chosen {
    max-width: 600px;
    margin-top: 34px;
    padding: 19px 21px;
    border-left: 2px solid var(--yellow);
    background: rgba(25,25,25,.44);
  }

  .bl-target-label,
  .bl-chosen span,
  .bl-delay span,
  .bl-result-note span {
    display: block;
    color: var(--yellow);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .15em;
  }

  .bl-target p,
  .bl-result-note p,
  .bl-chosen p,
  .bl-delay p {
    margin: 9px 0 0;
    color: rgba(241,238,231,.63);
    font-size: 13px;
    line-height: 1.6;
  }

  .bl-primary {
    min-height: 52px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    margin-top: 30px;
    padding: 0 20px;
    border: 0;
    background: var(--yellow);
    color: var(--bg);
    font-weight: 850;
    cursor: pointer;
    transition:
      transform .18s ease,
      background .18s ease,
      box-shadow .18s ease;
  }

  .bl-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    background: var(--yellow-light);
    box-shadow: 0 9px 28px rgba(218,209,59,.10);
  }

  .bl-primary:disabled {
    opacity: .32;
    cursor: not-allowed;
  }

  .bl-primary span {
    font-size: 18px;
  }

  .bl-back {
    display: inline-block;
    margin-top: 23px;
    padding: 0;
    border: 0;
    background: transparent;
    color: rgba(241,238,231,.38);
    font-size: 12px;
    cursor: pointer;
    transition: color .18s ease;
  }

  .bl-back:hover {
    color: var(--yellow);
  }

  .bl-section-heading {
    display: grid;
    grid-template-columns: 86px 1fr;
    gap: 30px;
    margin-bottom: 32px;
    animation: blReveal .42s cubic-bezier(.2,.75,.25,1) both;
  }

  .bl-section-heading p {
    max-width: 620px;
    margin: 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.65;
  }

  .bl-move-grid {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 12px;
  }

  .bl-move {
    position: relative;
    min-height: 190px;
    padding: 25px;
    overflow: hidden;
    text-align: left;
    border: 1px solid rgba(241,238,231,.09);
    background: var(--card);
    color: var(--cream);
    cursor: pointer;
    transition:
      transform .22s ease,
      background .22s ease,
      border-color .22s ease;
  }

  .bl-move::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 3px;
    background: var(--yellow);
    transition: width .3s ease;
  }

  .bl-move:hover {
    transform: translateY(-4px);
    background: var(--card-light);
    border-color: rgba(218,209,59,.56);
  }

  .bl-move:hover::before {
    width: 100%;
  }

  .bl-move-number {
    color: var(--yellow);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .14em;
  }

  .bl-move-title {
    display: block;
    margin-top: 27px;
    font-size: 20px;
    font-weight: 850;
    letter-spacing: -.025em;
  }

  .bl-move-description {
    display: block;
    max-width: 390px;
    margin-top: 9px;
    color: rgba(241,238,231,.53);
    font-size: 13px;
    line-height: 1.5;
  }

  .bl-move-arrow {
    position: absolute;
    right: 22px;
    bottom: 19px;
    color: var(--yellow);
    font-size: 19px;
    transition: transform .18s ease;
  }

  .bl-move:hover .bl-move-arrow {
    transform: translateX(5px);
  }

  .bl-field-label {
    display: block;
    margin: 28px 0 10px;
    color: rgba(241,238,231,.76);
    font-size: 11px;
    font-weight: 750;
    letter-spacing: .05em;
  }

  .bl-textarea {
    display: block;
    width: 100%;
    min-height: 130px;
    padding: 15px;
    resize: vertical;
    border: 1px solid rgba(241,238,231,.11);
    outline: none;
    background: rgba(25,25,25,.54);
    color: var(--cream);
    line-height: 1.55;
    transition: border-color .18s ease;
  }

  .bl-textarea:focus {
    border-color: var(--yellow);
  }

  .bl-textarea::placeholder {
    color: rgba(241,238,231,.23);
  }

  .bl-choice-grid,
  .bl-options {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 8px;
  }

  .bl-options {
    margin: 33px 0;
    gap: 9px;
  }

  .bl-choice,
  .bl-option {
    min-height: 48px;
    padding: 10px 13px;
    text-align: left;
    border: 1px solid rgba(241,238,231,.10);
    background: rgba(25,25,25,.48);
    color: rgba(241,238,231,.72);
    cursor: pointer;
    transition:
      transform .18s ease,
      border-color .18s ease,
      background .18s ease;
  }

  .bl-option {
    min-height: 55px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 16px;
  }

  .bl-choice:hover,
  .bl-option:hover {
    transform: translateY(-1px);
    border-color: rgba(218,209,59,.5);
  }

  .bl-choice.selected,
  .bl-option.selected {
    border-color: var(--yellow);
    background: rgba(218,209,59,.11);
    color: var(--cream);
  }

  .bl-option-dot {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;
    border: 1px solid rgba(218,209,59,.7);
    border-radius: 50%;
  }

  .bl-option.selected .bl-option-dot {
    background: var(--yellow);
  }

  .bl-chosen {
    margin-top: 0;
  }

  .bl-chosen strong {
    display: block;
    margin-top: 7px;
    font-size: 18px;
  }

  .bl-delay {
    margin-top: 35px;
    padding: 27px;
    border: 1px solid rgba(218,209,59,.20);
    background:
      linear-gradient(
        135deg,
        rgba(218,209,59,.08),
        rgba(25,25,25,.24)
      );
  }

  .bl-delay strong {
    display: block;
    margin-top: 9px;
    font-size: clamp(27px,4vw,42px);
    line-height: 1;
    letter-spacing: -.04em;
  }

  .bl-timer {
    margin-top: 30px;
    padding: 30px;
    text-align: center;
    border: 1px solid rgba(218,209,59,.23);
    background: rgba(25,25,25,.55);
  }

  .bl-timer-number {
    color: var(--yellow);
    font-size: clamp(70px,12vw,125px);
    line-height: .86;
    font-weight: 800;
    letter-spacing: -.08em;
    font-variant-numeric: tabular-nums;
  }

  .bl-timer-message {
    min-height: 48px;
    max-width: 540px;
    margin: 26px auto 0;
    color: rgba(241,238,231,.62);
    font-size: 14px;
    line-height: 1.55;
    animation: blMessage .45s ease;
  }

  .bl-timer-track {
    height: 3px;
    margin-top: 25px;
    overflow: hidden;
    background: rgba(241,238,231,.08);
  }

  .bl-timer-track::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: var(--yellow);
    transform-origin: left;
    animation: blPulse 1.25s ease-in-out infinite;
  }

  .bl-timer-finish {
    margin-top: 19px;
    padding: 10px 14px;
    border: 1px solid rgba(241,238,231,.12);
    background: transparent;
    color: rgba(241,238,231,.48);
    cursor: pointer;
    transition:
      color .18s ease,
      border-color .18s ease;
  }

  .bl-timer-finish:hover {
    color: var(--yellow);
    border-color: rgba(218,209,59,.4);
  }

  .bl-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    max-width: 600px;
    gap: 20px;
    margin-top: 38px;
    padding: 22px 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .bl-comparison-side {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .bl-comparison-side span {
    color: rgba(241,238,231,.30);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .13em;
  }

  .bl-comparison-side strong {
    font-size: 22px;
  }

  .bl-comparison-arrow {
    color: var(--yellow);
    font-size: 22px;
  }

  .bl-result {
    display: grid;
    grid-template-columns: minmax(0,1fr) 320px;
    gap: 70px;
    min-height: 560px;
    padding: 55px;
  }

  .bl-result-number {
    margin-top: 38px;
    color: var(--yellow);
    font-size: 88px;
    line-height: .88;
    font-weight: 850;
    letter-spacing: -.08em;
  }

  .bl-result-copy {
    max-width: 620px;
    margin-top: 25px;
    color: rgba(241,238,231,.67);
    font-size: 15px;
    line-height: 1.7;
  }

  .bl-result-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bl-orbit {
    position: relative;
    width: 250px;
    height: 250px;
    display: grid;
    place-items: center;
  }

  .bl-orbit-core {
    position: relative;
    z-index: 2;
    width: 98px;
    height: 98px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--yellow);
    color: var(--bg);
    box-shadow: 0 0 55px rgba(218,209,59,.12);
  }

  .bl-orbit-core strong {
    font-size: 29px;
    line-height: 1;
    letter-spacing: -.06em;
  }

  .bl-orbit-core small {
    margin-top: 4px;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .bl-ring {
    position: absolute;
    border: 1px solid rgba(218,209,59,.22);
    border-radius: 50%;
  }

  .bl-ring-one {
    inset: 18px;
    animation: blSpin 14s linear infinite;
  }

  .bl-ring-two {
    inset: 53px;
    border-color: rgba(159,33,37,.32);
    animation: blSpinReverse 9s linear infinite;
  }

  .bl-orbit-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--yellow);
  }

  .bl-dot-one {
    top: 18px;
    left: 121px;
  }

  .bl-dot-two {
    right: 24px;
    bottom: 77px;
    background: var(--red);
  }

  .bl-dot-three {
    left: 43px;
    bottom: 37px;
  }

  .bl-result-side > p {
    max-width: 275px;
    margin: 31px 0 0;
    color: rgba(241,238,231,.40);
    font-size: 12px;
    line-height: 1.6;
    text-align: center;
  }

  .bl-result-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .bl-secondary {
    min-height: 52px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 24px;
    padding: 0 18px;
    border: 1px solid rgba(218,209,59,.33);
    background: transparent;
    color: var(--yellow);
    text-decoration: none;
    cursor: pointer;
    transition:
      transform .18s ease,
      border-color .18s ease;
  }

  .bl-secondary:hover {
    transform: translateY(-2px);
    border-color: var(--yellow);
  }

  .bl-footer {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
    padding: 25px 0 38px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border-top: 1px solid var(--line);
    color: rgba(241,238,231,.28);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .14em;
  }

  .bl-footer a {
    color: rgba(218,209,59,.62);
    text-decoration: none;
  }

  @keyframes blReveal {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blFloat {
    0%,100% {
      transform: rotate(45deg) translate(0,0);
    }
    50% {
      transform: rotate(49deg) translate(5px,-5px);
    }
  }

  @keyframes blMessage {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blPulse {
    0%,100% {
      opacity: .4;
      transform: scaleX(.72);
    }
    50% {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  @keyframes blSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes blSpinReverse {
    to {
      transform: rotate(-360deg);
    }
  }

  @media (max-width: 800px) {
    .break-loop-inner,
    .bl-footer {
      width: min(100% - 28px, 620px);
    }

    .break-loop-intro {
      padding: 52px 0 34px;
    }

    .break-loop-intro::after {
      width: 68px;
      height: 68px;
      top: 38px;
      right: 3%;
    }

    .break-loop-intro h1 {
      max-width: 90%;
      font-size: clamp(48px,16vw,72px);
    }

    .break-loop-intro-copy {
      font-size: 14px;
    }

    .bl-progress {
      gap: 6px;
      font-size: 8px;
    }

    .bl-progress i {
      width: 13px;
    }

    .bl-panel,
    .bl-result {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 30px 24px;
    }

    .bl-panel {
      min-height: auto;
    }

    .bl-step {
      padding-top: 0;
    }

    .bl-section-heading {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .bl-move-grid,
    .bl-options,
    .bl-choice-grid {
      grid-template-columns: 1fr;
    }

    .bl-result {
      gap: 25px;
    }

    .bl-result-side {
      order: -1;
    }

    .bl-result-number {
      font-size: 70px;
    }

    .bl-orbit {
      width: 190px;
      height: 190px;
    }

    .bl-orbit-core {
      width: 77px;
      height: 77px;
    }

    .bl-orbit-core strong {
      font-size: 23px;
    }

    .bl-ring-one {
      inset: 12px;
    }

    .bl-ring-two {
      inset: 40px;
    }

    .bl-dot-one {
      top: 9px;
      left: 91px;
    }

    .bl-dot-two {
      right: 18px;
      bottom: 56px;
    }

    .bl-dot-three {
      left: 30px;
      bottom: 26px;
    }

    .bl-footer {
      flex-direction: column;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .break-loop *,
    .break-loop *::before,
    .break-loop *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: .01ms !important;
    }
  }
`;

export default function BreakTheLoopPage() {
  const [stage, setStage] = useState<Stage>("rate");
  const [before, setBefore] = useState(3);
  const [after, setAfter] = useState(3);

  const [selectedMove, setSelectedMove] =
    useState<MoveId | null>(null);

  const [selectedAction, setSelectedAction] =
    useState("");

  const [thought, setThought] = useState("");
  const [promise, setPromise] = useState("");

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [outcome, setOutcome] = useState("");

  const selected = useMemo(
    () =>
      moves.find(
        (move) => move.id === selectedMove
      ) ?? null,
    [selectedMove]
  );

  const target = Math.max(0, before - 1);
  const difference = after - before;

  useEffect(() => {
    const style = document.createElement("style");

    style.setAttribute(
      "data-systemine-break-the-loop",
      "true"
    );

    style.textContent = CSS;

    document.head.appendChild(style);

    return () => {
      const existing = document.querySelector(
        'style[data-systemine-break-the-loop="true"]'
      );

      if (existing) {
        existing.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const messageTimer = window.setInterval(() => {
      setMessageIndex(
        (current) =>
          (current + 1) % timerMessages.length
      );
    }, 9000);

    return () => window.clearInterval(messageTimer);
  }, [running]);

  useEffect(() => {
    if (running && seconds === 0) {
      setRunning(false);

      if (selectedMove !== "thought") {
        setStage("check");
      }
    }
  }, [seconds, running, selectedMove]);

  function chooseMove(id: MoveId) {
    const move = moves.find(
      (item) => item.id === id
    );

    setSelectedMove(id);
    setSelectedAction("");
    setThought("");
    setPromise("");
    setMessageIndex(0);
    setSeconds(move?.duration ?? 0);
    setRunning(false);
    setStage("mission");
  }

  function startMission() {
    if (!selected) return;

    if (selected.id === "thought") {
      setStage("check");
      return;
    }

    setMessageIndex(0);
    setRunning(true);
  }

  function finishMission() {
    setRunning(false);
    setSeconds(0);
    setStage("check");
  }

  function reset() {
    setStage("rate");
    setBefore(3);
    setAfter(3);
    setSelectedMove(null);
    setSelectedAction("");
    setThought("");
    setPromise("");
    setSeconds(0);
    setRunning(false);
    setMessageIndex(0);
    setOutcome("");
  }

  function formatTimer(value: number) {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (value % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <main className="break-loop">
      <div
        className="break-loop-grain"
        aria-hidden="true"
      />

      <div className="break-loop-inner">
        <section className="break-loop-intro">
          <span className="bl-kicker">
            URGE INTERRUPTER / 01
          </span>

          <h1>Break the loop.</h1>

          <p className="break-loop-intro-copy">
            Create a little space between wanting and doing.
            <br />
            You do not have to solve everything right now.
          </p>

          <div className="bl-progress">
            <span
              className={
                stage === "rate" ? "active" : ""
              }
            >
              RATE
            </span>

            <i />

            <span
              className={
                stage === "moves" ? "active" : ""
              }
            >
              CHOOSE
            </span>

            <i />

            <span
              className={
                stage === "mission" ? "active" : ""
              }
            >
              DO
            </span>

            <i />

            <span
              className={
                stage === "check" ||
                stage === "result"
                  ? "active"
                  : ""
              }
            >
              CHECK
            </span>
          </div>
        </section>

        <section className="bl-stage">
          {stage === "rate" && (
            <div className="bl-panel">
              <div className="bl-step">01</div>

              <div className="bl-content">
                <span className="bl-eyebrow">
                  CATCH THE MOMENT
                </span>

                <h2>
                  How strong is the urge right now?
                </h2>

                <p className="bl-copy">
                  There is no right number. Just give this
                  moment a rough rating.
                </p>

                <div className="bl-rating">
                  <strong>{before}</strong>
                  <span>/ 5</span>
                </div>

                <input
                  className="bl-range"
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={before}
                  onChange={(event) =>
                    setBefore(
                      Number(event.target.value)
                    )
                  }
                  aria-label="Urge intensity before"
                />

                <div className="bl-range-labels">
                  <span>0 · none</span>
                  <span>5 · very strong</span>
                </div>

                <div className="bl-target">
                  <span className="bl-target-label">
                    ONE-NOTCH EXPERIMENT
                  </span>

                  <p>
                    You do not need to make the urge
                    disappear. For now, we are simply
                    seeing whether you can create enough
                    space to move from{" "}
                    <b>{before}</b> to around{" "}
                    <b>{target}</b>.
                  </p>
                </div>

                <button
                  className="bl-primary"
                  onClick={() =>
                    setStage("moves")
                  }
                >
                  Choose an interruption
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {stage === "moves" && (
            <div>
              <div className="bl-section-heading">
                <div className="bl-step">02</div>

                <div>
                  <span className="bl-eyebrow">
                    PICK ONE MOVE
                  </span>

                  <h2>
                    What kind of interruption feels
                    possible?
                  </h2>

                  <p>
                    You are not choosing the perfect
                    strategy. Just choose one thing you
                    can actually do right now.
                  </p>
                </div>
              </div>

              <div className="bl-move-grid">
                {moves.map((move) => (
                  <button
                    key={move.id}
                    className="bl-move"
                    onClick={() =>
                      chooseMove(move.id)
                    }
                  >
                    <span className="bl-move-number">
                      {move.number}
                    </span>

                    <span className="bl-move-title">
                      {move.title}
                    </span>

                    <span className="bl-move-description">
                      {move.description}
                    </span>

                    <span className="bl-move-arrow">
                      →
                    </span>
                  </button>
                ))}
              </div>

              <button
                className="bl-back"
                onClick={() =>
                  setStage("rate")
                }
              >
                ← Change my rating
              </button>
            </div>
          )}

          {stage === "mission" && selected && (
            <div className="bl-panel">
              <div className="bl-step">
                {selected.number}
              </div>

              <div className="bl-content">
                <span className="bl-eyebrow">
                  {selected.title}
                </span>

                <h2>{selected.description}</h2>

                {selected.id === "thought" ? (
                  <>
                    <label
                      className="bl-field-label"
                      htmlFor="thought"
                    >
                      What is your mind telling you
                      right now?
                    </label>

                    <textarea
                      id="thought"
                      className="bl-textarea"
                      value={thought}
                      onChange={(event) =>
                        setThought(
                          event.target.value
                        )
                      }
                      placeholder="Write the thought as it actually sounds..."
                    />

                    <label className="bl-field-label">
                      What does the thought promise?
                    </label>

                    <div className="bl-choice-grid">
                      {[
                        "Relief",
                        "Escape",
                        "Sleep",
                        "Quiet",
                        "Fun",
                        "Connection",
                        "Confidence",
                        "Not feeling something",
                      ].map((item) => (
                        <button
                          key={item}
                          className={`bl-choice ${
                            promise === item
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setPromise(item)
                          }
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <button
                      className="bl-primary"
                      disabled={!thought.trim()}
                      onClick={() =>
                        setStage("check")
                      }
                    >
                      Check the urge
                      <span>→</span>
                    </button>
                  </>
                ) : selected.id === "delay" ? (
                  <div className="bl-delay">
                    <span>THE DEAL</span>

                    <strong>
                      Do not decide yet.
                    </strong>

                    <p>
                      You do not have to say no. You
                      do not have to say yes. Just give
                      the decision ten minutes.
                    </p>

                    {!running &&
                    seconds === 0 ? (
                      <button
                        className="bl-primary"
                        onClick={startMission}
                      >
                        Start the 10-minute deal
                        <span>→</span>
                      </button>
                    ) : (
                      <div className="bl-timer">
                        <div className="bl-timer-number">
                          {formatTimer(seconds)}
                        </div>

                        <p
                          className="bl-timer-message"
                          key={messageIndex}
                        >
                          {timerMessages[
                            messageIndex
                          ]}
                        </p>

                        <div className="bl-timer-track" />

                        <button
                          className="bl-timer-finish"
                          onClick={finishMission}
                        >
                          I am ready to check
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="bl-options">
                      {selected.actions.map(
                        (action) => (
                          <button
                            key={action}
                            className={`bl-option ${
                              selectedAction ===
                              action
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedAction(
                                action
                              )
                            }
                          >
                            <span className="bl-option-dot" />
                            {action}
                          </button>
                        )
                      )}
                    </div>

                    {selectedAction &&
                      !running &&
                      seconds > 0 && (
                        <div className="bl-chosen">
                          <span>YOUR MOVE</span>

                          <strong>
                            {selectedAction}
                          </strong>

                          <p>
                            Give it the next few
                            minutes. You can stop
                            sooner if you need to.
                          </p>
                        </div>
                      )}

                    {!running &&
                    seconds > 0 ? (
                      <button
                        className="bl-primary"
                        disabled={!selectedAction}
                        onClick={
                          startMission
                        }
                      >
                        Start the interruption
                        <span>→</span>
                      </button>
                    ) : running ? (
                      <div className="bl-timer">
                        <div className="bl-timer-number">
                          {formatTimer(seconds)}
                        </div>

                        <p
                          className="bl-timer-message"
                          key={messageIndex}
                        >
                          {timerMessages[
                            messageIndex
                          ]}
                        </p>

                        <div className="bl-timer-track" />

                        <button
                          className="bl-timer-finish"
                          onClick={
                            finishMission
                          }
                        >
                          I am ready to check
                        </button>
                      </div>
                    ) : null}
                  </>
                )}

                <button
                  className="bl-back"
                  onClick={() =>
                    setStage("moves")
                  }
                >
                  ← Pick something else
                </button>
              </div>
            </div>
          )}

          {stage === "check" && (
            <div className="bl-panel">
              <div className="bl-step">03</div>

              <div className="bl-content">
                <span className="bl-eyebrow">
                  CHECK AGAIN
                </span>

                <h2>
                  What is the urge like now?
                </h2>

                <p className="bl-copy">
                  Same scale. Different moment. Notice
                  what changed, even if the change is
                  tiny.
                </p>

                <div className="bl-rating">
                  <strong>{after}</strong>
                  <span>/ 5</span>
                </div>

                <input
                  className="bl-range"
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={after}
                  onChange={(event) =>
                    setAfter(
                      Number(event.target.value)
                    )
                  }
                  aria-label="Urge intensity after"
                />

                <div className="bl-range-labels">
                  <span>0 · none</span>
                  <span>5 · very strong</span>
                </div>

                <div className="bl-comparison">
                  <div className="bl-comparison-side">
                    <span>BEFORE</span>
                    <strong>
                      {before}/5
                    </strong>
                  </div>

                  <div className="bl-comparison-arrow">
                    →
                  </div>

                  <div className="bl-comparison-side">
                    <span>NOW</span>
                    <strong>
                      {after}/5
                    </strong>
                  </div>
                </div>

                <button
                  className="bl-primary"
                  onClick={() =>
                    setStage("result")
                  }
                >
                  See what I learned
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {stage === "result" && (
            <div className="bl-result">
              <div>
                <span className="bl-eyebrow">
                  04 · NOTICE WHAT HAPPENED
                </span>

                <h2>
                  That is useful information.
                </h2>

                <div className="bl-result-number">
                  {difference > 0 ? "+" : ""}
                  {difference}
                </div>

                <p className="bl-result-copy">
                  {difference < 0
                    ? "The urge shifted downward. You changed something about the usual sequence, and your system responded."
                    : difference === 0
                    ? "The urge stayed around the same level. That does not mean the interruption failed. You practiced doing something different while the urge was still there."
                    : "The urge is stronger right now. That is information too. You noticed what happened instead of having to make the moment mean something bigger."}
                </p>

                <div className="bl-result-note">
                  <span>THE POINT</span>

                  <p>
                    You do not have to make the result
                    mean anything bigger than this moment.
                    You noticed what happened when you
                    changed the usual sequence.
                  </p>
                </div>

                <label className="bl-field-label">
                  Which description fits the moment
                  best?
                </label>

                <div className="bl-choice-grid">
                  {outcomes.map((item) => (
                    <button
                      key={item}
                      className={`bl-choice ${
                        outcome === item
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setOutcome(item)
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="bl-result-actions">
                  <button
                    className="bl-primary"
                    onClick={reset}
                  >
                    Try another interruption
                    <span>↻</span>
                  </button>

                  <a
                    className="bl-secondary"
                    href="https://tundra-pedestrian-2e3.notion.site/3e5e2b0af92780fdbf7af8d9754726d1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add this to your Urge Tracker
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <aside className="bl-result-side">
                <div className="bl-orbit">
                  <div className="bl-orbit-core">
                    <strong>{before}</strong>
                    <small>before</small>
                  </div>

                  <div className="bl-ring bl-ring-one" />
                  <div className="bl-ring bl-ring-two" />

                  <div className="bl-orbit-dot bl-dot-one" />
                  <div className="bl-orbit-dot bl-dot-two" />
                  <div className="bl-orbit-dot bl-dot-three" />
                </div>

                <p>
                  An urge is something you can observe.
                  What you learn from it can become part
                  of your next response.
                </p>
              </aside>
            </div>
          )}
        </section>
      </div>

      <footer className="bl-footer">
        <span>
          THE THOUGHT IS NOT THE COMMAND.
        </span>

        <a href="/tools">
          SYSTEMINE TOOLS ↗
        </a>
      </footer>
    </main>
  );
}