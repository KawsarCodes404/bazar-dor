"use client";

const styles = `
.nf {
  --nf-ink: #3a0b0f;
  --nf-muted: #7a4a4f;
  --nf-line: #ecbcc0;
  --nf-red: #c8000e;
  --nf-red-dark: #a3000b;
  --nf-bg: #fdeaea;

  position: relative;
  width: 100%;
  min-height: calc(100vh - 11rem);
  padding: clamp(3rem, 8vw, 6rem) 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Full-bleed background: paints the red past the narrow parent
     container on both sides, without causing horizontal scroll. */
  background: var(--nf-bg);
  box-shadow: 0 0 0 100vmax var(--nf-bg);
  clip-path: inset(0 -100vmax);
  color: var(--nf-ink);
  font-family: inherit;
  text-align: center;
  box-sizing: border-box;
}
.nf *, .nf *::before, .nf *::after { box-sizing: inherit; }

.nf-inner {
  width: 100%;
  max-width: 36rem;
}

.nf-code {
  margin: 0 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(5.5rem, 20vw, 9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  white-space: nowrap;
  color: var(--nf-red);
}
.nf-zero {
  display: inline-block;
  height: 0.72em;
  width: auto;
  margin: 0 0.04em;
  vertical-align: baseline;
  overflow: visible;
}
.nf-dot {
  transform-box: fill-box;
  transform-origin: center;
  animation: nf-settle 900ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both;
}
@keyframes nf-settle {
  from { transform: translate(70px, -80px); opacity: 0; }
  to   { transform: translate(0, 0); opacity: 1; }
}

.nf-title {
  margin: 0 0 0.75rem;
  font-family: "Noto Serif Bengali", Georgia, "Times New Roman", serif;
  font-size: clamp(1.5rem, 4.5vw, 2rem);
  font-weight: 700;
  line-height: 1.35;
}
.nf-text {
  margin: 0 auto 2rem;
  max-width: 30rem;
  color: var(--nf-muted);
  font-size: 1.0625rem;
  line-height: 1.75;
}

.nf-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}
.nf-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 9rem;
  padding: 0.7rem 1.4rem;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
}
.nf-btn:focus-visible {
  outline: 3px solid var(--nf-red);
  outline-offset: 3px;
}
.nf-btn-primary {
  background: var(--nf-red);
  color: #fff;
}
.nf-btn-primary:hover { background: var(--nf-red-dark); }
.nf-btn-secondary {
  background: #fff;
  color: var(--nf-ink);
  border-color: var(--nf-line);
}
.nf-btn-secondary:hover { border-color: var(--nf-red); color: var(--nf-red-dark); }

@media (prefers-reduced-motion: reduce) {
  .nf-dot { animation: none; }
  .nf-btn { transition: none; }
}
`;

const NotFound = () => {
    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.assign("/");
        }
    };

    return (
        <section className="nf">
            <style>{styles}</style>

            <div className="nf-inner">
                <h1 className="nf-code" aria-label="404">
                    <span aria-hidden="true">4</span>
                    <svg
                        className="nf-zero"
                        viewBox="0 0 84 110"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <ellipse
                            cx="42"
                            cy="55"
                            rx="32"
                            ry="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="20"
                        />
                        <circle
                            className="nf-dot"
                            cx="46"
                            cy="62"
                            r="9"
                            fill="var(--nf-ink)"
                        />
                    </svg>
                    <span aria-hidden="true">4</span>
                </h1>

                <h2 className="nf-title">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
                <p className="nf-text">
                    আপনি যে লিংকটি খুঁজছেন সেটি হয়তো ভুল, সরিয়ে নেওয়া হয়েছে
                    অথবা মুছে ফেলা হয়েছে। ঠিকানাটি যাচাই করুন, কিংবা হোম পেজে
                    ফিরে যান।
                </p>

                <div className="nf-actions">
                    <a className="nf-btn nf-btn-primary" href="/">
                        হোম পেজে যান
                    </a>
                    <button
                        type="button"
                        className="nf-btn nf-btn-secondary"
                        onClick={goBack}
                    >
                        পেছনে যান
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NotFound;