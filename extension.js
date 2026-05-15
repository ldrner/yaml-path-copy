'use strict';

const vscode = require('vscode');
const { getYamlPath } = require('./src/yaml-path');

function activate(context) {
  const cmd = vscode.commands.registerCommand('yaml-path-copy.copyPath', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {return;}

    const path = getYamlPath(editor.document.getText(), editor.selection.active.line);
    if (!path) {
      vscode.window.showWarningMessage('Could not determine YAML path at cursor');
      return;
    }

    vscode.env.clipboard.writeText(path).then(() => {
      vscode.window.showInformationMessage(`Copied: ${path}`);
    });
  });

  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
