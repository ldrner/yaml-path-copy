'use strict';

function getIndent(line) {
  return line.match(/^(\s*)/)[1].length;
}

function getKey(line) {
  const trimmed = line.trimStart();
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('-')) {return null;}
  const match = trimmed.match(/^([^:#\n\[\{]+?)(\s*):(\s|$)/);
  return match ? match[1].trim() : null;
}

/**
 * @param {string} text  full document text
 * @param {number} lineNumber  0-based line index of cursor
 * @returns {string|null}  dotted YAML path or null if not on a key
 */
function getYamlPath(text, lineNumber) {
  const lines = text.split('\n');
  const currentLine = lines[lineNumber];
  if (currentLine === undefined) {return null;}

  const currentKey = getKey(currentLine);
  if (!currentKey) {return null;}

  let targetIndent = getIndent(currentLine);
  const path = [currentKey];

  for (let i = lineNumber - 1; i >= 0 && targetIndent > 0; i--) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {continue;}
    const indent = getIndent(line);
    if (indent < targetIndent) {
      const key = getKey(line);
      if (key) {
        path.unshift(key);
        targetIndent = indent;
      }
    }
  }

  return path.join('.');
}

module.exports = { getYamlPath };
