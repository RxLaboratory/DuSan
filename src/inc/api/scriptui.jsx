/**
 * UI tools to show sanity levels and settings
 * @namespace
 * @memberof DuSanity
 * @category DuSanity
 */
DuSanity.UI = {}

// The list of icons and labels in the ui, kept to update them
DuSanity.UI.items = [];

/**
 * Creates an icon to show the current sanity level
 * @param {Group} container A ScriptUI group where to add the icon
 * @param {boolean} [addLabel=true] Adds a label next to the icon
 * @param {boolean} [autoUpdate=true] If true, the icon will be automatically updated according to the current sanity level. Otherwise, call setLevel to change the level.
 * @return {Group} The ScriptUI Group containing the icon and its label
 */
DuSanity.UI.icon = function( container, addLabel, autoUpdate ) {
    addLabel = def(addLabel, true);
    autoUpdate = def(autoUpdate, true);

    // Add status
    var statusGroup = DuScriptUI.group(container, 'row');
    statusGroup.spacing = 3;

    var statusIconGroup = DuScriptUI.group(statusGroup, 'stacked');
    statusIconGroup.alignment = ['left', 'center'];

    var statusUnknownIcon = statusIconGroup.add('image', undefined, w12_check.binAsString );
    statusUnknownIcon.helpTip = i18n._("Sanity status: Unknown");
    var statusOKIcon = statusIconGroup.add('image', undefined, w12_check_g.binAsString );
    statusOKIcon.helpTip = i18n._("Sanity status: OK");
    var statusInfoIcon = statusIconGroup.add('image', undefined, w12_information.binAsString );
    statusInfoIcon.helpTip = i18n._("Sanity status: Information");
    var statusWarningIcon = statusIconGroup.add('image', undefined, w12_warning.binAsString );
    statusWarningIcon.helpTip = i18n._("Sanity status: Warning");
    var statusDangerIcon = statusIconGroup.add('image', undefined, w12_danger.binAsString );
    statusDangerIcon.helpTip = i18n._("Sanity status: Danger");
    var statusCriticalIcon = statusIconGroup.add('image', undefined, w12_critical.binAsString );
    statusCriticalIcon.helpTip = i18n._("Sanity status: Critical");
    var statusFatalIcon = statusIconGroup.add('image', undefined, w12_fatal.binAsString );
    statusFatalIcon.helpTip = i18n._("Sanity status: Fatal");

    statusIconGroup.setLevel = function( level ) {
        statusUnknownIcon.visible = level == DuSanity.Level.UNKNOWN;
        statusOKIcon.visible = level == DuSanity.Level.OK;
        statusInfoIcon.visible = level == DuSanity.Level.INFO;
        statusWarningIcon.visible = level == DuSanity.Level.WARNING;
        statusDangerIcon.visible = level == DuSanity.Level.DANGER;
        statusCriticalIcon.visible = level == DuSanity.Level.CRITICAL;
        statusFatalIcon.visible = level == DuSanity.Level.FATAL;
    };

    if (addLabel) {
        var statusLabel = DuScriptUI.staticText( statusGroup, {
            text: i18n._("OK"),
            color: DuColor.Color.LIGHT_GREEN
        });
        statusLabel.alignment = ['fill', 'center'];
        statusLabel.setLevel = function( level ) {
            if (level == DuSanity.Level.UNKNOWN) {
                statusLabel.text = i18n._("Unknown");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.APP_TEXT_COLOR.darker());
            }
            else if (level == DuSanity.Level.OK) {
                statusLabel.text = i18n._("OK");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.LIGHT_GREEN);
            }
            else if (level == DuSanity.Level.INFO) {
                statusLabel.text = i18n._("Information");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.LIGHT_BLUE);
            }
            else if (level == DuSanity.Level.WARNING) {
                statusLabel.text = i18n._("Warning");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.YELLOW);
            }
            else if (level == DuSanity.Level.DANGER) {
                statusLabel.text = i18n._("Danger");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.ORANGE);
            }
            else if (level == DuSanity.Level.CRITICAL) {
                statusLabel.text = i18n._("Critical");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.RAINBOX_RED);
            }
            else if (level == DuSanity.Level.FATAL) {
                statusLabel.text = i18n._("Fatal");
                DuScriptUI.setTextColor( statusLabel, DuColor.Color.RX_PURPLE);
            }
        };
    }

    statusGroup.setLevel = function( level ) {
        if (addLabel) statusLabel.setLevel( level );
        statusIconGroup.setLevel( level );
    }
    statusGroup.setInfo = function( info ) {
        if (!addLabel) return;
        if (info != "") statusLabel.text = statusLabel.text + ' - ' + info;
    }
    statusGroup.setHelpTip = function( tip ) {
        if (addLabel) statusLabel.helpTip = tip;
    }

    statusGroup.setLevel(DuSanity.Level.UNKNOWN);

    if (autoUpdate) DuSanity.UI.items.push(statusGroup);

    return statusGroup;
}

/**
 * Creates a button to show the current sanity level
 * @param {Group} container A ScriptUI group where to add the button
 * @param {boolean} [addLabel=true] Adds a label next to the icon
 * @param {boolean} [autoUpdate=true] If true, the button will be automatically updated according to the current sanity level. Otherwise, call setLevel to change the level.
 * @return {DuButton} The DuButton
 */
DuSanity.UI.button = function( container, addLabel, autoUpdate ) {
    addLabel = def(addLabel, true);
    autoUpdate = def(autoUpdate, true);

    var options = {};
    if (addLabel) options.text = i18n._("Unknown");
    else options.text = '';
    options.image = w12_check;
    options.helpTip = i18n._("Sanity status: Unknown");

    var button = DuScriptUI.button( container, options);

    button.setLevel = function( level ) {
        if (level == DuSanity.Level.UNKNOWN) {
            button.setText( i18n._("Unknown") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.darker());
            button.setHelpTip( i18n._("Sanity status: Unknown") );
            button.setImage( w12_check );
        }
        else if (level == DuSanity.Level.OK) {
            button.setText( i18n._("OK") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.LIGHT_GREEN);
            button.setHelpTip( i18n._("Sanity status: OK") );
            button.setImage( w12_check_g );
        }
        else if (level == DuSanity.Level.INFO) {
            button.setText( i18n._("Information") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.LIGHT_BLUE);
            button.setHelpTip( i18n._("Sanity status: Information") );
            button.setImage( w12_information );
        }
        else if (level == DuSanity.Level.WARNING) {
            button.setText( i18n._("Warning") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.YELLOW);
            button.setHelpTip( i18n._("Sanity status: Warning") );
            button.setImage( w12_warning );
        }
        else if (level == DuSanity.Level.DANGER) {
            button.setText( i18n._("Danger") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.ORANGE);
            button.setHelpTip( i18n._("Sanity status: Danger") );
            button.setImage( w12_danger );
        }
        else if (level == DuSanity.Level.CRITICAL) {
            button.setText( i18n._("Critical") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.RAINBOX_RED);
            button.setHelpTip( i18n._("Sanity status: Critical"));
            button.setImage( w12_critical );
        }
        else if (level == DuSanity.Level.FATAL) {
            button.setText( i18n._("Fatal") );
            button.setTextColor( DuColor.Color.APP_TEXT_COLOR.RX_PURPLE);
            button.setHelpTip( i18n._("Sanity status: Fatal") );
            button.setImage( w12_fatal);
        }
    };

    if (autoUpdate) DuSanity.UI.items.push(button);

    return button;
}

/**
 * Creates a panel showing all tests and current status
 * @param {Group} container The ScriptUI Group containing the DuSanity panel
 * @return {Group} The panel
 */
DuSanity.UI.panel = function(container) {
    // Add tests
    for (var k in DuSanity.Test) {
        if (DuSanity.Test.hasOwnProperty(k)) DuSanity.UI.test( container, DuSanity.Test[k] );
    }

    DuScriptUI.separator(container);
    // Run all button
    var runAllButton = DuScriptUI.button( container, {
        text: i18n._("Run all tests"),  /// TRANSLATORS: sanity test
        helpTip: i18n._("Run all the tests and displays the results."), /// TRANSLATORS: sanity test
        image: DuScriptUI.Icon.UPDATE,
        alignment: 'center',
        orientation: 'row'
    });
    runAllButton.alignment = ['fill', 'top'];
    runAllButton.onClick = function() { DuSanity.run(true); };
}

/**
 * Adds the UI to display a test in the UI
 * @param {Group} container A ScriptUI group where to add the test report
 * @param {DuSanity.Test} test The test to show
 * @return {Group} The ScriptUI Group containing the test report
 */
DuSanity.UI.test = function (container, test) {
    // Util: updates the UI for the current test
    function updateUI() {
        group.setChecked( DuSanity.isGloballyEnabled(test) );
        projectEnableButton.setChecked( DuSanity.isProjectEnabled(test) );
        liveFixButton.setChecked( DuSanity.isLiveFixEnabled(test) );

        if (!DuSanity.isEnabled(test))
        {
            statusIcon.setLevel(DuSanity.Level.UNKNOWN);
            return;
        }

        statusIcon.setLevel( test.currentLevel );
        statusIcon.setInfo( test.info );
        statusIcon.setHelpTip( test.tip );
    }

    var group = DuScriptUI.settingField( container, test.testName, 250 );
    group.onClick = function() {
        var c = group.checked;
        
        if (!c) projectEnableButton.setChecked(false);
        else projectEnableButton.setChecked( DuSanity.isProjectEnabled( test ) );
        projectEnableButton.enabled = c;

        DuSanity.setGloballyEnabled(test, c);
        DuSanity.setEnabled(test, c && projectEnableButton.checked);
        updateUI();
    };

    var projectEnableButton = DuScriptUI.checkBox(group, {
        text: '',
        image: w16_file_d,
        imageChecked: w16_file,
        helpTip: i18n._("Toggle this test for the current project only.") /// TRANSLATORS: sanity test
    });
    projectEnableButton.alignment = ['left', 'center'];
    projectEnableButton.onClick = function () {
        var c = projectEnableButton.checked;
        DuSanity.setProjectEnabled(test, c)
        DuSanity.setEnabled(test, c);
        updateUI();
    };

    var liveFixButton = DuScriptUI.checkBox(group, {
        text: '',
        image: w16_live_fix_d,
        imageChecked: w16_live_fix,
        helpTip: i18n._("Enable or disable automatic live-fix.") /// TRANSLATORS: (automatic)live fix for a sanity test
    });
    liveFixButton.alignment = ['left', 'center'];
    liveFixButton.visible = test.hasAutoFix;
    liveFixButton.onClick = function() {
        DuSanity.setLiveFixEnabled(test, liveFixButton.checked);
    };

    var fixButton = DuScriptUI.button(group, {
        text: '',
        image: w16_fix,
        helpTip: i18n._("Fix now.") /// TRANSLATORS: fix an issue detected by sanity tests
    });
    fixButton.alignment = ['left', 'center'];
    fixButton.visible = test.hasFix;
    fixButton.onClick = function() {
        test.fix();
        test();
        updateUI();
    };

    var statusIcon = DuSanity.UI.icon(group, true, false);
    statusIcon.alignment = ['fill', 'center'];

    var refreshButton = DuScriptUI.button( group, {
        text: '',
        image: DuScriptUI.Icon.UPDATE,
        helpTip: i18n._("Run the current test.") /// TRANSLATORS: sanity test
    });
    refreshButton.alignment = ['right', 'center'];
    refreshButton.onClick = function() { DuSanity.runTest( test, false, true ); updateUI(); };

    var optionsButton = DuScriptUI.button(group, {
        text: '',
        image: DuScriptUI.Icon.OPTIONS,
        helpTip: i18n._("Change the test settings.") /// TRANSLATORS: sanity test
    });
    optionsButton.alignment = ['right', 'center'];

    var optionsPopup = DuScriptUI.popUp( i18n._("Options") + ' (' + test.testName + ')');

    var timeG = DuScriptUI.group(optionsPopup.content, 'row');
    DuScriptUI.staticText(timeG, i18n._("Test every:")); /// TRANSLATORS: sanity test, label for duration between two tests
    var timeOut = DuESF.settings.get("sanity/timeOut" + test.stringId, test.timeOut);
    var timeOutStr = timeOut.toString();
    var unit = "ms";
    if (timeOut > 1000)
    {
        timeOutStr = (timeOut / 1000).toString();
        unit = "s";
    }
    if (timeOut > 60000)
    {
        timeOutStr = (timeOut / 60000).toString();
        unit = "mn";
    }
    var timeOutEdit = DuScriptUI.editText( timeG, {
        text: timeOutStr,
        suffix: ' ' + unit,
        localize: false
    });
    timeOutEdit.onChange = function()
    {
        var t = parseInt(timeOutEdit.text);
        if (unit == " s") t = t*1000;
        if (unit == " mn") t = t*60000;
        DuSanity.setTimeOut(test, t);
    };
    // Add custom options
    if (isdef(test.options)) {
        for (var o in test.options) {
            if (!test.options.hasOwnProperty(o)) continue;
            var option = test.options[o];
            var optG = DuScriptUI.group( optionsPopup.content, 'row');
            DuScriptUI.staticText(optG, option.description + ':');
            if (jstype(option.value) == 'number' || jstype(option.value) == 'string' ) {
                var optB = DuScriptUI.editText( optG, {
                    text: DuESF.settings.get("sanity/options/" + test.stringId + "/" + o, option.value).toString(),
                    placeHolder: i18n._("Default")
                });
                optB.onChange = function () {
                    DuESF.settings.set("sanity/options/" + test.stringId + "/" + o, optB.text);
                    DuESF.settings.save();
                    test();
                }
            }
            else if ( jstype(option.value) == 'boolean' )
            {
                var optB = DuScriptUI.simpleCheckBox(  optG );
                optB.onClick = function () {
                    DuESF.settings.set("sanity/options/" + test.stringId + "/" + o, optB.checked);
                    DuESF.settings.save();
                    test();
                }
            }
        }
    }

    optionsPopup.tieTo(optionsButton);

    //First run
    updateUI();
    //add to events
    DuScriptUI.addEvent(updateUI, 1000);
}