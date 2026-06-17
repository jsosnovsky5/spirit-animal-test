import { useState, useEffect } from "react";

// ─── ARCHETYPES ───────────────────────────────────────────────────────────────
const ARCHETYPES = {
  lion: {
    name: "Lion",
    emoji: "🦁",
    tagline: "The Decisive Commander",
    color: "#C8860A",
    bg: "#FDF3DC",
    description:
      "You lead from the front. When a situation demands clarity, you provide it without hesitation. You don't wait for consensus when the moment is critical. Others look to you precisely because you're willing to act when no one else will.",
    strengths: ["Clear-eyed under pressure", "Natural authority", "Decisive in ambiguity", "Rallies the room"],
    shadow: "Can move too fast and leave people behind. The room needs to follow, not just obey.",
    at_best: "A crisis becomes a turning point because you were in the room.",
    at_worst: "You make the right call but lose the team in the process.",
    pairs_well: ["Owl", "Wolf", "Elephant"],
  },
  owl: {
    name: "Owl",
    emoji: "🦉",
    tagline: "The Systems Thinker",
    color: "#4A5568",
    bg: "#F7F8FA",
    description:
      "You see patterns others miss. Before you act, you understand deeply. Your thinking is structured, your standards are high, and your work holds up over time. You are the person everyone calls when they need to understand something complex.",
    strengths: ["Deep analytical clarity", "High standards", "Reliable judgment", "Sees second-order effects"],
    shadow: "Analysis can become avoidance. At some point, the plan has to leave the notebook.",
    at_best: "Your preparation prevents problems that nobody else even saw coming.",
    at_worst: "You're still refining the plan when the window closes.",
    pairs_well: ["Lion", "Hawk", "Ant"],
  },
  wolf: {
    name: "Wolf",
    emoji: "🐺",
    tagline: "The Pack Leader",
    color: "#6B5B95",
    bg: "#F4F0FB",
    description:
      "You understand that the mission runs on relationships. You build loyalty, read the room, and know who's struggling before they say a word. People follow you because they trust you, not because they have to.",
    strengths: ["Deep loyalty", "Emotional intelligence", "Team cohesion", "Conflict navigation"],
    shadow: "Pack protection can shade into insularity. Outside perspectives get filtered.",
    at_best: "Your team performs at a level nobody thought possible because they believe in each other.",
    at_worst: "Loyalty to the group delays hard truths that could help it grow.",
    pairs_well: ["Raven", "Orca", "Elephant"],
  },
  elephant: {
    name: "Elephant",
    emoji: "🐘",
    tagline: "The Long Memory",
    color: "#718096",
    bg: "#F0F2F5",
    description:
      "You are the institution. You remember what worked, what didn't, and why. You provide stability when others bring volatility. Organizations with an Elephant don't make the same mistake twice. You make sure of it.",
    strengths: ["Institutional memory", "Steady presence", "Long-view thinking", "Builds trust over time"],
    shadow: "History can become a ceiling. 'We tried that' sometimes means 'we should try again.'",
    at_best: "You prevent the organization from repeating a costly mistake it's already paid for.",
    at_worst: "Past experience quietly kills a good idea before it gets a fair hearing.",
    pairs_well: ["Raven", "Hawk", "Lion"],
  },
  raven: {
    name: "Raven",
    emoji: "🐦‍⬛",
    tagline: "The Strategic Mind",
    color: "#2D3748",
    bg: "#EDF2F7",
    description:
      "You think three moves ahead. Where others see a problem, you see a system. Where they see a system, you see leverage. You are drawn to complexity and thrive when the terrain is uncertain.",
    strengths: ["Strategic vision", "Pattern recognition", "Adaptive thinking", "Finds angles others miss"],
    shadow: "Strategy without grounding drifts. Brilliance without execution is just ideas.",
    at_best: "You identify a path that changes the trajectory of the organization.",
    at_worst: "Your strategy is right but nobody understands it well enough to execute it.",
    pairs_well: ["Elephant", "Owl", "Wolf"],
  },
  hawk: {
    name: "Hawk",
    emoji: "🦅",
    tagline: "The Precision Operator",
    color: "#C05621",
    bg: "#FEF3EC",
    description:
      "You execute. Where others plan, you move precisely, efficiently, and without wasted motion. You have an instinct for what matters right now, and you act on it before the moment passes.",
    strengths: ["Operational precision", "High execution speed", "Prioritization instinct", "Locks in on targets"],
    shadow: "Speed and precision can narrow the field of view. Not every problem has a clean solution.",
    at_best: "You solve in a day what others would debate for a week.",
    at_worst: "You solve the wrong problem. Perfectly.",
    pairs_well: ["Owl", "Raven", "Elephant"],
  },
  orca: {
    name: "Orca",
    emoji: "🐋",
    tagline: "The Collaborative Strategist",
    color: "#2B6CB0",
    bg: "#EBF4FF",
    description:
      "You are the rare combination: intelligent and warm. You build toward long-term outcomes while maintaining the trust of the people around you. You don't need to dominate the room to lead it.",
    strengths: ["Builds aligned teams", "Long-horizon thinking", "High social intelligence", "Durable leadership"],
    shadow: "The desire for alignment can delay necessary conflict. Some decisions can't be consensus-built.",
    at_best: "You create an environment where people do their best work, and they know why they're doing it.",
    at_worst: "The team is aligned but not moving fast enough.",
    pairs_well: ["Hawk", "Lion", "Wolf"],
  },
  ant: {
    name: "Ant",
    emoji: "🐜",
    tagline: "The Quiet Builder",
    color: "#276749",
    bg: "#F0FFF4",
    description:
      "You build from the inside out. Systems, teams, trust: you construct them carefully, brick by brick, without needing to be the loudest voice in the room. You lead by doing, and people follow because the work speaks before you do.",
    strengths: ["System builder", "Earns trust through execution", "Leads from within", "Creates durable foundations"],
    shadow: "Building quietly can become invisible. Others may not see the load you're carrying or the leadership you're providing.",
    at_best: "You've built something that keeps working long after the moment has passed.",
    at_worst: "The structure is sound but nobody knows you built it. You get bypassed for the louder voice.",
    pairs_well: ["Owl", "Raven", "Orca"],
  },
  bear: {
    name: "Bear",
    emoji: "🐻",
    tagline: "The Grounded Protector",
    color: "#7B341E",
    bg: "#FFF5F0",
    description:
      "You are the steady force in the room. Patient, calm, and immovable when something important is at stake. People feel safe with you around, not because you promise safety, but because you embody it.",
    strengths: ["Calm under pressure", "Protective instinct", "Deep endurance", "Presence that reassures"],
    shadow: "Strength can become stubbornness. The bear that won't move can also block the path forward.",
    at_best: "When everything is uncertain, you are the thing that holds.",
    at_worst: "Patience becomes passivity. The moment passed while you waited for certainty.",
    pairs_well: ["Hawk", "Wolf", "Raven"],
  },
  fox: {
    name: "Fox",
    emoji: "🦊",
    tagline: "The Resourceful Adapter",
    color: "#C05621",
    bg: "#FFFAF0",
    description:
      "You find a way. Rules are frameworks, not ceilings. You read the situation quickly and adjust before others realize adjustment was necessary. You are most alive when the path isn't clear.",
    strengths: ["Rapid adaptation", "Creative problem-solving", "Reads situations fast", "Thrives in ambiguity"],
    shadow: "Cleverness without anchoring drifts toward manipulation. The fox must decide what it's actually for.",
    at_best: "You find the solution nobody else considered because you weren't bound by what 'should' work.",
    at_worst: "Your adaptability reads as unreliable. Nobody's sure which version of you shows up.",
    pairs_well: ["Elephant", "Owl", "Lion"],
  },
  bull: {
    name: "Bull",
    emoji: "🐂",
    tagline: "The Relentless Force",
    color: "#9B1C1C",
    bg: "#FEF2F2",
    description:
      "You don't stop. Where others see obstacles, you see something to move through. Your persistence is what gets results when cleverness, strategy, and charm have all run out. You are not the loudest in the room, but you are the last one standing.",
    strengths: ["Relentless persistence", "High threshold for adversity", "Gets results others give up on", "Doesn't need momentum to keep moving"],
    shadow: "Charging forward can mean missing the signal to change course. Not everything that resists you is an obstacle.",
    at_best: "The thing got done because you refused to let it not get done.",
    at_worst: "You pushed through a wall that was actually a door.",
    pairs_well: ["Owl", "Raven", "Hawk"],
  },
  dolphin: {
    name: "Dolphin",
    emoji: "🐬",
    tagline: "The Devoted Coach",
    color: "#2E86AB",
    bg: "#EBF8FF",
    description:
      "Your greatest satisfaction comes from watching others grow. You listen before you speak, ask before you tell, and measure your success by what the people around you become. You don't need to be the best in the room. You need to bring the best out of it.",
    strengths: ["Develops others", "Deep listening", "Asks the right questions", "Unlocks potential in people"],
    shadow: "Coaching everyone else can mean neglecting the hard calls that only you can make.",
    at_best: "Someone you worked with years ago still credits you for changing how they think.",
    at_worst: "You've been so focused on developing the team that nobody made the difficult decision.",
    pairs_well: ["Wolf", "Elephant", "Owl"],
  },
};

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    text: "When things are stressful or high-stakes, I tend to:",
    options: [
      { text: "Take control", scores: { lion: 3, hawk: 2, bull: 2 } },
      { text: "Pause and observe", scores: { owl: 2, raven: 2, elephant: 1 } },
      { text: "Delegate", scores: { orca: 2, lion: 1 } },
      { text: "Support others", scores: { wolf: 3, bear: 2, dolphin: 3, orca: 1 } },
      { text: "Withdraw to think", scores: { raven: 3, fox: 2, owl: 1, ant: 1 } },
    ],
  },
  {
    id: 2,
    text: "In those moments, I rely more on:",
    options: [
      { text: "Logic", scores: { owl: 2, hawk: 2, raven: 2, elephant: 2, ant: 2 } },
      { text: "Intuition", scores: { lion: 2, wolf: 2, fox: 2, bear: 2, orca: 2, dolphin: 2, bull: 2 } },
    ],
  },
  {
    id: 3,
    text: "Under pressure, I am more focused on:",
    options: [
      { text: "The task or problem", scores: { owl: 2, hawk: 2, raven: 2, fox: 2, lion: 2, ant: 2, bull: 2 } },
      { text: "The people and relationships", scores: { wolf: 2, bear: 2, orca: 2, elephant: 2, dolphin: 2 } },
    ],
  },
  {
    id: 4,
    text: "When leading or contributing, I prefer to operate:",
    options: [
      { text: "From the front", scores: { lion: 3, hawk: 2, bull: 2 } },
      { text: "Alongside others", scores: { wolf: 2, orca: 3, bear: 1, dolphin: 2 } },
      { text: "Behind the scenes", scores: { owl: 2, raven: 2, ant: 3, elephant: 1, fox: 1 } },
    ],
  },
  {
    id: 5,
    text: "By default, I am more:",
    options: [
      { text: "Independent", scores: { lion: 2, owl: 2, raven: 2, hawk: 2, fox: 2, bull: 2 } },
      { text: "Collaborative", scores: { wolf: 2, orca: 2, bear: 2, ant: 2, elephant: 2, dolphin: 2 } },
    ],
  },
  {
    id: 6,
    text: "I tend to trust more:",
    options: [
      { text: "Systems and processes", scores: { owl: 2, raven: 2, hawk: 2, ant: 2, elephant: 2, bull: 1 } },
      { text: "People and relationships", scores: { wolf: 2, bear: 2, orca: 2, lion: 2, fox: 1, dolphin: 2 } },
    ],
  },
  {
    id: 7,
    text: "I primarily recharge:",
    options: [
      { text: "Alone", scores: { owl: 2, raven: 2, fox: 2, hawk: 2, ant: 2, elephant: 2, bear: 1, lion: 1, bull: 2 } },
      { text: "With others", scores: { wolf: 3, orca: 3, dolphin: 3 } },
    ],
  },
  {
    id: 8,
    text: "I feel more comfortable with:",
    options: [
      { text: "Routine and predictability", scores: { owl: 2, elephant: 3, ant: 2, bear: 2, dolphin: 1 } },
      { text: "Change and variety", scores: { fox: 3, raven: 2, lion: 2, hawk: 2, orca: 1, wolf: 1, bull: 2 } },
    ],
  },
  {
    id: 9,
    text: "When I feel most like myself, I am usually:",
    options: [
      { text: "Building", scores: { ant: 3, owl: 1, elephant: 1 } },
      { text: "Protecting", scores: { bear: 3, wolf: 2 } },
      { text: "Exploring", scores: { fox: 3, raven: 2 } },
      { text: "Teaching", scores: { owl: 2, elephant: 3, wolf: 1, dolphin: 3 } },
      { text: "Creating", scores: { orca: 2, raven: 2, fox: 1 } },
      { text: "Competing", scores: { lion: 3, hawk: 3, bull: 2 } },
    ],
  },
  {
    id: 10,
    text: "When facing an important decision with incomplete information, I tend to:",
    options: [
      { text: "Act early and adjust as I go", scores: { lion: 3, hawk: 2, fox: 1, bull: 2 } },
      { text: "Gather more data before moving", scores: { owl: 3, raven: 2, elephant: 1 } },
      { text: "Test with a small experiment", scores: { fox: 3, ant: 2, raven: 1 } },
      { text: "Wait until the path is clear", scores: { bear: 3, elephant: 2 } },
      { text: "Seek consensus before deciding", scores: { wolf: 3, orca: 3, dolphin: 2 } },
    ],
  },
  {
    id: 11,
    text: "My primary focus as a leader is:",
    options: [
      { text: "Keeping the team strong and loyal", scores: { wolf: 3, bear: 2 } },
      { text: "Helping each person around me grow", scores: { dolphin: 3, elephant: 1 } },
      { text: "Finding the clearest path forward", scores: { owl: 2, raven: 2, hawk: 2 } },
      { text: "Inspiring people toward something bigger", scores: { orca: 2 } },
      { text: "Getting the thing built", scores: { ant: 3, lion: 1, fox: 1, bull: 2 } },
      { text: "Making the call when no one else will", scores: { lion: 3, bear: 1 } },
    ],
  },
  {
    id: 12,
    text: "When I am at my best, people experience me as:",
    options: [
      { text: "Decisive", scores: { lion: 3, hawk: 2, bull: 2 } },
      { text: "Wise", scores: { owl: 2, elephant: 3, raven: 2 } },
      { text: "Inspiring", scores: { orca: 1 } },
      { text: "Warm", scores: { wolf: 2, dolphin: 3, bear: 2 } },
      { text: "Resourceful", scores: { fox: 3, orca: 2, ant: 1 } },
    ],
  },
];

// ─── HELPER ───────────────────────────────────────────────────────────────────
function computeResult(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach((k) => (scores[k] = 0));
  answers.forEach(({ scores: s }) => {
    Object.entries(s).forEach(([k, v]) => {
      scores[k] = (scores[k] || 0) + v;
    });
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { primary: sorted[0][0], secondary: sorted[1][0], scores };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
      }}
    />
  );
}

function ArchetypeModal({ archetype, onClose }) {
  const a = ARCHETYPES[archetype];
  if (!a) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #1e1608 0%, #2a1e0e 100%)",
          border: `1px solid ${a.color}44`,
          borderRadius: "8px",
          padding: "2rem",
          maxWidth: 480,
          width: "100%",
          position: "relative",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "transparent", border: "none",
            color: "rgba(245,236,215,0.4)", fontSize: "1.2rem",
            cursor: "pointer", lineHeight: 1, padding: "0.25rem 0.5rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#F5ECD7"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(245,236,215,0.4)"}
        >
          ✕
        </button>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{a.emoji}</div>
        <h2 style={{
          color: "#F5ECD7", fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300, fontSize: "1.8rem", marginBottom: "0.25rem",
        }}>
          The {a.name}
        </h2>
        <p style={{ color: a.color, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", marginBottom: "1.25rem", letterSpacing: "0.05em" }}>
          {a.tagline}
        </p>
        <p style={{ color: "rgba(245,236,215,0.75)", lineHeight: 1.75, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
          {a.description}
        </p>
      </div>
    </div>
  );
}

function LandingScreen({ onStart }) {
  const [visible, setVisible] = useState(false);
  const [activeArchetype, setActiveArchetype] = useState(null);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #1a1208 0%, #2d1f0a 40%, #1a2d1a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { w: 600, h: 600, top: "-200px", left: "-200px", color: "rgba(139,90,43,0.08)" },
          { w: 400, h: 400, top: "60%", left: "70%", color: "rgba(74,111,60,0.07)" },
          { w: 300, h: 300, top: "30%", left: "80%", color: "rgba(200,134,10,0.05)" },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            width: c.w, height: c.h,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.color} 0%, transparent 70%)`,
            top: c.top, left: c.left,
          }} />
        ))}
      </div>

      <div style={{
        maxWidth: 640,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          color: "#F5ECD7",
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: "0.5rem",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          letterSpacing: "-0.01em",
        }}>
          Spirit Animal<br />
          <em style={{ color: "#C8860A", fontStyle: "italic" }}>Leadership Test</em>
        </h1>

        <p style={{
          color: "rgba(245,236,215,0.6)",
          fontSize: "16px",
          lineHeight: 1.7,
          margin: "1.5rem auto",
          maxWidth: 480,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
        }}>
          12 questions. Discover which animal archetype<br />drives how you lead at home, at work, and at play.
        </p>

        <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
          <p style={{ color: "#C8860A", fontSize: "16px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", textAlign: "center", marginBottom: "0.5rem" }}>
            The Archetypes
          </p>
          <p style={{ color: "rgba(245,236,215,0.5)", fontSize: "14px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", textAlign: "center", marginBottom: "1.5rem" }}>
            Which one are you?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem", justifyItems: "center" }}>
            {Object.keys(ARCHETYPES).sort().map((key) => {
              const a = ARCHETYPES[key];
              return (
                <span
                  key={key}
                  onClick={() => setActiveArchetype(key)}
                  style={{ fontSize: "1.5rem", opacity: 0.4, cursor: "pointer", transition: "opacity 0.2s ease, transform 0.2s ease", display: "inline-block" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "0.4"; e.currentTarget.style.transform = "scale(1)"; }}
                  title={a.name}
                >
                  {a.emoji}
                </span>
              );
            })}
          </div>
        </div>

        <button
          onClick={onStart}
          style={{
            background: "linear-gradient(135deg, #C8860A 0%, #8B5A1A 100%)",
            border: "none",
            color: "#F5ECD7",
            fontSize: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.08em",
            padding: "1rem 2.5rem",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Begin the Test →
        </button>

        <p style={{ marginTop: "1rem", color: "rgba(245,236,215,0.25)", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>
          Takes Just 5 Minutes
        </p>
      </div>
      {activeArchetype && <ArchetypeModal archetype={activeArchetype} onClose={() => setActiveArchetype(null)} />}
    </div>
  );
}

function QuizScreen({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;

  function handleSelect(option) {
    if (animating) return;
    setSelected(option);
  }

  function handleNext() {
    if (!selected || animating) return;
    setAnimating(true);
    setVisible(false);

    setTimeout(() => {
      const newAnswers = [...answers, selected];
      if (current + 1 >= QUESTIONS.length) {
        onComplete(newAnswers);
      } else {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
        setVisible(true);
        setAnimating(false);
      }
    }, 400);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #1a1208 0%, #2d1f0a 40%, #1a2d1a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.1)", zIndex: 10 }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #C8860A, #8B5A1A)",
          transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>

      <div style={{ position: "fixed", top: "1rem", right: "1.5rem", color: "rgba(245,236,215,0.4)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
        {current + 1} / {QUESTIONS.length}
      </div>

      <div style={{
        maxWidth: 620,
        width: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-16px)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <p style={{ color: "rgba(200,134,10,0.7)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Question {current + 1}
        </p>

        <h2 style={{
          fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)",
          color: "#F5ECD7",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.35,
          marginBottom: "2rem",
        }}>
          {q.text}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === opt;
            return (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                style={{
                  background: isSelected ? "linear-gradient(135deg, rgba(200,134,10,0.25), rgba(139,90,26,0.15))" : "rgba(245,236,215,0.04)",
                  border: isSelected ? "1px solid rgba(200,134,10,0.6)" : "1px solid rgba(245,236,215,0.1)",
                  color: isSelected ? "#F5ECD7" : "rgba(245,236,215,0.7)",
                  fontSize: "1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  padding: "1rem 1.25rem",
                  textAlign: "left",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: "rgba(200,134,10,0.5)", marginRight: "0.75rem", fontFamily: "'Cormorant Garamond', serif" }}>
                  {["A","B","C","D","E","F"][i]}.
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "1.75rem", textAlign: "right" }}>
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              background: selected ? "linear-gradient(135deg, #C8860A, #8B5A1A)" : "rgba(245,236,215,0.1)",
              border: "none",
              color: selected ? "#F5ECD7" : "rgba(245,236,215,0.3)",
              fontSize: "0.9rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.875rem 2rem",
              borderRadius: "2px",
              cursor: selected ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
          >
            {current + 1 === QUESTIONS.length ? "See My Result" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ answers, onRetake }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  const { primary, secondary } = computeResult(answers);
  const p = ARCHETYPES[primary];
  const s = ARCHETYPES[secondary];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, #0f0c06 0%, ${p.color}22 50%, #0a1a0a 100%)`,
      padding: "3rem 1.5rem",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{
        maxWidth: 680,
        width: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "rgba(200,134,10,0.7)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Your Spirit Animal
          </p>
          <div style={{ fontSize: "5rem", marginBottom: "0.5rem" }}>{p.emoji}</div>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#F5ECD7",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            marginBottom: "0.25rem",
          }}>
            The {p.name}
          </h1>
          <p style={{ color: p.color, fontSize: "1rem", letterSpacing: "0.1em", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
            {p.tagline}
          </p>
        </div>

        <div style={{ background: "rgba(245,236,215,0.04)", border: `1px solid ${p.color}33`, borderRadius: "6px", padding: "2rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "rgba(245,236,215,0.85)", lineHeight: 1.8, margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>
            {p.description}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "At your best", text: p.at_best, accent: "#4A7C59" },
            { label: "At your edge", text: p.at_worst, accent: "#8B4513" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,236,215,0.04)", border: `1px solid ${item.accent}44`, borderRadius: "6px", padding: "1.25rem" }}>
              <p style={{ color: item.accent, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</p>
              <p style={{ color: "rgba(245,236,215,0.75)", lineHeight: 1.6, fontSize: "0.95rem", margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(245,236,215,0.03)", border: "1px solid rgba(245,236,215,0.08)", borderRadius: "6px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "rgba(200,134,10,0.7)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Core Strengths</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {p.strengths.map((str, i) => (
              <span key={i} style={{ background: `${p.color}22`, border: `1px solid ${p.color}44`, color: p.color, fontSize: "0.85rem", padding: "0.3rem 0.85rem", borderRadius: "20px" }}>{str}</span>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(245,236,215,0.02)", border: "1px solid rgba(245,236,215,0.06)", borderRadius: "6px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "rgba(245,236,215,0.4)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Weaknesses</p>
          <p style={{ color: "rgba(245,236,215,0.6)", lineHeight: 1.6, margin: 0, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
            "{p.shadow}"
          </p>
        </div>

        <div style={{ background: "rgba(245,236,215,0.03)", border: `1px solid ${s.color}33`, borderRadius: "6px", padding: "1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.75rem" }}>{s.emoji}</span>
            <div>
              <p style={{ color: "rgba(245,236,215,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.15rem" }}>Secondary Archetype</p>
              <p style={{ color: "#F5ECD7", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", margin: 0 }}>
                The {s.name} <span style={{ color: s.color, fontStyle: "italic" }}>— {s.tagline}</span>
              </p>
            </div>
          </div>
          <p style={{ color: "rgba(245,236,215,0.6)", lineHeight: 1.6, margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
            {s.description.split(". ").slice(0, 2).join(". ") + "."}
          </p>
        </div>

        <div style={{ background: "rgba(245,236,215,0.02)", border: "1px solid rgba(245,236,215,0.06)", borderRadius: "6px", padding: "1.5rem", marginBottom: "2.5rem" }}>
          <p style={{ color: "rgba(245,236,215,0.35)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1.25rem" }}>Your Answers</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {QUESTIONS.map((q, i) => {
              const answer = answers[i];
              const matchingArchetypes = answer
                ? Object.entries(answer.scores)
                    .sort((a, b) => b[1] - a[1])
                    .map(([key]) => ARCHETYPES[key])
                    .filter(Boolean)
                : [];
              return (
                <div key={q.id}>
                  <p style={{ color: "rgba(245,236,215,0.35)", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.2rem" }}>
                    {i + 1}. {q.text}
                  </p>
                  <p style={{ color: "rgba(245,236,215,0.65)", fontSize: "0.95rem", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                    {answer?.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={onRetake}
            style={{
              background: "transparent",
              border: "1px solid rgba(245,236,215,0.2)",
              color: "rgba(245,236,215,0.5)",
              fontSize: "0.85rem",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.75rem 1.75rem",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            ↩ Retake the Test
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [finalAnswers, setFinalAnswers] = useState([]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #1a1208; }
        ::selection { background: rgba(200,134,10,0.3); color: #F5ECD7; }
      `}</style>
      <GrainOverlay />
      {screen === "landing" && <LandingScreen onStart={() => setScreen("quiz")} />}
      {screen === "quiz" && (
        <QuizScreen onComplete={(answers) => { setFinalAnswers(answers); setScreen("result"); }} />
      )}
      {screen === "result" && (
        <ResultScreen answers={finalAnswers} onRetake={() => { setFinalAnswers([]); setScreen("landing"); }} />
      )}
    </>
  );
}
