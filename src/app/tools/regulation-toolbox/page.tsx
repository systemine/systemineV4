"use client";

import { useEffect, useMemo, useState } from "react";

type Stage =
  | "start"
  | "need"
  | "constraints"
  | "choose"
  | "before"
  | "try"
  | "after"
  | "learn";

const regulationToolboxFormUrl =
  "https://tundra-pedestrian-2e3.notion.site/3e5e2b0af92780cc9196df4135fd5522";

const needs = [
  {
    id: "settle",
    title: "SETTLE",
    description: "My system feels activated.",
  },
  {
    id: "shift",
    title: "SHIFT",
    description: "I need my attention somewhere else.",
  },
  {
    id: "move",
    title: "MOVE",
    description: "I need to change something physically.",
  },
  {
    id: "connect",
    title: "CONNECT",
    description: "I do not want to be alone with this.",
  },
  {
    id: "ground",
    title: "GROUND",
    description: "I feel scattered or disconnected.",
  },
  {
    id: "express",
    title: "EXPRESS",
    description: "Something needs somewhere to go.",
  },
  {
    id: "rest",
    title: "REST",
    description: "I feel depleted.",
  },
  {
    id: "unsure",
    title: "I DO NOT KNOW",
    description: "I just need something to try.",
  },
];

const timeOptions = [
  "2 minutes",
  "5 minutes",
  "15 minutes",
  "I have plenty of time",
];

const placeOptions = [
  "At home",
  "At work",
  "Outside",
  "In bed",
  "With people",
  "Alone",
];

const effortOptions = [
  "Very little",
  "A little",
  "Some",
  "I can do something active",
];

const toolLibrary = [
  {
    id: "breathing",
    title: "SLOW YOUR BREATH",
    category: "Settle",
    needs: ["settle", "ground"],
    time: ["2 minutes", "5 minutes"],
    places: ["At home", "At work", "Outside", "In bed", "With people", "Alone"],
    effort: ["Very little", "A little"],
    description:
      "Slow the pace of your breathing and give your attention something simple to follow.",
    instruction:
      "Let the exhale become a little longer than the inhale. Keep the pace comfortable. Stay with it for a few minutes.",
  },
  {
    id: "temperature",
    title: "CHANGE YOUR TEMPERATURE",
    category: "Settle",
    needs: ["settle", "ground"],
    time: ["2 minutes", "5 minutes"],
    places: ["At home", "At work"],
    effort: ["Very little", "A little"],
    description:
      "Use a brief sensory change to interrupt the state you are currently in.",
    instruction:
      "Use a safe, comfortable change in temperature such as cool water on your hands or face. Notice the sensory shift without forcing anything.",
  },
  {
    id: "movement",
    title: "MOVE YOUR BODY",
    category: "Move",
    needs: ["move", "shift", "settle"],
    time: ["2 minutes", "5 minutes", "15 minutes", "I have plenty of time"],
    places: ["At home", "At work", "Outside"],
    effort: ["A little", "Some", "I can do something active"],
    description:
      "Change your physical state with simple movement.",
    instruction:
      "Walk, stretch, shake out your hands, or move in another comfortable way. The aim is simply to change state.",
  },
  {
    id: "music",
    title: "CHANGE THE SOUND",
    category: "Shift",
    needs: ["shift", "ground", "express"],
    time: ["2 minutes", "5 minutes", "15 minutes"],
    places: ["At home", "At work", "Outside", "In bed", "Alone"],
    effort: ["Very little", "A little"],
    description:
      "Use music or sound to change the atmosphere around you.",
    instruction:
      "Choose one piece of music or sound deliberately. Listen to it rather than letting it become background noise.",
  },
  {
    id: "sensory",
    title: "USE YOUR SENSES",
    category: "Ground",
    needs: ["ground", "settle", "shift"],
    time: ["2 minutes", "5 minutes"],
    places: ["At home", "At work", "Outside", "In bed", "With people", "Alone"],
    effort: ["Very little", "A little"],
    description:
      "Bring attention back to what you can see, hear, touch, smell, or taste.",
    instruction:
      "Choose one sense and deliberately notice several details around you. Let the details hold your attention for a moment.",
  },
  {
    id: "outside",
    title: "CHANGE THE SCENE",
    category: "Shift",
    needs: ["shift", "move", "ground"],
    time: ["5 minutes", "15 minutes", "I have plenty of time"],
    places: ["At home", "At work", "Outside"],
    effort: ["A little", "Some"],
    description:
      "Change your surroundings instead of staying inside the same moment.",
    instruction:
      "Move to another room, step outside, walk somewhere nearby, or change the physical setting around you.",
  },
  {
    id: "connection",
    title: "CONTACT SOMEONE",
    category: "Connect",
    needs: ["connect", "settle", "shift"],
    time: ["2 minutes", "5 minutes", "15 minutes"],
    places: ["At home", "At work", "Outside", "In bed", "Alone"],
    effort: ["A little", "Some"],
    description:
      "Bring another person into the moment.",
    instruction:
      "Send a simple message or make a call. You do not need to explain everything. You can simply say that you would like some company.",
  },
  {
    id: "write",
    title: "PUT IT SOMEWHERE",
    category: "Express",
    needs: ["express", "ground", "shift"],
    time: ["5 minutes", "15 minutes", "I have plenty of time"],
    places: ["At home", "At work", "In bed", "Alone"],
    effort: ["A little", "Some"],
    description:
      "Give the thoughts or feelings somewhere outside your head to go.",
    instruction:
      "Write freely for a few minutes. You do not need to solve anything or make the writing useful.",
  },
  {
    id: "rest",
    title: "LOWER THE DEMAND",
    category: "Rest",
    needs: ["rest", "settle", "ground"],
    time: ["5 minutes", "15 minutes", "I have plenty of time"],
    places: ["At home", "In bed", "Alone"],
    effort: ["Very little", "A little"],
    description:
      "Reduce stimulation and give yourself a short period without another task.",
    instruction:
      "Put down what you are doing. Reduce noise or stimulation if possible. Give yourself a few quiet minutes without needing to accomplish anything.",
  },
  {
    id: "creative",
    title: "MAKE SOMETHING",
    category: "Express",
    needs: ["express", "shift", "ground"],
    time: ["5 minutes", "15 minutes", "I have plenty of time"],
    places: ["At home", "At work", "Alone"],
    effort: ["A little", "Some", "I can do something active"],
    description:
      "Use making as a way to move attention and energy.",
    instruction:
      "Draw, write, doodle, cook, build, arrange, or make something small. There is no requirement for the result to be good.",
  },
];

const intensityLabels = [
  "None",
  "Very low",
  "Low",
  "Moderate",
  "Strong",
  "Very strong",
];

const usefulnessOptions = [
  "Very helpful",
  "Quite helpful",
  "Somewhat helpful",
  "A little helpful",
  "Not helpful",
  "Not sure",
];

const repeatOptions = [
  "Definitely",
  "Probably",
  "Maybe",
  "Probably not",
  "No",
];

export default function RegulationToolbox() {
  const [stage, setStage] = useState<Stage>("start");

  const [need, setNeed] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [effort, setEffort] = useState("");

  const [selectedTool, setSelectedTool] = useState("");
  const [beforeIntensity, setBeforeIntensity] = useState<number | null>(null);
  const [afterIntensity, setAfterIntensity] = useState<number | null>(null);

  const [usefulness, setUsefulness] = useState("");
  const [wouldRepeat, setWouldRepeat] = useState("");
  const [reflection, setReflection] = useState("");

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");

    style.id = "regulation-toolbox-styles";

    style.textContent = `
      .rtb-page {
        min-height: 100vh;
        background: #111312;
        color: #f1efe7;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        padding: 48px 24px 80px;
      }

      .rtb-shell {
        max-width: 1180px;
        margin: 0 auto;
      }

      .rtb-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 28px;
      }

      .rtb-brand {
        color: #dcd9cf;
        font-size: 13px;
        font-weight: 750;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .rtb-live {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #86b7ff;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .rtb-live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #7faef2;
        box-shadow: 0 0 0 5px rgba(127, 174, 242, 0.08);
      }

      .rtb-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
        gap: 28px;
        align-items: stretch;
      }

      .rtb-panel {
        background: #171a18;
        border: 1px solid #30332f;
        border-radius: 18px;
        padding: 32px;
      }

      .rtb-main {
        min-height: 680px;
        display: flex;
        flex-direction: column;
      }

      .rtb-progress {
        height: 4px;
        background: #292d2a;
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 30px;
      }

      .rtb-progress-fill {
        height: 100%;
        background: #7faef2;
        border-radius: 999px;
        transition: width 400ms ease;
      }

      .rtb-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .rtb-kicker {
        color: #7faef2;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.17em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .rtb-title {
        font-size: clamp(32px, 4vw, 48px);
        line-height: 1.03;
        letter-spacing: -0.045em;
        margin: 0 0 17px;
        font-weight: 780;
      }

      .rtb-question {
        font-size: 28px;
        line-height: 1.18;
        letter-spacing: -0.025em;
        margin: 0 0 10px;
      }

      .rtb-copy {
        color: #a8a9a2;
        font-size: 14px;
        line-height: 1.7;
        max-width: 660px;
      }

      .rtb-section {
        margin-top: 28px;
      }

      .rtb-section-title {
        color: #e6e3da;
        font-size: 14px;
        font-weight: 750;
        margin-bottom: 12px;
      }

      .rtb-options {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .rtb-option {
        min-height: 58px;
        text-align: left;
        padding: 13px 15px;
        border: 1px solid #383c38;
        background: #202420;
        color: #dcdad1;
        border-radius: 12px;
        cursor: pointer;
        transition:
          border-color 180ms ease,
          background 180ms ease,
          transform 180ms ease;
      }

      .rtb-option:hover {
        border-color: #718ebc;
        transform: translateY(-1px);
      }

      .rtb-option.selected {
        background: #24364d;
        border-color: #7faef2;
        color: #f3f1e8;
      }

      .rtb-option-title {
        display: block;
        font-size: 13px;
        font-weight: 750;
        margin-bottom: 4px;
      }

      .rtb-option-description {
        display: block;
        color: #8e918b;
        font-size: 11px;
        line-height: 1.4;
      }

      .rtb-option.selected .rtb-option-description {
        color: #c0d1e9;
      }

      .rtb-button-row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 28px;
      }

      .rtb-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 12px;
        padding: 14px 20px;
        background: #7faef2;
        color: #101923;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
        text-decoration: none;
        transition: transform 180ms ease, opacity 180ms ease;
      }

      .rtb-button:hover {
        transform: translateY(-1px);
      }

      .rtb-button.secondary {
        background: #272b28;
        color: #d9d7ce;
        border: 1px solid #3a3d39;
      }

      .rtb-button:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        transform: none;
      }

      .rtb-map-panel {
        min-height: 680px;
        position: sticky;
        top: 24px;
        overflow: hidden;
      }

      .rtb-map-heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 20px;
      }

      .rtb-map-title {
        margin: 0;
        font-size: 17px;
      }

      .rtb-map-subtitle {
        margin-top: 5px;
        color: #7f827b;
        font-size: 11px;
        line-height: 1.5;
      }

      .rtb-map {
        position: relative;
        min-height: 510px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
      }

      .rtb-map-line {
        position: absolute;
        top: 42px;
        bottom: 30px;
        left: 50%;
        width: 2px;
        transform: translateX(-50%);
        background: linear-gradient(
          to bottom,
          rgba(127, 174, 242, 0.06),
          rgba(127, 174, 242, 0.38),
          rgba(127, 174, 242, 0.06)
        );
      }

      .rtb-map-pulse {
        position: absolute;
        left: 50%;
        width: 8px;
        height: 8px;
        transform: translateX(-50%);
        border-radius: 50%;
        background: #a9ccff;
        box-shadow: 0 0 0 6px rgba(127, 174, 242, 0.08);
        transition: top 550ms ease;
        z-index: 3;
      }

      .rtb-node {
        position: relative;
        z-index: 2;
        width: min(285px, 88%);
        padding: 14px 17px;
        margin-bottom: 14px;
        border-radius: 14px;
        border: 1px solid #343833;
        background: #1c201d;
        transition:
          background 280ms ease,
          border-color 280ms ease,
          transform 280ms ease,
          opacity 280ms ease;
      }

      .rtb-node.active {
        background: #26384f;
        border-color: #7faef2;
        transform: scale(1.025);
      }

      .rtb-node.done {
        background: #1e2924;
        border-color: #42513f;
      }

      .rtb-node.future {
        opacity: 0.42;
      }

      .rtb-node-label {
        display: block;
        color: #ece9e0;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.13em;
      }

      .rtb-node-detail {
        display: block;
        color: #81847d;
        font-size: 10px;
        margin-top: 4px;
      }

      .rtb-tool-card {
        border: 1px solid #3a3e3a;
        background: #1b1f1c;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 12px;
      }

      .rtb-tool-card.selected {
        border-color: #7faef2;
        background: #202d3d;
      }

      .rtb-tool-category {
        color: #7faef2;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-weight: 800;
        margin-bottom: 8px;
      }

      .rtb-tool-name {
        font-size: 17px;
        font-weight: 780;
        margin-bottom: 7px;
      }

      .rtb-tool-description {
        color: #999c95;
        font-size: 12px;
        line-height: 1.55;
      }

      .rtb-tool-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 13px;
      }

      .rtb-pill {
        border: 1px solid #363a36;
        border-radius: 999px;
        padding: 5px 8px;
        color: #8c8f88;
        font-size: 9px;
      }

      .rtb-timer {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #393d39;
        background: #111411;
        border-radius: 999px;
        padding: 8px 12px;
        color: #b7b7af;
        font-size: 11px;
        margin-bottom: 23px;
      }

      .rtb-timer-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #7faef2;
      }

      .rtb-intensity-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 8px;
        margin-top: 18px;
      }

      .rtb-intensity {
        min-height: 74px;
        border: 1px solid #383c38;
        background: #202420;
        color: #dddcd3;
        border-radius: 12px;
        cursor: pointer;
      }

      .rtb-intensity:hover {
        border-color: #718ebc;
      }

      .rtb-intensity.selected {
        background: #24364d;
        border-color: #7faef2;
      }

      .rtb-intensity-number {
        display: block;
        font-size: 23px;
        font-weight: 800;
      }

      .rtb-intensity-label {
        display: block;
        color: #898c85;
        font-size: 9px;
        margin-top: 5px;
      }

      .rtb-intensity.selected .rtb-intensity-label {
        color: #c6d7ed;
      }

      .rtb-instruction {
        border-left: 2px solid #7faef2;
        padding-left: 17px;
        color: #b5b6af;
        font-size: 14px;
        line-height: 1.7;
        margin: 24px 0;
      }

      .rtb-note {
        width: 100%;
        min-height: 105px;
        box-sizing: border-box;
        resize: vertical;
        border: 1px solid #373b37;
        background: #101210;
        color: #eeece3;
        border-radius: 11px;
        padding: 14px;
        font: inherit;
        font-size: 13px;
        outline: none;
      }

      .rtb-note:focus {
        border-color: #7faef2;
      }

      .rtb-result {
        border: 1px solid #3c4d62;
        background: #1d2937;
        border-radius: 15px;
        padding: 22px;
        margin-top: 20px;
      }

      .rtb-result-title {
        color: #a9c8ef;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.13em;
        font-weight: 800;
        margin-bottom: 12px;
      }

      .rtb-result-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 9px;
      }

      .rtb-result-stat {
        border: 1px solid #35404c;
        background: #18212b;
        border-radius: 11px;
        padding: 13px;
      }

      .rtb-result-value {
        font-size: 22px;
        font-weight: 800;
      }

      .rtb-result-label {
        color: #818a94;
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-top: 4px;
      }

      .rtb-try-box {
        border: 1px solid #343933;
        background: #151816;
        border-radius: 15px;
        padding: 22px;
        margin-top: 22px;
      }

      .rtb-try-box-title {
        font-size: 18px;
        font-weight: 780;
        margin-bottom: 8px;
      }

      .rtb-try-box-copy {
        color: #999b94;
        font-size: 12px;
        line-height: 1.6;
      }

      .rtb-link-card {
        display: block;
        text-decoration: none;
        border: 1px solid #353a36;
        background: #1a1e1b;
        border-radius: 12px;
        padding: 15px;
        margin-top: 10px;
        color: #e8e5dc;
      }

      .rtb-link-card:hover {
        border-color: #718ebc;
      }

      .rtb-link-card-title {
        color: #7faef2;
        font-size: 12px;
        font-weight: 800;
      }

      .rtb-link-card-copy {
        color: #80837c;
        font-size: 10px;
        margin-top: 4px;
      }

      @media (max-width: 900px) {
        .rtb-layout {
          grid-template-columns: 1fr;
        }

        .rtb-map-panel {
          position: static;
          min-height: auto;
        }
      }

      @media (max-width: 600px) {
        .rtb-page {
          padding: 28px 14px 50px;
        }

        .rtb-panel {
          padding: 22px;
        }

        .rtb-options {
          grid-template-columns: 1fr;
        }

        .rtb-intensity-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .rtb-result-grid {
          grid-template-columns: 1fr;
        }

        .rtb-node {
          width: 88%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .rtb-node,
        .rtb-map-pulse,
        .rtb-progress-fill,
        .rtb-button,
        .rtb-option {
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (!startedAt) return;

    const interval = window.setInterval(() => {
      setElapsed(
        Math.floor((Date.now() - startedAt) / 1000)
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startedAt]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [elapsed]);

  const recommendedTools = useMemo(() => {
    if (!need) return toolLibrary.slice(0, 3);

    const scored = toolLibrary.map((tool) => {
      let score = 0;

      if (tool.needs.includes(need)) score += 5;
      if (time && tool.time.includes(time)) score += 3;
      if (place && tool.places.includes(place)) score += 2;
      if (effort && tool.effort.includes(effort)) score += 2;

      if (need === "unsure") score += 1;

      return {
        tool,
        score,
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.tool);
  }, [need, time, place, effort]);

  const selectedToolData = toolLibrary.find(
    (tool) => tool.id === selectedTool
  );

  const stages: Stage[] = [
    "start",
    "need",
    "constraints",
    "choose",
    "before",
    "try",
    "after",
    "learn",
  ];

  const stageIndex = stages.indexOf(stage);

  const progress =
    stage === "start"
      ? 0
      : Math.round((stageIndex / (stages.length - 1)) * 100);

  const mapItems = [
    {
      id: "need",
      label: "NEED",
      detail: "What would help right now?",
    },
    {
      id: "constraints",
      label: "REALITY",
      detail: "Time · place · effort",
    },
    {
      id: "choose",
      label: "CHOOSE",
      detail: "Find something possible",
    },
    {
      id: "before",
      label: "BEFORE",
      detail: "Notice the urge",
    },
    {
      id: "try",
      label: "TRY",
      detail: "Do the thing",
    },
    {
      id: "after",
      label: "AFTER",
      detail: "Check what changed",
    },
    {
      id: "learn",
      label: "LEARN",
      detail: "Keep what is useful",
    },
  ];

  const mapIndex =
    stage === "start"
      ? 0
      : stage === "need"
        ? 0
        : stage === "constraints"
          ? 1
          : stage === "choose"
            ? 2
            : stage === "before"
              ? 3
              : stage === "try"
                ? 4
                : stage === "after"
                  ? 5
                  : 6;

  const start = () => {
    setStage("need");
  };

  const chooseNeed = () => {
    if (!need) return;
    setStage("constraints");
  };

  const chooseConstraints = () => {
    if (!time || !place || !effort) return;
    setStage("choose");
  };

  const chooseTool = () => {
    if (!selectedTool) return;

    setStartedAt(Date.now());
    setElapsed(0);
    setStage("before");
  };

  const startTrying = () => {
    if (beforeIntensity === null) return;
    setStage("try");
  };

  const finishTrying = () => {
    setStage("after");
  };

  const finishAfter = () => {
    if (afterIntensity === null) return;
    setStage("learn");
  };

  const reset = () => {
    setStage("start");
    setNeed("");
    setTime("");
    setPlace("");
    setEffort("");
    setSelectedTool("");
    setBeforeIntensity(null);
    setAfterIntensity(null);
    setUsefulness("");
    setWouldRepeat("");
    setReflection("");
    setStartedAt(null);
    setElapsed(0);
  };

  return (
    <main className="rtb-page">
      <div className="rtb-shell">
        <header className="rtb-header">
          <div className="rtb-brand">
            Systemine · Regulation Toolbox
          </div>

          {startedAt && (
            <div className="rtb-live">
              <span className="rtb-live-dot" />
              Tool in progress
            </div>
          )}
        </header>

        <div className="rtb-layout">
          <section className="rtb-panel rtb-main">
            <div className="rtb-progress">
              <div
                className="rtb-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {stage === "start" && (
              <div className="rtb-content">
                <div className="rtb-kicker">
                  Regulation Toolbox
                </div>

                <h1 className="rtb-title">
                  Find something you can actually use right now.
                </h1>

                <p className="rtb-copy">
                  You do not need the perfect coping strategy.
                  You need something that fits the moment you are
                  actually in.
                </p>

                <div className="rtb-section">
                  <p className="rtb-copy">
                    This tool helps you narrow the field, try one
                    thing, and notice what happens to the urge.
                  </p>
                </div>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    onClick={start}
                  >
                    Start here
                  </button>
                </div>
              </div>
            )}

            {stage === "need" && (
              <div className="rtb-content">
                <div className="rtb-kicker">
                  01 · What do you need?
                </div>

                <h2 className="rtb-question">
                  What would feel useful right now?
                </h2>

                <p className="rtb-copy">
                  Pick the closest match. You do not have to know exactly
                  what is happening.
                </p>

                <div className="rtb-section">
                  <div className="rtb-options">
                    {needs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`rtb-option ${
                          need === item.id ? "selected" : ""
                        }`}
                        onClick={() => setNeed(item.id)}
                      >
                        <span className="rtb-option-title">
                          {item.title}
                        </span>

                        <span className="rtb-option-description">
                          {item.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    disabled={!need}
                    onClick={chooseNeed}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {stage === "constraints" && (
              <div className="rtb-content">
                <div className="rtb-kicker">
                  02 · Reality check
                </div>

                <h2 className="rtb-question">
                  What is actually possible right now?
                </h2>

                <p className="rtb-copy">
                  A useful tool is one you can realistically use in the
                  moment.
                </p>

                <div className="rtb-section">
                  <div className="rtb-section-title">
                    How much time do you have?
                  </div>

                  <div className="rtb-options">
                    {timeOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`rtb-option ${
                          time === option ? "selected" : ""
                        }`}
                        onClick={() => setTime(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rtb-section">
                  <div className="rtb-section-title">
                    Where are you?
                  </div>

                  <div className="rtb-options">
                    {placeOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`rtb-option ${
                          place === option ? "selected" : ""
                        }`}
                        onClick={() => setPlace(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rtb-section">
                  <div className="rtb-section-title">
                    How much effort can you manage?
                  </div>

                  <div className="rtb-options">
                    {effortOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`rtb-option ${
                          effort === option ? "selected" : ""
                        }`}
                        onClick={() => setEffort(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    disabled={!time || !place || !effort}
                    onClick={chooseConstraints}
                  >
                    Show me some options
                  </button>
                </div>
              </div>
            )}

            {stage === "choose" && (
              <div className="rtb-content">
                <div className="rtb-kicker">
                  03 · Choose
                </div>

                <h2 className="rtb-question">
                  These look possible for this moment.
                </h2>

                <p className="rtb-copy">
                  There is no ranking here. Choose the one that feels most
                  doable.
                </p>

                <div className="rtb-section">
                  {recommendedTools.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      className={`rtb-tool-card ${
                        selectedTool === tool.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <div className="rtb-tool-category">
                        {tool.category}
                      </div>

                      <div className="rtb-tool-name">
                        {tool.title}
                      </div>

                      <div className="rtb-tool-description">
                        {tool.description}
                      </div>

                      <div className="rtb-tool-meta">
                        <span className="rtb-pill">
                          {tool.time[0]}
                        </span>

                        <span className="rtb-pill">
                          {tool.effort[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    disabled={!selectedTool}
                    onClick={chooseTool}
                  >
                    Use this one
                  </button>
                </div>
              </div>
            )}

            {stage === "before" && selectedToolData && (
              <div className="rtb-content">
                <div className="rtb-timer">
                  <span className="rtb-timer-dot" />
                  Episode · {formattedTime}
                </div>

                <div className="rtb-kicker">
                  04 · Before
                </div>

                <h2 className="rtb-question">
                  Notice the urge before you try it.
                </h2>

                <p className="rtb-copy">
                  This gives you something to compare with later. You are
                  not trying to make the number smaller yet.
                </p>

                <div className="rtb-intensity-grid">
                  {intensityLabels.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      className={`rtb-intensity ${
                        beforeIntensity === index
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setBeforeIntensity(index)
                      }
                    >
                      <span className="rtb-intensity-number">
                        {index}
                      </span>

                      <span className="rtb-intensity-label">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="rtb-try-box">
                  <div className="rtb-try-box-title">
                    {selectedToolData.title}
                  </div>

                  <div className="rtb-try-box-copy">
                    {selectedToolData.description}
                  </div>
                </div>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    disabled={beforeIntensity === null}
                    onClick={startTrying}
                  >
                    I am ready to try it
                  </button>
                </div>
              </div>
            )}

            {stage === "try" && selectedToolData && (
              <div className="rtb-content">
                <div className="rtb-timer">
                  <span className="rtb-timer-dot" />
                  Try it · {formattedTime}
                </div>

                <div className="rtb-kicker">
                  05 · Try
                </div>

                <h2 className="rtb-question">
                  Give this a few minutes.
                </h2>

                <div className="rtb-try-box">
                  <div className="rtb-tool-category">
                    {selectedToolData.category}
                  </div>

                  <div className="rtb-tool-name">
                    {selectedToolData.title}
                  </div>

                  <div className="rtb-instruction">
                    {selectedToolData.instruction}
                  </div>

                  <div className="rtb-tool-meta">
                    {selectedToolData.time.map((item) => (
                      <span
                        key={item}
                        className="rtb-pill"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="rtb-copy">
                  You can stop when you have had enough. The point is to
                  collect information about what happens when you try it.
                </p>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    onClick={finishTrying}
                  >
                    Check the urge
                  </button>
                </div>
              </div>
            )}

            {stage === "after" && (
              <div className="rtb-content">
                <div className="rtb-timer">
                  <span className="rtb-timer-dot" />
                  Check · {formattedTime}
                </div>

                <div className="rtb-kicker">
                  06 · After
                </div>

                <h2 className="rtb-question">
                  Where is the urge now?
                </h2>

                <p className="rtb-copy">
                  It can be lower, higher, unchanged, or simply different.
                  All of those are useful observations.
                </p>

                <div className="rtb-intensity-grid">
                  {intensityLabels.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      className={`rtb-intensity ${
                        afterIntensity === index
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setAfterIntensity(index)
                      }
                    >
                      <span className="rtb-intensity-number">
                        {index}
                      </span>

                      <span className="rtb-intensity-label">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="rtb-section">
                  <div className="rtb-section-title">
                    How did the tool feel to use?
                  </div>

                  <div className="rtb-options">
                    {usefulnessOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`rtb-option ${
                          usefulness === option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setUsefulness(option)
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rtb-button-row">
                  <button
                    type="button"
                    className="rtb-button"
                    disabled={
                      afterIntensity === null ||
                      !usefulness
                    }
                    onClick={finishAfter}
                  >
                    See what I learned
                  </button>
                </div>
              </div>
            )}

            {stage === "learn" && selectedToolData && (
              <div className="rtb-content">
                <div className="rtb-kicker">
                  07 · Learn
                </div>

                <h2 className="rtb-question">
                  Keep the information, not the verdict.
                </h2>

                <p className="rtb-copy">
                  One attempt does not tell you everything about a tool.
                  It does give you another piece of information about what
                  works for you.
                </p>

                <div className="rtb-result">
                  <div className="rtb-result-title">
                    This attempt
                  </div>

                  <div className="rtb-result-grid">
                    <div className="rtb-result-stat">
                      <div className="rtb-result-value">
                        {beforeIntensity ?? "–"}
                      </div>

                      <div className="rtb-result-label">
                        Urge before
                      </div>
                    </div>

                    <div className="rtb-result-stat">
                      <div className="rtb-result-value">
                        {afterIntensity ?? "–"}
                      </div>

                      <div className="rtb-result-label">
                        Urge after
                      </div>
                    </div>

                    <div className="rtb-result-stat">
                      <div className="rtb-result-value">
                        {usefulness || "–"}
                      </div>

                      <div className="rtb-result-label">
                        Felt like
                      </div>
                    </div>

                    <div className="rtb-result-stat">
                      <div className="rtb-result-value">
                        {selectedToolData.category}
                      </div>

                      <div className="rtb-result-label">
                        Category
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rtb-section">
                  <div className="rtb-section-title">
                    Would you use this again?
                  </div>

                  <div className="rtb-options">
                    {repeatOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`rtb-option ${
                          wouldRepeat === option
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setWouldRepeat(option)
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rtb-section">
                  <div className="rtb-section-title">
                    What do you want to remember?
                  </div>

                  <textarea
                    className="rtb-note"
                    value={reflection}
                    onChange={(event) =>
                      setReflection(event.target.value)
                    }
                    placeholder="What did you notice about this tool, the urge, or the situation?"
                  />
                </div>

                <div className="rtb-button-row">
                  <a
                    className="rtb-button"
                    href={regulationToolboxFormUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add this to my Toolbox ↗
                  </a>

                  <button
                    type="button"
                    className="rtb-button secondary"
                    onClick={reset}
                  >
                    Try another tool
                  </button>
                </div>
              </div>
            )}
          </section>

          <aside className="rtb-panel rtb-map-panel">
            <div className="rtb-map-heading">
              <div>
                <h2 className="rtb-map-title">
                  The regulation route
                </h2>

                <div className="rtb-map-subtitle">
                  From what you need to what you learn.
                </div>
              </div>
            </div>

            <div className="rtb-map">
              <div className="rtb-map-line" />

              <div
                className="rtb-map-pulse"
                style={{
                  top: `${42 + mapIndex * 72}px`,
                }}
              />

              {mapItems.map((item, index) => {
                const active = index === mapIndex;
                const done = index < mapIndex;
                const future = index > mapIndex;

                return (
                  <div
                    key={item.id}
                    className={`rtb-node ${
                      active ? "active" : ""
                    } ${done ? "done" : ""} ${
                      future ? "future" : ""
                    }`}
                  >
                    <span className="rtb-node-label">
                      {item.label}
                    </span>

                    <span className="rtb-node-detail">
                      {item.detail}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedToolData && (
              <div className="rtb-tool-card selected">
                <div className="rtb-tool-category">
                  Current tool
                </div>

                <div className="rtb-tool-name">
                  {selectedToolData.title}
                </div>

                <div className="rtb-tool-description">
                  {selectedToolData.description}
                </div>
              </div>
            )}

            <a
              className="rtb-link-card"
              href={regulationToolboxFormUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div className="rtb-link-card-title">
                Add a tool to your Toolbox ↗
              </div>

              <div className="rtb-link-card-copy">
                Build your personal library of things you can actually use.
              </div>
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}