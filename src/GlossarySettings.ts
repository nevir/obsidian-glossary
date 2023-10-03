import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

export interface GlossarySettings {
  showRibbonIcon: boolean;
}

export const DEFAULT_SETTINGS: GlossarySettings = {
  showRibbonIcon: true,
};


export class GlossarySettingsTab extends PluginSettingTab {
  constructor(
    app: App,
    plugin: Plugin,
    private settings: GlossarySettings,
    private setSettings: (newSettings: GlossarySettings) => unknown
  ) {
    super(app, plugin);
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('App Ribbon')
      .setDesc('Whether to show a button to view the glossary via the app ribbon.')
      .addToggle(component => component
        .setValue(this.settings.showRibbonIcon)
        .onChange(value => {
          this.setSettings({ ...this.settings, showRibbonIcon: value });
        })
      );
  }
}
