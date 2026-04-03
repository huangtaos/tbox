import { describe, it, expect } from 'vitest';
import { TOOL_COMPONENTS, STANDALONE_TOOL_IDS } from '@/lib/tool-registry';

// Note: We avoid importing from constants.tsx because it contains JSX (React elements)
// and vitest's rollup parser can't parse JSX in .tsx files without additional setup.
// Instead, we test the TOOL_COMPONENTS registry directly.

describe('Tool Registry', () => {
  it('TOOL_COMPONENTS should have entries for all expected tools', () => {
    const expectedTools = [
      'json-formatter',
      'timestamp-converter',
      'base64-converter',
      'calculator',
      'unit-converter',
      'translator',
      'uuid-generator',
      'md5-hash',
      'url-encoder',
      'qr-generator',
      'password-generator',
      'word-count',
      'markdown-preview',
      'file-encrypt',
      'file-compress',
      'image-compress',
      'pdf-to-word',
      'word-to-pdf',
      'change-photo-background',
    ];

    expectedTools.forEach((id) => {
      expect(TOOL_COMPONENTS).toHaveProperty(id);
    });

    // Should have exactly the expected number of tools
    expect(Object.keys(TOOL_COMPONENTS).length).toBe(expectedTools.length);
  });

  it('TOOL_COMPONENTS should not include standalone tools', () => {
    // Standalone tools (pomodoro, todo, water-tracker) have their own pages
    // and should not be in TOOL_COMPONENTS
    STANDALONE_TOOL_IDS.forEach((id) => {
      expect(TOOL_COMPONENTS).not.toHaveProperty(id);
    });
  });

  it('all TOOL_COMPONENTS values should be functions (React components)', () => {
    Object.entries(TOOL_COMPONENTS).forEach(([id, Component]) => {
      expect(typeof Component).toBe('function');
    });
  });

  it('each registered tool should have a non-empty string ID', () => {
    Object.keys(TOOL_COMPONENTS).forEach((id) => {
      expect(id.length).toBeGreaterThan(0);
      expect(id).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

