"use client";

import { useEffect, useMemo, useState } from "react";

type Stage =
  | "start"
  | "before"
  | "promise"
  | "after"
  | "review"
  | "next";

const drinkingLogUrl =
  "https://tundra-pedestrian-2e3.notion.site/3e5e2b0af9278054813dd0219499b3ac";

const beforeOptions = [
  "I was stressed",
  "I was overwhelmed",
  "I was lonely",
  "I was bored",
  "I was angry",
  "I was anxious",
  "I was coming home",
  "I had just finished work",
  "Something difficult had happened",
  "Someone offered me a drink",
  "I was already having an urge",
  "I was socializing",
  "Nothing particular",
  "Something else",
];

const promiseOptions = [
  "Help me relax",
  "Make me feel better",
  "Help me sleep",
  "Give me an escape",
  "Make things more fun",
  "Help me feel confident",
  "Help me connect",
  "Quiet my thoughts",
  "Help me stop feeling something",
  "I was not sure",
  "Something else",
];

const afterOptions = [
  "Nothing much changed",
  "I felt regretful",
  "I felt relaxed",
  "I felt sad",
  "I felt anxious",
  "I felt more confident",
  "I felt disconnected",
  "I felt physically uncomfortable",
  "I fell asleep",
  "I had another drink",
  "Something else",
];

const laterOptions = [
  "Poor sleep",
  "Financial impact",
  "Work or responsibilities were affected",
  "Relationship tension",
  "Physical discomfort",
  "Lower mood",
  "More anxiety",
  "More drinking",
  "Trouble concentrating",
  "I felt more isolated",
  "Nothing noticeable",
  "Something else",
];

const nextOptions = [
  {
    id: "trigger",
    title: "Prepare for this trigger",
    description: "Look at what tends to show up before drinking.",
  },
  {
    id: "promise",
    title: "Work on the promise",
    description: "Explore what alcohol seemed likely to give you.",
  },
  {
    id: "toolbox",
    title: "Look at what helps",
    description: "Find another way to meet the need in that moment.",
  },
  {
    id: "leave",
    title: "Leave it here",
    description: "You do not need to turn every observation into an assignment.",
  },
];

export default function DrinkingEpisodeReview() {
  const [stage, setStage] = useState<Stage>("start");

  const [date, setDate] = useState("");

  const [beforeSelections, setBeforeSelections] = useState<string[]>([]);
  const [promise, setPromise] = useState("");
  const [promiseConvincing, setPromiseConvincing] = useState(3);
  const [promiseDelivery, setPromiseDelivery] = useState(3);

  const [afterSelections, setAfterSelections] = useState<string[]>([]);
  const [laterSelections, setLaterSelections] = useState<string[]>([]);
  const [surprise, setSurprise] = useState("");

  const [reflection, setReflection] = useState("");
  const [nextStep, setNextStep] = useState("");

  useEffect(() => {
    const styleId = "systemine-drinking-episode-review-styles";

    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;

    style.textContent = `
      .der-page {
        min-height: 100vh;
        background:
          radial-gradient(
            circle at 18% 24%,
            rgba(255,255,255,0.035),
            transparent 28%
          ),
          radial-gradient(
            circle at 82% 72%,
            rgba(255,255,255,0.025),
            transparent 30%
          ),
          #111111;
        color: #f1f1ee;
        padding: 78px 24px 90px;
        position: relative;
        overflow: hidden;
      }

      .der-page::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.13;
        background-image:
          radial-gradient(
            rgba(255,255,255,0.14) 0.6px,
            transparent 0.6px
          );
        background-size: 5px 5px;
        mask-image: linear-gradient(
          to bottom,
          black,
          transparent 88%
        );
      }

      .der-shell {
        width: min(980px, 100%);
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .der-kicker {
        color: #a9a9a4;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.19em;
        text-transform: uppercase;
        margin-bottom: 18px;
      }

      .der-title {
        margin: 0;
        font-size: clamp(48px, 8vw, 88px);
        line-height: 0.94;
        letter-spacing: -0.055em;
        font-weight: 800;
        max-width: 860px;
      }

      .der-intro {
        margin: 24px 0 0;
        color: rgba(241,241,238,0.6);
        font-size: 16px;
        line-height: 1.75;
        max-width: 620px;
      }

      .der-steps {
        display: flex;
        align-items: center;
        gap: 0;
        margin: 42px 0 34px;
        color: rgba(241,241,238,0.23);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.17em;
        text-transform: uppercase;
      }

      .der-step {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }

      .der-step.active {
        color: #f1f1ee;
      }

      .der-step-line {
        width: 32px;
        height: 1px;
        background: rgba(241,241,238,0.13);
        margin: 0 10px;
      }

      .der-card {
        background: linear-gradient(
          145deg,
          rgba(55,55,53,0.96),
          rgba(39,39,38,0.98)
        );
        border: 1px solid rgba(241,241,238,0.08);
        box-shadow: 0 35px 90px rgba(0,0,0,0.28);
        padding: 58px;
        min-height: 560px;
        position: relative;
        overflow: hidden;
      }

      .der-card::after {
        content: "";
        position: absolute;
        width: 250px;
        height: 250px;
        right: -125px;
        top: -125px;
        border: 1px solid rgba(241,241,238,0.08);
        transform: rotate(45deg);
        pointer-events: none;
      }

      .der-number {
        position: absolute;
        left: 58px;
        top: 59px;
        color: #f1f1ee;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
      }

      .der-content {
        margin-left: 88px;
        max-width: 680px;
      }

      .der-eyebrow {
        color: #a9a9a4;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.17em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .der-heading {
        margin: 0;
        font-size: clamp(32px, 4.2vw, 50px);
        line-height: 1.05;
        letter-spacing: -0.035em;
        font-weight: 500;
      }

      .der-subtext {
        color: rgba(241,241,238,0.56);
        line-height: 1.72;
        font-size: 14px;
        margin: 18px 0 0;
        max-width: 600px;
      }

      .der-date-wrap {
        margin-top: 34px;
      }

      .der-label {
        display: block;
        color: rgba(241,241,238,0.46);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 9px;
      }

      .der-date {
        width: 100%;
        max-width: 280px;
        box-sizing: border-box;
        background: rgba(17,17,17,0.34);
        border: 1px solid rgba(241,241,238,0.14);
        border-radius: 8px;
        color: #f1f1ee;
        padding: 13px 14px;
        font: inherit;
        font-size: 13px;
        outline: none;
      }

      .der-date:focus {
        border-color: rgba(241,241,238,0.45);
      }

      .der-options {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin-top: 29px;
      }

      .der-option {
        appearance: none;
        border: 1px solid rgba(241,241,238,0.14);
        border-radius: 8px;
        background: rgba(17,17,17,0.27);
        color: rgba(241,241,238,0.68);
        padding: 12px 15px;
        font: inherit;
        font-size: 12px;
        cursor: pointer;
        transition:
          background 160ms ease,
          border-color 160ms ease,
          color 160ms ease,
          transform 160ms ease;
      }

      .der-option:hover {
        border-color: rgba(241,241,238,0.35);
        color: #f1f1ee;
        transform: translateY(-1px);
      }

      .der-option.selected {
        background: rgba(241,241,238,0.11);
        border-color: rgba(241,241,238,0.55);
        color: #ffffff;
      }

      .der-textarea {
        width: 100%;
        min-height: 120px;
        box-sizing: border-box;
        resize: vertical;
        margin-top: 25px;
        padding: 15px;
        background: rgba(17,17,17,0.3);
        border: 1px solid rgba(241,241,238,0.14);
        border-radius: 8px;
        color: #f1f1ee;
        font: inherit;
        font-size: 13px;
        line-height: 1.65;
        outline: none;
      }

      .der-textarea:focus {
        border-color: rgba(241,241,238,0.42);
      }

      .der-range-wrap {
        margin-top: 34px;
      }

      .der-range-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 20px;
        margin-bottom: 14px;
      }

      .der-range-value {
        color: #f1f1ee;
        font-size: 31px;
        font-weight: 700;
        letter-spacing: -0.04em;
      }

      .der-range-value span {
        color: rgba(241,241,238,0.32);
        font-size: 11px;
        font-weight: 400;
      }

      .der-slider {
        width: 100%;
        accent-color: #d7d7d2;
        cursor: pointer;
      }

      .der-slider-labels {
        display: flex;
        justify-content: space-between;
        color: rgba(241,241,238,0.25);
        font-size: 9px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin-top: 8px;
      }

      .der-comparison {
        margin-top: 34px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }

      .der-comparison-box {
        padding: 22px;
        background: rgba(17,17,17,0.28);
        border: 1px solid rgba(241,241,238,0.07);
        border-radius: 8px;
      }

      .der-comparison-box span {
        display: block;
        color: rgba(241,241,238,0.32);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      .der-comparison-box strong {
        color: #f1f1ee;
        font-size: 42px;
        line-height: 1;
      }

      .der-comparison-bar {
        margin-top: 16px;
        height: 4px;
        background: rgba(241,241,238,0.08);
        border-radius: 99px;
        overflow: hidden;
      }

      .der-comparison-fill {
        height: 100%;
        background: #d7d7d2;
        border-radius: 99px;
        transition: width 300ms ease;
      }

      .der-note {
        margin-top: 28px;
        padding: 18px 20px;
        background: rgba(17,17,17,0.3);
        border-left: 2px solid rgba(241,241,238,0.55);
        color: rgba(241,241,238,0.62);
        font-size: 13px;
        line-height: 1.7;
      }

      .der-note strong {
        display: block;
        color: #f1f1ee;
        font-size: 9px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 6px;
      }

      .der-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 11px;
        margin-top: 34px;
      }

      .der-button {
        appearance: none;
        border: 1px solid transparent;
        border-radius: 8px;
        background: #f1f1ee;
        color: #111111;
        padding: 14px 21px;
        font: inherit;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition:
          transform 180ms ease,
          background 180ms ease;
      }

      .der-button:hover {
        transform: translateY(-2px);
        background: #ffffff;
      }

      .der-button.secondary {
        background: transparent;
        color: #f1f1ee;
        border-color: rgba(241,241,238,0.17);
      }

      .der-button.secondary:hover {
        background: rgba(241,241,238,0.06);
      }

      .der-pathway {
        margin-top: 38px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        position: relative;
      }

      .der-pathway::before {
        content: "";
        position: absolute;
        left: 8%;
        right: 8%;
        top: 28px;
        height: 1px;
        background: rgba(241,241,238,0.16);
      }

      .der-path {
        position: relative;
        z-index: 1;
        text-align: center;
      }

      .der-path-dot {
        width: 14px;
        height: 14px;
        margin: 21px auto 14px;
        border-radius: 50%;
        background: #111111;
        border: 1px solid rgba(241,241,238,0.45);
      }

      .der-path.active .der-path-dot {
        background: #f1f1ee;
        border-color: #f1f1ee;
        box-shadow: 0 0 0 5px rgba(241,241,238,0.06);
      }

      .der-path-label {
        color: rgba(241,241,238,0.4);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.13em;
        text-transform: uppercase;
      }

      .der-path-value {
        color: #f1f1ee;
        font-size: 12px;
        line-height: 1.45;
        margin: 7px auto 0;
        max-width: 130px;
      }

      .der-reflection {
        margin-top: 34px;
      }

      .der-next-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 29px;
      }

      .der-next {
        appearance: none;
        text-align: left;
        border: 1px solid rgba(241,241,238,0.13);
        border-radius: 8px;
        background: rgba(17,17,17,0.25);
        color: rgba(241,241,238,0.68);
        padding: 17px;
        font: inherit;
        cursor: pointer;
        transition:
          border-color 160ms ease,
          background 160ms ease,
          transform 160ms ease;
      }

      .der-next:hover {
        border-color: rgba(241,241,238,0.34);
        transform: translateY(-1px);
      }

      .der-next.selected {
        background: rgba(241,241,238,0.09);
        border-color: rgba(241,241,238,0.52);
        color: #ffffff;
      }

      .der-next-title {
        display: block;
        color: #f1f1ee;
        font-size: 12px;
        font-weight: 700;
      }

      .der-next-description {
        display: block;
        color: rgba(241,241,238,0.4);
        font-size: 11px;
        line-height: 1.5;
        margin-top: 6px;
      }

      .der-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-top: 45px;
        padding-top: 19px;
        border-top: 1px solid rgba(241,241,238,0.07);
        color: rgba(241,241,238,0.23);
        font-size: 8px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .der-footer span:last-child {
        color: rgba(241,241,238,0.45);
      }

      @media (max-width: 720px) {
        .der-page {
          padding: 52px 16px 70px;
        }

        .der-title {
          font-size: clamp(44px, 14vw, 68px);
        }

        .der-steps {
          overflow-x: auto;
          padding-bottom: 4px;
          margin-top: 32px;
        }

        .der-card {
          padding: 38px 24px;
          min-height: 620px;
        }

        .der-number {
          position: static;
          margin-bottom: 24px;
        }

        .der-content {
          margin-left: 0;
        }

        .der-heading {
          font-size: 34px;
        }

        .der-comparison,
        .der-next-grid {
          grid-template-columns: 1fr;
        }

        .der-pathway {
          grid-template-columns: 1fr 1fr;
          row-gap: 20px;
        }

        .der-pathway::before {
          display: none;
        }

        .der-path-dot {
          margin-top: 8px;
        }

        .der-footer {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `;

    document.head.appendChild(style);
  }, []);

  const toggleBefore = (option: string) => {
    setBeforeSelections((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const toggleAfter = (option: string) => {
    setAfterSelections((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const formatDate = useMemo(() => {
    if (!date) return "This episode";

    const parts = date.split("-");

    if (parts.length !== 3) return "This episode";

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (!year || !month || !day) return "This episode";

    const parsed = new Date(Date.UTC(year, month - 1, day));

    if (Number.isNaN(parsed.getTime())) return "This episode";

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }, [date]);

  const resetTool = () => {
    setStage("start");
    setDate("");
    setBeforeSelections([]);
    setPromise("");
    setPromiseConvincing(3);
    setPromiseDelivery(3);
    setAfterSelections([]);
    setLaterSelections([]);
    setSurprise("");
    setReflection("");
    setNextStep("");
  };

  return (
    <main className="der-page">
      <div className="der-shell">
        <div className="der-kicker">Drinking Log / Review</div>

        <h1 className="der-title">Drinking Episode Review.</h1>

        <p className="der-intro">
          Look back at one drinking episode without turning it into a verdict.
        </p>

        <div className="der-steps">
          <div className={`der-step ${stage === "start" ? "active" : ""}`}>
            Start
          </div>

          <div className="der-step-line" />

          <div className={`der-step ${stage === "before" ? "active" : ""}`}>
            Before
          </div>

          <div className="der-step-line" />

          <div className={`der-step ${stage === "promise" ? "active" : ""}`}>
            Promise
          </div>

          <div className="der-step-line" />

          <div className={`der-step ${stage === "after" ? "active" : ""}`}>
            After
          </div>

          <div className="der-step-line" />

          <div className={`der-step ${stage === "review" ? "active" : ""}`}>
            Review
          </div>
        </div>

        <section className="der-card">
          {stage === "start" && (
            <>
              <div className="der-number">01</div>

              <div className="der-content">
                <div className="der-eyebrow">Pick the episode</div>

                <h2 className="der-heading">
                  What are you looking back at?
                </h2>

                <p className="der-subtext">
                  You do not need to remember everything perfectly. Pick one
                  recent drinking episode that you want to understand a little
                  better.
                </p>

                <div className="der-date-wrap">
                  <label className="der-label" htmlFor="episode-date">
                    When did this happen?
                  </label>

                  <input
                    id="episode-date"
                    className="der-date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>

                <div className="der-note">
                  <strong>No verdict required</strong>
                  This is not about deciding whether the episode was good or
                  bad. We are simply looking at what happened and what you can
                  learn from it.
                </div>

                <div className="der-button-row">
                  <button
                    className="der-button"
                    onClick={() => setStage("before")}
                  >
                    Look at what came before
                    <span>&nbsp;→</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "before" && (
            <>
              <div className="der-number">02</div>

              <div className="der-content">
                <div className="der-eyebrow">Before</div>

                <h2 className="der-heading">
                  What was happening before you drank?
                </h2>

                <p className="der-subtext">
                  Choose anything that feels relevant. There can be more than
                  one answer, and you can leave this imperfect.
                </p>

                <div className="der-options">
                  {beforeOptions.map((option) => (
                    <button
                      key={option}
                      className={`der-option ${
                        beforeSelections.includes(option) ? "selected" : ""
                      }`}
                      onClick={() => toggleBefore(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="der-button-row">
                  <button
                    className="der-button"
                    onClick={() => setStage("promise")}
                  >
                    Look at the promise
                    <span>&nbsp;→</span>
                  </button>

                  <button
                    className="der-button secondary"
                    onClick={() => setStage("start")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "promise" && (
            <>
              <div className="der-number">03</div>

              <div className="der-content">
                <div className="der-eyebrow">The promise</div>

                <h2 className="der-heading">
                  What did alcohol seem likely to do for you?
                </h2>

                <p className="der-subtext">
                  Sometimes alcohol becomes part of a situation because it
                  seems to offer something useful in the moment.
                </p>

                <div className="der-options">
                  {promiseOptions.map((option) => (
                    <button
                      key={option}
                      className={`der-option ${
                        promise === option ? "selected" : ""
                      }`}
                      onClick={() => setPromise(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="der-range-wrap">
                  <div className="der-range-header">
                    <span className="der-label">
                      How convincing did that promise feel at the time?
                    </span>

                    <div className="der-range-value">
                      {promiseConvincing}
                      <span>/ 5</span>
                    </div>
                  </div>

                  <input
                    className="der-slider"
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={promiseConvincing}
                    onChange={(event) =>
                      setPromiseConvincing(Number(event.target.value))
                    }
                  />

                  <div className="der-slider-labels">
                    <span>0 · Not convincing</span>
                    <span>5 · Very convincing</span>
                  </div>
                </div>

                <div className="der-range-wrap">
                  <div className="der-range-header">
                    <span className="der-label">
                      How well did the experience actually match the promise?
                    </span>

                    <div className="der-range-value">
                      {promiseDelivery}
                      <span>/ 5</span>
                    </div>
                  </div>

                  <input
                    className="der-slider"
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={promiseDelivery}
                    onChange={(event) =>
                      setPromiseDelivery(Number(event.target.value))
                    }
                  />

                  <div className="der-slider-labels">
                    <span>0 · Not at all</span>
                    <span>5 · Very well</span>
                  </div>
                </div>

                <div className="der-comparison">
                  <div className="der-comparison-box">
                    <span>How convincing</span>

                    <strong>{promiseConvincing}</strong>

                    <div className="der-comparison-bar">
                      <div
                        className="der-comparison-fill"
                        style={{
                          width: `${promiseConvincing * 20}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="der-comparison-box">
                    <span>How well it delivered</span>

                    <strong>{promiseDelivery}</strong>

                    <div className="der-comparison-bar">
                      <div
                        className="der-comparison-fill"
                        style={{
                          width: `${promiseDelivery * 20}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="der-button-row">
                  <button
                    className="der-button"
                    onClick={() => setStage("after")}
                  >
                    Look at what happened afterward
                    <span>&nbsp;→</span>
                  </button>

                  <button
                    className="der-button secondary"
                    onClick={() => setStage("before")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "after" && (
            <>
              <div className="der-number">04</div>

              <div className="der-content">
                <div className="der-eyebrow">After</div>

                <h2 className="der-heading">
                  What happened afterward?
                </h2>

                <p className="der-subtext">
                  Start with what happened right afterward. Then look a little
                  further ahead.
                </p>

                <div className="der-label" style={{ marginTop: "30px" }}>
                  Right afterward
                </div>

                <div className="der-options">
                  {afterOptions.map((option) => (
                    <button
                      key={option}
                      className={`der-option ${
                        afterSelections.includes(option) ? "selected" : ""
                      }`}
                      onClick={() => toggleAfter(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="der-label" style={{ marginTop: "31px" }}>
                  Later
                </div>

                <div className="der-options">
                  {laterOptions.map((option) => (
                    <button
                      key={option}
                      className={`der-option ${
                        laterSelections.includes(option) ? "selected" : ""
                      }`}
                      onClick={() =>
                        setLaterSelections((current) =>
                          current.includes(option)
                            ? current.filter((item) => item !== option)
                            : [...current, option]
                        )
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="der-reflection">
                  <label className="der-label" htmlFor="surprise">
                    Was there anything about the aftermath that surprised you?
                  </label>

                  <textarea
                    id="surprise"
                    className="der-textarea"
                    placeholder="Anything you noticed, expected, or did not expect..."
                    value={surprise}
                    onChange={(event) => setSurprise(event.target.value)}
                  />
                </div>

                <div className="der-button-row">
                  <button
                    className="der-button"
                    onClick={() => setStage("review")}
                  >
                    See the whole episode
                    <span>&nbsp;→</span>
                  </button>

                  <button
                    className="der-button secondary"
                    onClick={() => setStage("promise")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "review" && (
            <>
              <div className="der-number">05</div>

              <div className="der-content">
                <div className="der-eyebrow">The review</div>

                <h2 className="der-heading">
                  What stands out when you look at the whole episode?
                </h2>

                <p className="der-subtext">
                  There is no correct interpretation. Just notice what catches
                  your attention.
                </p>

                <div className="der-pathway">
                  <div className="der-path active">
                    <div className="der-path-dot" />

                    <div className="der-path-label">Before</div>

                    <div className="der-path-value">
                      {beforeSelections.length > 0
                        ? beforeSelections.slice(0, 2).join(", ")
                        : "Not specified"}
                    </div>
                  </div>

                  <div className="der-path active">
                    <div className="der-path-dot" />

                    <div className="der-path-label">Promise</div>

                    <div className="der-path-value">
                      {promise || "Not specified"}
                    </div>
                  </div>

                  <div className="der-path active">
                    <div className="der-path-dot" />

                    <div className="der-path-label">Experience</div>

                    <div className="der-path-value">
                      {promiseDelivery} / 5 delivery
                    </div>
                  </div>

                  <div className="der-path active">
                    <div className="der-path-dot" />

                    <div className="der-path-label">After</div>

                    <div className="der-path-value">
                      {afterSelections.length > 0
                        ? afterSelections.slice(0, 2).join(", ")
                        : "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="der-note">
                  <strong>{formatDate}</strong>
                  This is a snapshot of one episode. It does not need to
                  explain your drinking as a whole.
                </div>

                <div className="der-reflection">
                  <label className="der-label" htmlFor="reflection">
                    What do you notice?
                  </label>

                  <textarea
                    id="reflection"
                    className="der-textarea"
                    placeholder="What stands out when you look at the whole episode?"
                    value={reflection}
                    onChange={(event) => setReflection(event.target.value)}
                  />
                </div>

                <div className="der-button-row">
                  <button
                    className="der-button"
                    onClick={() => setStage("next")}
                  >
                    Decide what to do with this
                    <span>&nbsp;→</span>
                  </button>

                  <button
                    className="der-button secondary"
                    onClick={() => setStage("after")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === "next" && (
            <>
              <div className="der-number">06</div>

              <div className="der-content">
                <div className="der-eyebrow">Take it somewhere useful</div>

                <h2 className="der-heading">
                  What do you want to do with what you noticed?
                </h2>

                <p className="der-subtext">
                  You can use this information, save it, or simply leave it
                  here. There is no required next step.
                </p>

                <div className="der-next-grid">
                  {nextOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`der-next ${
                        nextStep === option.id ? "selected" : ""
                      }`}
                      onClick={() => setNextStep(option.id)}
                    >
                      <span className="der-next-title">
                        {option.title}
                      </span>

                      <span className="der-next-description">
                        {option.description}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="der-note">
                  <strong>One episode is one piece of information</strong>
                  You do not need to turn this review into a conclusion about
                  yourself. The value is in noticing what happened.
                </div>

                <div className="der-button-row">
                  <a
                    className="der-button"
                    href={drinkingLogUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add this to your Drinking Log
                    <span>&nbsp;↗</span>
                  </a>

                  <button
                    className="der-button secondary"
                    onClick={resetTool}
                  >
                    Review another episode
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <div className="der-footer">
          <span>One episode is information, not a verdict.</span>
          <span>Systemine Tools / Drinking Log</span>
        </div>
      </div>
    </main>
  );
}