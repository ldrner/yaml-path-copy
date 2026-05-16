'use strict';

const vscode = require('vscode');
const { getYamlPath, stripPrefixes } = require('./src/yaml-path');

function activate(context) {
  const cmd = vscode.commands.registerCommand('yaml-path-copy.copyPath', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {return;}

    const rawPath = getYamlPath(editor.document.getText(), editor.selection.active.line);
    if (!rawPath) {
      vscode.window.showWarningMessage('Could not determine YAML path at cursor');
      return;
    }

    const config = vscode.workspace.getConfiguration('yaml-path-copy');
    const prefixes = config.get('excludePrefixes', []);
    const path = stripPrefixes(rawPath, prefixes);

    vscode.env.clipboard.writeText(path).then(() => {
      vscode.window.showInformationMessage(`Copied: ${path}`);
    });
  });

  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
