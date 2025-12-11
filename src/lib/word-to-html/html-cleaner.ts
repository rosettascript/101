/**
 * HTML Cleaner
 * Cleans HTML structure by removing unnecessary tags and unwrapping elements
 */

const BLOCK_ELEMENTS = [
  'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
  'blockquote', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'dl', 'dt', 'dd', 'section', 'article', 'aside', 'header', 'footer',
  'nav', 'main', 'figure', 'figcaption'
];

export function cleanHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    cleanElement(doc.body, false);
    removeBrAfterBlockElements(doc.body);
    trimAnchorWhitespace(doc.body);
    
    return doc.body.innerHTML;
  } catch (e) {
    console.warn('HTML cleaning failed:', e);
    return html;
  }
}

function cleanElement(element: Element, insideLi = false): void {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const tagName = element.tagName.toLowerCase();
  const isLi = tagName === 'li';
  const isBlock = BLOCK_ELEMENTS.includes(tagName);
  const nowInsideLi = isLi || insideLi;

  let node = element.firstChild;
  
  while (node) {
    const nextSibling = node.nextSibling;
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const childTag = (node as Element).tagName.toLowerCase();
      
      if (childTag === 'br') {
        if (nowInsideLi || isBlock) {
          element.removeChild(node);
          node = nextSibling;
          continue;
        }
      }
      
      if (childTag === 'p' && nowInsideLi) {
        unwrapParagraph(node as Element, element);
        node = nextSibling;
        continue;
      }
      
      cleanElement(node as Element, nowInsideLi);
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (isBlock && nextSibling && nextSibling.nodeType === Node.ELEMENT_NODE) {
        const nextTag = (nextSibling as Element).tagName.toLowerCase();
        if (nextTag === 'br') {
          element.removeChild(nextSibling);
        }
      }
    }
    
    node = nextSibling;
  }
  
  if (isBlock && element.parentNode) {
    let sibling = element.nextSibling;
    while (sibling) {
      const nextSibling = sibling.nextSibling;
      if (sibling.nodeType === Node.ELEMENT_NODE && 
          (sibling as Element).tagName.toLowerCase() === 'br') {
        element.parentNode.removeChild(sibling);
      }
      sibling = nextSibling as Element | null;
    }
  }
  
  if (nowInsideLi) {
    normalizeStrongEmNesting(element);
    mergeAdjacentEmTags(element);
  }
}

function normalizeStrongEmNesting(element: Element): void {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return;
  }
  
  const children = Array.from(element.childNodes);
  
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childTag = (child as Element).tagName.toLowerCase();
      
      if (childTag === 'strong') {
        const directEm = Array.from((child as Element).childNodes).find(
          node => node.nodeType === Node.ELEMENT_NODE && 
                  (node as Element).tagName.toLowerCase() === 'em' &&
                  node.parentNode === child
        ) as Element | undefined;
        
        if (directEm) {
          const emContent = Array.from(directEm.childNodes);
          const newEm = document.createElement('em');
          const newStrong = document.createElement('strong');
          
          for (let j = 0; j < emContent.length; j++) {
            newStrong.appendChild(emContent[j].cloneNode(true));
          }
          
          newEm.appendChild(newStrong);
          
          const otherContent: Node[] = [];
          let foundEm = false;
          for (let j = 0; j < (child as Element).childNodes.length; j++) {
            const strongChild = (child as Element).childNodes[j];
            if (strongChild === directEm) {
              foundEm = true;
            } else if (foundEm) {
              otherContent.push(strongChild);
            }
          }
          
          if (child.parentNode) {
            child.parentNode.insertBefore(newEm, child);
            
            for (let j = 0; j < otherContent.length; j++) {
              child.parentNode.insertBefore(otherContent[j], child.nextSibling);
            }
            
            child.parentNode.removeChild(child);
          }
        } else {
          normalizeStrongEmNesting(child as Element);
        }
      } else {
        normalizeStrongEmNesting(child as Element);
      }
    }
  }
}

function unwrapParagraph(pElement: Element, parent: Element): void {
  if (!pElement || !parent) {
    return;
  }

  const children = Array.from(pElement.childNodes);
  
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childTag = (child as Element).tagName.toLowerCase();
      
      if (childTag === 'br') {
        continue;
      }
      
      parent.insertBefore(child, pElement);
    } else if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent;
      if (text?.trim()) {
        const textNode = document.createTextNode(text);
        parent.insertBefore(textNode, pElement);
      }
    }
  }
  
  parent.removeChild(pElement);
}

function mergeAdjacentEmTags(element: Element): void {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return;
  }
  
  const children = Array.from(element.childNodes);
  
  for (let i = 0; i < children.length - 1; i++) {
    const current = children[i];
    const next = children[i + 1];
    
    if (current.nodeType === Node.ELEMENT_NODE && 
        next.nodeType === Node.ELEMENT_NODE) {
      
      const currentTag = (current as Element).tagName.toLowerCase();
      const nextTag = (next as Element).tagName.toLowerCase();
      
      if (currentTag === 'em' && nextTag === 'em') {
        const nextChildren = Array.from((next as Element).childNodes);
        for (let j = 0; j < nextChildren.length; j++) {
          (current as Element).appendChild(nextChildren[j]);
        }
        if ((next as Element).parentNode) {
          (next as Element).parentNode!.removeChild(next);
        }
        mergeAdjacentEmTags(element);
        return;
      }
    }
  }
}

function trimAnchorWhitespace(element: Element): void {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return;
  }
  
  const children = Array.from(element.childNodes);
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType === Node.ELEMENT_NODE) {
      trimAnchorWhitespace(children[i] as Element);
    }
  }
  
  const tagName = element.tagName.toLowerCase();
  if (tagName !== 'a') {
    return;
  }
  
  let firstTextNode: Text | null = null;
  let lastTextNode: Text | null = null;
  
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE) {
      if (firstTextNode === null) {
        firstTextNode = node as Text;
      }
      lastTextNode = node as Text;
    }
  }
  
  if (firstTextNode === null && lastTextNode === null) {
    return;
  }
  
  if (firstTextNode) {
    const originalText = firstTextNode.textContent || '';
    const trimmedText = originalText.replace(/^\s+/, '');
    
    if (trimmedText.length === 0) {
      element.removeChild(firstTextNode);
    } else {
      firstTextNode.textContent = trimmedText;
    }
  }
  
  if (lastTextNode && lastTextNode !== firstTextNode) {
    const originalText = lastTextNode.textContent || '';
    const trimmedText = originalText.replace(/\s+$/, '');
    
    if (trimmedText.length === 0) {
      element.removeChild(lastTextNode);
    } else {
      lastTextNode.textContent = trimmedText;
    }
  } else if (lastTextNode && lastTextNode === firstTextNode && firstTextNode) {
    const originalText = firstTextNode.textContent || '';
    const trimmedText = originalText.trim();
    
    if (trimmedText.length === 0) {
      element.removeChild(firstTextNode);
    } else {
      firstTextNode.textContent = trimmedText;
    }
  }
}

function removeBrAfterBlockElements(element: Element): void {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return;
  }
  
  const children = Array.from(element.childNodes);
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType === Node.ELEMENT_NODE) {
      removeBrAfterBlockElements(children[i] as Element);
    }
  }
  
  const childNodes = Array.from(element.childNodes);
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = (node as Element).tagName.toLowerCase();
      
      if (BLOCK_ELEMENTS.includes(tagName)) {
        let nextSibling = node.nextSibling;
        while (nextSibling) {
          const nextNextSibling = nextSibling.nextSibling;
          if (nextSibling.nodeType === Node.ELEMENT_NODE && 
              (nextSibling as Element).tagName.toLowerCase() === 'br') {
            element.removeChild(nextSibling);
          } else {
            break;
          }
          nextSibling = nextNextSibling;
        }
      }
    }
  }
}

