"use client";

import { useEffect, useMemo, useState } from "react";

type Stage = "arrive" | "locate" | "observe" | "check" | "result";

const urgeTrackerUrl =
  "https://tundra-pedestrian-2e3.notion.site/3e5e2b0af92780fdbf7af8d9754726d1";

const bodyOptions = [
  "Chest",
  "Stomach",
  "Throat",
  "Jaw",
  "Shoulders",
  "Hands",
  "Head",
  "Legs",
  "All over",
  "Somewhere else",
];

const sensationOptions = [
  "Tight",
  "Heavy",
  "Hot",
  "Cold",
  "Restless",
  "Buzzing",
  "Hollow",
  "Tingly",
  "Pressure",
  "Hard to describe",
];

export default function RideTheWave() {
  const [stage, setStage] = useState<Stage>("arrive");

  const [before, setBefore] = useState(3);
  const [after, setAfter] = useState(3);

  const [bodyLocation, setBodyLocation] = useState("");
  const [sensations, setSensations] = useState<string[]>([]);

  const [secondsLeft, setSecondsLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(false);

  const [result, setResult] = useState("");

  useEffect(() => {
    const styleId = "systemine-ride-the-wave-styles";

    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;

    style.textContent = `
      .rtw-page {
        min-height: 100vh;
        background:
          radial-gradient(circle at 18% 28%, rgba(218, 209, 59, 0.055), transparent 28%),
          radial-gradient(circle at 82% 70%, rgba(159, 33, 37, 0.055), transparent 30%),
          #191919;
        color: #f1eee7;
        padding: 78px 24px 90px;
        position: relative;
        overflow: hidden;
      }

      .rtw-page::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.16;
        background-image:
          radial-gradient(rgba(255,255,255,0.12) 0.6px, transparent 0.6px);
        background-size: 5px 5px;
        mask-image: linear-gradient(to bottom, black, transparent 85%);
      }

      .rtw-shell {
        width: min(980px, 100%);
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .rtw-kicker {
        color: #dad13b;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.19em;
        text-transform: uppercase;
        margin-bottom: 18px;
      }

      .rtw-title {
        margin: 0;
        font-size: clamp(52px, 8vw, 92px);
        line-height: 0.92;
        letter-spacing: -0.055em;
        font-weight: 800;
        max-width: 850px;
      }

      .rtw-intro {
        margin: 24px 0 0;
        color: rgba(241, 238, 231, 0.64);
        font-size: 16px;
        line-height: 1.75;
        max-width: 610px;
      }

      .rtw-steps {
        display: flex;
        align-items: center;
        gap: 0;
        margin: 42px 0 34px;
        color: rgba(241, 238, 231, 0.26);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.17em;
        text-transform: uppercase;
      }

      .rtw-step {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }

      .rtw-step.active {
        color: #dad13b;
      }

      .rtw-step-line {
        width: 34px;
        height: 1px;
        background: rgba(241, 238, 231, 0.13);
        margin: 0 10px;
      }

      .rtw-card {
        background: linear-gradient(
          145deg,
          rgba(65, 65, 62, 0.92),
          rgba(48, 48, 46, 0.96)
        );
        border: 1px solid rgba(241, 238, 231, 0.075);
        box-shadow: 0 35px 90px rgba(0,0,0,0.24);
        padding: 58px;
        min-height: 570px;
        position: relative;
        overflow: hidden;
      }

      .rtw-card::after {
        content: "";
        position: absolute;
        width: 260px;
        height: 260px;
        right: -130px;
        top: -130px;
        border: 1px solid rgba(218, 209, 59, 0.12);
        transform: rotate(45deg);
        pointer-events: none;
      }

      .rtw-section-number {
        position: absolute;
        left: 58px;
        top: 59px;
        color: #dad13b;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
      }

      .rtw-content {
        margin-left: 88px;
        max-width: 650px;
      }

      .rtw-eyebrow {
        color: #dad13b;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.17em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .rtw-heading {
        margin: 0;
        font-size: clamp(32px, 4.2vw, 50px);
        line-height: 1.05;
        letter-spacing: -0.035em;
        font-weight: 500;
      }

      .rtw-subtext {
        color: rgba(241, 238, 231, 0.55);
        line-height: 1.7;
        font-size: 14px;
        margin: 18px 0 0;
        max-width: 590px;
      }

      .rtw-rating-wrap {
        margin-top: 38px;
      }

      .rtw-rating-number {
        display: flex;
        align-items: baseline;
        gap: 7px;
        margin-bottom: 15px;
      }

      .rtw-rating-number strong {
        color: #dad13b;
        font-size: 64px;
        line-height: 0.9;
        letter-spacing: -0.05em;
      }

      .rtw-rating-number span {
        color: rgba(241,238,231,0.35);
        font-size: 13px;
      }

      .rtw-slider {
        width: 100%;
        accent-color: #dad13b;
        cursor: pointer;
      }

      .rtw-slider-labels {
        display: flex;
        justify-content: space-between;
        color: rgba(241,238,231,0.28);
        font-size: 9px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin-top: 8px;
      }

      .rtw-note {
        margin-top: 28px;
        padding: 18px 20px;
        background: rgba(25,25,25,0.38);
        border-left: 2px solid #dad13b;
        color: rgba(241,238,231,0.62);
        font-size: 13px;
        line-height: 1.7;
      }

      .rtw-note strong {
        display: block;
        color: #dad13b;
        font-size: 9px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 6px;
      }

      .rtw-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 34px;
      }

      .rtw-button {
        appearance: none;
        border: 0;
        background: #dad13b;
        color: #191919;
        padding: 15px 22px;
        font: inherit;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 180ms ease, background 180ms ease;
      }

      .rtw-button:hover {
        transform: translateY(-2px);
        background: #e2e756;
      }

      .rtw-button.secondary {
        background: transparent;
        color: #f1eee7;
        border: 1px solid rgba(241,238,231,0.16);
      }

      .rtw-button.secondary:hover {
        background: rgba(241,238,231,0.05);
      }

      .rtw-options {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin-top: 27px;
      }

      .rtw-option {
        appearance: none;
        border: 1px solid rgba(241,238,231,0.14);
        border-radius: 8px;
        background: rgba(25,25,25,0.28);
        color: rgba(241,238,231,0.68);
        padding: 12px 15px;
        font: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: all 160ms ease;
      }

      .rtw-option:hover {
        border-color: rgba(218,209,59,0.45);
        color: #f1eee7;
      }

      .rtw-option.selected {
        background: rgba(218,209,59,0.12);
        border-color: #dad13b;
        color: #dad13b;
      }

      .rtw-wave-stage {
        margin-top: 34px;
        height: 245px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background:
          radial-gradient(
            ellipse at center,
            rgba(218,209,59,0.055),
            transparent 62%
          ),
          rgba(25,25,25,0.28);
        border: 1px solid rgba(241,238,231,0.055);
      }

      .rtw-wave {
        position: absolute;
        width: 125%;
        height: 110px;
        left: -12.5%;
        top: 50%;
        transform: translateY(-50%);
      }

      .rtw-wave-path {
        fill: none;
        stroke: #dad13b;
        stroke-width: 2;
        opacity: 0.75;
        stroke-linecap: round;
        animation: rtw-wave-motion 6s ease-in-out infinite;
      }

      .rtw-wave-path.two {
        opacity: 0.18;
        stroke-width: 1;
        animation-duration: 8s;
        animation-direction: reverse;
      }

      .rtw-wave-path.three {
        opacity: 0.1;
        stroke-width: 1;
        animation-duration: 10s;
      }

      @keyframes rtw-wave-motion {
        0%, 100% {
          transform: translateX(-18px) scaleY(0.82);
        }
        50% {
          transform: translateX(18px) scaleY(1.18);
        }
      }

      .rtw-wave-center {
        position: relative;
        z-index: 2;
        text-align: center;
        width: 78%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .rtw-timer {
        margin-top: 19px;
        color: #dad13b;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.17em;
      }

      .rtw-progress {
        margin-top: 22px;
        height: 2px;
        width: 100%;
        background: rgba(241,238,231,0.08);
        overflow: hidden;
      }

      .rtw-progress-fill {
        height: 100%;
        background: #dad13b;
        transition: width 1s linear;
      }

      .rtw-small-copy {
        margin-top: 19px;
        color: rgba(241,238,231,0.38);
        font-size: 12px;
        line-height: 1.6;
      }

      .rtw-result-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        margin-top: 35px;
      }

      .rtw-result-box {
        background: rgba(25,25,25,0.34);
        padding: 22px;
        border: 1px solid rgba(241,238,231,0.06);
      }

      .rtw-result-box span {
        display: block;
        color: rgba(241,238,231,0.35);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      .rtw-result-box strong {
        color: #dad13b;
        font-size: 43px;
        line-height: 1;
      }

      .rtw-outcomes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 9px;
        margin-top: 26px;
      }

      .rtw-outcome {
        appearance: none;
        border: 1px solid rgba(241,238,231,0.11);
        background: rgba(25,25,25,0.24);
        color: rgba(241,238,231,0.65);
        padding: 13px 14px;
        text-align: left;
        font: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: all 160ms ease;
      }

      .rtw-outcome:hover {
        border-color: rgba(218,209,59,0.4);
        color: #f1eee7;
      }

      .rtw-outcome.selected {
        border-color: #dad13b;
        background: rgba(218,209,59,0.1);
        color: #dad13b;
      }

      .rtw-result-message {
        margin-top: 25px;
        padding: 19px 21px;
        border-left: 2px solid #dad13b;
        background: rgba(25,25,25,0.32);
        color: rgba(241,238,231,0.68);
        font-size: 13px;
        line-height: 1.75;
      }

      .rtw-footer-note {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-top: 45px;
        padding-top: 19px;
        border-top: 1px solid rgba(241,238,231,0.07);
        color: rgba(241,238,231,0.25);
        font-size: 8px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .rtw-footer-note span:last-child {
        color: #dad13b;
      }

      .rtw-body-summary {
        margin-top: 26px;
        color: rgba(241,238,231,0.46);
        font-size: 12px;
        line-height: 1.7;
      }

      @media (max-width: 720px) {
        .rtw-page {
          padding: 52px 16px 70px;
        }

        .rtw-title {
          font-size: clamp(46px, 15vw, 70px);
        }

        .rtw-steps {
          overflow-x: auto;
          padding-bottom: 4px;
          margin-top: 32px;
        }

        .rtw-card {
          padding: 38px 24px;
          min-height: 620px;
        }

        .rtw-section-number {
          position: static;
          margin-bottom: 24px;
        }

        .rtw-content {
          margin-left: 0;
        }

        .rtw-heading {
          font-size: 34px;
        }

        .rtw-wave-stage {
          height: 230px;
        }

        .rtw-result-grid,
        .rtw-outcomes {
          grid-template-columns: 1fr;
        }

        .rtw-footer-note {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `;

    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (stage === "observe" && secondsLeft === 0) {
      setStage("check");
    }
  }, [secondsLeft, stage]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [secondsLeft]);

  const progress = ((180 - secondsLeft) / 180) * 100;

  const toggleSensation = (sensation: string) => {
    setSensations((current) =>
      current.includes(sensation)
        ? current.filter((item) => item !== sensation)
        : [...current, sensation]
    );
  };

  const beginObservation = () => {
    setSecondsLeft(180);
    setIsRunning(true);
    setStage("observe");
  };

  const finishObservation = () => {
    setIsRunning(false);
    setSecondsLeft(0);
    setStage("check");
  };

  const getResultMessage = () => {
    if (result === "weaker") {
      return "The urge changed. You noticed a shift without having to force it.";
    }

    if (result === "stronger") {
      return "The urge became stronger. That is information too. You stayed with the experience and noticed what happened.";
    }

    if (result === "same") {
      return "The urge stayed about the same. Nothing has gone wrong. You practiced noticing without immediately acting.";
    }

    if (result === "changed") {
      return "Something changed, even if the number does not tell the whole story. You noticed the experience instead of automatically following it.";
    }

    return "You do not need a perfect explanation. You noticed what happened when you gave the urge some space.";
  };

  return (
    <main className="rtw-page">
      <div className="rtw-shell">
        <div className="rtw-kicker">Urge Interrupter / 02</div>

        <h1 className="rtw-title">Ride the wave.</h1>

        <p className="rtw-intro">
          Notice the urge without immediately doing something about it.
          You do not have to make it disappear.
        </p>

        <div className="rtw-steps">
          <div className={`rtw-step ${stage === "arrive" ? "active" : ""}`}>
            Arrive
          </div>

          <div className="rtw-step-line" />

          <div className={`rtw-step ${stage === "locate" ? "active" : ""}`}>
            Locate
          </div>

          <div className="rtw-step-line" />

          <div className={`rtw-step ${stage === "observe" ? "active" : ""}`}>
            Observe
          </div>

          <div className="rtw-step-line" />

          <div className={`rtw-step ${stage === "check" ? "active" : ""}`}>
            Check
          </div>
        </div>

        <section className="rtw-card">
          {stage === "arrive" && (
            <>
              <div className="rtw-section-number">01</div>

              <div className="rtw-content">
                <div className="rtw-eyebrow">Arrive at the moment</div>

                <h2 className="rtw-heading">
                  How strong is the urge right now?
                </h2>

                <p className="rtw-subtext">
                  There is no right number. Just give this moment a rough
                  rating before we start.
                </p>

                <div className="rtw-rating-wrap">
                  <div className="rtw-rating-number">
                    <strong>{before}</strong>
                    <span>/ 5</span>
                  </div>

                  <input
                    className="rtw-slider"
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={before}
                    onChange={(event) =>
                      setBefore(Number(event.target.value))
                    }
                  />

                  <div className="rtw-slider-labels">
                    <span>0 · None</span>
                    <span>5 · Very strong</span>
                  </div>
                </div>

                <div className="rtw-note">
                  <strong>No need to change it</strong>
                  We are not trying to make the urge disappear. We are going
                  to spend a few minutes noticing what it actually feels like.
                </div>

                <div className="rtw-button-row">
                  <button
                    className="rtw-button"
                    onClick={() => setStage("locate")}
                  >
                    Find it in the body
                    <span> &nbsp;→</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "locate" && (
            <>
              <div className="rtw-section-number">02</div>

              <div className="rtw-content">
                <div className="rtw-eyebrow">Locate the experience</div>

                <h2 className="rtw-heading">
                  Where do you notice the urge?
                </h2>

                <p className="rtw-subtext">
                  You do not need to describe it perfectly. Pick the place
                  that feels closest, then notice what the sensation is like.
                </p>

                <div className="rtw-options">
                  {bodyOptions.map((option) => (
                    <button
                      key={option}
                      className={`rtw-option ${
                        bodyLocation === option ? "selected" : ""
                      }`}
                      onClick={() => setBodyLocation(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="rtw-body-summary">
                  Now notice the quality of the sensation. You can choose more
                  than one.
                </div>

                <div className="rtw-options">
                  {sensationOptions.map((option) => (
                    <button
                      key={option}
                      className={`rtw-option ${
                        sensations.includes(option) ? "selected" : ""
                      }`}
                      onClick={() => toggleSensation(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="rtw-button-row">
                  <button
                    className="rtw-button"
                    onClick={beginObservation}
                  >
                    Start the observation
                    <span> &nbsp;→</span>
                  </button>

                  <button
                    className="rtw-button secondary"
                    onClick={() => setStage("arrive")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "observe" && (
            <>
              <div className="rtw-section-number">03</div>

              <div className="rtw-content">
                <div className="rtw-eyebrow">Watch what happens</div>

                <h2 className="rtw-heading">
                  You do not have to do anything with the urge.
                </h2>

                <p className="rtw-subtext">
                  For the next few minutes, simply notice. The wave is here to
                  give the experience something to watch.
                </p>

                <div className="rtw-wave-stage">
                  <svg
                    className="rtw-wave"
                    viewBox="0 0 1000 150"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className="rtw-wave-path"
                      d="M0,75 C100,10 150,140 250,75 C350,10 400,140 500,75 C600,10 650,140 750,75 C850,10 900,140 1000,75"
                    />

                    <path
                      className="rtw-wave-path two"
                      d="M0,75 C100,30 150,120 250,75 C350,30 400,120 500,75 C600,30 650,120 750,75 C850,30 900,120 1000,75"
                    />

                    <path
                      className="rtw-wave-path three"
                      d="M0,75 C100,50 150,100 250,75 C350,50 400,100 500,75 C600,50 650,100 750,75 C850,50 900,100 1000,75"
                    />
                  </svg>

                  <div className="rtw-wave-center">
                    <div className="rtw-timer">{formattedTime}</div>
                  </div>
                </div>

                <div className="rtw-progress">
                  <div
                    className="rtw-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="rtw-small-copy">
                  You can stop when you feel ready. Finishing the timer is not
                  a test.
                </p>

                <div className="rtw-button-row">
                  <button
                    className="rtw-button secondary"
                    onClick={finishObservation}
                  >
                    I am ready to check
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "check" && (
            <>
              <div className="rtw-section-number">04</div>

              <div className="rtw-content">
                <div className="rtw-eyebrow">Check again</div>

                <h2 className="rtw-heading">
                  What is the urge like now?
                </h2>

                <p className="rtw-subtext">
                  Give it another rough rating. It does not need to be lower
                  for this exercise to count.
                </p>

                <div className="rtw-rating-wrap">
                  <div className="rtw-rating-number">
                    <strong>{after}</strong>
                    <span>/ 5</span>
                  </div>

                  <input
                    className="rtw-slider"
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={after}
                    onChange={(event) =>
                      setAfter(Number(event.target.value))
                    }
                  />

                  <div className="rtw-slider-labels">
                    <span>0 · None</span>
                    <span>5 · Very strong</span>
                  </div>
                </div>

                <div className="rtw-note">
                  <strong>Notice the difference</strong>
                  Maybe the urge changed. Maybe your body changed. Maybe
                  nothing obvious changed. All of those are useful things to
                  notice.
                </div>

                <div className="rtw-button-row">
                  <button
                    className="rtw-button"
                    onClick={() => setStage("result")}
                  >
                    See what you noticed
                    <span> &nbsp;→</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "result" && (
            <>
              <div className="rtw-section-number">05</div>

              <div className="rtw-content">
                <div className="rtw-eyebrow">What did you learn?</div>

                <h2 className="rtw-heading">
                  The point was noticing, not winning.
                </h2>

                <p className="rtw-subtext">
                  Look at what changed, then choose the description that fits
                  your experience best.
                </p>

                <div className="rtw-result-grid">
                  <div className="rtw-result-box">
                    <span>Before</span>
                    <strong>{before}</strong>
                  </div>

                  <div className="rtw-result-box">
                    <span>After</span>
                    <strong>{after}</strong>
                  </div>
                </div>

                <div className="rtw-outcomes">
                  <button
                    className={`rtw-outcome ${
                      result === "weaker" ? "selected" : ""
                    }`}
                    onClick={() => setResult("weaker")}
                  >
                    It got weaker
                  </button>

                  <button
                    className={`rtw-outcome ${
                      result === "changed" ? "selected" : ""
                    }`}
                    onClick={() => setResult("changed")}
                  >
                    It changed
                  </button>

                  <button
                    className={`rtw-outcome ${
                      result === "same" ? "selected" : ""
                    }`}
                    onClick={() => setResult("same")}
                  >
                    It stayed about the same
                  </button>

                  <button
                    className={`rtw-outcome ${
                      result === "stronger" ? "selected" : ""
                    }`}
                    onClick={() => setResult("stronger")}
                  >
                    It got stronger
                  </button>

                  <button
                    className={`rtw-outcome ${
                      result === "unsure" ? "selected" : ""
                    }`}
                    onClick={() => setResult("unsure")}
                  >
                    I am not sure
                  </button>
                </div>

                {result && (
                  <div className="rtw-result-message">
                    {getResultMessage()}
                  </div>
                )}

                <div className="rtw-button-row">
                  <a
                    className="rtw-button"
                    href={urgeTrackerUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add this to your Urge Tracker
                    <span> &nbsp;↗</span>
                  </a>

                  <button
                    className="rtw-button secondary"
                    onClick={() => {
                      setStage("arrive");
                      setBefore(3);
                      setAfter(3);
                      setBodyLocation("");
                      setSensations([]);
                      setSecondsLeft(180);
                      setIsRunning(false);
                      setResult("");
                    }}
                  >
                    Start again
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <div className="rtw-footer-note">
          <span>The urge is an experience, not a command.</span>
          <span>Systemine Tools / 02</span>
        </div>
      </div>
    </main>
  );
}