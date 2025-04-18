import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

// Reusable SafeHtml component
const SafeHtml = ({ htmlString }) => {
  const [safeHtml, setSafeHtml] = useState('');

  useEffect(() => {
    if (htmlString) {
      // Sanitize the HTML string to remove dangerous elements like <script> or inline event handlers
      const sanitizedHtml = DOMPurify.sanitize(htmlString);
      setSafeHtml(sanitizedHtml);
    }
  }, [htmlString]);

  // Return parsed and sanitized HTML as React elements
  return <>{parse(safeHtml)}</>;
};

export default SafeHtml;
