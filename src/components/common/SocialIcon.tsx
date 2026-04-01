type SocialIconProps = {
  type: "youtube" | "x";
};

export function SocialIcon({ type }: SocialIconProps) {
  if (type === "youtube") {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <path
          d="M23 12.01c0-2.08-.19-4.16-.57-6.18a3.08 3.08 0 0 0-2.16-2.17C18.31 3.1 15.15 3 12 3s-6.31.1-8.27.66A3.08 3.08 0 0 0 1.57 5.83C1.19 7.85 1 9.93 1 12.01c0 2.08.19 4.16.57 6.18a3.08 3.08 0 0 0 2.16 2.17c1.96.56 5.12.66 8.27.66s6.31-.1 8.27-.66a3.08 3.08 0 0 0 2.16-2.17c.38-2.02.57-4.1.57-6.18Z"
          fill="currentColor"
        />
        <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
      <path
        d="M18.9 2H21l-4.59 5.25L21.8 22h-4.9l-3.84-5.03L8.66 22H6.55l4.9-5.6L2.2 2h5.02l3.47 4.58L18.9 2Zm-1.72 18h1.36L6.48 3.9H5.03l12.15 16.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
