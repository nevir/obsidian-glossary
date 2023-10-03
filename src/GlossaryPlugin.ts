import { Notice, Plugin } from "obsidian";

import { DEFAULT_SETTINGS, GlossarySettings, GlossarySettingsTab } from "./GlossarySettings";

export default class GlossaryPlugin extends Plugin {
  settings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new GlossarySettingsTab(this.app, this, this.settings, async (newSettings) => {
      await this.saveSettings(newSettings);
      await this.renderFromSettings();
    }));

    this.renderFromSettings();
  }

  // State

  _ribbonIcon?: HTMLElement;

  async renderFromSettings() {
    const { showRibbonIcon } = this.settings;

    if (showRibbonIcon && !this._ribbonIcon) {
      this._ribbonIcon = this.addRibbonIcon('dice', 'stuff', () => {
        new Notice('ohai');
      });
    } else if (!showRibbonIcon && this._ribbonIcon) {
      this._ribbonIcon.remove();
      delete this._ribbonIcon;
    }
  }

  // Persistence

  async loadSettings() {
    const { settings } = await this.loadData() ?? {};
    this.settings = { ...DEFAULT_SETTINGS, ...settings };
  }

  async saveSettings(newSettings: GlossarySettings) {
    this.settings = { ...DEFAULT_SETTINGS, ...newSettings };
    await this.saveData({ settings: this.settings });
  }
}
