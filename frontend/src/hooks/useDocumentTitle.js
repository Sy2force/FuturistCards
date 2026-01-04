import { useLayoutEffect } from 'react';

export const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    const siteName = 'FuturistCards';
    const newTitle = title && title.trim() ? 
      `${title}` : 
      `${siteName} - Digital Business Cards`;
    document.title = newTitle;
  }, [title]);
};

export default useDocumentTitle;
