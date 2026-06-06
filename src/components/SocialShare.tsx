import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const xUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  async function handleCopy() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  }

  return (
    <div className="ss-wrap" aria-label="Share this article">
      <span className="ss-label">Share</span>
      <div className="ss-buttons">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ss-btn"
          aria-label="Share on X (Twitter)"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path d="M15.74 2h2.79l-6.1 6.97L19.5 18h-5.62l-4.41-5.77L4.42 18H1.63l6.52-7.45L1 2h5.77l3.99 5.23L15.74 2Zm-1 14.4h1.55L5.33 3.6H3.67l11.07 12.8Z"/>
          </svg>
          Post on X
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ss-btn"
          aria-label="Share on LinkedIn"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path d="M4.5 3A1.5 1.5 0 1 1 4.5 6 1.5 1.5 0 0 1 4.5 3ZM3 7.5h3V17H3V7.5ZM8 7.5h2.9v1.3h.04c.4-.77 1.38-1.58 2.84-1.58C16.5 7.22 17 9.24 17 12V17h-3v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.37V17H8V7.5Z"/>
          </svg>
          LinkedIn
        </a>
        <button
          type="button"
          className="ss-btn"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4L8 12.58l7.3-7.28a1 1 0 0 1 1.4 0Z" clipRule="evenodd"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path d="M7 2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2Zm1 2v1h4V4H8ZM5 5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5Z"/>
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
