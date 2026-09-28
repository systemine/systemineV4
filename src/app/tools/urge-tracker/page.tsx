"use client";

import { useEffect, useMemo, useState } from "react";

type Stage =
  | "start"
  | "map"
  | "watch"
  | "respond"
  | "check"
  | "learn"
  | "log";

type Snapshot = {
  time: string;
  intensity: number;
  note: string;
};

const notionUrgeTrackerUrl =
  "https://tundra-pedestrian-2e3.notion.site/3e5e2b0af92780fdbf7af8d9754726d1";

const breakTheLoopUrl =
  "https://www.systemine.fyi/tools/break-the-loop";

const rideTheWaveUrl =
  "https://www.systemine.fyi/tools/ride-the-wave";

const bodyOptions = [
  "Restless",
  "Tense",
  "Heavy / drained",
  "Racing heart",
  "Shaky",
  "Tight chest",
  "Stomach discomfort",
  "Tired",
  "Strong physical craving",
  "Nothing noticeable",
  "Something else",
];

const promiseOptions = [
  "Relief",
  "Calm",
  "Escape",
  "Sleep",
  "Connection",
  "Confidence",
  "Pleasure",
  "Something to look forward to",
  "Quiet my thoughts",
  "Emotional release",
  "Something else",
];

const responseOptions = [
  "Changed my environment",
  "Moved my body",
  "Distracted myself",
  "Contacted someone",
  "Waited it out",
  "Worked with the thought",
  "Did something calming",
  "Used another regulation tool",
  "Did nothing yet",
];

const changeOptions = [
  "My body changed",
  "My thoughts changed",
  "The situation changed",
  "I did something",
  "Nothing changed",
  "Not sure",
];

const learningOptions = [
  "The urge changed more than I expected",
  "The urge stayed strong",
  "I noticed a body sensation",
  "I noticed a thought",
  "I noticed what alcohol was promising",
  "Something I tried helped",
  "Something I tried did not help",
  "I am not sure yet",
];

const intensityLabels = [
  "None",
  "Very low",
  "Low",
  "Moderate",
  "Strong",
  "Very strong",
];

const stageOrder: Stage[] = [
  "start",
  "map",
  "watch",
  "respond",
  "check",
  "learn",
  "log",
];

export default function UrgeTrackerTool() {
  const [stage, setStage] = useState<Stage>("start");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const [initialIntensity, setInitialIntensity] = useState<number | null>(
    null
  );
  const [currentIntensity, setCurrentIntensity] = useState<number | null>(
    null
  );

  const [bodyStates, setBodyStates] = useState<string[]>([]);
  const [thought, setThought] = useState("");
  const [promise, setPromise] = useState("");

  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [currentNote, setCurrentNote] = useState("");

  const [response, setResponse] = useState("");
  const [change, setChange] = useState("");
  const [learning, setLearning] = useState<string[]>([]);
  const [reflection, setReflection] = useState("");
  const [drankAfterward, setDrankAfterward] = useState("");

  useEffect(() => {
    if (!startedAt) return;

    const interval = window.setInterval(() => {
      setElapsed(
        Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startedAt]);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "urge-tracker-tool-styles";

    style.textContent = `
      .urge-tool {
        min-height: 100vh;
        background: #111312;
        color: #f2f1ea;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        padding: 48px 24px 72px;
      }

      .urge-shell {
        max-width: 1180px;
        margin: 0 auto;
      }

      .urge-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-bottom: 32px;
      }

      .urge-brand {
        color: #e8e5d9;
        font-size: 14px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 700;
      }

      .urge-live {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #9edc91;
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .urge-live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #7ccf72;
        box-shadow: 0 0 0 5px rgba(124, 207, 114, 0.08);
      }

      .urge-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
        gap: 28px;
        align-items: stretch;
      }

      .urge-panel {
        border: 1px solid #30332f;
        background: #171a18;
        border-radius: 18px;
        padding: 32px;
      }

      .urge-panel-main {
        min-height: 640px;
        display: flex;
        flex-direction: column;
      }

      .urge-kicker {
        color: #82c979;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .urge-title {
        font-size: clamp(30px, 4vw, 46px);
        line-height: 1.04;
        letter-spacing: -0.04em;
        margin: 0 0 16px;
        font-weight: 750;
      }

      .urge-copy {
        color: #aaa9a1;
        font-size: 15px;
        line-height: 1.7;
        max-width: 650px;
      }

      .urge-copy strong {
        color: #e7e4db;
      }

      .urge-progress {
        height: 4px;
        background: #292c29;
        border-radius: 999px;
        overflow: hidden;
        margin: 0 0 30px;
      }

      .urge-progress-fill {
        height: 100%;
        background: #82c979;
        border-radius: 999px;
        transition: width 500ms ease;
      }

      .urge-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .urge-question {
        font-size: 27px;
        line-height: 1.2;
        margin: 0 0 12px;
        letter-spacing: -0.025em;
      }

      .urge-subquestion {
        color: #999991;
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 24px;
      }

      .urge-intensity-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 8px;
        margin: 24px 0 10px;
      }

      .urge-intensity-button,
      .urge-option {
        border: 1px solid #383c37;
        background: #202420;
        color: #dddcd4;
        border-radius: 12px;
        cursor: pointer;
        transition:
          border-color 180ms ease,
          background 180ms ease,
          transform 180ms ease;
      }

      .urge-intensity-button {
        min-height: 76px;
        padding: 10px 6px;
      }

      .urge-intensity-button:hover,
      .urge-option:hover {
        border-color: #6cae63;
        transform: translateY(-1px);
      }

      .urge-intensity-button.selected,
      .urge-option.selected {
        background: #28452f;
        border-color: #7ccf72;
        color: #f4f2e9;
      }

      .urge-intensity-number {
        display: block;
        font-size: 25px;
        font-weight: 750;
        margin-bottom: 5px;
      }

      .urge-intensity-label {
        display: block;
        font-size: 10px;
        color: #989b94;
        line-height: 1.2;
      }

      .urge-intensity-button.selected .urge-intensity-label {
        color: #c8eac2;
      }

      .urge-section {
        margin-top: 28px;
      }

      .urge-section-title {
        color: #e8e5dc;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 12px;
      }

      .urge-options {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
      }

      .urge-option {
        text-align: left;
        padding: 13px 15px;
        min-height: 48px;
        font-size: 13px;
      }

      .urge-input,
      .urge-textarea {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #373b37;
        background: #101210;
        color: #f0eee5;
        border-radius: 11px;
        padding: 14px 15px;
        outline: none;
        font: inherit;
        font-size: 14px;
        transition: border-color 180ms ease;
      }

      .urge-input:focus,
      .urge-textarea:focus {
        border-color: #7ccf72;
      }

      .urge-textarea {
        min-height: 110px;
        resize: vertical;
        line-height: 1.6;
      }

      .urge-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 28px;
      }

      .urge-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border: 0;
        border-radius: 12px;
        padding: 14px 20px;
        background: #7ccf72;
        color: #102010;
        font-weight: 800;
        font-size: 13px;
        cursor: pointer;
        transition: transform 180ms ease, opacity 180ms ease;
      }

      .urge-button:hover {
        transform: translateY(-1px);
      }

      .urge-button.secondary {
        background: #272b27;
        color: #dcdad1;
        border: 1px solid #3a3d38;
      }

      .urge-button:disabled {
        opacity: 0.38;
        cursor: not-allowed;
        transform: none;
      }

      .urge-timer {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        border: 1px solid #383c37;
        background: #111411;
        border-radius: 999px;
        padding: 8px 13px;
        color: #c9c8bf;
        font-size: 12px;
        margin-bottom: 24px;
      }

      .urge-timer-dot {
        width: 7px;
        height: 7px;
        background: #7ccf72;
        border-radius: 50%;
      }

      .urge-map-panel {
        position: sticky;
        top: 24px;
        min-height: 640px;
        overflow: hidden;
      }

      .urge-map-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 24px;
      }

      .urge-map-title {
        margin: 0;
        font-size: 17px;
        letter-spacing: -0.01em;
      }

      .urge-map-copy {
        color: #85877f;
        font-size: 12px;
        line-height: 1.5;
        margin-top: 6px;
      }

      .urge-map {
        position: relative;
        min-height: 520px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 10px 20px;
      }

      .urge-map-line {
        position: absolute;
        top: 54px;
        bottom: 48px;
        left: 50%;
        width: 2px;
        transform: translateX(-50%);
        background: linear-gradient(
          to bottom,
          rgba(124, 207, 114, 0.08),
          rgba(124, 207, 114, 0.42),
          rgba(124, 207, 114, 0.08)
        );
      }

      .urge-map-flow {
        position: absolute;
        left: 50%;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        transform: translateX(-50%);
        background: #9ae38f;
        box-shadow: 0 0 0 6px rgba(124, 207, 114, 0.08);
        transition: top 700ms ease;
        z-index: 1;
      }

      .urge-node {
        position: relative;
        z-index: 2;
        width: min(280px, 88%);
        border: 1px solid #343833;
        background: #1c201d;
        border-radius: 14px;
        padding: 13px 16px;
        margin-bottom: 17px;
        transition:
          border-color 300ms ease,
          background 300ms ease,
          transform 300ms ease,
          opacity 300ms ease;
      }

      .urge-node.done {
        border-color: #435f42;
        background: #1d271f;
      }

      .urge-node.active {
        border-color: #7ccf72;
        background: #29442e;
        transform: scale(1.025);
        box-shadow: 0 0 0 1px rgba(124, 207, 114, 0.15);
      }

      .urge-node.future {
        opacity: 0.5;
      }

      .urge-node-label {
        display: block;
        color: #f0eee5;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.12em;
      }

      .urge-node-detail {
        display: block;
        color: #7f827b;
        font-size: 11px;
        margin-top: 4px;
      }

      .urge-mini-stat {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-top: 18px;
      }

      .urge-stat {
        border: 1px solid #30342f;
        border-radius: 11px;
        padding: 11px 10px;
        background: #121512;
      }

      .urge-stat-value {
        font-size: 18px;
        font-weight: 750;
      }

      .urge-stat-label {
        color: #777a73;
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-top: 3px;
      }

      .urge-wave {
        height: 125px;
        border: 1px solid #30342f;
        border-radius: 14px;
        background: #111411;
        overflow: hidden;
        margin-top: 22px;
        position: relative;
      }

      .urge-wave svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .urge-wave-line {
        fill: none;
        stroke: #7ccf72;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .urge-wave-point {
        fill: #a2e69a;
        stroke: #172018;
        stroke-width: 3;
      }

      .urge-summary {
        border: 1px solid #343933;
        background: #1a1f1b;
        border-radius: 14px;
        padding: 20px;
        margin-top: 22px;
      }

      .urge-summary-title {
        font-size: 13px;
        color: #8dca86;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 800;
        margin-bottom: 12px;
      }

      .urge-summary-row {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 9px 0;
        border-bottom: 1px solid #2b302c;
        font-size: 13px;
      }

      .urge-summary-row:last-child {
        border-bottom: 0;
      }

      .urge-summary-row span:first-child {
        color: #7f827b;
      }

      .urge-summary-row span:last-child {
        color: #e4e1d8;
        text-align: right;
      }

      .urge-note {
        color: #72756e;
        font-size: 11px;
        line-height: 1.6;
        margin-top: 16px;
      }

      .urge-complete {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px;
        border: 1px solid #3c593d;
        background: #1b271d;
        border-radius: 12px;
        margin-top: 20px;
      }

      .urge-complete-mark {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #7ccf72;
        color: #102010;
        display: grid;
        place-items: center;
        font-weight: 900;
      }

      @media (max-width: 900px) {
        .urge-layout {
          grid-template-columns: 1fr;
        }

        .urge-map-panel {
          position: static;
          min-height: auto;
        }

        .urge-map {
          min-height: 420px;
        }
      }

      @media (max-width: 600px) {
        .urge-tool {
          padding: 28px 14px 48px;
        }

        .urge-panel {
          padding: 22px;
          border-radius: 15px;
        }

        .urge-panel-main {
          min-height: auto;
        }

        .urge-intensity-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .urge-options {
          grid-template-columns: 1fr;
        }

        .urge-map {
          min-height: 440px;
        }

        .urge-node {
          width: 88%;
        }

        .urge-mini-stat {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .urge-node,
        .urge-progress-fill,
        .urge-map-flow,
        .urge-button,
        .urge-option,
        .urge-intensity-button {
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [elapsed]);

  const progressIndex = stageOrder.indexOf(stage);

  const progressPercent =
    stage === "start"
      ? 0
      : Math.min(
          100,
          Math.round((progressIndex / (stageOrder.length - 1)) * 100)
        );

  const currentMapStage =
    stage === "map"
      ? "map"
      : stage === "watch"
        ? "watch"
        : stage === "respond"
          ? "respond"
          : stage === "check"
            ? "check"
            : stage === "learn"
              ? "learn"
              : stage === "log"
                ? "log"
                : "start";

  const mapStages = [
    {
      id: "start",
      label: "CATCH",
      detail: "Notice the urge",
    },
    {
      id: "map",
      label: "MAP",
      detail: "Body · Mind · Promise",
    },
    {
      id: "watch",
      label: "WATCH",
      detail: "Track it over time",
    },
    {
      id: "respond",
      label: "RESPOND",
      detail: "Try one thing",
    },
    {
      id: "check",
      label: "CHECK AGAIN",
      detail: "Notice what changed",
    },
    {
      id: "learn",
      label: "LEARN",
      detail: "Make sense of the episode",
    },
    {
      id: "log",
      label: "LOG",
      detail: "Keep the record",
    },
  ];

  const currentMapIndex = mapStages.findIndex(
    (item) => item.id === currentMapStage
  );

  const toggleBody = (value: string) => {
    setBodyStates((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const toggleLearning = (value: string) => {
    setLearning((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const startEpisode = () => {
    if (initialIntensity === null) return;

    const now = Date.now();

    setStartedAt(now);
    setElapsed(0);
    setCurrentIntensity(initialIntensity);

    setSnapshots([
      {
        time: new Date(now).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        intensity: initialIntensity,
        note: "",
      },
    ]);

    setStage("map");
  };

  const saveMap = () => {
    if (!thought && bodyStates.length === 0 && !promise) return;
    setStage("watch");
  };

  const addSnapshot = () => {
    if (currentIntensity === null) return;

    const now = Date.now();

    setSnapshots((current) => [
      ...current,
      {
        time: new Date(now).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        intensity: currentIntensity,
        note: currentNote,
      },
    ]);

    setCurrentNote("");
  };

  const finishWatch = () => {
    if (snapshots.length < 1) return;
    setStage("respond");
  };

  const finishResponse = () => {
    if (!response) return;
    setStage("check");
  };

  const finishCheck = () => {
    if (currentIntensity === null) return;

    const now = Date.now();

    setSnapshots((current) => [
      ...current,
      {
        time: new Date(now).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        intensity: currentIntensity,
        note: currentNote,
      },
    ]);

    setCurrentNote("");
    setStage("learn");
  };

  const finishLearning = () => {
    setStage("log");
  };

  const resetEpisode = () => {
    setStage("start");
    setStartedAt(null);
    setElapsed(0);
    setInitialIntensity(null);
    setCurrentIntensity(null);
    setBodyStates([]);
    setThought("");
    setPromise("");
    setSnapshots([]);
    setCurrentNote("");
    setResponse("");
    setChange("");
    setLearning([]);
    setReflection("");
    setDrankAfterward("");
  };

  const wavePoints = useMemo(() => {
    if (!snapshots.length) return "";

    const width = 700;
    const height = 115;
    const padding = 14;

    return snapshots
      .map((snapshot, index) => {
        const x =
          snapshots.length === 1
            ? width / 2
            : padding +
              (index / (snapshots.length - 1)) *
                (width - padding * 2);

        const y =
          height -
          padding -
          (snapshot.intensity / 5) *
            (height - padding * 2);

        return `${x},${y}`;
      })
      .join(" ");
  }, [snapshots]);

  const latestIntensity =
    snapshots.length > 0
      ? snapshots[snapshots.length - 1].intensity
      : currentIntensity;

  return (
    <main className="urge-tool">
      <div className="urge-shell">
        <header className="urge-header">
          <div className="urge-brand">
            Systemine · Urge Tracking
          </div>

          {startedAt && (
            <div className="urge-live">
              <span className="urge-live-dot" />
              Live episode
            </div>
          )}
        </header>

        <div className="urge-layout">
          <section className="urge-panel urge-panel-main">
            <div className="urge-progress">
              <div
                className="urge-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {stage === "start" && (
              <div className="urge-content">
                <div className="urge-kicker">
                  01 · Catch the urge
                </div>

                <h1 className="urge-title">
                  You are here. Let us look at what is happening.
                </h1>

                <p className="urge-copy">
                  This tool is for tracking one urge while it is actually
                  happening. You do not need to make it disappear. We are
                  interested in what it does, what surrounds it, and what
                  changes over time.
                </p>

                <div className="urge-section">
                  <div className="urge-question">
                    How strong is the urge right now?
                  </div>

                  <div className="urge-intensity-grid">
                    {intensityLabels.map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        className={`urge-intensity-button ${
                          initialIntensity === index ? "selected" : ""
                        }`}
                        onClick={() =>
                          setInitialIntensity(index)
                        }
                      >
                        <span className="urge-intensity-number">
                          {index}
                        </span>
                        <span className="urge-intensity-label">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="urge-actions">
                  <button
                    type="button"
                    className="urge-button"
                    disabled={initialIntensity === null}
                    onClick={startEpisode}
                  >
                    Start tracking
                  </button>
                </div>
              </div>
            )}

            {stage === "map" && (
              <div className="urge-content">
                <div className="urge-timer">
                  <span className="urge-timer-dot" />
                  Tracking · {formattedTime}
                </div>

                <div className="urge-kicker">
                  02 · Map the moment
                </div>

                <h2 className="urge-question">
                  What is happening around the urge right now?
                </h2>

                <p className="urge-subquestion">
                  Choose whatever fits. You can leave things blank if you do
                  not know yet.
                </p>

                <div className="urge-section">
                  <div className="urge-section-title">
                    In my body
                  </div>

                  <div className="urge-options">
                    {bodyOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`urge-option ${
                          bodyStates.includes(option)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => toggleBody(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="urge-section">
                  <div className="urge-section-title">
                    What is your mind saying?
                  </div>

                  <textarea
                    className="urge-textarea"
                    value={thought}
                    onChange={(event) =>
                      setThought(event.target.value)
                    }
                    placeholder="Put the thought into words, even if it feels automatic."
                  />
                </div>

                <div className="urge-section">
                  <div className="urge-section-title">
                    What does alcohol seem to promise?
                  </div>

                  <div className="urge-options">
                    {promiseOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`urge-option ${
                          promise === option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => setPromise(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="urge-actions">
                  <button
                    type="button"
                    className="urge-button"
                    onClick={saveMap}
                  >
                    Keep tracking
                  </button>
                </div>
              </div>
            )}

            {stage === "watch" && (
              <div className="urge-content">
                <div className="urge-timer">
                  <span className="urge-timer-dot" />
                  Tracking · {formattedTime}
                </div>

                <div className="urge-kicker">
                  03 · Watch
                </div>

                <h2 className="urge-question">
                  Let us see what the urge does over time.
                </h2>

                <p className="urge-subquestion">
                  Check in whenever something changes. There is no correct
                  direction for the urge to move.
                </p>

                <div className="urge-wave">
                  <svg
                    viewBox="0 0 700 115"
                    role="img"
                    aria-label="Urge intensity over time"
                  >
                    <line
                      x1="14"
                      y1="101"
                      x2="686"
                      y2="101"
                      stroke="#292d2a"
                      strokeWidth="1"
                    />

                    <line
                      x1="14"
                      y1="14"
                      x2="14"
                      y2="101"
                      stroke="#292d2a"
                      strokeWidth="1"
                    />

                    {wavePoints && (
                      <>
                        <polyline
                          className="urge-wave-line"
                          points={wavePoints}
                        />

                        {snapshots.map((snapshot, index) => {
                          const width = 700;
                          const height = 115;
                          const padding = 14;

                          const x =
                            snapshots.length === 1
                              ? width / 2
                              : padding +
                                (index /
                                  (snapshots.length - 1)) *
                                  (width - padding * 2);

                          const y =
                            height -
                            padding -
                            (snapshot.intensity / 5) *
                              (height - padding * 2);

                          return (
                            <circle
                              key={`${snapshot.time}-${index}`}
                              className="urge-wave-point"
                              cx={x}
                              cy={y}
                              r="5"
                            />
                          );
                        })}
                      </>
                    )}
                  </svg>
                </div>

                <div className="urge-section">
                  <div className="urge-question">
                    Where is it now?
                  </div>

                  <div className="urge-intensity-grid">
                    {intensityLabels.map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        className={`urge-intensity-button ${
                          currentIntensity === index
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentIntensity(index)
                        }
                      >
                        <span className="urge-intensity-number">
                          {index}
                        </span>
                        <span className="urge-intensity-label">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="urge-section">
                  <textarea
                    className="urge-textarea"
                    value={currentNote}
                    onChange={(event) =>
                      setCurrentNote(event.target.value)
                    }
                    placeholder="Anything you notice right now? Optional."
                  />
                </div>

                <div className="urge-actions">
                  <button
                    type="button"
                    className="urge-button secondary"
                    onClick={addSnapshot}
                    disabled={currentIntensity === null}
                  >
                    Check in
                  </button>

                  <button
                    type="button"
                    className="urge-button"
                    onClick={finishWatch}
                  >
                    I want to try something
                  </button>
                </div>
              </div>
            )}

            {stage === "respond" && (
              <div className="urge-content">
                <div className="urge-timer">
                  <span className="urge-timer-dot" />
                  Tracking · {formattedTime}
                </div>

                <div className="urge-kicker">
                  04 · Respond
                </div>

                <h2 className="urge-question">
                  You can try changing one thing.
                </h2>

                <p className="urge-subquestion">
                  The goal is not to force the urge away. Try something,
                  then come back and see what happened.
                </p>

                <div className="urge-options">
                  {responseOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`urge-option ${
                        response === option
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => setResponse(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="urge-actions">
                  <a
                    className="urge-button secondary"
                    href={breakTheLoopUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Break the Loop ↗
                  </a>

                  <a
                    className="urge-button secondary"
                    href={rideTheWaveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Ride the Wave ↗
                  </a>

                  <button
                    type="button"
                    className="urge-button"
                    disabled={!response}
                    onClick={finishResponse}
                  >
                    Check what changed
                  </button>
                </div>
              </div>
            )}

            {stage === "check" && (
              <div className="urge-content">
                <div className="urge-timer">
                  <span className="urge-timer-dot" />
                  Tracking · {formattedTime}
                </div>

                <div className="urge-kicker">
                  05 · Check again
                </div>

                <h2 className="urge-question">
                  What is the urge doing now?
                </h2>

                <p className="urge-subquestion">
                  Whatever happened is useful information. It does not have
                  to be better.
                </p>

                <div className="urge-intensity-grid">
                  {intensityLabels.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      className={`urge-intensity-button ${
                        currentIntensity === index
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentIntensity(index)
                      }
                    >
                      <span className="urge-intensity-number">
                        {index}
                      </span>
                      <span className="urge-intensity-label">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="urge-section">
                  <div className="urge-section-title">
                    Did anything change?
                  </div>

                  <div className="urge-options">
                    {changeOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`urge-option ${
                          change === option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => setChange(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="urge-section">
                  <textarea
                    className="urge-textarea"
                    value={currentNote}
                    onChange={(event) =>
                      setCurrentNote(event.target.value)
                    }
                    placeholder="What are you noticing now? Optional."
                  />
                </div>

                <div className="urge-actions">
                  <button
                    type="button"
                    className="urge-button"
                    disabled={currentIntensity === null}
                    onClick={finishCheck}
                  >
                    Keep the episode
                  </button>
                </div>
              </div>
            )}

            {stage === "learn" && (
              <div className="urge-content">
                <div className="urge-kicker">
                  06 · Learn
                </div>

                <h2 className="urge-question">
                  What did this episode show you?
                </h2>

                <p className="urge-subquestion">
                  There is no success or failure here. We are collecting
                  information about what actually happened.
                </p>

                <div className="urge-options">
                  {learningOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`urge-option ${
                        learning.includes(option)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => toggleLearning(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="urge-section">
                  <div className="urge-section-title">
                    Anything else you want to remember?
                  </div>

                  <textarea
                    className="urge-textarea"
                    value={reflection}
                    onChange={(event) =>
                      setReflection(event.target.value)
                    }
                    placeholder="Write anything you want to carry forward from this episode."
                  />
                </div>

                <div className="urge-section">
                  <div className="urge-section-title">
                    Did you drink afterward?
                  </div>

                  <div className="urge-options">
                    {["Yes", "No", "Not yet", "Not sure"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          className={`urge-option ${
                            drankAfterward === option
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setDrankAfterward(option)
                          }
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="urge-actions">
                  <button
                    type="button"
                    className="urge-button"
                    onClick={finishLearning}
                  >
                    See the episode
                  </button>
                </div>
              </div>
            )}

            {stage === "log" && (
              <div className="urge-content">
                <div className="urge-kicker">
                  07 · Log
                </div>

                <h2 className="urge-question">
                  Here is what this urge looked like.
                </h2>

                <p className="urge-subquestion">
                  You can keep this episode here, or add the information to
                  your Urge Tracker so it becomes part of your longer-term
                  pattern.
                </p>

                <div className="urge-summary">
                  <div className="urge-summary-title">
                    This episode
                  </div>

                  <div className="urge-summary-row">
                    <span>Started at</span>
                    <span>
                      {initialIntensity ?? "Not recorded"} / 5
                    </span>
                  </div>

                  <div className="urge-summary-row">
                    <span>Latest check</span>
                    <span>
                      {latestIntensity ?? "Not recorded"} / 5
                    </span>
                  </div>

                  <div className="urge-summary-row">
                    <span>Tracked for</span>
                    <span>{formattedTime}</span>
                  </div>

                  <div className="urge-summary-row">
                    <span>Body</span>
                    <span>
                      {bodyStates.length
                        ? bodyStates.join(", ")
                        : "Not recorded"}
                    </span>
                  </div>

                  <div className="urge-summary-row">
                    <span>Promise</span>
                    <span>
                      {promise || "Not recorded"}
                    </span>
                  </div>

                  <div className="urge-summary-row">
                    <span>Response</span>
                    <span>
                      {response || "Not recorded"}
                    </span>
                  </div>

                  <div className="urge-summary-row">
                    <span>Outcome</span>
                    <span>
                      {change || "Not recorded"}
                    </span>
                  </div>

                  <div className="urge-wave">
                    <svg
                      viewBox="0 0 700 115"
                      role="img"
                      aria-label="Your urge trajectory"
                    >
                      <polyline
                        className="urge-wave-line"
                        points={wavePoints}
                      />

                      {snapshots.map((snapshot, index) => {
                        const width = 700;
                        const height = 115;
                        const padding = 14;

                        const x =
                          snapshots.length === 1
                            ? width / 2
                            : padding +
                              (index /
                                (snapshots.length - 1)) *
                                (width - padding * 2);

                        const y =
                          height -
                          padding -
                          (snapshot.intensity / 5) *
                            (height - padding * 2);

                        return (
                          <circle
                            key={`${snapshot.time}-summary-${index}`}
                            className="urge-wave-point"
                            cx={x}
                            cy={y}
                            r="5"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                <p className="urge-note">
                  This is a record of one episode, not a diagnosis or a
                  measurement of how well you handled it.
                </p>

                <div className="urge-complete">
                  <div className="urge-complete-mark">
                    ✓
                  </div>

                  <div>
                    <strong>Episode tracked.</strong>

                    <div className="urge-note">
                      You can now decide whether you want to keep it in your
                      longer-term record.
                    </div>
                  </div>
                </div>

                <div className="urge-actions">
                  <a
                    className="urge-button"
                    href={notionUrgeTrackerUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add to my Urge Tracker ↗
                  </a>

                  <button
                    type="button"
                    className="urge-button secondary"
                    onClick={resetEpisode}
                  >
                    Track another urge
                  </button>
                </div>
              </div>
            )}
          </section>

          <aside className="urge-panel urge-map-panel">
            <div className="urge-map-header">
              <div>
                <h2 className="urge-map-title">
                  The urge map
                </h2>

                <p className="urge-map-copy">
                  Follow the episode as it unfolds.
                </p>
              </div>
            </div>

            <div className="urge-map">
              <div className="urge-map-line" />

              <div
                className="urge-map-flow"
                style={{
                  top: `${
                    55 + Math.max(0, currentMapIndex) * 73
                  }px`,
                }}
              />

              {mapStages.map((item, index) => {
                const itemIndex = index;
                const isActive =
                  item.id === currentMapStage;
                const isDone =
                  itemIndex < currentMapIndex;
                const isFuture =
                  itemIndex > currentMapIndex;

                return (
                  <div
                    key={item.id}
                    className={`urge-node ${
                      isActive ? "active" : ""
                    } ${isDone ? "done" : ""} ${
                      isFuture ? "future" : ""
                    }`}
                  >
                    <span className="urge-node-label">
                      {item.label}
                    </span>

                    <span className="urge-node-detail">
                      {item.detail}
                    </span>
                  </div>
                );
              })}
            </div>

            {startedAt && (
              <div className="urge-mini-stat">
                <div className="urge-stat">
                  <div className="urge-stat-value">
                    {initialIntensity ?? "–"}
                  </div>

                  <div className="urge-stat-label">
                    Started
                  </div>
                </div>

                <div className="urge-stat">
                  <div className="urge-stat-value">
                    {latestIntensity ?? "–"}
                  </div>

                  <div className="urge-stat-label">
                    Now
                  </div>
                </div>

                <div className="urge-stat">
                  <div className="urge-stat-value">
                    {snapshots.length}
                  </div>

                  <div className="urge-stat-label">
                    Check-ins
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}