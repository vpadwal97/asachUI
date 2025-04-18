import DOMPurify from "dompurify";
import parse from "html-react-parser";

const SafeHtmlRenderer = ({ htmlContent }) => {
  // Step 1: Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  // Step 2: Parse the sanitized HTML into React elements
  const reactElement = parse(sanitizedHtml);
  
  return reactElement;
};

export default SafeHtmlRenderer;
