'use strict';

const assert = require('assert');
const vscode = require('vscode');

suite('Extension Integration', () => {
  test('command is registered', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('yaml-path-copy.copyPath'), 'yaml-path-copy.copyPath not registered');
  });

  test('copies 3-level path to clipboard', async () => {
    const content = 'en:\n  api:\n    key: value\n';
    const doc = await vscode.workspace.openTextDocument({ content, language: 'yaml' });
    const editor = await vscode.window.showTextDocument(doc);

    const pos = new vscode.Position(2, 4);
    editor.selection = new vscode.Selection(pos, pos);

    await vscode.commands.executeCommand('yaml-path-copy.copyPath');

    const result = await vscode.env.clipboard.readText();
    assert.strictEqual(result, 'en.api.key');
  });

  test('copies root-level key to clipboard', async () => {
    const content = 'en:\n  foo: bar\n';
    const doc = await vscode.workspace.openTextDocument({ content, language: 'yaml' });
    const editor = await vscode.window.showTextDocument(doc);

    const pos = new vscode.Position(0, 0);
    editor.selection = new vscode.Selection(pos, pos);

    await vscode.commands.executeCommand('yaml-path-copy.copyPath');

    const result = await vscode.env.clipboard.readText();
    assert.strictEqual(result, 'en');
  });

  test('strips excluded prefix from copied path', async () => {
    const config = vscode.workspace.getConfiguration('yaml-path-copy');
    await config.update('excludePrefixes', ['en'], vscode.ConfigurationTarget.Global);

    try {
      const content = 'en:\n  base:\n    action: value\n';
      const doc = await vscode.workspace.openTextDocument({ content, language: 'yaml' });
      const editor = await vscode.window.showTextDocument(doc);

      const pos = new vscode.Position(2, 4);
      editor.selection = new vscode.Selection(pos, pos);

      await vscode.commands.executeCommand('yaml-path-copy.copyPath');

      const result = await vscode.env.clipboard.readText();
      assert.strictEqual(result, 'base.action');
    } finally {
      await config.update('excludePrefixes', undefined, vscode.ConfigurationTarget.Global);
    }
  });

  test('copies full path when no prefix matches', async () => {
    const config = vscode.workspace.getConfiguration('yaml-path-copy');
    await config.update('excludePrefixes', ['ar'], vscode.ConfigurationTarget.Global);

    try {
      const content = 'en:\n  base:\n    action: value\n';
      const doc = await vscode.workspace.openTextDocument({ content, language: 'yaml' });
      const editor = await vscode.window.showTextDocument(doc);

      const pos = new vscode.Position(2, 4);
      editor.selection = new vscode.Selection(pos, pos);

      await vscode.commands.executeCommand('yaml-path-copy.copyPath');

      const result = await vscode.env.clipboard.readText();
      assert.strictEqual(result, 'en.base.action');
    } finally {
      await config.update('excludePrefixes', undefined, vscode.ConfigurationTarget.Global);
    }
  });

  test('shows warning when cursor is on non-key line', async () => {
    const content = 'en:\n  # comment\n  foo: bar\n';
    const doc = await vscode.workspace.openTextDocument({ content, language: 'yaml' });
    const editor = await vscode.window.showTextDocument(doc);

    const pos = new vscode.Position(1, 0);
    editor.selection = new vscode.Selection(pos, pos);

    // Command should not throw even on non-key lines
    await assert.doesNotReject(() =>
      vscode.commands.executeCommand('yaml-path-copy.copyPath')
    );
  });
});
