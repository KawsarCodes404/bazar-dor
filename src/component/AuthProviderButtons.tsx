interface AuthProviderButtonsProps {
  onGoogle: () => void;
  onGitHub: () => void;
}

export default function AuthProviderButtons({ onGoogle, onGitHub }: AuthProviderButtonsProps) {
  return (
    <div className="auth-socials">
      <button className="btn-outline auth-provider-button flex w-full items-center justify-center" type="button" onClick={onGoogle}>
        <span className="auth-provider-content inline-flex items-center justify-center gap-2 whitespace-nowrap">
          <svg className="auth-provider-icon h-4 w-4 shrink-0" width={16} height={16} viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
            <path fill="#FF3D00" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
            <path fill="#4CAF50" d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18Z" />
            <path fill="#1976D2" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.2 11.4-8.2Z" />
          </svg>
          <span>Google দিয়ে চালিয়ে যান</span>
        </span>
      </button>
      <button className="btn-outline auth-provider-button flex w-full items-center justify-center" type="button" onClick={onGitHub}>
        <span className="auth-provider-content inline-flex items-center justify-center gap-2 whitespace-nowrap">
          <svg className="auth-provider-icon auth-github-icon h-4 w-4 shrink-0" width={16} height={16} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.1v3.1c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          <span>GitHub দিয়ে চালিয়ে যান</span>
        </span>
      </button>
    </div>
  );
}
