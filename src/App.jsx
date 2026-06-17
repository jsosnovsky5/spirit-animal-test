import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";

// ─── ARCHETYPES ───────────────────────────────────────────────────────────────
const ARCHETYPES = {
  lion: {
    name: "Lion",
    emoji: "🦁",
    tagline: "The Decisive Commander",
    plural: "Lions",
    color: "#C8860A",
    bg: "#FDF3DC",
    description:
      "You lead from the front. When a situation demands clarity, you provide it without hesitation. You don't wait for consensus when the moment is critical. Others look to you precisely because you're willing to act when no one else will.",
    strengths: ["Clear-eyed under pressure", "Natural authority", "Decisive in ambiguity", "Rallies the room"],
    shadow: ["Decides before others have context", "Low buy-in on execution", "Mistakes compliance for alignment"],
    at_best: "A crisis becomes a turning point because you were in the room.",
    at_worst: "You make the right call but lose the team in the process.",
    famous: [
      { name: "Winston Churchill", title: "Prime Minister of the United Kingdom", reason: "Took command of Britain when every advisor said to negotiate. The crisis needed a decider, and he was in the room." },
      { name: "Pablo Picasso", title: "Painter and Co-founder of Cubism", reason: "Never asked permission to break the rules. Decided what art would become and made it without waiting for the room to agree." },
      { name: "Michael Jordan", title: "Six-Time NBA Champion, Chicago Bulls", reason: "Wanted the ball when the game was on the line. Not occasionally. Always. The decisive moment was his preferred terrain." },
    ],
    pairs_well: ["Owl", "Wolf", "Elephant"],
  },
  owl: {
    name: "Owl",
    emoji: "🦉",
    tagline: "The Systems Thinker",
    plural: "Owls",
    color: "#4A5568",
    bg: "#F7F8FA",
    description:
      "You see patterns others miss. Before you act, you understand deeply. Your thinking is structured, your standards are high, and your work holds up over time. You are the person everyone calls when they need to understand something complex.",
    strengths: ["Deep analytical clarity", "High standards", "Reliable judgment", "Sees second-order effects"],
    shadow: ["Analysis as avoidance", "Refines past the point of action", "High standards can stall output"],
    at_best: "Your preparation prevents problems that nobody else even saw coming.",
    at_worst: "You're still refining the plan when the window closes.",
    famous: [
      { name: "Warren Buffett", title: "Chairman and CEO, Berkshire Hathaway", reason: "Doesn't invest in what he can't understand. His edge is depth of comprehension, not speed of reaction." },
      { name: "Marie Curie", title: "Nobel Prize-winning Physicist and Chemist", reason: "Built her understanding of radioactivity through relentless systematic observation. Won two Nobel Prizes in two different sciences." },
      { name: "Johann Sebastian Bach", title: "Composer", reason: "Built fugues as interlocking systems where every voice served the whole. His music is architecture, and it still holds." },
    ],
    pairs_well: ["Lion", "Hawk", "Ant"],
  },
  wolf: {
    name: "Wolf",
    emoji: "🐺",
    tagline: "The Pack Leader",
    plural: "Wolves",
    color: "#6B5B95",
    bg: "#F4F0FB",
    description:
      "You understand that the mission runs on relationships. You build loyalty, read the room, and know who's struggling before they say a word. People follow you because they trust you, not because they have to.",
    strengths: ["Deep loyalty", "Emotional intelligence", "Team cohesion", "Conflict navigation"],
    shadow: ["Loyalty can become insularity", "Filters outside perspectives", "Protects the group over the truth"],
    at_best: "Your team performs at a level nobody thought possible because they believe in each other.",
    at_worst: "Loyalty to the group delays hard truths that could help it grow.",
    famous: [
      { name: "Barack Obama", title: "44th President of the United States", reason: "Built coalitions through trust, not authority. People followed because they believed in him, not because they had to." },
      { name: "Bruce Springsteen", title: "Singer, Songwriter, and Rock Musician", reason: "Kept the same band together for five decades. The E Street Band isn't a backing group. It's a pack, and everyone knows it." },
      { name: "Phil Jackson", title: "Eleven-Time NBA Champion Head Coach", reason: "Won 11 titles not through authority but by understanding each player's psychology and building the team around it." },
    ],
    pairs_well: ["Raven", "Orca", "Elephant"],
  },
  elephant: {
    name: "Elephant",
    emoji: "🐘",
    tagline: "The Long Memory",
    plural: "Elephants",
    color: "#718096",
    bg: "#F0F2F5",
    description:
      "You are the institution. You remember what worked, what didn't, and why. You provide stability when others bring volatility. Organizations with an Elephant don't make the same mistake twice. You make sure of it.",
    strengths: ["Institutional memory", "Steady presence", "Long-view thinking", "Builds trust over time"],
    shadow: ["History as a ceiling", "Resists ideas that failed before", "Precedent overrides possibility"],
    at_best: "You prevent the organization from repeating a costly mistake it's already paid for.",
    at_worst: "Past experience quietly kills a good idea before it gets a fair hearing.",
    famous: [
      { name: "Nelson Mandela", title: "President of South Africa", reason: "27 years in prison didn't erase his memory of the goal. He emerged with the same conviction and used history to reconcile a nation." },
      { name: "Jane Goodall", title: "Primatologist and Conservationist", reason: "Spent 60 years observing the same chimpanzee community. Her edge was patience and the institutional memory it produced." },
      { name: "Cal Ripken Jr.", title: "MLB Hall of Famer, Baltimore Orioles", reason: "Played 2,632 consecutive games. Showed up, remembered his job, and never needed a moment to reintroduce himself." },
    ],
    pairs_well: ["Raven", "Hawk", "Lion"],
  },
  raven: {
    name: "Raven",
    emoji: "🐦‍⬛",
    tagline: "The Strategic Mind",
    plural: "Ravens",
    color: "#2D3748",
    bg: "#EDF2F7",
    description:
      "You think three moves ahead. Where others see a problem, you see a system. Where they see a system, you see leverage. You are drawn to complexity and thrive when the terrain is uncertain.",
    strengths: ["Strategic vision", "Pattern recognition", "Adaptive thinking", "Finds angles others miss"],
    shadow: ["Strategy without execution", "Can drift without grounding", "Insight rarely lands as action"],
    at_best: "You identify a path that changes the trajectory of the organization.",
    at_worst: "Your strategy is right but nobody understands it well enough to execute it.",
    famous: [
      { name: "Henry Kissinger", title: "U.S. Secretary of State and National Security Advisor", reason: "Saw geopolitics as a system of leverage points. He didn't react to events. He positioned for them years in advance." },
      { name: "Jeff Bezos", title: "Founder and Executive Chairman, Amazon", reason: "Built Amazon around flywheel logic, not quarterly results. Every decision was three moves deep." },
      { name: "Stanley Kubrick", title: "Film Director and Producer", reason: "Planned every scene years in advance, researched obsessively, and never started shooting until the strategy was complete. His films are systems disguised as stories." },
    ],
    pairs_well: ["Elephant", "Owl", "Wolf"],
  },
  hawk: {
    name: "Hawk",
    emoji: "🦅",
    tagline: "The Precision Operator",
    plural: "Hawks",
    color: "#C05621",
    bg: "#FEF3EC",
    description:
      "You execute. Where others plan, you move precisely, efficiently, and without wasted motion. You have an instinct for what matters right now, and you act on it before the moment passes.",
    strengths: ["Operational precision", "High execution speed", "Prioritization instinct", "Locks in on targets"],
    shadow: ["Narrows too fast", "Misses problems without clean solutions", "Precision over perspective"],
    at_best: "You solve in a day what others would debate for a week.",
    at_worst: "You solve the wrong problem. Perfectly.",
    famous: [
      { name: "Tim Cook", title: "CEO, Apple", reason: "Built the world's most efficient supply chain through relentless operational precision. Execution is his form of leadership." },
      { name: "Temple Grandin", title: "Professor of Animal Science, Colorado State University", reason: "Redesigned the entire cattle handling industry through precise spatial thinking. She saw exactly what others couldn't and fixed it." },
      { name: "Kobe Bryant", title: "Five-Time NBA Champion, Los Angeles Lakers", reason: "The Mamba Mentality was precision as a lifestyle. He didn't just work hard. He identified exactly what to eliminate." },
    ],
    pairs_well: ["Owl", "Raven", "Elephant"],
  },
  orca: {
    name: "Orca",
    emoji: "🐋",
    tagline: "The Collaborative Strategist",
    plural: "Orcas",
    color: "#2B6CB0",
    bg: "#EBF4FF",
    description:
      "You are the rare combination: intelligent and warm. You build toward long-term outcomes while maintaining the trust of the people around you. You don't need to dominate the room to lead it.",
    strengths: ["Builds aligned teams", "Long-horizon thinking", "High social intelligence", "Durable leadership"],
    shadow: ["Delays conflict past its usefulness", "Over-indexes on alignment", "Consensus where a call was needed"],
    at_best: "You create an environment where people do their best work, and they know why they're doing it.",
    at_worst: "You keep building consensus past the point where a decision should have been made.",
    famous: [
      { name: "Jacinda Ardern", title: "Prime Minister of New Zealand", reason: "Led with both strategic clarity and deep empathy. Made hard decisions without losing the trust of the people affected." },
      { name: "Satya Nadella", title: "CEO, Microsoft", reason: "Rebuilt Microsoft's culture before rebuilding its products. He understood that aligned people produce durable results." },
      { name: "Gregg Popovich", title: "Head Coach, San Antonio Spurs", reason: "Built a dynasty through trust, collective decision-making, and a culture where no star outranked the system." },
    ],
    pairs_well: ["Hawk", "Lion", "Wolf"],
  },
  ant: {
    name: "Ant",
    emoji: "🐜",
    tagline: "The Quiet Builder",
    plural: "Ants",
    color: "#276749",
    bg: "#F0FFF4",
    description:
      "You build systems, teams, and trust from the inside out. You construct carefully, brick by brick without needing to be the loudest voice in the room. You lead by doing, and people follow because the work speaks before you do.",
    strengths: ["System builder", "Earns trust through execution", "Leads from within", "Creates durable foundations"],
    shadow: ["Optimizes the wrong system", "Attached to what was built", "Misses the signal to change course"],
    at_best: "You've built something that keeps working long after the moment has passed.",
    at_worst: "You keep building long after the goal has changed, because finishing feels like loyalty.",
    famous: [
      { name: "Sam Walton", title: "Founder, Walmart", reason: "Built Walmart store by store, system by system. He was never the loudest person in the room. The infrastructure he built did the talking." },
      { name: "Katherine Johnson", title: "NASA Mathematician and Aerospace Scientist", reason: "Calculated orbital trajectories by hand. Her work held up the mission without her name on the mission." },
      { name: "Tim Duncan", title: "Five-Time NBA Champion, San Antonio Spurs", reason: "Called 'The Big Fundamental' for a reason. No flash, no drama. Just the same disciplined, foundational game built into a dynasty over 19 seasons." },
    ],
    pairs_well: ["Owl", "Raven", "Orca"],
  },
  bear: {
    name: "Bear",
    emoji: "🐻",
    tagline: "The Grounded Protector",
    plural: "Bears",
    color: "#7B341E",
    bg: "#FFF5F0",
    description:
      "You are the steady force in the room. You are patient, calm, and immovable when something important is at stake. People feel safe with you around, not because you promise safety, but because you embody it.",
    strengths: ["Calm under pressure", "Protective instinct", "Deep endurance", "Presence that reassures"],
    shadow: ["Stability shades into immovability", "Hard to redirect once set", "Blocks progress by not yielding"],
    at_best: "When everything is uncertain, you are the thing that holds.",
    at_worst: "Patience becomes passivity. The moment passed while you waited for certainty.",
    famous: [
      { name: "Angela Merkel", title: "Chancellor of Germany", reason: "Governed Germany for 16 years through crises by being the steadiest force in the room. Stability was her leadership style." },
      { name: "Jonas Salk", title: "Virologist and Developer of the Polio Vaccine", reason: "Gave the vaccine away for free. Protection at scale was the only goal. Credit was never part of the calculation." },
      { name: "LeBron James", title: "Four-Time NBA Champion", reason: "The steadying force on every team he has joined. Makes teammates better, protects the locker room, and elevates the whole system." },
    ],
    pairs_well: ["Hawk", "Wolf", "Raven"],
  },
  tortoise: {
    name: "Tortoise",
    emoji: "🐢",
    tagline: "The Patient Endurer",
    plural: "Tortoises",
    color: "#4A7C59",
    bg: "#EEF7F1",
    description:
      "You win by outlasting. While others sprint and burn out, you maintain your pace, your focus, and your resolve. You don't need momentum, recognition, or the right conditions. You simply continue. The race always goes further than people expect, and you're always still in it.",
    strengths: ["Unwavering endurance", "Self-contained", "Doesn't need external validation", "Outlasts resistance"],
    shadow: ["Patience becomes inertia", "Doesn't accelerate when needed", "Endurance over urgency"],
    at_best: "Everyone else gave up. You're still there, still working, and it's done.",
    at_worst: "Your pace doesn't adjust when the situation demands urgency — you endure when you should accelerate.",
    famous: [
      { name: "Abraham Lincoln", title: "16th President of the United States", reason: "Lost eight elections before winning the presidency. He didn't accelerate or pivot. He endured until the moment arrived." },
      { name: "Charles Darwin", title: "Naturalist and Author of On the Origin of Species", reason: "Spent 20 years gathering evidence before publishing. The work had to be irrefutable, and he was willing to wait until it was." },
      { name: "Roger Federer", title: "20-Time Grand Slam Singles Champion", reason: "Won Wimbledon at 35. His longevity wasn't luck. It was the product of sustained, unhurried excellence maintained over two decades." },
    ],
    pairs_well: ["Raven", "Ant", "Bull"],
  },
  bull: {
    name: "Bull",
    emoji: "🐂",
    tagline: "The Relentless Force",
    plural: "Bulls",
    color: "#9B1C1C",
    bg: "#FEF2F2",
    description:
      "You don't stop. Where others see obstacles, you see something to move through. Your persistence is what gets results when cleverness, strategy, and charm have all run out. You are not the loudest in the room, but you are the last one standing.",
    strengths: ["Relentless persistence", "High threshold for adversity", "Gets results others give up on", "Doesn't need momentum to keep moving"],
    shadow: ["Misreads resistance as an obstacle", "Pushes when pivoting is right", "Force over discernment"],
    at_best: "The thing got done because you refused to let it not get done.",
    at_worst: "You pushed through a wall that was actually a door.",
    famous: [
      { name: "Theodore Roosevelt", title: "26th President of the United States", reason: "Charged through physical illness, political opposition, and personal loss without slowing. Force was his default at San Juan Hill and in the White House alike." },
      { name: "Ludwig van Beethoven", title: "Composer", reason: "Kept composing after going completely deaf. The Ninth Symphony was written in total silence, force applied past the point where most would have stopped." },
      { name: "Muhammad Ali", title: "Heavyweight Boxing Champion of the World", reason: "Fought the U.S. government, faced prison, lost three years of his prime, and came back to win again. Nothing stopped him, inside the ring or out." },
    ],
    pairs_well: ["Owl", "Raven", "Hawk"],
  },
  dolphin: {
    name: "Dolphin",
    emoji: "🐬",
    tagline: "The Devoted Coach",
    plural: "Dolphins",
    color: "#2E86AB",
    bg: "#EBF8FF",
    description:
      "Your greatest satisfaction comes from watching others grow. You listen before you speak, ask before you tell, and measure your success by what the people around you become. You don't need to be the best in the room. You need to bring the best out of it.",
    strengths: ["Develops others", "Deep listening", "Asks the right questions", "Unlocks potential in people"],
    shadow: ["Develops others, avoids hard calls", "Coaching as conflict avoidance", "Defers decisions that need an owner"],
    at_best: "Someone you worked with years ago still credits you for changing how they think.",
    at_worst: "You've been so focused on developing the team that nobody made the difficult decision.",
    famous: [
      { name: "Maria Montessori", title: "Physician and Educational Theorist", reason: "Developed an entire system for unlocking human potential by studying how children actually learn, then built schools around what she found." },
      { name: "Fred Rogers", title: "Host, Mister Rogers' Neighborhood", reason: "Spent his entire career asking people how they felt and helping them feel seen. His influence lives in the people he changed." },
      { name: "John Wooden", title: "Head Basketball Coach, UCLA", reason: "Measured success by what his players became after basketball, not during it. The game was the method. Development was the point." },
    ],
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
      { text: "Pause and observe", scores: { owl: 2, raven: 2, elephant: 1, tortoise: 2 } },
      { text: "Delegate", scores: { orca: 2, lion: 1 } },
      { text: "Support others", scores: { wolf: 3, bear: 2, dolphin: 3, orca: 1 } },
      { text: "Withdraw to think", scores: { raven: 3, owl: 1, ant: 1 } },
    ],
  },
  {
    id: 2,
    text: "In those moments, I rely more on:",
    options: [
      { text: "Logic", scores: { owl: 2, hawk: 2, raven: 2, elephant: 2, ant: 2, tortoise: 2 } },
      { text: "Intuition", scores: { lion: 2, wolf: 2, bear: 2, orca: 2, dolphin: 2, bull: 2 } },
    ],
  },
  {
    id: 3,
    text: "Under pressure, I am more focused on:",
    options: [
      { text: "The task or problem", scores: { owl: 2, hawk: 2, raven: 2, tortoise: 2, lion: 2, ant: 2, bull: 2 } },
      { text: "The people and relationships", scores: { wolf: 2, bear: 2, orca: 2, elephant: 2, dolphin: 2 } },
    ],
  },
  {
    id: 4,
    text: "When leading or contributing, I prefer to operate:",
    options: [
      { text: "From the front", scores: { lion: 3, hawk: 2, bull: 2 } },
      { text: "Alongside others", scores: { wolf: 2, orca: 3, bear: 1, dolphin: 2 } },
      { text: "Behind the scenes", scores: { owl: 2, raven: 2, ant: 3, elephant: 1, tortoise: 2 } },
    ],
  },
  {
    id: 5,
    text: "By default, I am more:",
    options: [
      { text: "Independent", scores: { lion: 2, owl: 2, raven: 2, hawk: 2, tortoise: 2, bull: 2 } },
      { text: "Collaborative", scores: { wolf: 2, orca: 2, bear: 2, ant: 2, elephant: 2, dolphin: 2 } },
    ],
  },
  {
    id: 6,
    text: "I tend to trust more:",
    options: [
      { text: "Systems and processes", scores: { owl: 2, raven: 2, hawk: 2, ant: 2, elephant: 2, tortoise: 2, bull: 1 } },
      { text: "People and relationships", scores: { wolf: 2, bear: 2, orca: 2, lion: 2, dolphin: 2 } },
    ],
  },
  {
    id: 7,
    text: "I primarily recharge:",
    options: [
      { text: "Alone", scores: { owl: 2, raven: 2, tortoise: 2, hawk: 2, ant: 2, elephant: 2, bear: 1, lion: 1, bull: 2 } },
      { text: "With others", scores: { wolf: 3, orca: 3, dolphin: 3 } },
    ],
  },
  {
    id: 8,
    text: "I feel more comfortable with:",
    options: [
      { text: "Routine and predictability", scores: { owl: 2, elephant: 3, ant: 2, bear: 2, dolphin: 1, tortoise: 3 } },
      { text: "Change and variety", scores: { raven: 2, lion: 2, hawk: 2, orca: 1, wolf: 1, bull: 2 } },
    ],
  },
  {
    id: 9,
    text: "When I feel most like myself, I am usually:",
    options: [
      { text: "Building", scores: { ant: 3, owl: 1, elephant: 1, tortoise: 2 } },
      { text: "Protecting", scores: { bear: 3, wolf: 2 } },
      { text: "Exploring", scores: { raven: 2 } },
      { text: "Teaching", scores: { owl: 2, elephant: 3, wolf: 1, dolphin: 3 } },
      { text: "Creating", scores: { orca: 2, raven: 2 } },
      { text: "Competing", scores: { lion: 3, hawk: 3, bull: 2 } },
    ],
  },
  {
    id: 10,
    text: "When facing an important decision with incomplete information, I tend to:",
    options: [
      { text: "Decide quickly and correct course if needed", scores: { lion: 3, hawk: 2, bull: 2 } },
      { text: "Set a deadline, gather what I can, then act without missing the deadline", scores: { owl: 3, raven: 2, elephant: 1, tortoise: 1 } },
      { text: "Talk it through with the people most affected, decide together, and act", scores: { wolf: 3, orca: 3, dolphin: 2 } },
      { text: "Hold until I have enough confidence, then move decisively", scores: { bear: 3, elephant: 2, tortoise: 2 } },
      { text: "Map the risk of being wrong, then choose the safer path", scores: { raven: 2, owl: 2, ant: 2 } },
    ],
  },
  {
    id: 11,
    text: "My primary focus as a leader is:",
    options: [
      { text: "Keeping the team strong and loyal", scores: { wolf: 3, bear: 2 } },
      { text: "Helping each person around me grow", scores: { dolphin: 3, elephant: 1 } },
      { text: "Understanding the situation more deeply than anyone else, then giving the team a clear direction", scores: { owl: 2, raven: 2, hawk: 2 } },
      { text: "Inspiring people toward something bigger", scores: { orca: 2 } },
      { text: "Getting the thing built", scores: { ant: 3, lion: 1, tortoise: 2, bull: 2 } },
    ],
  },
  {
    id: 12,
    text: "When I am at my best, people experience me as:",
    options: [
      { text: "Decisive", scores: { lion: 3, hawk: 2, bull: 2 } },
      { text: "Wise", scores: { owl: 2, elephant: 3, raven: 2, tortoise: 1 } },
      { text: "Inspiring", scores: { orca: 1 } },
      { text: "Warm", scores: { wolf: 2, dolphin: 3, bear: 2 } },
      { text: "Resourceful", scores: { orca: 2, ant: 1 } },
    ],
  },
];

// ─── NARRATIVES ──────────────────────────────────────────────────────────────
const NARRATIVES = {
  "1-Take control":        "Under pressure, your instinct is to step forward and take control — you move toward the problem, not away from it.",
  "1-Pause and observe":   "When things get high-stakes, your first move is to pause and take stock before acting.",
  "1-Delegate":            "Under pressure, you focus on directing — getting the right people on the right pieces.",
  "1-Support others":      "When stress hits, you turn toward the people around you, steadying the team before the task.",
  "1-Withdraw to think":   "High-pressure moments send you inward — you need space to think before you can move.",
  "2-Logic":               "Your decisions are anchored in logic — you trust analysis over instinct.",
  "2-Intuition":           "You rely on intuition when it counts, reading the situation rather than running the numbers.",
  "3-The task or problem": "Your primary orientation is toward the work itself — solving the problem in front of you.",
  "3-The people and relationships": "Under pressure, you keep your focus on the people — the task matters, but the team matters more.",
  "4-From the front":      "You're most effective leading from the front, visible and directive.",
  "4-Alongside others":    "You lead best alongside people, not above them.",
  "4-Behind the scenes":   "Your natural mode is to work behind the scenes — building and enabling rather than directing.",
  "5-Independent":         "By default you operate independently, trusting your own read of the situation.",
  "5-Collaborative":       "Collaboration is your default — you think and work better with others in the room.",
  "6-Systems and processes": "You trust systems over people — a good process doesn't have bad days.",
  "6-People and relationships": "Your trust is grounded in relationships — you bet on people, not procedures.",
  "7-Alone":               "You recharge alone, which means your best thinking happens away from the group.",
  "7-With others":         "You draw energy from other people — solitude drains you, connection restores you.",
  "8-Routine and predictability": "You work best with structure and predictability — consistency lets you go deep.",
  "8-Change and variety":  "You thrive on change — routine dulls you, and variety sharpens your focus.",
  "9-Building":            "You feel most like yourself when you're building something — creating structure where there wasn't any.",
  "9-Protecting":          "You feel most alive when you're protecting something or someone — holding the line matters to you.",
  "9-Exploring":           "You're most yourself when you're exploring — finding what's around the next corner.",
  "9-Teaching":            "Teaching and developing others is when you're most in your element.",
  "9-Creating":            "You come alive when you're creating — bringing something new into existence.",
  "9-Competing":           "Competition brings out your best — you need something to push against.",
  "10-Act early and adjust as I go": "Faced with incomplete information, you'd rather move and adjust than wait for certainty.",
  "10-Gather more data before moving": "When the picture is unclear, you gather more information before committing.",
  "10-Test with a small experiment": "Your instinct is to test — run a small experiment before going all in.",
  "10-Wait until the path is clear": "You wait for clarity before acting — moving on incomplete information makes you uneasy.",
  "10-Seek consensus before deciding": "You bring others in before deciding — shared ownership matters as much as the decision itself.",
  "11-Keeping the team strong and loyal": "As a leader, your primary job is keeping the team tight and trusting each other.",
  "11-Helping each person around me grow": "Your deepest leadership satisfaction comes from watching the people around you grow.",
  "11-Understanding the situation more deeply than anyone else, then giving the team a clear direction": "You see deep comprehension as your edge — and your job is translating that into direction others can follow.",
  "11-Inspiring people toward something bigger": "You lead by connecting people to something larger than the immediate task.",
  "11-Getting the thing built": "Ultimately, you measure your leadership by what gets built — outcomes over optics.",
  "12-Decisive":           "At your best, people experience you as decisive — someone who ends uncertainty.",
  "12-Wise":               "At your best, people look to you for wisdom — depth and perspective over speed.",
  "12-Inspiring":          "People leave conversations with you more energized than when they arrived.",
  "12-Warm":               "What people remember about you is the warmth — the sense that you actually saw them.",
  "12-Resourceful":        "You're known for finding a way when others see a wall.",
};

function buildNarrative(archetypeKey, answers) {
  const pairs = QUESTIONS
    .map((q, i) => ({ qid: q.id, answer: answers[i] }))
    .filter(({ answer }) => (answer.scores[archetypeKey] || 0) > 0)
    .sort((a, b) => b.answer.scores[archetypeKey] - a.answer.scores[archetypeKey])
    .slice(0, 5);
  return pairs
    .map(({ qid, answer }) => NARRATIVES[`${qid}-${answer.text}`])
    .filter(Boolean)
    .join(" ");
}

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
  const primaryScore = sorted[0][1];
  const secondaryScore = sorted[1][1];
  const secondary = secondaryScore >= primaryScore * 0.6 ? sorted[1][0] : null;
  return { primary: sorted[0][0], secondary, scores };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Attribution() {
  return (
    <p style={{ textAlign: "center", color: "rgba(245,236,215,0.35)", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif", marginTop: "2rem", letterSpacing: "0.04em" }}>
      A little project by{" "}
      <a href="https://www.linkedin.com/in/jasonsosnovsky" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,236,215,0.55)", textDecoration: "underline" }}>
        Jason Sosnovsky
      </a>
    </p>
  );
}

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
            background: "linear-gradient(160deg, #1a1208 0%, #2d1f0a 40%, #1a2d1a 100%)", border: "none",
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
          12 questions to discover which animal archetype<br />explains how you lead at home, at work, and at play.
        </p>

        <div style={{ marginTop: "2.5rem", marginBottom: "2rem" }}>
          <p style={{ color: "#C8860A", fontSize: "16px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", textAlign: "center", marginBottom: "0.5rem" }}>
            The Archetypes
          </p>
          <p style={{ color: "rgba(245,236,215,0.5)", fontSize: "14px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", textAlign: "center", marginBottom: "1.5rem" }}>
            Which one are you?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.5rem", justifyItems: "center" }}>
            {Object.keys(ARCHETYPES).sort().map((key) => {
              const a = ARCHETYPES[key];
              return (
                <span
                  key={key}
                  onClick={() => setActiveArchetype(key)}
                  style={{ fontSize: "1.5rem", opacity: 1, cursor: "pointer", transition: "transform 0.2s ease", display: "inline-block" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
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

        <p style={{ marginTop: "1rem", color: "rgba(245,236,215,0.6)", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>
          Takes Just 5 Minutes
        </p>
      </div>
      {activeArchetype && <ArchetypeModal archetype={activeArchetype} onClose={() => setActiveArchetype(null)} />}
      <Attribution />
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

  function handleBack() {
    if (current === 0 || animating) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setAnswers(answers.slice(0, -1));
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
      setVisible(true);
      setAnimating(false);
    }, 400);
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

        <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {current > 0 ? (
            <button
              onClick={handleBack}
              style={{
                background: "rgba(245,236,215,0.04)",
                border: "none",
                color: "rgba(245,236,215,0.5)",
                fontSize: "0.9rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.875rem 2rem",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              ← Back
            </button>
          ) : <div />}
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              background: selected ? "linear-gradient(135deg, #C8860A, #8B5A1A)" : "rgba(245,236,215,0.04)",
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
  const [secondaryExpanded, setSecondaryExpanded] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  const { primary, secondary } = computeResult(answers);
  const p = ARCHETYPES[primary];
  const s = secondary ? ARCHETYPES[secondary] : null;

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
            { label: "Great Successes", text: p.at_best, accent: "#4A7C59" },
            { label: "Great Failures", text: p.at_worst, accent: "#8B4513" },
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
          <p style={{ color: "rgba(245,236,215,0.4)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Core Weaknesses</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {p.shadow.map((s, i) => (
              <span key={i} style={{ background: "linear-gradient(160deg, #1a1208 0%, #2d1f0a 40%, #1a2d1a 100%)", border: "1px solid rgba(245,236,215,0.15)", color: "rgba(245,236,215,0.75)", fontSize: "0.85rem", padding: "0.3rem 0.85rem", borderRadius: "20px" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {s && (
          <div style={{ background: "rgba(245,236,215,0.03)", border: `1px solid ${s.color}33`, borderRadius: "6px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{s.emoji}</span>
              <div>
                <p style={{ color: "rgba(245,236,215,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.15rem" }}>Secondary Archetype</p>
                <p style={{ color: "#F5ECD7", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", margin: 0 }}>
                  The {s.name} <span style={{ color: s.color, fontStyle: "italic" }}>— {s.tagline}</span>
                </p>
              </div>
            </div>
            <p style={{ color: "rgba(245,236,215,0.6)", lineHeight: 1.6, marginBottom: "1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
              {s.description.split(". ").slice(0, 2).join(". ") + "."}
            </p>

            {!secondaryExpanded && (
              <button onClick={() => setSecondaryExpanded(true)} style={{ background: "none", border: `1px solid ${s.color}55`, borderRadius: "4px", color: s.color, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.4rem 1rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Read More
              </button>
            )}

            {secondaryExpanded && (
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { label: "Great Successes", text: s.at_best, accent: "#4A7C59" },
                    { label: "Great Failures", text: s.at_worst, accent: "#8B4513" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "rgba(245,236,215,0.04)", border: `1px solid ${item.accent}44`, borderRadius: "6px", padding: "1.25rem" }}>
                      <p style={{ color: item.accent, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</p>
                      <p style={{ color: "rgba(245,236,215,0.75)", lineHeight: 1.6, fontSize: "0.95rem", margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>{item.text}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(245,236,215,0.03)", border: "1px solid rgba(245,236,215,0.08)", borderRadius: "6px", padding: "1.25rem" }}>
                  <p style={{ color: "rgba(200,134,10,0.7)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Core Strengths</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {s.strengths.map((str, i) => (
                      <span key={i} style={{ background: `${s.color}22`, border: `1px solid ${s.color}44`, color: s.color, fontSize: "0.85rem", padding: "0.3rem 0.85rem", borderRadius: "20px" }}>{str}</span>
                    ))}
                  </div>
                </div>
                <div style={{ background: "rgba(245,236,215,0.02)", border: "1px solid rgba(245,236,215,0.06)", borderRadius: "6px", padding: "1.25rem" }}>
                  <p style={{ color: "rgba(245,236,215,0.4)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Core Weaknesses</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {s.shadow.map((sw, i) => (
                      <span key={i} style={{ background: "linear-gradient(160deg, #1a1208 0%, #2d1f0a 40%, #1a2d1a 100%)", border: "1px solid rgba(245,236,215,0.15)", color: "rgba(245,236,215,0.75)", fontSize: "0.85rem", padding: "0.3rem 0.85rem", borderRadius: "20px" }}>{sw}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setSecondaryExpanded(false)} style={{ background: "none", border: `1px solid ${s.color}33`, borderRadius: "4px", color: "rgba(245,236,215,0.4)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.4rem 1rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", alignSelf: "flex-start" }}>
                  Show Less
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ background: "rgba(245,236,215,0.02)", border: "1px solid rgba(245,236,215,0.06)", borderRadius: "6px", padding: "1.5rem", marginBottom: "2.5rem" }}>
          <p style={{ color: "rgba(200,134,10,0.7)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Some Famous {p.plural}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {p.famous.map((person, i) => (
              <div key={i}>
                <p style={{ color: p.color, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", margin: "0 0 0.3rem" }}>{person.name}<span style={{ color: "rgba(245,236,215,0.45)", fontStyle: "normal", fontSize: "0.95rem" }}>, {person.title}</span></p>
                <p style={{ color: "rgba(245,236,215,0.6)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>{person.reason}</p>
              </div>
            ))}
          </div>
        </div>


        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <button
            onClick={() => {
              const vowels = ["A","E","I","O","U"];
              const article = vowels.includes(p.name[0]) ? "an" : "a";
              const archetype = s ? `${p.name}-${s.name}` : p.name;
              const message = `What's your spirit animal? I'm ${article} ${archetype}.`;
              const url = window.location.origin;
              const fullText = `${message}\n${url}`;
              track("share", { archetype });
              if (navigator.share) {
                navigator.share({ text: fullText }).catch(() => {});
              } else {
                window.location.href = `mailto:?body=${encodeURIComponent(fullText)}`;
              }
            }}
            style={{
              background: `${p.color}22`,
              border: `1px solid ${p.color}55`,
              borderRadius: "4px",
              color: p.color,
              fontSize: "0.8rem",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.65rem 1.5rem",
              cursor: "pointer",
            }}
          >
            Share the Test
          </button>
          <button
            onClick={onRetake}
            style={{
              background: "linear-gradient(160deg, #1a1208 0%, #2d1f0a 40%, #1a2d1a 100%)",
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
        <Attribution />
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
        body { background: #1a1208; min-height: 100vh; }
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
