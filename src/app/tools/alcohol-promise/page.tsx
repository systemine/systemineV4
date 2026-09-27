"use client";

import { useEffect, useMemo, useState } from "react";

type PromiseKey =
  | "relief"
  | "calm"
  | "confidence"
  | "connection"
  | "pleasure"
  | "stimulation"
  | "belong"
  | "celebrate"
  | "break"
  | "something"
  | "emotional"
  | "sleep"
  | "numbness"
  | "escape"
  | "courage"
  | "reward"
  | "other";

type Stage = "start" | "routes" | "choose" | "result";

type Alternative = {
  title: string;
  description: string;
};

const alcoholPromiseFormUrl =
  "https://tundra-pedestrian-2e3.notion.site/3e5e2b0af92780508e8ae6f8be190490";

const promiseData: Record<
  PromiseKey,
  {
    title: string;
    description: string;
    alternatives: Alternative[];
  }
> = {
  relief: {
    title: "Relief",
    description: "I want things to feel easier for a while.",
    alternatives: [
      {
        title: "Take something off your plate",
        description:
          "Choose one thing you can postpone, drop, delegate, or stop thinking about for now.",
      },
      {
        title: "Change the demand",
        description:
          "Step away from whatever is asking the most from you and give yourself a lower-demand period.",
      },
      {
        title: "Let someone help",
        description:
          "Tell someone what is weighing on you and ask them to take one small thing off your plate.",
      },
      {
        title: "Give yourself a real break",
        description:
          "Do something deliberately low-effort without using the time to catch up on everything else.",
      },
    ],
  },

  calm: {
    title: "Calm",
    description: "I want my mind and body to finally settle down.",
    alternatives: [
      {
        title: "Lower the noise",
        description:
          "Reduce lights, notifications, conversation, or whatever is keeping your system switched on.",
      },
      {
        title: "Change your surroundings",
        description:
          "Move somewhere quieter or more comfortable and give yourself a slower environment.",
      },
      {
        title: "Use something familiar",
        description:
          "Choose a familiar activity, show, music, or routine that reliably helps you settle.",
      },
      {
        title: "Give yourself time to come down",
        description:
          "Stop trying to solve the situation for a while and let your body have some time without another demand.",
      },
    ],
  },

  confidence: {
    title: "Confidence",
    description:
      "I want to feel less self-conscious and more able to be myself.",
    alternatives: [
      {
        title: "Make the step smaller",
        description:
          "Do a smaller version of the thing you are nervous about instead of forcing yourself through the whole thing.",
      },
      {
        title: "Prepare what you want to say",
        description:
          "Write down the words, questions, or boundaries you want available when the moment arrives.",
      },
      {
        title: "Start with someone safe",
        description:
          "Practice the situation around someone you already feel comfortable with.",
      },
      {
        title: "Remember what you already know",
        description:
          "Write down one thing you have handled before that tells you you can get through this.",
      },
    ],
  },

  connection: {
    title: "Connection",
    description:
      "I want to feel closer to people and less alone.",
    alternatives: [
      {
        title: "Contact someone you actually like being around",
        description:
          "Send a message, make a call, or ask someone to spend some time with you.",
      },
      {
        title: "Ask for company",
        description:
          "You do not need to explain everything. You can simply say that you do not want to be alone right now.",
      },
      {
        title: "Share an activity",
        description:
          "Find something you can do with another person where conversation does not have to carry the whole interaction.",
      },
      {
        title: "Go where connection already exists",
        description:
          "Spend time somewhere you already have a social connection instead of waiting for one to appear.",
      },
    ],
  },

  pleasure: {
    title: "Pleasure",
    description: "I want things to feel good for a while.",
    alternatives: [
      {
        title: "Give yourself something genuinely enjoyable",
        description:
          "Choose an activity, food, music, game, show, hobby, or experience that you actually look forward to.",
      },
      {
        title: "Make something enjoyable on purpose",
        description:
          "Do not wait for the good feeling to happen. Pick something and deliberately make room for it.",
      },
      {
        title: "Change the atmosphere",
        description:
          "Music, lighting, clothes, food, surroundings, or company can change how an ordinary evening feels.",
      },
      {
        title: "Do something you have been putting off",
        description:
          "Give yourself access to something enjoyable that you keep telling yourself you will get to later.",
      },
    ],
  },

  stimulation: {
    title: "Stimulation",
    description:
      "I want to feel more alive, energized, or switched on.",
    alternatives: [
      {
        title: "Move your body",
        description:
          "Try something active enough to change how awake and engaged you feel.",
      },
      {
        title: "Change what you are doing",
        description:
          "Switch environments, activities, or routines instead of staying stuck in the same state.",
      },
      {
        title: "Make something",
        description:
          "Choose a creative activity that gives your attention somewhere interesting to go.",
      },
      {
        title: "Do something new",
        description:
          "Introduce a little novelty instead of reaching for the same familiar evening.",
      },
    ],
  },

  belong: {
    title: "A way to belong",
    description:
      "I want to feel included, accepted, or part of something.",
    alternatives: [
      {
        title: "Go where you already belong",
        description:
          "Spend time with people, groups, or places where you do not have to earn your place.",
      },
      {
        title: "Reach out first",
        description:
          "Message someone you want to be connected to instead of waiting to be invited.",
      },
      {
        title: "Join something shared",
        description:
          "Choose an activity where participation gives you something to belong to without needing to perform.",
      },
      {
        title: "Tell someone you want in",
        description:
          "Sometimes the most direct route is simply letting someone know that you would like to be included.",
      },
    ],
  },

  celebrate: {
    title: "A way to celebrate",
    description:
      "I want to mark something good and make the moment feel special.",
    alternatives: [
      {
        title: "Make the celebration intentional",
        description:
          "Choose something that makes the occasion feel different from an ordinary day.",
      },
      {
        title: "Share it with someone",
        description:
          "Tell someone what happened and let another person be part of the good moment.",
      },
      {
        title: "Give yourself a meaningful reward",
        description:
          "Choose something you genuinely value rather than automatically reaching for the usual reward.",
      },
      {
        title: "Record the moment",
        description:
          "Take a photo, write something down, or create a small marker that lets the moment stay with you.",
      },
    ],
  },

  break: {
    title: "A break from thinking",
    description:
      "I want my brain to stop working for a while.",
    alternatives: [
      {
        title: "Give your brain something simple",
        description:
          "Choose something familiar and absorbing that does not require decisions or problem solving.",
      },
      {
        title: "Make the unfinished things wait",
        description:
          "Write down what can wait and deliberately stop trying to solve it tonight.",
      },
      {
        title: "Change the environment",
        description:
          "Move somewhere that does not remind you of the tasks or problems you are trying to escape.",
      },
      {
        title: "Do something with your hands",
        description:
          "Cooking, drawing, cleaning, making, or another simple activity can give your attention somewhere else to go.",
      },
    ],
  },

  something: {
    title: "Something to look forward to",
    description:
      "I want the day to contain something that feels worth getting to.",
    alternatives: [
      {
        title: "Plan one small thing",
        description:
          "Give yourself something specific to look forward to later today or tomorrow.",
      },
      {
        title: "Create a tiny event",
        description:
          "Make an ordinary activity feel deliberate by giving it a time, place, or ritual.",
      },
      {
        title: "Invite someone into it",
        description:
          "A small plan can feel more real when another person is part of it.",
      },
      {
        title: "Start something you want to continue",
        description:
          "Choose a book, project, game, series, creative idea, or other thread you want to return to.",
      },
    ],
  },

  emotional: {
    title: "Emotional release",
    description:
      "I need to let something out.",
    alternatives: [
      {
        title: "Put it somewhere",
        description:
          "Write, draw, voice-record, or otherwise get what is inside you out of your head and into the world.",
      },
      {
        title: "Tell someone",
        description:
          "Choose someone safe and say the thing you have been holding back.",
      },
      {
        title: "Let the feeling have some space",
        description:
          "Give yourself privacy and permission to feel what is there without immediately fixing it.",
      },
      {
        title: "Move it through your body",
        description:
          "Walking, stretching, dancing, or another form of movement can give strong emotion somewhere to go.",
      },
    ],
  },

  sleep: {
    title: "Sleep",
    description:
      "I want to switch off and fall asleep.",
    alternatives: [
      {
        title: "Start winding down earlier",
        description:
          "Create a quieter transition into sleep instead of waiting until you are desperate to switch off.",
      },
      {
        title: "Make the room feel like night",
        description:
          "Lower lights, reduce stimulation, and make the environment less demanding.",
      },
      {
        title: "Give your mind somewhere to put things",
        description:
          "Write down unfinished thoughts or tomorrow tasks so you do not have to keep holding them in your head.",
      },
      {
        title: "Use a familiar wind-down routine",
        description:
          "Repeat a small sequence that tells your body the day is ending.",
      },
    ],
  },

  numbness: {
    title: "Numbness",
    description:
      "I do not want to feel what I am feeling right now.",
    alternatives: [
      {
        title: "Make the next little while easier",
        description:
          "Reduce demands, get physically comfortable, and focus only on making the immediate period more bearable.",
      },
      {
        title: "Be near someone without explaining",
        description:
          "Ask someone safe to stay around you without requiring yourself to talk everything through.",
      },
      {
        title: "Use something familiar and absorbing",
        description:
          "Choose a familiar show, game, activity, or other low-demand focus.",
      },
      {
        title: "Give yourself permission not to solve it tonight",
        description:
          "You can decide that understanding the feeling can wait until you have more space for it.",
      },
    ],
  },

  escape: {
    title: "Escape",
    description:
      "I want to get away from what I am feeling or dealing with.",
    alternatives: [
      {
        title: "Change your physical surroundings",
        description:
          "Go somewhere that gives you genuine distance from the situation for a while.",
      },
      {
        title: "Put the problem down temporarily",
        description:
          "Write down what needs attention later, then give yourself permission to stop working on it for now.",
      },
      {
        title: "Ask someone to stay with you",
        description:
          "You do not have to explain or solve the situation alone. Ask someone safe to be around.",
      },
      {
        title: "Create a contained escape",
        description:
          "Give yourself a defined period of something immersive and safe, then decide what comes next afterward.",
      },
    ],
  },

  courage: {
    title: "Courage",
    description:
      "I want to do or say something I do not feel able to do sober.",
    alternatives: [
      {
        title: "Write it first",
        description:
          "Put the thing you want to say or do into words before you have to act on it.",
      },
      {
        title: "Make the risk smaller",
        description:
          "Find the smallest version of the action that still moves you in the direction you want.",
      },
      {
        title: "Take someone with you",
        description:
          "Ask someone you trust to be present while you take the step.",
      },
      {
        title: "Give yourself an exit",
        description:
          "Knowing you can leave or stop can make a difficult step feel more possible.",
      },
    ],
  },

  reward: {
    title: "Reward",
    description:
      "I want to feel like I have earned something good.",
    alternatives: [
      {
        title: "Choose a reward on purpose",
        description:
          "Pick something you genuinely enjoy rather than automatically using alcohol as the reward.",
      },
      {
        title: "Mark what you accomplished",
        description:
          "Take a moment to actually acknowledge what you did before moving on to the next thing.",
      },
      {
        title: "Give yourself something to enjoy",
        description:
          "Food, music, a game, a purchase, rest, or time for a hobby can all be deliberate rewards.",
      },
      {
        title: "Share the win",
        description:
          "Tell someone what you managed to do and let yourself receive their response.",
      },
    ],
  },

  other: {
    title: "Something else",
    description:
      "There is something alcohol gives you that is not on this list.",
    alternatives: [
      {
        title: "Name the experience",
        description:
          "Write down what alcohol seems to give you that you were looking for.",
      },
      {
        title: "Look for another route",
        description:
          "Ask yourself what else could create some of that same experience.",
      },
      {
        title: "Change one part of the situation",
        description:
          "Try changing the place, people, activity, timing, or demand around you.",
      },
      {
        title: "Ask someone who knows you",
        description:
          "Sometimes another person can help you see what you are actually reaching for.",
      },
    ],
  },
};

const promises: {
  key: PromiseKey;
  title: string;
  description: string;
}[] = [
  { key: "relief", title: "Relief", description: promiseData.relief.description },
  { key: "calm", title: "Calm", description: promiseData.calm.description },
  {
    key: "confidence",
    title: "Confidence",
    description: promiseData.confidence.description,
  },
  {
    key: "connection",
    title: "Connection",
    description: promiseData.connection.description,
  },
  {
    key: "pleasure",
    title: "Pleasure",
    description: promiseData.pleasure.description,
  },
  {
    key: "stimulation",
    title: "Stimulation",
    description: promiseData.stimulation.description,
  },
  {
    key: "belong",
    title: "A way to belong",
    description: promiseData.belong.description,
  },
  {
    key: "celebrate",
    title: "A way to celebrate",
    description: promiseData.celebrate.description,
  },
  {
    key: "break",
    title: "A break from thinking",
    description: promiseData.break.description,
  },
  {
    key: "something",
    title: "Something to look forward to",
    description: promiseData.something.description,
  },
  {
    key: "emotional",
    title: "Emotional release",
    description: promiseData.emotional.description,
  },
  {
    key: "sleep",
    title: "Sleep",
    description: promiseData.sleep.description,
  },
  {
    key: "numbness",
    title: "Numbness",
    description: promiseData.numbness.description,
  },
  {
    key: "escape",
    title: "Escape",
    description: promiseData.escape.description,
  },
  {
    key: "courage",
    title: "Courage",
    description: promiseData.courage.description,
  },
  {
    key: "reward",
    title: "Reward",
    description: promiseData.reward.description,
  },
  {
    key: "other",
    title: "Something else",
    description: promiseData.other.description,
  },
];

export default function AlcoholPromiseTool() {
  const [stage, setStage] = useState<Stage>("start");
  const [selectedPromise, setSelectedPromise] =
    useState<PromiseKey | null>(null);
  const [selectedAlternative, setSelectedAlternative] =
    useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [helpfulness, setHelpfulness] = useState<string | null>(null);
  const [tryAgain, setTryAgain] = useState<string | null>(null);
  const [routeReplay, setRouteReplay] = useState(0);

  const selectedData = useMemo(() => {
    if (!selectedPromise) return null;
    return promiseData[selectedPromise];
  }, [selectedPromise]);

  useEffect(() => {
    const style = document.createElement("style");

    style.setAttribute("data-alcohol-promise-tool", "true");

    style.textContent = `
      .ap-shell {
        --ap-bg: #181818;
        --ap-panel: #211f1d;
        --ap-card: #4f3d32;
        --ap-card-hover: #5d473b;
        --ap-green: #68c995;
        --ap-green-dark: #1f7c4d;
        --ap-cream: #eee6d7;
        --ap-muted: #a69b91;
        --ap-brown-text: #b37f61;
        --ap-border: rgba(238,230,215,.16);
        --ap-soft-border: rgba(238,230,215,.09);

        min-height: 100%;
        box-sizing: border-box;
        background: var(--ap-bg);
        color: var(--ap-cream);
        font-family: Arial, Helvetica, sans-serif;
        padding: 56px 24px 72px;
      }

      .ap-shell *,
      .ap-shell *::before,
      .ap-shell *::after {
        box-sizing: border-box;
      }

      .ap-wrap {
        width: min(900px, 100%);
        margin: 0 auto;
      }

      .ap-eyebrow {
        color: var(--ap-green);
        font-size: 13px;
        letter-spacing: .12em;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .ap-title {
        margin: 0;
        font-size: clamp(30px, 5vw, 48px);
        line-height: 1.05;
        font-weight: 700;
        letter-spacing: -.03em;
      }

      .ap-intro {
        max-width: 650px;
        color: var(--ap-muted);
        line-height: 1.7;
        font-size: 15px;
        margin: 18px 0 0;
      }

      .ap-stage {
        margin-top: 42px;
        border: 1px solid var(--ap-border);
        border-radius: 12px;
        background:
          radial-gradient(circle at 80% 15%, rgba(104,201,149,.055), transparent 32%),
          linear-gradient(145deg, rgba(79,61,50,.72), rgba(33,31,29,.94));
        padding: clamp(22px, 5vw, 42px);
        overflow: hidden;
      }

      .ap-stage-number {
        color: var(--ap-brown-text);
        font-size: 12px;
        letter-spacing: .12em;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 12px;
      }

      .ap-heading {
        font-size: clamp(23px, 4vw, 34px);
        line-height: 1.15;
        margin: 0;
        letter-spacing: -.02em;
      }

      .ap-subheading {
        color: var(--ap-muted);
        font-size: 14px;
        line-height: 1.6;
        margin: 12px 0 0;
        max-width: 620px;
      }

      .ap-options {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 11px;
        margin-top: 28px;
      }

      .ap-option {
        appearance: none;
        border: 1px solid var(--ap-border);
        border-radius: 10px;
        background: rgba(33,31,29,.72);
        color: var(--ap-cream);
        text-align: left;
        padding: 17px 18px;
        min-height: 78px;
        cursor: pointer;
        transition:
          background .18s ease,
          border-color .18s ease,
          transform .18s ease;
      }

      .ap-option:hover {
        background: rgba(93,71,59,.72);
        border-color: rgba(104,201,149,.42);
        transform: translateY(-1px);
      }

      .ap-option:focus-visible,
      .ap-button:focus-visible,
      .ap-textarea:focus-visible,
      .ap-alternative:focus-visible,
      .ap-review:focus-visible {
        outline: 2px solid var(--ap-green);
        outline-offset: 3px;
      }

      .ap-option-title {
        display: block;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .ap-option-description {
        display: block;
        color: var(--ap-muted);
        font-size: 12px;
        line-height: 1.5;
      }

      .ap-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 28px;
      }

      .ap-button {
        appearance: none;
        border: 1px solid var(--ap-green);
        border-radius: 10px;
        background: var(--ap-green);
        color: #172018;
        font-weight: 700;
        font-size: 14px;
        padding: 13px 19px;
        min-height: 46px;
        cursor: pointer;
        transition:
          transform .18s ease,
          filter .18s ease;
      }

      .ap-button:hover {
        filter: brightness(1.05);
        transform: translateY(-1px);
      }

      .ap-button.secondary {
        background: transparent;
        color: var(--ap-cream);
        border-color: var(--ap-border);
      }

      .ap-button.secondary:hover {
        background: rgba(238,230,215,.06);
        filter: none;
      }

      .ap-button:disabled {
        opacity: .45;
        cursor: not-allowed;
        transform: none;
      }

      .ap-save-card {
        margin-top: 30px;
        padding: 18px 19px;
        border-radius: 10px;
        border: 1px solid rgba(104,201,149,.22);
        background: rgba(31,124,77,.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
      }

      .ap-save-copy strong {
        display: block;
        font-size: 14px;
      }

      .ap-save-copy span {
        display: block;
        color: var(--ap-muted);
        font-size: 12px;
        line-height: 1.5;
        margin-top: 5px;
      }

      .ap-save-link {
        flex: 0 0 auto;
        appearance: none;
        border: 1px solid rgba(104,201,149,.55);
        border-radius: 10px;
        background: transparent;
        color: var(--ap-green);
        padding: 10px 13px;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        white-space: nowrap;
        transition: background .18s ease;
      }

      .ap-save-link:hover {
        background: rgba(104,201,149,.1);
      }

      .ap-route {
        margin-top: 30px;
        padding: 24px;
        border: 1px solid var(--ap-soft-border);
        border-radius: 10px;
        background: rgba(24,24,24,.55);
      }

      .ap-route-label {
        color: var(--ap-brown-text);
        text-transform: uppercase;
        letter-spacing: .1em;
        font-size: 11px;
        font-weight: 700;
      }

      .ap-route-map {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 44px 1fr 44px 1fr;
        align-items: center;
        gap: 8px;
        margin-top: 20px;
      }

      .ap-route-connector {
        position: absolute;
        left: 18%;
        right: 18%;
        top: 50%;
        height: 2px;
        background: rgba(104,201,149,.18);
        transform: translateY(-50%);
        overflow: hidden;
        pointer-events: none;
      }

      .ap-route-connector::after {
        content: "";
        position: absolute;
        top: -2px;
        left: -18%;
        width: 18%;
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          transparent,
          var(--ap-green),
          transparent
        );
        filter: drop-shadow(0 0 6px rgba(104,201,149,.7));
        animation: ap-flow 2.8s linear infinite;
      }

      @keyframes ap-flow {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(650%);
        }
      }

      .ap-node {
        position: relative;
        z-index: 2;
        min-height: 92px;
        border-radius: 10px;
        border: 1px solid var(--ap-border);
        background: #242321;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        transform: translateY(12px) scale(.98);
        animation: ap-node-in .65s cubic-bezier(.2,.8,.2,1) forwards;
      }

      .ap-node:nth-of-type(1) {
        animation-delay: .15s;
      }

      .ap-node:nth-of-type(2) {
        animation-delay: .55s;
      }

      .ap-node:nth-of-type(3) {
        animation-delay: .95s;
      }

      @keyframes ap-node-in {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .ap-node::after {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: 10px;
        border: 1px solid transparent;
        animation: ap-node-glow 2.8s ease-in-out infinite;
      }

      .ap-node:nth-of-type(1)::after {
        animation-delay: .1s;
      }

      .ap-node:nth-of-type(2)::after {
        animation-delay: .9s;
      }

      .ap-node:nth-of-type(3)::after {
        animation-delay: 1.7s;
      }

      @keyframes ap-node-glow {
        0%, 65%, 100% {
          border-color: transparent;
          box-shadow: none;
        }

        18% {
          border-color: rgba(104,201,149,.45);
          box-shadow: 0 0 18px rgba(104,201,149,.09);
        }
      }

      .ap-node small {
        color: var(--ap-muted);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: .08em;
      }

      .ap-node strong {
        margin-top: 5px;
        font-size: 15px;
        line-height: 1.3;
      }

      .ap-arrow {
        position: relative;
        z-index: 3;
        color: var(--ap-green);
        font-size: 23px;
        text-align: center;
        animation: ap-arrow-pulse 2.8s ease-in-out infinite;
      }

      .ap-arrow:nth-of-type(2) {
        animation-delay: .9s;
      }

      @keyframes ap-arrow-pulse {
        0%, 65%, 100% {
          opacity: .35;
          transform: translateX(0);
        }

        18% {
          opacity: 1;
          transform: translateX(3px);
        }
      }

      .ap-message {
        margin: 22px auto 0;
        max-width: 570px;
        text-align: center;
        color: var(--ap-muted);
        line-height: 1.7;
        font-size: 14px;
      }

      .ap-message strong {
        color: var(--ap-cream);
      }

      .ap-replay {
        appearance: none;
        display: block;
        margin: 20px auto 0;
        border: 1px solid var(--ap-border);
        border-radius: 10px;
        background: transparent;
        color: var(--ap-muted);
        padding: 9px 13px;
        font-size: 11px;
        cursor: pointer;
      }

      .ap-replay:hover {
        color: var(--ap-cream);
        background: rgba(238,230,215,.05);
      }

      .ap-alternative-list {
        display: grid;
        gap: 10px;
        margin-top: 25px;
      }

      .ap-alternative {
        width: 100%;
        appearance: none;
        border: 1px solid var(--ap-border);
        border-radius: 10px;
        background: rgba(24,24,24,.62);
        color: var(--ap-cream);
        padding: 17px 18px;
        text-align: left;
        cursor: pointer;
        transition:
          background .18s ease,
          border-color .18s ease,
          transform .18s ease;
      }

      .ap-alternative:hover {
        background: rgba(93,71,59,.5);
        border-color: rgba(104,201,149,.42);
        transform: translateY(-1px);
      }

      .ap-alternative.selected {
        border-color: var(--ap-green);
        background: rgba(31,124,77,.18);
      }

      .ap-alternative-title {
        display: block;
        font-size: 15px;
        font-weight: 700;
      }

      .ap-alternative-description {
        display: block;
        margin-top: 6px;
        color: var(--ap-muted);
        font-size: 12px;
        line-height: 1.55;
      }

      .ap-note {
        margin-top: 20px;
        color: var(--ap-muted);
        font-size: 12px;
        line-height: 1.6;
      }

      .ap-textarea {
        width: 100%;
        min-height: 110px;
        margin-top: 16px;
        resize: vertical;
        border: 1px solid var(--ap-border);
        border-radius: 10px;
        background: rgba(24,24,24,.72);
        color: var(--ap-cream);
        padding: 14px;
        font: inherit;
        line-height: 1.6;
      }

      .ap-result {
        border: 1px solid rgba(104,201,149,.32);
        border-radius: 10px;
        background: rgba(31,124,77,.12);
        padding: 22px;
        margin-top: 25px;
      }

      .ap-result-label {
        color: var(--ap-green);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .1em;
      }

      .ap-result h3 {
        margin: 8px 0 0;
        font-size: 22px;
      }

      .ap-result p {
        color: var(--ap-muted);
        font-size: 14px;
        line-height: 1.65;
        margin: 10px 0 0;
      }

      .ap-review-options {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }

      .ap-review {
        appearance: none;
        border: 1px solid var(--ap-border);
        border-radius: 10px;
        background: transparent;
        color: var(--ap-cream);
        padding: 11px 14px;
        cursor: pointer;
        font-size: 13px;
      }

      .ap-review.selected {
        border-color: var(--ap-green);
        background: rgba(31,124,77,.2);
        color: var(--ap-green);
      }

      .ap-progress {
        display: flex;
        gap: 6px;
        margin-bottom: 28px;
      }

      .ap-progress span {
        height: 3px;
        flex: 1;
        border-radius: 4px;
        background: rgba(238,230,215,.12);
      }

      .ap-progress span.active {
        background: var(--ap-green);
      }

      .ap-footer {
        margin-top: 28px;
        color: var(--ap-muted);
        font-size: 11px;
        line-height: 1.6;
        text-align: center;
      }

      @media (max-width: 700px) {
        .ap-shell {
          padding: 34px 15px 55px;
        }

        .ap-options {
          grid-template-columns: 1fr;
        }

        .ap-route-map {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .ap-route-connector {
          display: none;
        }

        .ap-arrow {
          transform: rotate(90deg);
        }

        .ap-save-card {
          align-items: flex-start;
          flex-direction: column;
        }

        .ap-save-link {
          white-space: normal;
        }

        .ap-stage {
          padding: 21px 17px;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  const choosePromise = (key: PromiseKey) => {
    setSelectedPromise(key);
    setSelectedAlternative(null);
    setReflection("");
    setHelpfulness(null);
    setTryAgain(null);
    setRouteReplay((value) => value + 1);
    setStage("routes");
  };

  const replayRoute = () => {
    setRouteReplay((value) => value + 1);
  };

  const resetTool = () => {
    setStage("start");
    setSelectedPromise(null);
    setSelectedAlternative(null);
    setReflection("");
    setHelpfulness(null);
    setTryAgain(null);
    setRouteReplay((value) => value + 1);
  };

  return (
    <main className="ap-shell">
      <div className="ap-wrap">
        <div className="ap-eyebrow">THE ALCOHOL PROMISE</div>

        <h1 className="ap-title">
          What have you learned to expect alcohol to do for you?
        </h1>

        <p className="ap-intro">
          Sometimes alcohol becomes connected to a particular experience.
          Relief. Connection. Confidence. Escape. A break from thinking.
          Something to look forward to. This tool helps you identify the
          experience you are reaching for and explore another route toward some
          of it.
        </p>

        <section className="ap-stage">
          <div className="ap-progress" aria-label="Tool progress">
            <span className="active" />
            <span
              className={
                stage === "routes" || stage === "choose" || stage === "result"
                  ? "active"
                  : ""
              }
            />
            <span
              className={
                stage === "choose" || stage === "result" ? "active" : ""
              }
            />
            <span className={stage === "result" ? "active" : ""} />
          </div>

          {stage === "start" && (
            <>
              <div className="ap-stage-number">01 · Start here</div>

              <h2 className="ap-heading">What does alcohol promise you?</h2>

              <p className="ap-subheading">
                Think about the part of drinking that feels rewarding, useful,
                or relieving. What do you genuinely feel like you are getting
                from it?
              </p>

              <div className="ap-options">
                {promises.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="ap-option"
                    onClick={() => choosePromise(item.key)}
                  >
                    <span className="ap-option-title">{item.title}</span>

                    <span className="ap-option-description">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>

              <p className="ap-note">
                You are not being asked whether alcohol is good or bad here.
                Start with what it seems to do for you.
              </p>

              <div className="ap-save-card">
                <div className="ap-save-copy">
                  <strong>Want to keep a record of this?</strong>
                  <span>
                    Add an Alcohol Promise to your Buddy so you can build a
                    picture of what keeps showing up over time.
                  </span>
                </div>

                <a
                  className="ap-save-link"
                  href={alcoholPromiseFormUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Add an Alcohol Promise ↗
                </a>
              </div>
            </>
          )}

          {stage === "routes" && selectedData && selectedPromise && (
            <>
              <div className="ap-stage-number">02 · Look for another route</div>

              <h2 className="ap-heading">
                The thing you are looking for may have more than one route.
              </h2>

              <p className="ap-subheading">
                Alcohol may be one way you have learned to reach this
                experience. Let us look at some other possibilities.
              </p>

              <div className="ap-route">
                <div className="ap-route-label">Your map</div>

                <div className="ap-route-map" key={routeReplay}>
                  <div className="ap-route-connector" />

                  <div className="ap-node">
                    <small>Alcohol promises</small>
                    <strong>{selectedData.title}</strong>
                  </div>

                  <div className="ap-arrow">→</div>

                  <div className="ap-node">
                    <small>What you are looking for</small>
                    <strong>{selectedData.description}</strong>
                  </div>

                  <div className="ap-arrow">→</div>

                  <div className="ap-node">
                    <small>Other routes</small>
                    <strong>Possible alternatives</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="ap-replay"
                  onClick={replayRoute}
                >
                  Replay the route
                </button>
              </div>

              <p className="ap-message">
                <strong>The promise is not the only possible route.</strong>
                <br />
                You do not have to stop needing this experience. We are simply
                looking for other ways you might get some of it.
              </p>

              <div className="ap-save-card">
                <div className="ap-save-copy">
                  <strong>Found something you recognize?</strong>
                  <span>
                    Log this promise in your Alcohol Promise database before
                    you continue.
                  </span>
                </div>

                <a
                  className="ap-save-link"
                  href={alcoholPromiseFormUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Log this promise ↗
                </a>
              </div>

              <div className="ap-button-row">
                <button
                  type="button"
                  className="ap-button"
                  onClick={() => setStage("choose")}
                >
                  Show me some alternatives
                </button>

                <button
                  type="button"
                  className="ap-button secondary"
                  onClick={() => setStage("start")}
                >
                  Choose a different promise
                </button>
              </div>
            </>
          )}

          {stage === "choose" && selectedData && (
            <>
              <div className="ap-stage-number">03 · Try another route</div>

              <h2 className="ap-heading">
                What could give you some of the same thing?
              </h2>

              <p className="ap-subheading">
                These are possibilities, not instructions. Pick the one that
                feels most realistic for you, or use them to come up with your
                own.
              </p>

              <div className="ap-alternative-list">
                {selectedData.alternatives.map((alternative, index) => (
                  <button
                    key={alternative.title}
                    type="button"
                    className={`ap-alternative ${
                      selectedAlternative === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAlternative(index)}
                  >
                    <span className="ap-alternative-title">
                      {alternative.title}
                    </span>

                    <span className="ap-alternative-description">
                      {alternative.description}
                    </span>
                  </button>
                ))}
              </div>

              <div className="ap-button-row">
                <button
                  type="button"
                  className="ap-button"
                  disabled={selectedAlternative === null}
                  onClick={() => setStage("result")}
                >
                  Try this one
                </button>

                <button
                  type="button"
                  className="ap-button secondary"
                  onClick={() => setStage("routes")}
                >
                  Go back
                </button>
              </div>
            </>
          )}

          {stage === "result" &&
            selectedData &&
            selectedAlternative !== null && (
              <>
                <div className="ap-stage-number">
                  04 · Test the alternative
                </div>

                <h2 className="ap-heading">Give this route a small test.</h2>

                <div className="ap-result">
                  <div className="ap-result-label">
                    Your chosen alternative
                  </div>

                  <h3>
                    {selectedData.alternatives[selectedAlternative].title}
                  </h3>

                  <p>
                    {selectedData.alternatives[selectedAlternative].description}
                  </p>
                </div>

                <p className="ap-message">
                  You do not need to prove that this works perfectly. The
                  experiment is simply to see whether this gives you{" "}
                  <strong>some</strong> of what you were looking for.
                </p>

                <label
                  htmlFor="ap-reflection"
                  style={{
                    display: "block",
                    marginTop: "28px",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  What would you actually do?
                </label>

                <textarea
                  id="ap-reflection"
                  className="ap-textarea"
                  value={reflection}
                  onChange={(event) => setReflection(event.target.value)}
                  placeholder="Write the version of this that would actually work for you."
                />

                <div style={{ marginTop: "25px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    How much of what you wanted did this give you?
                  </div>

                  <div className="ap-review-options">
                    {["None", "A little", "Some", "A lot", "Almost all"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          className={`ap-review ${
                            helpfulness === option ? "selected" : ""
                          }`}
                          onClick={() => setHelpfulness(option)}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "25px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Would you try this route again?
                  </div>

                  <div className="ap-review-options">
                    {["Yes", "Maybe", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`ap-review ${
                          tryAgain === option ? "selected" : ""
                        }`}
                        onClick={() => setTryAgain(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ap-save-card">
                  <div className="ap-save-copy">
                    <strong>Want to record what you discovered?</strong>
                    <span>
                      Add the promise, underlying need, and what you tried to
                      your Alcohol Promise log.
                    </span>
                  </div>

                  <a
                    className="ap-save-link"
                    href={alcoholPromiseFormUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add to my log ↗
                  </a>
                </div>

                <div className="ap-button-row">
                  <button
                    type="button"
                    className="ap-button"
                    onClick={resetTool}
                  >
                    Try another promise
                  </button>

                  <button
                    type="button"
                    className="ap-button secondary"
                    onClick={() => setStage("choose")}
                  >
                    Choose another route
                  </button>
                </div>
              </>
            )}

          <div className="ap-footer">
            This tool is for self-guided reflection and experimentation. There
            is no required outcome and no single correct alternative.
          </div>
        </section>
      </div>
    </main>
  );
}