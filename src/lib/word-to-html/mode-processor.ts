/**
 * Mode Processor
 * Applies mode-specific formatting based on selected mode and enabled features
 */

import { wrapHeadingsInStrong, unwrapHeadingsFromStrong } from './mode-heading-strong';
import { formatKeyTakeaways } from './mode-key-takeaways';
import { removeH1AfterKeyTakeaways } from './mode-h1-removal';
import { addLinkAttributes } from './mode-link-attributes';
import { normalizeLists } from './mode-list-normalize';
import { convertOlHeaders } from './mode-ol-header-conversion';
import { convertToRelativePaths } from './mode-relative-paths';
import { normalizeSources } from './mode-sources-normalize';
import { addSpacing } from './mode-spacing';
import type { OutputMode, FeatureFlags } from './converter';

export function processMode(html: string, mode: OutputMode, features: FeatureFlags): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let processedHtml = html;

  // List normalization - applies to all modes (regular, blogs, shoppables)
  processedHtml = normalizeLists(processedHtml);

  // Regular mode: no special processing beyond list normalization
  if (mode === 'regular') {
    return processedHtml;
  }

  // Blogs mode features
  if (mode === 'blogs') {
    // Heading strong tags (must be first to wrap headings before other processing)
    if (features.headingStrong === false) {
      // Explicitly disabled - unwrap any existing strong tags
      processedHtml = unwrapHeadingsFromStrong(processedHtml);
    } else {
      // Enabled (default or explicitly true) - wrap headings in strong
      processedHtml = wrapHeadingsInStrong(processedHtml);
    }

    // Key Takeaways formatting
    if (features.keyTakeaways !== false) {
      processedHtml = formatKeyTakeaways(processedHtml);
    }

    // H1 removal
    if (features.h1Removal !== false) {
      processedHtml = removeH1AfterKeyTakeaways(processedHtml);
    }

    // Link attributes
    if (features.linkAttributes !== false) {
      processedHtml = addLinkAttributes(processedHtml);
    }

    // OL Header Conversion (enabled by default, before spacing so converted headings get spacing)
    if (features.olHeaderConversion !== false) {
      processedHtml = convertOlHeaders(processedHtml);
    }

    // Spacing (after OL conversion so converted headings get spacing)
    if (features.spacing !== false) {
      processedHtml = addSpacing(processedHtml);
    }

    // Relative paths (disabled by default)
    if (features.relativePaths === true) {
      processedHtml = convertToRelativePaths(processedHtml);
    }

    // Sources normalization
    if (features.sourcesNormalize !== false) {
      processedHtml = normalizeSources(processedHtml);
    }
  }

  // Shoppables mode features
  if (mode === 'shoppables') {
    // Heading strong tags (must be first to wrap headings before other processing)
    if (features.headingStrong === false) {
      // Explicitly disabled - unwrap any existing strong tags
      processedHtml = unwrapHeadingsFromStrong(processedHtml);
    } else {
      // Enabled (default or explicitly true) - wrap headings in strong
      processedHtml = wrapHeadingsInStrong(processedHtml);
    }

    // Link attributes
    if (features.linkAttributes !== false) {
      processedHtml = addLinkAttributes(processedHtml);
    }

    // Relative paths (disabled by default)
    if (features.relativePaths === true) {
      processedHtml = convertToRelativePaths(processedHtml);
    }

    // OL Header Conversion (enabled by default)
    if (features.olHeaderConversion !== false) {
      processedHtml = convertOlHeaders(processedHtml);
    }

    // Sources normalization
    if (features.sourcesNormalize !== false) {
      processedHtml = normalizeSources(processedHtml);
    }
  }

  return processedHtml;
}

