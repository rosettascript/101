/**
 * Mode Utility: List Normalization
 * Normalizes list items with colons in <strong> tags
 */

export function normalizeLists(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const listItems = doc.querySelectorAll('li');
    
    listItems.forEach(li => {
      const strongTags = li.querySelectorAll('strong');
      
      strongTags.forEach(strong => {
        const strongText = strong.textContent || '';
        
        if (strongText.trim().endsWith(':')) {
          let strongHTML = strong.innerHTML;
          strongHTML = strongHTML.replace(/:\s+$/, ':');
          strong.innerHTML = strongHTML;
          
          let nextNode = strong.nextSibling;
          
          if (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
            let text = (nextNode as Text).textContent || '';
            text = text.trim();
            if (text) {
              (nextNode as Text).textContent = ' ' + text;
            } else {
              (nextNode as Text).textContent = ' ';
            }
          } else {
            const spaceNode = doc.createTextNode(' ');
            const strongParent = strong.parentNode;
            if (strongParent) {
              strongParent.insertBefore(spaceNode, strong.nextSibling);
            }
          }
        }
      });
    });
    
    return doc.body.innerHTML;
  } catch (e) {
    console.warn('List normalization failed:', e);
    return html;
  }
}

