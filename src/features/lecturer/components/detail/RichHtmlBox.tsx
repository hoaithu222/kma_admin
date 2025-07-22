import React from "react";

interface RichHtmlBoxProps {
  html: string;
  className?: string;
}

const RichHtmlBox: React.FC<RichHtmlBoxProps> = ({ html, className = "" }) => {
  return (
    <div
      className={`max-w-none prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichHtmlBox;
