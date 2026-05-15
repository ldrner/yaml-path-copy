'use strict';

const assert = require('assert');
const { getYamlPath } = require('../../src/yaml-path');

function yaml(...lines) {
  return lines.join('\n');
}

describe('getYamlPath', () => {
  describe('root level', () => {
    it('returns key at root level', () => {
      const text = yaml('en: hello');
      assert.strictEqual(getYamlPath(text, 0), 'en');
    });

    it('returns null on array item at root', () => {
      const text = yaml('- item');
      assert.strictEqual(getYamlPath(text, 0), null);
    });

    it('returns null on comment line', () => {
      const text = yaml('# comment', 'en: hello');
      assert.strictEqual(getYamlPath(text, 0), null);
    });

    it('returns null on blank line', () => {
      const text = yaml('en: hello', '', 'ru: world');
      assert.strictEqual(getYamlPath(text, 1), null);
    });
  });

  describe('nested keys', () => {
    it('resolves 2-level path', () => {
      const text = yaml(
        'en:',
        '  api: hello',
      );
      assert.strictEqual(getYamlPath(text, 1), 'en.api');
    });

    it('resolves 3-level path', () => {
      const text = yaml(
        'en:',
        '  api:',
        '    key: value',
      );
      assert.strictEqual(getYamlPath(text, 2), 'en.api.key');
    });

    it('resolves real-world locale path', () => {
      const text = yaml(
        'en:',
        '  api:',
        '    problems:',
        "      server_error: 'Oops, something went wrong'",
      );
      assert.strictEqual(getYamlPath(text, 3), 'en.api.problems.server_error');
    });

    it('returns parent key when cursor is on parent', () => {
      const text = yaml(
        'en:',
        '  api:',
        '    problems:',
        "      server_error: 'Oops'",
      );
      assert.strictEqual(getYamlPath(text, 2), 'en.api.problems');
    });
  });

  describe('blank lines and comments', () => {
    it('skips blank lines when resolving parent', () => {
      const text = yaml(
        'en:',
        '',
        '  api:',
        '',
        '    key: value',
      );
      assert.strictEqual(getYamlPath(text, 4), 'en.api.key');
    });

    it('skips comment lines when resolving parent', () => {
      const text = yaml(
        'en:',
        '  # section comment',
        '  api:',
        '    # key comment',
        '    key: value',
      );
      assert.strictEqual(getYamlPath(text, 4), 'en.api.key');
    });
  });

  describe('edge cases', () => {
    it('returns null for array item inside mapping', () => {
      const text = yaml(
        'en:',
        '  list:',
        '    - item',
      );
      assert.strictEqual(getYamlPath(text, 2), null);
    });

    it('handles value with colon in it', () => {
      const text = yaml(
        'en:',
        "  url: 'http://example.com'",
      );
      assert.strictEqual(getYamlPath(text, 1), 'en.url');
    });

    it('handles key with spaces before colon', () => {
      const text = yaml(
        'en:',
        '  my_key : value',
      );
      assert.strictEqual(getYamlPath(text, 1), 'en.my_key');
    });

    it('returns null for out-of-bounds line number', () => {
      const text = yaml('en: hello');
      assert.strictEqual(getYamlPath(text, 99), null);
    });

    it('sibling keys do not bleed into path', () => {
      const text = yaml(
        'en:',
        '  foo: 1',
        '  bar: 2',
        '  baz: 3',
      );
      assert.strictEqual(getYamlPath(text, 3), 'en.baz');
    });

    it('deeply nested with siblings at multiple levels', () => {
      const text = yaml(
        'en:',
        '  section_a:',
        '    x: 1',
        '  section_b:',
        '    y: 2',
        '    nested:',
        '      z: 3',
      );
      assert.strictEqual(getYamlPath(text, 6), 'en.section_b.nested.z');
    });
  });
});
