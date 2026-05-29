import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';
import './components.css';

const CodeBlock = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-block-lang">{language.toUpperCase()}</span>
        <button 
          className="code-block-copy-btn" 
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-success" />
              <span className="copy-text">Copied!</span>
            </>
          ) : (
            <>
              <Clipboard size={14} />
              <span className="copy-text">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block-body">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
