/**
 * HTML Sanitizer
 * Removes all styling and unsafe attributes while preserving semantic structure
 */

const ALLOWED_ELEMENTS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'em', 'i', 'strong', 'b',
  'sup', 'sub',
  'a',
  'img',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td'
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'target', 'rel'],
  'img': ['src', 'alt'],
  '*': []
};

const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:'];

export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  sanitizeElement(tempDiv);

  if (tempDiv.children.length === 1) {
    const onlyChild = tempDiv.children[0];
    const tagName = onlyChild.tagName.toLowerCase();
    if (!ALLOWED_ELEMENTS.includes(tagName) || 
        (tagName === 'span' && !onlyChild.hasAttributes())) {
      const fragment = document.createDocumentFragment();
      while (onlyChild.firstChild) {
        fragment.appendChild(onlyChild.firstChild);
      }
      tempDiv.innerHTML = '';
      tempDiv.appendChild(fragment);
    }
  }

  return tempDiv.innerHTML;
}

function convertFormattingToSemanticTags(element: Element): Element | null {
  const style = element.getAttribute('style') || '';
  if (!style) return null;
  
  const styleObj: Record<string, string> = {};
  style.split(';').forEach(rule => {
    const parts = rule.split(':').map(s => s.trim());
    if (parts.length === 2) {
      styleObj[parts[0].toLowerCase()] = parts[1];
    }
  });
  
  const isItalic = styleObj['font-style']?.toLowerCase().includes('italic');
  const isBold = styleObj['font-weight'] && (
    styleObj['font-weight'].toLowerCase() === 'bold' || 
    parseInt(styleObj['font-weight']) >= 700
  );
  const isSuperscript = styleObj['vertical-align'] && (
    styleObj['vertical-align'].toLowerCase() === 'super' ||
    styleObj['vertical-align'].includes('super') ||
    styleObj['vertical-align'].includes('35%') ||
    styleObj['vertical-align'].includes('0.6')
  );
  const isSubscript = styleObj['vertical-align'] && (
    styleObj['vertical-align'].toLowerCase() === 'sub' ||
    styleObj['vertical-align'].includes('sub') ||
    styleObj['vertical-align'].includes('-35%') ||
    styleObj['vertical-align'].includes('-0.6')
  );
  
  if (!isItalic && !isBold && !isSuperscript && !isSubscript) {
    return null;
  }
  
  const children = Array.from(element.childNodes);
  let current: Element | null = null;
  
  if (isItalic) {
    const italic = document.createElement('em');
    if (current) {
      italic.appendChild(current);
    } else {
      children.forEach(child => italic.appendChild(child.cloneNode(true)));
    }
    current = italic;
  }
  
  if (isBold) {
    const strong = document.createElement('strong');
    if (current) {
      strong.appendChild(current);
    } else {
      children.forEach(child => strong.appendChild(child.cloneNode(true)));
    }
    current = strong;
  }
  
  if (isSuperscript) {
    const sup = document.createElement('sup');
    if (current) {
      sup.appendChild(current);
    } else {
      children.forEach(child => sup.appendChild(child.cloneNode(true)));
    }
    current = sup;
  } else if (isSubscript) {
    const sub = document.createElement('sub');
    if (current) {
      sub.appendChild(current);
    } else {
      children.forEach(child => sub.appendChild(child.cloneNode(true)));
    }
    current = sub;
  }
  
  return current;
}

function sanitizeElement(element: Element): void {
  const nodesToProcess = Array.from(element.childNodes).filter(
    node => node.nodeType === Node.ELEMENT_NODE
  );
  
  nodesToProcess.forEach(node => {
    const tagName = (node as Element).tagName.toLowerCase();

    if (!ALLOWED_ELEMENTS.includes(tagName)) {
      sanitizeElement(node as Element);
      
      const semanticReplacement = convertFormattingToSemanticTags(node as Element);
      
      if (semanticReplacement) {
        if (node.parentNode) {
          node.parentNode.replaceChild(semanticReplacement, node);
          sanitizeElement(semanticReplacement);
        }
      } else {
        unwrapElement(node as Element, element);
      }
    } else {
      const style = (node as Element).getAttribute('style') || '';
      let hasFormatting = false;
      let isItalic = false;
      let isBold = false;
      
      if (style) {
        const styleObj: Record<string, string> = {};
        style.split(';').forEach(rule => {
          const parts = rule.split(':').map(s => s.trim());
          if (parts.length === 2) {
            styleObj[parts[0].toLowerCase()] = parts[1];
          }
        });
        
        isItalic = styleObj['font-style']?.toLowerCase().includes('italic') || false;
        isBold = styleObj['font-weight'] && (
          styleObj['font-weight'].toLowerCase() === 'bold' || 
          parseInt(styleObj['font-weight']) >= 700
        ) || false;
        
        hasFormatting = isItalic || isBold;
        
        if (hasFormatting) {
          sanitizeElement(node as Element);
          
          const children = Array.from((node as Element).childNodes);
          let wrapper: Element | null = null;
          
          if (isItalic && isBold) {
            wrapper = document.createElement('strong');
            const em = document.createElement('em');
            children.forEach(child => em.appendChild(child.cloneNode(true)));
            wrapper.appendChild(em);
          } else if (isItalic) {
            wrapper = document.createElement('em');
            children.forEach(child => wrapper!.appendChild(child.cloneNode(true)));
          } else if (isBold) {
            wrapper = document.createElement('strong');
            children.forEach(child => wrapper!.appendChild(child.cloneNode(true)));
          }
          
          if (wrapper) {
            (node as Element).innerHTML = '';
            (node as Element).appendChild(wrapper);
          }
        }
      }
      
      sanitizeAttributes(node as Element, tagName);
      if (!hasFormatting) {
        sanitizeElement(node as Element);
      }
    }
  });
}

function sanitizeAttributes(element: Element, tagName: string): void {
  const allowedAttrs = ALLOWED_ATTRIBUTES[tagName] || ALLOWED_ATTRIBUTES['*'] || [];
  const attrsToRemove: string[] = [];

  Array.from(element.attributes).forEach(attr => {
    const attrName = attr.name.toLowerCase();

    if (attrName === 'style' || 
        attrName === 'class' || 
        attrName.startsWith('data-') ||
        attrName.startsWith('on') ||
        attrName === 'id' ||
        attrName === 'dir' ||
        attrName === 'role' ||
        attrName === 'aria-level') {
      attrsToRemove.push(attr.name);
      return;
    }

    if (!allowedAttrs.includes(attrName)) {
      attrsToRemove.push(attr.name);
      return;
    }

    if (attrName === 'href' || attrName === 'src') {
      const cleanedUrl = cleanUrl(attr.value);
      if (cleanedUrl !== attr.value) {
        element.setAttribute(attr.name, cleanedUrl);
      }
      
      if (!isSafeUrl(cleanedUrl)) {
        attrsToRemove.push(attr.name);
      }
    }
  });

  attrsToRemove.forEach(attrName => {
    element.removeAttribute(attrName);
  });
}

function cleanUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return url;
  }

  try {
    let cleaned = decodeURIComponent(url);
    cleaned = cleaned.replace(/[\u2011\u2012\u2013\u2014\u2015]/g, '-');
    cleaned = cleaned.replace(/\u00A0/g, ' ');
    cleaned = cleaned.replace(/\s+/g, '-');
    cleaned = cleaned.replace(/-+/g, '-');
    cleaned = cleaned.replace(/\/-+/g, '/').replace(/-+\//g, '/');
    
    if (cleaned !== decodeURIComponent(url)) {
      try {
        const urlObj = new URL(cleaned, window.location.href);
        const cleanPath = urlObj.pathname
          .split('/')
          .map(segment => encodeURIComponent(decodeURIComponent(segment)))
          .join('/');
        return urlObj.origin + cleanPath + urlObj.search + urlObj.hash;
      } catch (e) {
        return cleaned;
      }
    }
    
    return url;
  } catch (e) {
    let cleaned = url.replace(/%E2%80%91/g, '-')
                    .replace(/%E2%80%93/g, '-')
                    .replace(/%E2%80%94/g, '-')
                    .replace(/%E2%80%95/g, '-')
                    .replace(/%C2%A0/g, '-');
    cleaned = cleaned.replace(/-+/g, '-');
    return cleaned;
  }
}

function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    if (url.startsWith('/') || url.startsWith('#')) {
      return true;
    }

    const urlObj = new URL(url, window.location.href);
    return SAFE_PROTOCOLS.includes(urlObj.protocol);
  } catch (e) {
    return url.startsWith('/') || url.startsWith('#');
  }
}

function unwrapElement(element: Element, parent: Element): void {
  const fragment = document.createDocumentFragment();
  while (element.firstChild) {
    fragment.appendChild(element.firstChild);
  }
  
  if (element.parentNode) {
    element.parentNode.insertBefore(fragment, element);
    element.remove();
  }
}

