
const { useState, useEffect, useRef } = React;

const MAIL =
  "mailto:Sunayanailake807@gmail.com?subject=" +
  encodeURIComponent("Collaboration with Sunayana 21");

const IG = "https://www.instagram.com/sunayana21official/";
const YT = "https://yt.openinapp.co/8cn6z";
const EMAIL = "Sunayanailake807@gmail.com";


/* REVEAL ANIMATION */

function Reveal({ children, className = "" }) {
  const r = useRef();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        o.disconnect();
      }
    }, { threshold: .15 });

    o.observe(r.current);
    return () => o.disconnect();
  }, []);

  return (
    <div
      ref={r}
      className={"rise " + (on ? "on " : "") + className}
    >
      {children}
    </div>
  );
}


/* ANIMATED COUNTER */

function Count({ to, suffix = "", dec = 0 }) {
  const r = useRef();
  const [n, setN] = useState(0);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;

      o.disconnect();
      let s = null;

      const f = t => {
        s = s || t;
        const p = Math.min((t - s) / 1400, 1);

        setN(
          (to * (1 - Math.pow(1 - p, 3))).toFixed(dec)
        );

        if (p < 1) requestAnimationFrame(f);
      };

      requestAnimationFrame(f);
    });

    o.observe(r.current);
    return () => o.disconnect();
  }, [to]);

  return <span ref={r}>{n}{suffix}</span>;
}


/* DARK MODE */

function ThemeToggle() {
  const [t, setT] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      if (s) return s;
    } catch (e) {}

    return window.matchMedia &&
      matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t);

    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
  }, [t]);

  return (
    <button
      onClick={() => setT(t === "dark" ? "light" : "dark")}
      aria-label="Switch light or dark mode"
      title={t === "dark" ? "Light mode" : "Dark mode"}
      className="card w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center text-base sm:text-lg shadow"
    >
      {t === "dark" ? "☀️" : "🌙"}
    </button>
  );
}


/* NAVIGATION */

function Nav() {
  return (
    <header
      className="sticky top-0 z-20 backdrop-blur"
      style={{
        background: "color-mix(in srgb,var(--bg) 85%,transparent)"
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-2 sm:py-3 flex items-center justify-between">
        <a href="#top" className="h font-extrabold text-lg sm:text-xl gt">
          Sunayana 21
        </a>

        <nav className="hidden md:flex gap-7 text-sm font-semibold">
          <a href="#showcase">Showcase</a>
          <a href="#chai">Ram Ram Mandali</a>
          <a href="#lab">Campaign Lab</a>
          <a href="#enquiry">Collab</a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={MAIL}
            className="grad text-white h font-bold px-4 py-2 rounded-full text-sm shadow"
          >
            Collab
          </a>
        </div>
      </div>

      <div className="md:hidden flex gap-5 overflow-x-auto px-5 pb-2 text-sm font-semibold whitespace-nowrap">
        <a href="#showcase">Showcase</a>
        <a href="#chai">Ram Ram Mandali</a>
        <a href="#lab">Campaign Lab</a>
        <a href="#enquiry">Collab</a>
      </div>
    </header>
  );
}


/* HERO SECTION */

function Hero() {
  const [lg, setLg] = useState("en");

  const INTRO = {
    en: "Hi, I’m Sunayana, a Kolhapur-based digital creator and influencer. I share festive looks, shop tours and everyday moments with 183K followers on Instagram and 50K on YouTube.",
    mr: "नमस्कार, मी सुनयना, कोल्हापूरची डिजिटल क्रिएटर आणि इन्फ्लुएन्सर. इन्स्टाग्रामवर 183K आणि यूट्यूबवर 50K फॉलोअर्ससोबत मी फेस्टिव्ह लूक्स, शॉप टूर्स आणि रोजचे क्षण शेअर करते."
  };

  return (
    <section
      id="top"
      className="hero-bg relative overflow-hidden min-h-[calc(100svh-100px)] md:min-h-[calc(100svh-64px)] flex items-center"
    >
      <div className="absolute -top-28 -left-24 w-96 h-96 rounded-full grad opacity-25 blur-3xl"></div>

      <div className="max-w-6xl w-full mx-auto px-5 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center relative">
        <div>
          <span className="inline-block card rounded-full px-4 py-1 text-sm font-semibold mb-5">
            ✨ Digital Creator & Influencer · Kolhapur
          </span>

          <h1 className="h font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
            Sunayana <span className="gt">21</span>
          </h1>

          <div className="h font-bold text-base sm:text-xl md:text-2xl mt-2">
            Digital Creator & Influencer · कोल्हापूरची मैना
          </div>

          <p className="mute text-lg mt-5 max-w-md">
            {INTRO[lg]}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href={IG} className="grad text-white h font-bold px-6 py-3 rounded-full shadow-lg">
              📸 Instagram
            </a>

            <a
              href={YT}
              className="h font-bold px-6 py-3 rounded-full shadow-lg text-white"
              style={{ background: "#e11d2e" }}
            >
              ▶ YouTube
            </a>

            <a
              href="#enquiry"
              className="card h font-bold px-6 py-3 rounded-full border"
              style={{ borderColor: "var(--pk)" }}
            >
              Collaborate
            </a>

            <button
              onClick={() => setLg(lg === "en" ? "mr" : "en")}
              className="card h font-bold px-4 py-3 rounded-full"
            >
              {lg === "en" ? "मराठी" : "English"}
            </button>
          </div>
        </div>

        <div className="grid place-items-center h-64 sm:h-80 md:h-[30rem] xl:h-[36rem] relative">
          <div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-[26rem] md:h-[26rem] xl:w-[32rem] xl:h-[32rem] rounded-full grad"></div>

          <div className="relative float card rounded-[2rem] w-36 sm:w-52 md:w-60 xl:w-72 p-5 text-center shadow-2xl rotate-3">
            
            <img
                src="./sunayana-logo.png"
                alt="Sunayana 21 logo"
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover shadow-lg"
            />


            <div className="h font-bold text-xl mt-3">Sunayana 21</div>
            <div className="mute text-sm">723 posts · 183K followers</div>

            <div
              className="mt-3 text-xs font-semibold rounded-full px-3 py-1 inline-block"
              style={{ background: "var(--bg)" }}
            >
              ▶ 50K on YouTube
            </div>
          </div>

          <span className="card absolute left-0 bottom-6 rounded-2xl px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base shadow-lg h font-bold -rotate-6">
            🪔 Diwali series
          </span>

          <span className="card absolute right-0 top-8 rounded-2xl px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base shadow-lg h font-bold rotate-6">
            👁 447K reel
          </span>
        </div>
      </div>
    </section>
  );
}


/* STATISTICS */

function Numbers() {
  const s = [
    [183, "K", "Instagram followers", 0],
    [50, "K", "YouTube subscribers", 0],
    [90, "K", "Avg. views per reel*", 0],
    [73, "K", "Median views per reel*", 0]
  ];

  return (
    <section id="numbers" className="grad text-white">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {s.map(([n, x, l, d]) => (
          <div key={l}>
            <div className="h font-extrabold text-4xl md:text-5xl">
              <Count to={n} suffix={x} dec={d} />
            </div>
            <div className="font-semibold text-sm mt-1">{l}</div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs pb-4 opacity-90 px-4">
        *From 17 recent reels visible on her profile. Reels average about half her follower count in views.
      </p>
    </section>
  );
}


/* REEL VIEWS CHART */

const REELS = [
  ["Behind the scenes", 447],
  ["Festive look", 120],
  ["Selfie vlog", 116],
  ["Kitchen story", 102],
  ["Casual look", 101],
  ["Shop tour", 94.7],
  ["Day vlog", 93.8],
  ["Krishna look", 83],
  ["Diwali offer", 72.6],
  ["Lehariya look", 49.8],
  ["Soft look", 48.1],
  ["Diwali: iPhone", 44.9],
  ["Krishna shringar", 40.3],
  ["Diwali: textile", 35.9]
];

function Chart() {
  const max = 447;

  return (
    <Reveal>
      <div className="card rounded-3xl p-6 shadow-md">
        <h3 className="h font-bold text-xl">Views on recent reels (K)</h3>
        <p className="mute text-sm">
          5 of 17 reels crossed 100K. One broke 440K.
        </p>

        <div className="flex items-end gap-2 h-56 mt-5 overflow-x-auto">
          {REELS.map(([n, v]) => (
            <div
              key={n}
              className="flex flex-col items-center justify-end shrink-0 w-12 h-full"
              title={n}
            >
              <span className="text-[10px] font-semibold mb-1">{v}</span>
              <div
                className="bar grad w-8 rounded-t-lg"
                style={{ height: Math.max(v / max * 100, 5) + "%" }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}


/* CONTENT PILLARS */

function Content() {
  const p = [
    ["🪔", "Festive & traditional looks", "Maharashtrian saree, nath, Krishna shringar, Lehariya kurtis. Her top-performing look reels sit between 83K and 120K views."],
    ["🛍️", "Local shop promotions", "Diwali Offer series for a textile store and an iPhone shop. Hometown brands get real, trusted reach."],
    ["🎬", "Behind the scenes", "The 447K reel shows her biggest strength: showing the real people and work behind a brand."],
    ["👨‍👩‍👧", "Family & personal", "Highlights like Family, बाबा and public प्रेम build the trust that makes followers act."]
  ];

  return (
    <section id="content" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <h2 className="h font-extrabold text-4xl md:text-5xl">
          What <span className="gt">works</span>
        </h2>
        <p className="mute mt-2">Four content pillars, from her profile.</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="grid gap-4">
          {p.map(([e, t, d]) => (
            <Reveal key={t}>
              <div className="card rounded-3xl p-5 flex gap-4 shadow-md hover:-translate-y-1 transition">
                <div className="text-4xl">{e}</div>
                <div>
                  <h3 className="h font-bold text-lg">{t}</h3>
                  <p className="mute text-sm mt-1">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Chart />
      </div>
    </section>
  );
}


/* BRAND BENEFITS */

function Brands() {
  const w = [
    ["📍", "Local, loyal audience", "A Kolhapur and Maharashtra creator whose followers shop in the same markets."],
    ["📈", "Consistent reach", "Median reel of about 73K views, with spikes above 400K."],
    ["🧵", "Series storytelling", "Multi-part campaigns like Diwali Part 1, 2 and 3 keep viewers coming back."],
    ["🎙️", "Marathi first", "Native language content builds a warmth that generic ads can’t."]
  ];

  return (
    <section id="brands" className="py-16" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="h font-extrabold text-4xl md:text-5xl">
            Why <span className="gt">brands</span> pick her
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {w.map(([e, t, d]) => (
            <Reveal key={t}>
              <div
                className="rounded-3xl p-6 border h-full"
                style={{
                  borderColor: "color-mix(in srgb,var(--pk) 25%,transparent)"
                }}
              >
                <div className="text-4xl">{e}</div>
                <h3 className="h font-bold text-lg mt-3">{t}</h3>
                <p className="mute text-sm mt-2">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* COLLABORATION CTA */

function Work() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-5 py-16">
      <div className="grad text-white rounded-[2.5rem] p-10 md:p-14 text-center">
        <h3 className="h font-extrabold text-3xl md:text-5xl">
          चला, एकत्र काम करूया!
        </h3>

        <p className="mt-3 font-semibold">
          For collaborations, write to Sunayanailake807@gmail.com
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <a
            href={MAIL}
            className="h font-bold px-7 py-3 rounded-full bg-white"
            style={{ color: "#d61f69" }}
          >
            Email her
          </a>

          <a
            href={IG}
            className="h font-bold px-7 py-3 rounded-full border-2 border-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}


/* PROFILE DNA */

const MIX = [
  ["Festive & traditional looks", 7, "#e11d74", "Saree, nath, Krishna shringar and Lehariya kurtis. Her most visual, most re-watched pillar."],
  ["Shop & brand promos", 5, "#ff8a1f", "Diwali Offer Part 1, 2, 3 and shop tours. Proof she already sells for local stores."],
  ["Vlogs & personal", 4, "#ffc928", "Selfie stories, kitchen moments and casual days. This is where followers feel close to her."],
  ["Behind the scenes", 1, "#7c3aed", "One reel, 447K views. The least-used format with the highest upside."]
];

function DNA() {
  const [i, setI] = useState(0);
  const m = MIX[i];

  return (
    <section id="dna" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <h2 className="h font-extrabold text-4xl md:text-5xl">
          Profile <span className="gt">DNA</span>
        </h2>
        <p className="mute mt-2">
          Content mix across 17 recent reels (my estimate from thumbnails). Tap a colour.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card rounded-3xl p-6 shadow-md">
          <div className="flex h-14 rounded-2xl overflow-hidden">
            {MIX.map(([n, c, col], k) => (
              <button
                key={n}
                onClick={() => setI(k)}
                style={{
                  width: c / 17 * 100 + "%",
                  background: col,
                  opacity: i === k ? 1 : .45
                }}
                className="transition"
                aria-label={n}
              ></button>
            ))}
          </div>

          <h3 className="h font-bold text-2xl mt-5" style={{ color: m[2] }}>
            {m[0]}
          </h3>

          <div className="h font-extrabold text-4xl">
            {m[1]} <span className="text-base mute font-semibold">of 17 reels</span>
          </div>

          <p className="mute mt-2">{m[3]}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ["373 : 1", "Followers to following. She follows only 491 accounts, so her audience is earned."],
            ["4", "Story highlights (Family, public प्रेम, बाबा, it’s me) that build personal trust."],
            ["723", "Posts published. Consistent, long-term presence."],
            ["2 tools", "Instagram plus a 50K YouTube channel, so campaigns can travel across both."]
          ].map(([a, b]) => (
            <div key={a} className="card rounded-3xl p-5 shadow-md">
              <div className="h font-extrabold text-3xl gt">{a}</div>
              <p className="mute text-sm mt-1">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* TOP REELS */

function TopReels() {
  const t = [
    ["Behind the scenes", 447],
    ["Festive look", 120],
    ["Selfie vlog", 116],
    ["Kitchen story", 102],
    ["Casual look", 101]
  ];

  return (
    <section id="top-reels" className="py-16" style={{ background: "var(--card)" }}>
      <div className="max-w-4xl mx-auto px-5">
        <Reveal>
          <h2 className="h font-extrabold text-4xl md:text-5xl">
            Top <span className="gt">5</span> reels
          </h2>
          <p className="mute mt-2">
            Views as a share of her 183K followers. Above 100% means the reel reached beyond her followers.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4">
          {t.map(([n, v], k) => {
            const p = Math.round(v / 183 * 100);

            return (
              <Reveal key={n}>
                <div className="flex items-center gap-4">
                  <div className="h font-extrabold text-3xl w-8 gt">
                    {k + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between font-semibold">
                      <span>{n}</span>
                      <span>{v}K · {p}%</span>
                    </div>

                    <div className="h-3 rounded-full mt-1" style={{ background: "var(--bg)" }}>
                      <div
                        className="grad h-3 rounded-full"
                        style={{ width: Math.min(p / 244 * 100, 100) + "%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 font-semibold pk">
          Her best reel reached about 2.4× her follower count.
        </p>
      </div>
    </section>
  );
}


/* CAMPAIGN LAB */

const FM = [
  "A 3-part series",
  "A behind-the-scenes day",
  "A shop tour with a twist",
  "A festive look transformation",
  "A day-in-my-life vlog",
  "A before and after reveal"
];

const HK = [
  "in a Kolhapur market",
  "with her family reacting",
  "in a saree and nath",
  "with a limited-time offer",
  "with a Marathi voiceover",
  "shot in one continuous take"
];

function Lab() {
  const [n, setN] = useState(3);
  const [mode, setMode] = useState(73);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const v = n * mode;
  const f = x => x >= 1000
    ? (x / 1000).toFixed(2) + "M"
    : x + "K";

  const roll = () => {
    setA(Math.floor(Math.random() * FM.length));
    setB(Math.floor(Math.random() * HK.length));
  };

  return (
    <section id="lab" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <h2 className="h font-extrabold text-4xl md:text-5xl">
          Campaign <span className="gt">Lab</span>
        </h2>
        <p className="mute mt-2">Two interactive tools for brands.</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card rounded-3xl p-7 shadow-md">
          <h3 className="h font-bold text-2xl">Reach estimator</h3>

          <label className="block mt-4 font-semibold">
            Reels in campaign: {n}
          </label>

          <input
            type="range"
            min="1"
            max="8"
            value={n}
            onChange={e => setN(+e.target.value)}
            className="w-full accent-pink-600"
          />

          <div className="flex gap-2 mt-4">
            {[[73, "Conservative"], [90, "Typical"]].map(([x, l]) => (
              <button
                key={x}
                onClick={() => setMode(x)}
                className={
                  "h font-bold px-4 py-2 rounded-full " +
                  (mode === x ? "grad text-white" : "")
                }
                style={mode === x ? {} : { background: "var(--bg)" }}
              >
                {l} ({x}K)
              </button>
            ))}
          </div>

          <div className="h font-extrabold text-5xl gt mt-6">{f(v)}</div>

          <p className="mute text-sm">
            Estimated total views, based on her median and average reel views. Real results vary.
          </p>
        </div>

        <div className="card rounded-3xl p-7 shadow-md flex flex-col">
          <h3 className="h font-bold text-2xl">Reel idea generator</h3>
          <p className="mute mt-2">
            Mixes formats that already work on her profile.
          </p>

          <div className="flex-1 grid place-items-center text-center py-6">
            <p className="h font-bold text-2xl md:text-3xl">
              <span className="gt">{FM[a]}</span> {HK[b]}
            </p>
          </div>

          <button
            onClick={roll}
            className="grad text-white h font-bold py-3 rounded-full"
          >
            🎲 Surprise me
          </button>
        </div>
      </div>
    </section>
  );
}


/* SHOWCASE HELPERS */

const SAVED_IG = [];
const SAVED_YT = [];

const ADMIN = typeof location !== "undefined" && location.hash === "#edit";

const igId = u =>
  (u.match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([\w-]+)/) || [])[1];

const ytId = u =>
  (u.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/) || [])[1];

function useSaved(k, d) {
  const [v, setV] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(k) || "null") || d;
    } catch (e) {
      return d;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }, [v]);

  return [v, setV];
}

const GAL = [
  ["Behind the scenes", "447K", "Brand", "from-red-500 to-orange-400"],
  ["Selfie vlog", "120K", "Lifestyle", "from-sky-600 to-teal-600"],
  ["Saree look", "116K", "Traditional", "from-pink-600 to-amber-400"],
  ["Kitchen story", "102K", "Lifestyle", "from-amber-700 to-orange-500"],
  ["Casual look", "101K", "Lifestyle", "from-violet-500 to-pink-400"],
  ["Shop tour", "94.7K", "Brand", "from-orange-600 to-red-400"],
  ["Day vlog", "93.8K", "Lifestyle", "from-cyan-600 to-blue-600"],
  ["Krishna look", "83K", "Traditional", "from-fuchsia-600 to-orange-400"],
  ["Diwali offer", "72.6K", "Brand", "from-rose-600 to-orange-500"],
  ["Krishna shringar", "40.3K", "Traditional", "from-orange-600 to-red-600"]
];


/* CONTENT SHOWCASE */

function Showcase() {
  const [f, setF] = useState("All");

  const [ids, setIds] = useSaved(
    "ig",
    SAVED_IG.map(x => igId(x) || x)
  );

  const [yt, setYt] = useSaved(
    "yt",
    SAVED_YT.map(x => ytId(x) || x)
  );

  const [lk, setLk] = useState("");
  const [msg, setMsg] = useState("");

  const add = () => {
    const i = igId(lk);
    const y = ytId(lk);

    if (i) {
      if (!ids.includes(i)) setIds([...ids, i]);
      setLk("");
      setMsg("");
    } else if (y) {
      if (!yt.includes(y)) setYt([...yt, y]);
      setLk("");
      setMsg("");
    } else {
      setMsg("Link not recognised. Use a public Instagram reel link or a YouTube link.");
    }
  };

  const list = GAL.filter(g => f === "All" || g[2] === f);

  return (
    <section id="showcase" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <h2 className="h font-extrabold text-4xl md:text-5xl">
          Content <span className="gt">showcase</span>
        </h2>

        <p className="mute mt-2">
          Her latest reels and videos. Tap any card to open Instagram.
        </p>

        <div className={"card rounded-3xl p-5 mt-6 shadow-md " + (ADMIN ? "" : "hidden")}>
          <div className="h font-bold text-lg">
            ➕ Add her real reels or videos
          </div>

          <p className="mute text-sm">
            On Instagram open a reel, tap the three dots, choose Copy link, then paste it here. YouTube links work too.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <input
              value={lk}
              onChange={e => setLk(e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
              className="flex-1 rounded-xl px-4 py-3 border"
              style={{
                background: "var(--bg)",
                borderColor: "color-mix(in srgb,var(--pk) 25%,transparent)"
              }}
            />

            <button
              onClick={add}
              className="btn grad text-white h font-bold px-6 py-3 rounded-full"
            >
              Add
            </button>
          </div>

          {msg && <p className="text-sm mt-2 pk">{msg}</p>}
        </div>

        {ids.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {ids.map(id => (
              <div key={id} className="relative">
                <iframe
                  src={"https://www.instagram.com/reel/" + id + "/embed"}
                  title="Sunayana 21 reel"
                  loading="lazy"
                  allowFullScreen
                  scrolling="no"
                  className="w-full rounded-3xl bg-white shadow-lg"
                  style={{ height: 600, border: 0 }}
                ></iframe>

                <button
                  onClick={() => setIds(ids.filter(x => x !== id))}
                  aria-label="Remove reel"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <h3 className="h font-bold text-xl mt-10">Browse by theme</h3>

        <div className="flex flex-wrap gap-2 mt-5">
          {["All", "Traditional", "Lifestyle", "Brand"].map(t => (
            <button
              key={t}
              onClick={() => setF(t)}
              className={
                "h font-bold px-5 py-2 rounded-full " +
                (f === t ? "grad text-white shadow" : "card")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {list.map(([t, v, c, g]) => (
          <a
            key={t}
            href={IG}
            className={"aspect-[9/16] rounded-3xl bg-gradient-to-br " + g + " p-4 flex flex-col justify-between text-white shadow-lg hover:scale-105 transition"}
          >
            <span className="text-xs font-bold bg-black/25 rounded-full px-3 py-1 self-start">
              {c}
            </span>

            <div>
              <div className="text-3xl">▶</div>
              <div className="h font-bold text-lg leading-tight">{t}</div>
              <div className="text-sm opacity-90">👁 {v}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="card rounded-3xl p-7 mt-10 shadow-md grid md:grid-cols-4 gap-5 items-center">
        <div className="md:col-span-1">
          <div className="h font-extrabold text-4xl" style={{ color: "#e11d2e" }}>
            50K
          </div>

          <div className="font-semibold">YouTube subscribers</div>

          <a
            href={YT}
            className="inline-block mt-3 h font-bold px-5 py-2 rounded-full text-white"
            style={{ background: "#e11d2e" }}
          >
            Subscribe
          </a>
        </div>

        {yt.length
          ? yt.slice(0, 3).map(id => (
              <iframe
                key={id}
                className="w-full aspect-video rounded-2xl"
                src={"https://www.youtube-nocookie.com/embed/" + id}
                title="Sunayana 21 video"
                loading="lazy"
                allowFullScreen
              ></iframe>
            ))
          : [1, 2, 3].map(n => (
              <a
                key={n}
                href={YT}
                className="rounded-2xl aspect-video grid place-items-center text-center p-3 hover:scale-105 transition"
                style={{ background: "var(--bg)" }}
              >
                <div>
                  <div className="text-4xl" style={{ color: "#e11d2e" }}>▶</div>
                  <div className="text-sm font-semibold">Watch on YouTube</div>
                  <div className="text-xs mute">Open her channel</div>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}


/* COLLABORATION FORM */

const FIT = {
  "Fashion & Retail": "A festive Diwali-style series. Her Diwali shop reels drew 36K to 45K views each.",
  "Food & Cafe": "A behind-the-scenes day. Her behind-the-scenes reel reached 447K views.",
  "Electronics": "A shop tour like her iPhone store reel, which got 44.9K views.",
  "Jewellery & Beauty": "A traditional look reel. Her saree and Krishna looks reached 83K to 116K views.",
  "Other": "A custom idea. Tell her about your brand."
};

function Enquiry() {
  const [d, setD] = useState({
    name: "",
    brand: "",
    cat: "Fashion & Retail",
    types: ["Instagram Reel"],
    msg: ""
  });

  const [cp, setCp] = useState(false);

  const set = (k, v) => setD({ ...d, [k]: v });

  const tog = t => set(
    "types",
    d.types.includes(t)
      ? d.types.filter(x => x !== t)
      : [...d.types, t]
  );

  const body =
    "Hi Sunayana,\n\nI’m " +
    (d.name || "[your name]") +
    " from " +
    (d.brand || "[brand]") +
    " (" + d.cat + ").\n" +
    "We would like to collaborate on: " +
    (d.types.join(", ") || "[format]") +
    ".\n\n" +
    (d.msg || "[tell her about your idea]") +
    "\n\nThank you!";

  const mail =
    "mailto:" + EMAIL +
    "?subject=" +
    encodeURIComponent("Collaboration enquiry: " + (d.brand || "Brand")) +
    "&body=" +
    encodeURIComponent(body);

  const copy = () => {
    try {
      navigator.clipboard.writeText(EMAIL);
      setCp(true);
      setTimeout(() => setCp(false), 1800);
    } catch (e) {}
  };

  const inp = "w-full rounded-xl px-4 py-3 border";

  const st = {
    background: "var(--bg)",
    borderColor: "color-mix(in srgb,var(--pk) 25%,transparent)"
  };

  return (
    <section id="enquiry" className="py-16" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <h2 className="h font-extrabold text-4xl md:text-5xl">
            Brand <span className="gt">collaborations</span>
          </h2>

          <p className="mute mt-2">
            Fill this in and your email is written for you. No forms to wait on.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="grid gap-4">
            <input
              className={inp}
              style={st}
              placeholder="Your name"
              value={d.name}
              onChange={e => set("name", e.target.value)}
            />

            <input
              className={inp}
              style={st}
              placeholder="Brand or shop name"
              value={d.brand}
              onChange={e => set("brand", e.target.value)}
            />

            <select
              className={inp}
              style={st}
              value={d.cat}
              onChange={e => set("cat", e.target.value)}
            >
              {Object.keys(FIT).map(k => (
                <option key={k}>{k}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {["Instagram Reel", "Reel series", "Shop visit", "YouTube video"].map(t => (
                <button
                  key={t}
                  onClick={() => tog(t)}
                  className={
                    "h font-bold px-4 py-2 rounded-full " +
                    (d.types.includes(t) ? "grad text-white" : "")
                  }
                  style={d.types.includes(t) ? {} : { background: "var(--bg)" }}
                >
                  {t}
                </button>
              ))}
            </div>

            <textarea
              className={inp}
              style={st}
              rows="3"
              placeholder="Your idea or message"
              value={d.msg}
              onChange={e => set("msg", e.target.value)}
            ></textarea>

            <div className="rounded-2xl p-4 text-sm" style={{ background: "var(--bg)" }}>
              <b className="pk">Best fit for you:</b> {FIT[d.cat]}
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className="rounded-3xl p-6 border flex-1 whitespace-pre-line text-sm"
              style={st}
            >
              <div className="font-bold mb-2 pk">Email preview</div>
              {body}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={mail}
                className="grad text-white h font-bold px-6 py-3 rounded-full shadow-lg"
              >
                ✉ Send enquiry
              </a>

              <a
                href={"mailto:" + EMAIL}
                className="h font-bold px-6 py-3 rounded-full border"
                style={{ borderColor: "var(--pk)" }}
              >
                Email directly
              </a>

              <button
                onClick={copy}
                className="h font-bold px-5 py-3 rounded-full"
                style={{ background: "var(--bg)" }}
              >
                {cp ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* RAM RAM MANDALI */

function Shop() {
  const WA =
    "https://wa.me/917264894308?text=" +
    encodeURIComponent("राम राम! I found you through Sunayana 21’s website.");

  const steps = [
    ["📱", "A 183K audience", "Built through reels, festive looks and local shop stories."],
    ["☕", "Her own brand", "She started Ram Ram Mandali, a chai and nashta shop."],
    ["📣", "A brand page of its own", "@ramrammandali09 now runs its own page and takes paid promotions."]
  ];

  const items = [
    ["🍵", "चहा", "Chai made fresh in big steel pots"],
    ["🥐", "नाश्ता", "Cream rolls, biscuits and more"],
    ["🎨", "Rangoli with the name", "A hand-made rangoli of the shop name"]
  ];

  return (
    <section id="chai" className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <h2 className="h font-extrabold text-4xl md:text-5xl">
          Founder of <span className="gt">Ram Ram Mandali</span>
        </h2>
        <p className="mute mt-2">
          She isn’t only a creator. She started her own brand.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-5 gap-6 mt-8">
        <Reveal className="md:col-span-2">
          <div
            className="rounded-[2rem] p-8 text-center shadow-xl h-full flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#ffc928,#f26a1b)",
              color: "#5a2205"
            }}
          >
            <div
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full grid place-items-center h font-extrabold text-xl sm:text-3xl leading-tight"
              style={{
                background: "#f26a1b",
                color: "#fff",
                border: "6px solid #ffe36b"
              }}
            >
              राम<br />राम<br />मंडळी
            </div>

            <div className="h font-bold text-2xl mt-5">चहा आणि नाश्ता</div>
            <div className="font-semibold">Chai & nashta</div>

            <div className="flex gap-6 mt-5 h font-extrabold text-xl">
              <div>
                690
                <div className="text-xs font-semibold">followers</div>
              </div>
              <div>@ramrammandali09</div>
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-3 grid gap-4">
          {items.map(([e, t, d]) => (
            <Reveal key={t}>
              <div className="card rounded-3xl p-5 flex gap-4 items-center shadow-md hover:-translate-y-1 transition">
                <div className="text-4xl">{e}</div>
                <div>
                  <div className="h font-bold text-lg">{t}</div>
                  <div className="mute text-sm">{d}</div>
                </div>
              </div>
            </Reveal>
          ))}

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/ramrammandali09/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn grad text-white h font-bold px-6 py-3 rounded-full shadow-lg"
            >
              📸 Visit shop page
            </a>

            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn h font-bold px-6 py-3 rounded-full text-white shadow-lg"
              style={{ background: "#16a34a" }}
            >
              💬 WhatsApp the shop
            </a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {steps.map(([e, t, d], k) => (
          <Reveal key={t}>
            <div
              className="rounded-3xl p-6 border h-full relative"
              style={{
                borderColor: "color-mix(in srgb,var(--pk) 25%,transparent)"
              }}
            >
              <div className="absolute -top-3 -left-3 grad text-white h font-bold w-9 h-9 rounded-full grid place-items-center">
                {k + 1}
              </div>

              <div className="text-3xl">{e}</div>
              <h3 className="h font-bold text-lg mt-2">{t}</h3>
              <p className="mute text-sm mt-1">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


/* SCROLL PROGRESS BAR */

function Progress() {
  const r = useRef();

  useEffect(() => {
    let q = false;

    const u = () => {
      q = false;

      const h = document.documentElement;
      const m = h.scrollHeight - h.clientHeight;

      if (r.current) {
        r.current.style.transform =
          "scaleX(" + (m > 0 ? h.scrollTop / m : 0) + ")";
      }
    };

    const f = () => {
      if (!q) {
        q = true;
        requestAnimationFrame(u);
      }
    };

    window.addEventListener("scroll", f, { passive: true });

    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div
      ref={r}
      className="pbar grad fixed top-0 left-0 w-full h-1 z-50"
    ></div>
  );
}


/* FOOTER */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <Reveal>
          <div className="site-footer__panel grad text-white rounded-[2rem] p-7 md:p-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="h font-extrabold text-3xl md:text-4xl">
                  Stay connected with <span className="text-white">Sunayana 21</span>
                </div>
                <p className="mt-2 font-semibold opacity-90">
                  Festive looks, local stories and brand collaborations from Kolhapur.
                </p>
              </div>

              <div className="site-footer__actions flex flex-wrap gap-3 md:justify-end">
                <a
                  href={IG}
                  className="h font-bold px-5 py-3 rounded-full bg-white"
                  style={{ color: "var(--pk)" }}
                >
                  Instagram
                </a>
                <a
                  href={YT}
                  className="h font-bold px-5 py-3 rounded-full border-2 border-white"
                >
                  YouTube
                </a>
                <a
                  href="#top"
                  className="h font-bold px-5 py-3 rounded-full"
                  style={{ background: "rgba(255,255,255,.18)" }}
                >
                  Back to top
                </a>
              </div>
            </div>

            <div className="site-footer__bottom flex flex-wrap justify-between gap-3 mt-8 pt-5 border-t border-white/30 text-sm font-semibold opacity-90">
              <span>© Sunayana 21 · कोल्हापूरची मैना</span>
              <span>Owner of Ram Ram Mandali</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}


/* MAIN APP */

function App() {
  return (
    <>
      <Progress />
      <Nav />
      <Hero />
      <Numbers />
      <Showcase />
      <Shop />
      <Content />
      <TopReels />
      <Lab />
      <Brands />
      <Enquiry />
      <Work />

      <a
        href="#enquiry"
        className="md:hidden fixed right-4 z-30 grad text-white h font-bold px-4 py-2 text-sm rounded-full shadow-xl"
        style={{
          bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))"
        }}
      >
        ✉ Collab
      </a>

      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
