function buildUI()
{       
    var ui = DuScriptUI.scriptPanel( thisObj, true, true, mainScriptFile );
    ui.addCommonSettings();

    // Settings
    //#include "settings.jsx"
    //buildSettingsUI( ui.settingsGroup );

    // Get the UI mode
    var uiMode = DuESF.scriptSettings.get("common/uiMode", 0);

    // Add Sanity status without label
    DuSanity.UI.icon( ui.bottomGroup, false ).alignment = ['right', 'center'];