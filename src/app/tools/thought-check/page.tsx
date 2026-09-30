"use client";

import { useEffect, useState } from "react";

const examineOptions = [
  "Something actually happened",
  "I've felt this way before",
  "Someone said something",
  "I'm remembering something",
  "Something went better than I noticed",
  "There is another explanation",
  "I'm predicting, not knowing",
  "I'm treating a feeling as a fact",
];

export default function ThoughtCheckPage() {
  const [thought, setThought] = useState("");
  const [alternative, setAlternative] = useState("");
  const [before, setBefore] = useState(3);
  const [after, setAfter] = useState(3);
  const [selected, setSelected] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!running) return;

    if (seconds <= 0) {
      setRunning(false);
      setComplete(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [running, seconds]);

  const toggleOption = (option: string) => {
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const startPause = () => {
    setSeconds(60);
    setComplete(false);
    setRunning(true);
  };

  const reset = () => {
    setThought("");
    setAlternative("");
    setBefore(3);
    setAfter(3);
    setSelected([]);
    setSeconds(60);
    setRunning(false);
    setComplete(false);
  };

  const difference = after - before;

  let result =
    "The belief feels about the same. That is information too. The point is not to force a change.";

  if (difference < 0) {
    result =
      "The thought feels less certain right now. You don't have to explain the shift. Just notice it.";
  }

  if (difference > 0) {
    result =
      "The thought feels more convincing right now. That's information too. You may want to revisit what made it feel true.";
  }

  return (
    <main className="thought-page">
      <style jsx>{`
        .thought-page {
          min-height: 100vh;
          background: #151515;
          color: #f7f7f4;
          padding: 48px 24px 80px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .thought-shell {
          width: min(920px, 100%);
          margin: 0 auto;
        }

        .thought-kicker {
          color: #f0c84b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .thought-title {
          font-size: clamp(32px, 6vw, 52px);
          line-height: 1.04;
          letter-spacing: -.04em;
          margin: 0;
          max-width: 720px;
        }

        .thought-intro {
          color: #b5b5ae;
          font-size: 17px;
          line-height: 1.65;
          max-width: 680px;
          margin: 18px 0 42px;
        }

        .thought-card {
          background: #202020;
          border: 1px solid #3b3b37;
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 18px;
        }

        .thought-card.orange {
          border-top: 3px solid #e86f24;
        }

        .thought-card.yellow {
          border-top: 3px solid #f0c84b;
        }

        .thought-step {
          color: #f0c84b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .thought-card h2 {
          font-size: 24px;
          line-height: 1.2;
          margin: 0 0 8px;
          letter-spacing: -.02em;
        }

        .thought-card p {
          color: #b5b5ae;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        .thought-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .thought-label {
          display: block;
          color: #b5b5ae;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin: 24px 0 8px;
        }

        .thought-textarea {
          width: 100%;
          min-height: 120px;
          resize: vertical;
          box-sizing: border-box;
          background: #111111;
          color: #f7f7f4;
          border: 1px solid #3b3b37;
          border-radius: 12px;
          padding: 14px;
          font: inherit;
          font-size: 16px;
          line-height: 1.5;
        }

        .thought-textarea:focus {
          outline: 2px solid #e86f24;
          outline-offset: 2px;
        }

        .thought-range {
          width: 100%;
          accent-color: #e86f24;
          margin: 14px 0 0;
        }

        .thought-score-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .thought-score {
          min-width: 48px;
          text-align: center;
          font-weight: 800;
          font-size: 18px;
        }

        .thought-options {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 20px;
        }

        .thought-option {
          border: 1px solid #3b3b37;
          background: #111111;
          color: #f7f7f4;
          border-radius: 999px;
          padding: 10px 13px;
          cursor: pointer;
          font: inherit;
          font-size: 13px;
        }

        .thought-option.selected {
          border-color: #e86f24;
          background: #3a2418;
        }

        .thought-pause {
          margin-top: 22px;
          padding: 22px;
          border-radius: 16px;
          background: #111111;
          border: 1px solid #514721;
          text-align: center;
        }

        .thought-timer {
          color: #f0c84b;
          font-size: 42px;
          font-weight: 900;
          letter-spacing: .04em;
          margin: 12px 0;
        }

        .thought-button {
          min-height: 46px;
          border-radius: 10px;
          padding: 10px 17px;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        .thought-button.primary {
          background: #e86f24;
          color: white;
          border: 0;
        }

        .thought-button.secondary {
          background: transparent;
          color: #f7f7f4;
          border: 1px solid #3b3b37;
        }

        .thought-button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .thought-bars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 24px;
        }

        .thought-bar-head {
          display: flex;
          justify-content: space-between;
          color: #b5b5ae;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .thought-bar {
          height: 10px;
          border-radius: 999px;
          background: #111111;
          overflow: hidden;
        }

        .thought-fill {
          height: 100%;
          border-radius: 999px;
          transition: width .25s ease;
        }

        .thought-fill.before {
          background: #e86f24;
        }

        .thought-fill.after {
          background: #f0c84b;
        }

        .thought-result {
          margin-top: 20px;
          padding: 15px;
          border-radius: 12px;
          background: #111111;
          color: #b5b5ae;
          line-height: 1.55;
          font-size: 14px;
        }

        .thought-progression {
          margin-top: 24px;
          padding: 24px;
          border-radius: 16px;
          background: #111111;
          border: 1px solid #3b3b37;
        }

        .thought-progression h3 {
          margin: 0 0 8px;
          font-size: 20px;
          line-height: 1.25;
          letter-spacing: -.02em;
        }

        .thought-progression p {
          color: #b5b5ae;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
          max-width: 680px;
        }

        .thought-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 700px) {
          .thought-page {
            padding: 32px 16px 60px;
          }

          .thought-card {
            padding: 21px;
          }

          .thought-grid,
          .thought-bars {
            grid-template-columns: 1fr;
          }

          .thought-intro {
            font-size: 15px;
            margin-bottom: 30px;
          }
        }
      `}</style>

      <div className="thought-shell">
        <div className="thought-kicker">Systemine · Interactive Tool</div>

        <h1 className="thought-title">The Thought Check</h1>

        <p className="thought-intro">
          Catch the thought. Examine it fairly. Give your mind a little space.
          Then check again.
        </p>

        <div className="thought-grid">
          <section className="thought-card orange">
            <div className="thought-step">01 · Catch it</div>

            <h2>What was the thought?</h2>

            <p>
              Write it as it actually appeared in your mind. No editing yet.
            </p>

            <textarea
              className="thought-textarea"
              value={thought}
              onChange={(event) => setThought(event.target.value)}
              placeholder="e.g. I can't relax unless I have a drink."
              aria-label="Thought"
            />

            <label className="thought-label" htmlFor="before">
              Belief before
            </label>

            <p>How strongly does this thought feel true right now?</p>

            <div className="thought-score-row">
              <input
                id="before"
                className="thought-range"
                type="range"
                min="0"
                max="5"
                value={before}
                onChange={(event) => setBefore(Number(event.target.value))}
              />

              <div className="thought-score">{before}/5</div>
            </div>
          </section>

          <section className="thought-card">
            <div className="thought-step">02 · Examine it</div>

            <h2>Build a fairer picture</h2>

            <p>
              Don&apos;t argue with yourself. Slow the thought down and look at
              what you may be leaving out.
            </p>

            <div className="thought-options">
              {examineOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`thought-option ${
                    selected.includes(option) ? "selected" : ""
                  }`}
                  onClick={() => toggleOption(option)}
                  aria-pressed={selected.includes(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <label className="thought-label" htmlFor="alternative">
              Another interpretation
            </label>

            <textarea
              id="alternative"
              className="thought-textarea"
              value={alternative}
              onChange={(event) => setAlternative(event.target.value)}
              placeholder="What is another way of understanding this that could also be true?"
            />

            <div className="thought-pause">
              <div className="thought-step">Give it a moment</div>

              <p>
                You don&apos;t have to decide whether the new interpretation is
                true yet. Step away from the thought for a short moment and
                let the information settle.
              </p>

              <div className="thought-timer">
                {complete
                  ? "READY"
                  : `00:${String(seconds).padStart(2, "0")}`}
              </div>

              <button
                type="button"
                className="thought-button primary"
                onClick={startPause}
                disabled={running}
              >
                {running
                  ? "Pause in progress…"
                  : complete
                    ? "Pause complete"
                    : "Start 60-second pause"}
              </button>

              <p style={{ marginTop: 12, fontSize: 13 }}>
                {complete
                  ? "Now check the thought again. There is no right answer."
                  : "Your second belief check unlocks when the pause is complete."}
              </p>
            </div>
          </section>
        </div>

        <section className="thought-card yellow">
          <div className="thought-step">03 · Check again</div>

          <h2>Where is the belief now?</h2>

          <p>
            There is no correct direction. A shift, no shift, or even a
            stronger belief is information.
          </p>

          <div className="thought-score-row" style={{ marginTop: 18 }}>
            <input
              className="thought-range"
              type="range"
              min="0"
              max="5"
              value={after}
              disabled={!complete}
              onChange={(event) => setAfter(Number(event.target.value))}
            />

            <div className="thought-score">
              {complete ? `${after}/5` : "—"}
            </div>
          </div>

          <div className="thought-bars">
            <div>
              <div className="thought-bar-head">
                <span>Before</span>
                <strong>{before}/5</strong>
              </div>

              <div className="thought-bar">
                <div
                  className="thought-fill before"
                  style={{ width: `${(before / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="thought-bar-head">
                <span>After</span>
                <strong>{complete ? `${after}/5` : "Locked"}</strong>
              </div>

              <div className="thought-bar">
                <div
                  className="thought-fill after"
                  style={{
                    width: complete ? `${(after / 5) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="thought-result">
            {complete
              ? result
              : "Complete the thought check above, then return here after the pause."}
          </div>

          {complete && (
            <div className="thought-progression">
              <h3>Want to take this further?</h3>

              <p>
                If you&apos;re working specifically with alcohol, explore
                Systemine&apos;s Alcohol Regulation Buddy for a larger set of
                tools around triggers, urges, drinking patterns and regulation.
              </p>
            </div>
          )}

          <div className="thought-actions">
            <span style={{ color: "#777", fontSize: 13 }}>
              This exercise is for reflection, not diagnosis.
            </span>

            <button
              type="button"
              className="thought-button secondary"
              onClick={reset}
            >
              Start again
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}