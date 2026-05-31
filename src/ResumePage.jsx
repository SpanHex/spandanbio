import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "skills", badge: "I", title: "SKILLS", subtitle: "Tech Stack & Expertise", rank: 5 },
  { id: "projects", badge: "II", title: "PROJECTS", subtitle: "Featured Work", rank: 4 },
  { id: "experience", badge: "III", title: "EXPERIENCE", subtitle: "Roles & Growth", rank: 3 },
  { id: "languages", badge: "IV", title: "LANGUAGES", subtitle: "Spoken & Written", rank: 2 },
];

const LANG_ROWS = [
  { index: "01", lang: "Assamese", level: "Native" },
  { index: "02", lang: "Hindi", level: "Fluent" },
  { index: "03", lang: "English", level: "Fluent" },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

        /* Spandan custom resume panels styles */
        .resume-detail-group {
          margin-bottom: 16px;
        }
        .resume-detail-group-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: #91f5ff;
          margin-bottom: 8px;
        }
        .resume-detail-bullet-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .resume-detail-skill-tag {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 16px;
          color: #fff;
          background: rgba(8, 18, 72, 0.96);
          padding: 6px 12px;
          border: 1px solid rgba(140, 239, 255, 0.2);
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          transition: background 0.16s ease, transform 0.16s ease;
        }
        .resume-detail-skill-tag:hover {
          background: rgba(12, 26, 94, 1);
          transform: translateX(2px);
          border-color: rgba(140, 239, 255, 0.4);
        }
        .resume-coming-soon-card, .resume-experience-card {
          background: rgba(8, 18, 72, 0.96);
          padding: 20px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          margin-bottom: 14px;
        }
        .resume-coming-soon-badge, .resume-experience-time {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 1.5px;
          color: #ff5e88;
          margin-bottom: 6px;
        }
        .resume-coming-soon-title, .resume-experience-title {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 32px;
          line-height: 1.1;
          color: #f2fcff;
          margin-bottom: 12px;
        }
        .resume-coming-soon-desc, .resume-experience-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.4;
          color: #c4d8e2;
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">SKILLS LOG</div>
              <div className="resume-detail-top-progress">5/5</div>
            </div>

            <div className="resume-detail-list" style={{ maxHeight: "370px", overflowY: "auto", paddingRight: "4px" }}>
              <div className="resume-detail-group">
                <div className="resume-detail-group-title">FRONTEND DEVELOPMENT</div>
                <div className="resume-detail-bullet-container">
                  {["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"].map((s, idx) => (
                    <div className="resume-detail-skill-tag" key={idx}>{s}</div>
                  ))}
                </div>
              </div>
              <div className="resume-detail-group">
                <div className="resume-detail-group-title">ANIMATION & UX</div>
                <div className="resume-detail-bullet-container">
                  {["GSAP", "Parallax Effects", "Smooth Scrolling", "Responsive Design", "UI/UX Principles"].map((s, idx) => (
                    <div className="resume-detail-skill-tag" key={idx}>{s}</div>
                  ))}
                </div>
              </div>
              <div className="resume-detail-group">
                <div className="resume-detail-group-title">BACKEND & DATABASES</div>
                <div className="resume-detail-bullet-container">
                  {["Node.js", "Express.js", "PostgreSQL", "MongoDB"].map((s, idx) => (
                    <div className="resume-detail-skill-tag" key={idx}>{s}</div>
                  ))}
                </div>
              </div>
              <div className="resume-detail-group">
                <div className="resume-detail-group-title">TOOLS & STRATEGY</div>
                <div className="resume-detail-bullet-container">
                  {["Git", "GitHub", "SEO Fundamentals", "Performance Optimization", "Digital Branding", "Product Development", "Startup Strategy"].map((s, idx) => (
                    <div className="resume-detail-skill-tag" key={idx}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">02</div>
              <div className="resume-detail-top-title">PROJECT LOG</div>
              <div className="resume-detail-top-progress">0/0</div>
            </div>

            <div className="resume-detail-list">
              <div className="resume-coming-soon-card">
                <div className="resume-coming-soon-badge">STATUS: IN DEVELOPMENT</div>
                <div className="resume-coming-soon-title">Projects Coming Soon</div>
                <p className="resume-coming-soon-desc">
                  Currently working on future projects. New case studies and products will be published here.
                </p>
              </div>
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">CURRENT STATUS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Coding custom web apps using React, Next.js, and Tailwind CSS.</div>
                <div className="resume-detail-bullet">- Designing premium micro-interaction experiences.</div>
              </div>
            </div>
          </div>
        )}

        {active === 2 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">03</div>
              <div className="resume-detail-top-title">EXP LOG</div>
              <div className="resume-detail-top-progress">0/1</div>
            </div>

            <div className="resume-detail-list">
              <div className="resume-experience-card">
                <div className="resume-experience-time">LEARNING & BUILDING</div>
                <div className="resume-experience-title">Aspiring Entrepreneur & Developer</div>
                <p className="resume-experience-desc">
                  Currently focused on learning, building, and exploring opportunities in web development, startups, and digital product creation.
                </p>
              </div>
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">KEY FOCUS AREAS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Studying startup building strategies and digital branding.</div>
                <div className="resume-detail-bullet">- Mastering modern backend APIs and database integrations.</div>
              </div>
            </div>
          </div>
        )}

        {active === 3 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">04</div>
              <div className="resume-detail-top-title">LANGUAGES</div>
              <div className="resume-detail-top-progress">3/3</div>
            </div>

            <div className="resume-detail-list">
              {LANG_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.lang}</div>
                  <div className="resume-detail-status">{row.level}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">COMMUNICATION CAPABILITY</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Native Assamese speaker, fluent in Hindi and English.</div>
                <div className="resume-detail-bullet">- Ready to communicate and collaborate globally on new startup ideas.</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
