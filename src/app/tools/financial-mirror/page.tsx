
"use client";

import { useEffect, useMemo, useState } from "react";

type Entry = {
  id: string;
  date: string;
  category: string;
  amount: number;
  note: string;
};

type Goal = {
  name: string;
  target: number;
  saved: number;
};

type MirrorData = {
  entries: Entry[];
  goal: Goal;
  usualSpend: number;
  usualFrequency: number;
  currency: "INR" | "USD";
};

const STORAGE_KEY = "systemine-financial-mirror-v1";

const palette = {
  paper: "#101310",
  cream: "#20251F",
  ink: "#F1EBDD",
  muted: "#A8ADA2",
  line: "#353D35",
  brown: "#B58A67",
  blue: "#A78BFA",
  paleBlue: "#302642",
  white: "#191E19",
};

const today = () => new Date().toISOString().slice(0, 10);

const defaultData: MirrorData = {
  entries: [],
  goal: { name: "Something meaningful to me", target: 10000, saved: 0 },
  usualSpend: 750,
  usualFrequency: 4,
  currency: "INR",
};

function money(amount: number, currency: "INR" | "USD") {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function monthKey(date: string) {
  return date.slice(0, 7);
}

function monthLabel(key: string) {
  return new Date(`${key}-01T12:00:00`).toLocaleDateString("en", {
    month: "short",
  });
}

function downloadFile(name: string, contents: string) {
  const blob = new Blob([contents], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function FinancialMirrorPage() {
  const [data, setData] = useState<MirrorData>(defaultData);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("overview");
  const [amount, setAmount] = useState("750");
  const [date, setDate] = useState(today());
  const [category, setCategory] = useState("Alcohol");
  const [note, setNote] = useState("");
  const [reduction, setReduction] = useState(30);
  const [entryMode, setEntryMode] = useState<"spending" | "saving">("spending");
  const [message, setMessage] = useState("");
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [goalName, setGoalName] = useState(defaultData.goal.name);
  const [goalTarget, setGoalTarget] = useState("10000");
  const [goalSaved, setGoalSaved] = useState("0");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as MirrorData;
        if (Array.isArray(parsed.entries) && parsed.goal) {
          setData({
            ...defaultData,
            ...parsed,
            goal: { ...defaultData.goal, ...parsed.goal },
          });
          setGoalName(parsed.goal.name);
          setGoalTarget(String(parsed.goal.target));
          setGoalSaved(String(parsed.goal.saved));
        }
      }
    } catch {
      setMessage("We couldn't read saved data. You can try importing a backup.");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        setMessage("Your browser couldn't save the latest changes. Export a backup.");
      }
    }
  }, [data, ready]);

  const update = (patch: Partial<MirrorData>) =>
    setData((current) => ({ ...current, ...patch }));

  const currency = data.currency;
  const monthlyEstimate = data.usualSpend * data.usualFrequency * 4.33;
  const annualEstimate = monthlyEstimate * 12;
  const potentialSavings = annualEstimate * (reduction / 100);

  const totalTracked = useMemo(
    () => data.entries
      .filter((entry) => entry.category !== "Money saved")
      .reduce((sum, entry) => sum + entry.amount, 0),
    [data.entries]
  );

  const actualSaved = useMemo(
    () => data.entries
      .filter((entry) => entry.category === "Money saved")
      .reduce((sum, entry) => sum + entry.amount, 0),
    [data.entries]
  );

  const recentMonths = useMemo(() => {
    const months: string[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      );
    }
    return months;
  }, []);

  const monthlyData = recentMonths.map((month) => ({
    month,
    spending: data.entries
      .filter((entry) => monthKey(entry.date) === month && entry.category !== "Money saved")
      .reduce((sum, entry) => sum + entry.amount, 0),
    saved: data.entries
      .filter((entry) => monthKey(entry.date) === month && entry.category === "Money saved")
      .reduce((sum, entry) => sum + entry.amount, 0),
  }));

  const goalProgress = data.goal.target > 0
    ? Math.min(100, (data.goal.saved + actualSaved) / data.goal.target * 100)
    : 0;

  function addEntry() {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0 || !date) {
      setMessage("Enter a valid amount and date first.");
      return;
    }

    const entry: Entry = {
      id: crypto.randomUUID(),
      date,
      category: entryMode === "saving" ? "Money saved" : category,
      amount: value,
      note: note.trim(),
    };

    setData((current) => ({
      ...current,
      entries: [entry, ...current.entries],
      goal: entryMode === "saving"
        ? current.goal
        : current.goal,
    }));

    setAmount("");
    setNote("");
    setMessage(entryMode === "saving" ? "Savings entry added." : "Spending entry added.");
  }

  function deleteEntry(id: string) {
    setData((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== id),
    }));
    setMessage("Entry removed.");
  }

  function saveGoal() {
    const target = Number(goalTarget);
    const saved = Number(goalSaved);
    if (!goalName.trim() || !Number.isFinite(target) || target <= 0 ||
        !Number.isFinite(saved) || saved < 0) {
      setMessage("Enter a goal name, a positive target, and valid existing savings.");
      return;
    }
    update({ goal: { name: goalName.trim(), target, saved } });
    setShowGoalEditor(false);
    setMessage("Your goal has been updated.");
  }

  async function importBackup(file?: File) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as MirrorData;
      if (!Array.isArray(parsed.entries) || !parsed.goal ||
          typeof parsed.goal.target !== "number") {
        throw new Error("Invalid backup");
      }
      setData({
        ...defaultData,
        ...parsed,
        goal: { ...defaultData.goal, ...parsed.goal },
      });
      setGoalName(parsed.goal.name);
      setGoalTarget(String(parsed.goal.target));
      setGoalSaved(String(parsed.goal.saved));
      setMessage("Backup imported successfully.");
    } catch {
      setMessage("That file doesn't look like a valid Financial Mirror backup.");
    }
  }

  const pageStyle = {
    background: palette.paper,
    color: palette.ink,
    minHeight: "100vh",
  } as const;

  const panelStyle = {
    background: palette.white,
    border: `1px solid ${palette.line}`,
    borderRadius: 18,
  } as const;

  const mutedStyle = { color: palette.muted } as const;

  const tabs = [
    ["overview", "Overview"],
    ["spending", "Spending"],
    ["goals", "My goal"],
    ["history", "History"],
  ];

  if (!ready) {
    return (
      <main style={pageStyle} className="fm-root">
        <div className="fm-shell">Opening your Financial Mirror…</div>
      </main>
    );
  }

  return (
    <main style={pageStyle} className="fm-root">
      <style>{`
        .fm-root { font-family: inherit; }
        .fm-shell { width: min(100% - 32px, 940px); margin: auto; padding: 38px 0 70px; }
        .fm-eyebrow { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: ${palette.muted}; }
        .fm-title { font-family: Georgia, serif; font-size: clamp(34px, 6vw, 55px); font-weight: 400; line-height: 1.05; letter-spacing: -.04em; }
        .fm-heading { font-family: Georgia, serif; font-size: 24px; font-weight: 400; letter-spacing: -.025em; }
        .fm-subtitle { color: ${palette.muted}; font-size: 14px; line-height: 1.8; }
        .fm-card { padding: 22px; }
        .fm-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
        .fm-grid-three { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
        .fm-button { cursor: pointer; border: 1px solid ${palette.line}; border-radius: 999px; padding: 10px 15px; background: transparent; color: ${palette.ink}; font: inherit; font-size: 12px; transition: background .2s, transform .2s; }
        .fm-button:hover { background: ${palette.cream}; }
        .fm-button:active { transform: scale(.98); }
        .fm-button-dark { background: ${palette.ink}; color: ${palette.white}; border-color: ${palette.ink}; }
        .fm-button-dark:hover { background: #42463e; }
        .fm-input { box-sizing: border-box; width: 100%; padding: 12px; border: 1px solid ${palette.line}; border-radius: 10px; background: ${palette.white}; color: ${palette.ink}; font: inherit; font-size: 14px; }
        .fm-label { display: block; margin-bottom: 7px; color: ${palette.muted}; font-size: 11px; }
        .fm-tab { border: 0; border-bottom: 2px solid transparent; padding: 12px 8px; background: transparent; color: ${palette.muted}; font: inherit; font-size: 12px; cursor: pointer; }
        .fm-tab-active { border-bottom-color: ${palette.brown}; color: ${palette.ink}; }
        .fm-stat { font-family: Georgia, serif; font-size: clamp(25px, 4vw, 35px); letter-spacing: -.04em; }
        .fm-small { font-size: 12px; line-height: 1.7; }
        .fm-entry { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 0; border-bottom: 1px solid ${palette.line}; }
        .fm-entry:last-child { border-bottom: 0; }
        .fm-animate { animation: fm-rise .6s ease both; }
        .fm-animate-delay { animation: fm-rise .7s .12s ease both; }
        @keyframes fm-rise { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 620px) {
          .fm-shell { padding-top: 25px; }
          .fm-grid, .fm-grid-three { grid-template-columns: 1fr; }
          .fm-card { padding: 18px; }
          .fm-tabs { overflow-x: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fm-animate, .fm-animate-delay { animation: none; }
          .fm-button { transition: none; }
        }
      `}</style>

      <div className="fm-shell">
        <header className="fm-animate" style={{ marginBottom: 30 }}>
          <div className="fm-eyebrow" style={{ marginBottom: 15 }}>
            SYSTEMINE · ALCOHOL REGULATION BUDDY
          </div>
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 className="fm-title">The Financial<br />Mirror<span style={{ color: palette.blue }}>.</span></h1>
              <p className="fm-subtitle" style={{ maxWidth: 500, marginTop: 16 }}>
                See where your money goes. Explore what could change.
                Make room for what matters to you.
              </p>
            </div>
            <div style={{ ...panelStyle, padding: "12px 14px", fontSize: 11, ...mutedStyle }}>
              <span style={{ display: "inline-block", width: 7, height: 7, background: palette.blue, borderRadius: "50%", marginRight: 7 }} />
              Saved in this browser
            </div>
          </div>
        </header>

        <nav className="fm-tabs" style={{ display: "flex", gap: 18, borderBottom: `1px solid ${palette.line}`, marginBottom: 24 }}>
          {tabs.map(([id, label]) => (
            <button key={id} className={`fm-tab ${tab === id ? "fm-tab-active" : ""}`} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </nav>

        {tab === "overview" && (
          <div className="fm-animate" style={{ display: "grid", gap: 18 }}>
            <section style={{ ...panelStyle, padding: 24, background: palette.cream }}>
              <div className="fm-eyebrow">YOUR CURRENT ESTIMATE</div>
              <div className="fm-grid" style={{ marginTop: 18 }}>
                <div>
                  <div className="fm-stat">{money(monthlyEstimate, currency)}</div>
                  <div className="fm-small" style={mutedStyle}>Estimated monthly alcohol spending</div>
                </div>
                <div>
                  <div className="fm-stat">{money(annualEstimate, currency)}</div>
                  <div className="fm-small" style={mutedStyle}>Estimated annual spending at this pattern</div>
                </div>
              </div>
              <div style={{ height: 1, background: palette.line, margin: "22px 0" }} />
              <p className="fm-small" style={mutedStyle}>
                A projection, not a record of actual spending. Adjust your usual spend and frequency in Spending.
              </p>
              <button className="fm-button fm-button-dark" style={{ marginTop: 14 }} onClick={() => setTab("spending")}>
                Explore my spending ↗
              </button>
            </section>

            <section className="fm-grid">
              <div className="fm-card fm-animate-delay" style={panelStyle}>
                <div className="fm-eyebrow">A DIFFERENT POSSIBILITY</div>
                <div className="fm-stat" style={{ marginTop: 15, color: palette.blue }}>{money(potentialSavings, currency)}</div>
                <p className="fm-small" style={mutedStyle}>Potential annual savings at a {reduction}% spending reduction.</p>
                <input aria-label="Hypothetical reduction percentage" type="range" min="0" max="100" step="10" value={reduction} onChange={(e) => setReduction(Number(e.target.value))} style={{ width: "100%", accentColor: palette.blue, marginTop: 15 }} />
                <div style={{ display: "flex", justifyContent: "space-between", ...mutedStyle, fontSize: 10 }}>
                  <span>0% reduction</span><span>{reduction}%</span><span>100%</span>
                </div>
                <p className="fm-small" style={{ marginTop: 12, ...mutedStyle }}>An illustrative scenario, not a prediction or a promise.</p>
              </div>

              <div className="fm-card fm-animate-delay" style={panelStyle}>
                <div className="fm-eyebrow">SOMETHING THAT MATTERS TO YOU</div>
                <h2 className="fm-heading" style={{ marginTop: 13 }}>{data.goal.name}</h2>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 18 }}>
                  <span style={mutedStyle}>Goal progress</span>
                  <strong>{Math.round(goalProgress)}%</strong>
                </div>
                <div style={{ height: 7, background: palette.cream, borderRadius: 99, overflow: "hidden", marginTop: 9 }}>
                  <div style={{ width: `${goalProgress}%`, height: "100%", background: palette.blue, borderRadius: 99, transition: "width .7s ease" }} />
                </div>
                <p className="fm-small" style={{ marginTop: 12, ...mutedStyle }}>
                  {money(data.goal.saved + actualSaved, currency)} of {money(data.goal.target, currency)} recorded toward your goal, including logged savings.
                </p>
                <button className="fm-button" style={{ marginTop: 12 }} onClick={() => setTab("goals")}>Visit my goal ↗</button>
              </div>
            </section>

            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">THE LAST SIX MONTHS</div>
              <h2 className="fm-heading" style={{ margin: "8px 0 20px" }}>Your money, over time</h2>
              <div style={{ display: "flex", gap: 15, fontSize: 11, ...mutedStyle, marginBottom: 14 }}>
                <span><span style={{ color: palette.brown }}>●</span> Recorded spending</span>
                <span><span style={{ color: palette.blue }}>●</span> Money saved</span>
              </div>
              <MonthlyChart data={monthlyData} currency={currency} />
              {data.entries.length === 0 && (
                <p className="fm-small" style={{ ...mutedStyle, marginTop: 12 }}>
                  Your chart will begin to take shape when you add your first entries. Empty months are not treated as zero spending.
                </p>
              )}
            </section>

            <section style={{ ...panelStyle, padding: 22, background: palette.ink, color: palette.white }}>
              <div className="fm-eyebrow" style={{ color: "#D5C9B6" }}>A MOMENT TO REFLECT</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 23, lineHeight: 1.45, margin: "12px 0" }}>
                What could your money make possible if more of it went where you wanted?
              </p>
              <p className="fm-small" style={{ color: "#D5C9B6" }}>
                No right answer. No required target. Just a question worth sitting with.
              </p>
            </section>
          </div>
        )}

        {tab === "spending" && (
          <div className="fm-animate" style={{ display: "grid", gap: 18 }}>
            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">START WITH YOUR USUAL PATTERN</div>
              <h2 className="fm-heading" style={{ margin: "9px 0" }}>What does a typical occasion cost?</h2>
              <p className="fm-subtitle">Include what feels relevant to you. Estimates are okay, and you can revise them later.</p>
              <div className="fm-grid" style={{ marginTop: 20 }}>
                <div>
                  <label className="fm-label">Typical spend per occasion</label>
                  <input className="fm-input" type="number" min="0" value={data.usualSpend} onChange={(e) => update({ usualSpend: Math.max(0, Number(e.target.value) || 0) })} />
                </div>
                <div>
                  <label className="fm-label">Currency</label>
                  <select className="fm-input" value={currency} onChange={(e) => update({ currency: e.target.value as "INR" | "USD" })}>
                    <option value="INR">INR · ₹</option>
                    <option value="USD">USD · $</option>
                  </select>
                </div>
                <div>
                  <label className="fm-label">Occasions per week</label>
                  <input className="fm-input" type="number" min="0" max="100" step="0.5" value={data.usualFrequency} onChange={(e) => update({ usualFrequency: Math.max(0, Number(e.target.value) || 0) })} />
                </div>
              </div>
              <div style={{ background: palette.cream, borderRadius: 12, padding: 17, marginTop: 20 }}>
                <div className="fm-small" style={mutedStyle}>Estimated annual spend</div>
                <div className="fm-stat" style={{ marginTop: 5 }}>{money(annualEstimate, currency)}</div>
                <p className="fm-small" style={{ ...mutedStyle, marginTop: 7 }}>Calculated from your typical spend × weekly frequency × 52 weeks. This is an estimate, not a measured total.</p>
              </div>
            </section>

            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">KEEP A PERSONAL RECORD</div>
              <h2 className="fm-heading" style={{ margin: "9px 0 16px" }}>Add an entry</h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                <button className={`fm-button ${entryMode === "spending" ? "fm-button-dark" : ""}`} onClick={() => setEntryMode("spending")}>Record spending</button>
                <button className={`fm-button ${entryMode === "saving" ? "fm-button-dark" : ""}`} onClick={() => setEntryMode("saving")}>Record money saved</button>
              </div>
              <div className="fm-grid">
                <div>
                  <label className="fm-label">Amount ({currency})</label>
                  <input className="fm-input" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500" />
                </div>
                <div>
                  <label className="fm-label">Date</label>
                  <input className="fm-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              {entryMode === "spending" && (
                <div style={{ marginTop: 15 }}>
                  <label className="fm-label">What was it for?</label>
                  <select className="fm-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Alcohol</option>
                    <option>Transport</option>
                    <option>Delivery</option>
                    <option>Mixers and extras</option>
                    <option>Food and socialising</option>
                    <option>Other related expense</option>
                  </select>
                </div>
              )}
              <div style={{ marginTop: 15 }}>
                <label className="fm-label">Note (optional)</label>
                <input className="fm-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything you want to remember…" />
              </div>
              <button className="fm-button fm-button-dark" style={{ marginTop: 18 }} onClick={addEntry}>Add to my record +</button>
              {message && <p className="fm-small" role="status" style={{ marginTop: 12, ...mutedStyle }}>{message}</p>}
            </section>

            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">RECORDED SO FAR</div>
              <div className="fm-grid" style={{ marginTop: 14 }}>
                <div><div className="fm-stat">{money(totalTracked, currency)}</div><div className="fm-small" style={mutedStyle}>Tracked spending</div></div>
                <div><div className="fm-stat" style={{ color: palette.blue }}>{money(actualSaved, currency)}</div><div className="fm-small" style={mutedStyle}>Logged savings</div></div>
              </div>
            </section>
          </div>
        )}

        {tab === "goals" && (
          <div className="fm-animate" style={{ display: "grid", gap: 18 }}>
            <section className="fm-card" style={{ ...panelStyle, background: palette.cream }}>
              <div className="fm-eyebrow">YOUR NEXT CHAPTER</div>
              <h2 className="fm-title" style={{ fontSize: 38, marginTop: 12 }}>{data.goal.name}</h2>
              <p className="fm-subtitle" style={{ marginTop: 12 }}>
                This is a destination you chose for yourself. The number is information, not a measure of your worth.
              </p>
              <div style={{ margin: "28px 0 10px", height: 12, background: "#D9CEB9", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${goalProgress}%`, background: palette.blue, borderRadius: 99, transition: "width .7s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12 }}>
                <span>{money(data.goal.saved + actualSaved, currency)} recorded</span>
                <span style={mutedStyle}>{money(data.goal.target, currency)} goal</span>
              </div>
              <button className="fm-button" style={{ marginTop: 22 }} onClick={() => setShowGoalEditor(!showGoalEditor)}>
                {showGoalEditor ? "Close editor" : "Edit my goal"}
              </button>
              {showGoalEditor && (
                <div style={{ display: "grid", gap: 13, marginTop: 20 }}>
                  <div><label className="fm-label">What are you saving for?</label><input className="fm-input" value={goalName} onChange={(e) => setGoalName(e.target.value)} /></div>
                  <div className="fm-grid">
                    <div><label className="fm-label">Target ({currency})</label><input className="fm-input" type="number" min="1" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} /></div>
                    <div><label className="fm-label">Saved before tracking ({currency})</label><input className="fm-input" type="number" min="0" value={goalSaved} onChange={(e) => setGoalSaved(e.target.value)} /></div>
                  </div>
                  <button className="fm-button fm-button-dark" onClick={saveGoal}>Save goal</button>
                </div>
              )}
            </section>

            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">EXPLORE A SCENARIO</div>
              <h2 className="fm-heading" style={{ margin: "10px 0" }}>What might a change make possible?</h2>
              <p className="fm-subtitle">Adjust the hypothetical reduction. This doesn&apos;t predict your behaviour or require you to change anything.</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, alignItems: "baseline" }}>
                <span className="fm-small" style={mutedStyle}>Potential annual savings</span>
                <span className="fm-stat" style={{ color: palette.blue }}>{money(potentialSavings, currency)}</span>
              </div>
              <input aria-label="Potential spending reduction" type="range" min="0" max="100" step="10" value={reduction} onChange={(e) => setReduction(Number(e.target.value))} style={{ width: "100%", accentColor: palette.blue, marginTop: 17 }} />
              <div style={{ display: "flex", justifyContent: "space-between", ...mutedStyle, fontSize: 10 }}><span>0%</span><span>{reduction}%</span><span>100%</span></div>
              <div style={{ display: "flex", gap: 5, marginTop: 20 }}>
                {[0, 10, 25, 50, 75, 100].map((v) => (
                  <button key={v} className="fm-button" style={{ flex: 1, padding: "8px 2px", background: reduction === v ? palette.paleBlue : "transparent", borderColor: reduction === v ? palette.blue : palette.line }} onClick={() => setReduction(v)}>{v}%</button>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "history" && (
          <div className="fm-animate" style={{ display: "grid", gap: 18 }}>
            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">YOUR RECORD</div>
              <h2 className="fm-heading" style={{ margin: "9px 0 15px" }}>A clearer picture, over time</h2>
              {data.entries.length === 0 ? (
                <p className="fm-subtitle">No entries yet. When you add them, they&apos;ll appear here in date order.</p>
              ) : (
                data.entries.slice().sort((a, b) => b.date.localeCompare(a.date)).map((entry) => (
                  <div className="fm-entry" key={entry.id}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13 }}>{entry.category}</div>
                      <div className="fm-small" style={mutedStyle}>{entry.date}{entry.note ? ` · ${entry.note}` : ""}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <strong style={{ color: entry.category === "Money saved" ? palette.blue : palette.ink }}>{money(entry.amount, currency)}</strong>
                      <button className="fm-button" aria-label={`Delete ${entry.category} entry`} style={{ padding: "6px 10px" }} onClick={() => deleteEntry(entry.id)}>×</button>
                    </div>
                  </div>
                ))
              )}
            </section>

            <section className="fm-card" style={panelStyle}>
              <div className="fm-eyebrow">YOUR DATA, YOUR CHOICE</div>
              <h2 className="fm-heading" style={{ margin: "9px 0" }}>Backup and restore</h2>
              <p className="fm-subtitle">
                Your entries are stored in this browser. Export a backup to keep a copy, or import a previous backup on this device.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 18 }}>
                <button className="fm-button fm-button-dark" onClick={() => downloadFile("financial-mirror-backup.json", JSON.stringify(data, null, 2))}>Export backup ↓</button>
                <label className="fm-button" style={{ display: "inline-flex", alignItems: "center" }}>
                  Import backup ↑
                  <input type="file" accept=".json,application/json" onChange={(e) => importBackup(e.target.files?.[0])} style={{ display: "none" }} />
                </label>
                <button className="fm-button" onClick={() => {
                  if (window.confirm("Delete all Financial Mirror data saved in this browser? Export a backup first if you want to keep it.")) {
                    setData(defaultData);
                    setGoalName(defaultData.goal.name);
                    setGoalTarget(String(defaultData.goal.target));
                    setGoalSaved("0");
                    setMessage("Local data reset.");
                  }
                }}>Delete local data</button>
              </div>
              <p className="fm-small" role="status" style={{ marginTop: 15, ...mutedStyle }}>{message}</p>
              <div style={{ borderTop: `1px solid ${palette.line}`, marginTop: 20, paddingTop: 17 }}>
                <div className="fm-eyebrow">PLEASE NOTE</div>
                <p className="fm-small" style={{ ...mutedStyle, marginTop: 8 }}>
                  This first version has no account or cloud sync. Anyone with access to this browser profile may be able to access its saved data. Clearing browser data can erase it. Export backups may contain sensitive personal information, so keep them somewhere private.
                </p>
              </div>
            </section>
          </div>
        )}

        <footer style={{ marginTop: 36, paddingTop: 20, borderTop: `1px solid ${palette.line}`, ...mutedStyle }}>
          <div className="fm-eyebrow">A TOOL FOR REFLECTION, NOT JUDGEMENT</div>
          <p className="fm-small" style={{ marginTop: 9 }}>
            Estimates depend on the information you enter. Potential savings are hypothetical. This tool does not diagnose or treat alcohol-related conditions, and financial goals are not a substitute for appropriate health support.
          </p>
          <div style={{ marginTop: 20, fontSize: 11 }}>SYSTEMINE · Make room for what matters.</div>
        </footer>
      </div>
    </main>
  );
}

function MonthlyChart({
  data,
  currency,
}: {
  data: { month: string; spending: number; saved: number }[];
  currency: "INR" | "USD";
}) {
  const max = Math.max(1, ...data.flatMap((item) => [item.spending, item.saved]));
  const height = 190;
  const chartWidth = 600;
  const left = 12;
  const barWidth = 20;
  const groupWidth = chartWidth / data.length;

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${chartWidth} ${height + 28}`} role="img" aria-label="Monthly chart of recorded spending and savings" style={{ display: "block", width: "100%", minWidth: 300 }}>
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = height - fraction * (height - 15);
          return (
            <g key={fraction}>
              <line x1={left} y1={y} x2={chartWidth - 5} y2={y} stroke={palette.line} strokeDasharray="3 5" />
            </g>
          );
        })}
        {data.map((item, index) => {
          const center = left + groupWidth * index + groupWidth / 2;
          const spendingHeight = (item.spending / max) * (height - 20);
          const savedHeight = (item.saved / max) * (height - 20);
          return (
            <g key={item.month}>
              {item.spending > 0 && (
                <rect x={center - barWidth - 2} y={height - spendingHeight} width={barWidth} height={spendingHeight} rx="5" fill={palette.brown}>
                  <title>{`${monthLabel(item.month)} spending: ${money(item.spending, currency)}`}</title>
                </rect>
              )}
              {item.saved > 0 && (
                <rect x={center + 2} y={height - savedHeight} width={barWidth} height={savedHeight} rx="5" fill={palette.blue}>
                  <title>{`${monthLabel(item.month)} savings: ${money(item.saved, currency)}`}</title>
                </rect>
              )}
              <text x={center} y={height + 19} fontSize="11" textAnchor="middle" fill={palette.muted}>{monthLabel(item.month)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}