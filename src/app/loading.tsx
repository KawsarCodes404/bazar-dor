const styles = `
.lp {
  --lp-ink: #3a0b0f;
  --lp-muted: #7a4a4f;
  --lp-track: #f2c3c6;
  --lp-red: #c8000e;
  --lp-bg: #fdeaea;

  position: relative;
  width: 100%;
  min-height: calc(100vh - 11rem);
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: var(--lp-ink);
  font-family: inherit;
  text-align: center;
  box-sizing: border-box;

  /* Full-bleed background, same technique as the 404 page. */
  background: var(--lp-bg);
  box-shadow: 0 0 0 100vmax var(--lp-bg);
  clip-path: inset(0 -100vmax);
}
.lp *, .lp *::before, .lp *::after { box-sizing: inherit; }

.lp-spinner {
  width: 4.5rem;
  height: 4.5rem;
  overflow: visible;
}
.lp-arc {
  transform-origin: 50% 50%;
  animation: lp-spin 1.1s linear infinite;
}
@keyframes lp-spin {
  to { transform: rotate(360deg); }
}

.lp-text {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--lp-muted);
}

@media (prefers-reduced-motion: reduce) {
  .lp-arc { animation: none; }
}
`;

const LoadingPage = () => {
    return (
        <section className="lp" role="status" aria-live="polite">
            <style>{styles}</style>

            <svg
                className="lp-spinner"
                viewBox="0 0 100 100"
                aria-hidden="true"
                focusable="false"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--lp-track)"
                    strokeWidth="10"
                />
                <circle
                    className="lp-arc"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--lp-red)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="70 182"
                />
                <circle cx="50" cy="50" r="7" fill="var(--lp-ink)" />
            </svg>

            <p className="lp-text">লোড হচ্ছে…</p>
        </section>
    );
};

export default LoadingPage;