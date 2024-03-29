﻿/**
 * The sanity levels.
 * @enum {number}
 * @readonly
 */
DuSanity.Level = {
    UNKNOWN: -1,
    OK: 0,
    INFO: 1,
    WARNING: 2,
    DANGER: 3,
    CRITICAL: 4,
    FATAL: 5
}

/**
 * The current sanity level
 * @type {DuSanity.Level}
 * @readonly
 */
DuSanity.currentLevel = DuSanity.Level.UNKNOWN;

/**
 * Fixes the issues for the given test, if possible
 * @param {DuSanity.Test} test The test to fix
 * @return {DuSanity.Level} The level after the fix
 */
DuSanity.fix = function(test) {
    if (!DuSanity.needsFix(test)) return test.currentLevel;
    test.fix();
    return test(true);
}

/**
 * Checks if the the live fix is enabled for the given test
 * @param {DuSanity.Test} test The test
 * @return {boolean} True if the test live fix is enabled
 */
DuSanity.isLiveFixEnabled = function (test)
{
    var fix = DuESF.settings.get("sanity/fix/" + test.stringId, false);
    return fix && test.hasAutoFix;
}

/**
 * Enables or disables the live fix for the given test
 * @param {DuSanity.Test} test The test
 * @param {boolean} [enabled=true]
 */
DuSanity.setLiveFixEnabled = function (test, enabled)
{
    DuESF.settings.set("sanity/fix/" + test.stringId, enabled);
    DuESF.settings.save();
}

/**
 * Checks if the fiven test needs a fix
 * @param {DuSanity.Test} test The test to fix
 * @return {boolean} True if the test needs a fix
 */
DuSanity.needsFix = function ( test ) {
    
    var liveFix = DuESF.settings.get("sanity/fix/" + test.stringId, false);
    return liveFix && test.currentLevel >= DuSanity.Level.DANGER && test.hasFix;
}

/**
 * Checks if the fiven test is enabled for the current project
 * @param {DuSanity.Test} test The test
 * @return {boolean} True if the test is enabled for the current project
 */
DuSanity.isProjectEnabled = function( test ) {
    //Init project settings
    DuAEProject.settings.update();
    DuAEProject.settings.data.sanity = def(DuAEProject.settings.data.sanity, {});
    DuAEProject.settings.data.sanity[test.stringId] = def(DuAEProject.settings.data.sanity[test.stringId], true);
    return DuAEProject.settings.data.sanity[test.stringId];
}

/**
 * Checks if the fiven test is globally enabled
 * @param {DuSanity.Test} test The test
 * @return {boolean} True if the test is enabled
 */
DuSanity.isGloballyEnabled = function (test)
{
    return DuESF.settings.get("sanity/" + test.stringId, true);
}

/**
 * Globally enables or disables the test
 * @param {DuSanity.Test} test The test
 * @param {boolean} [enabled=true]
 */
DuSanity.setGloballyEnabled = function (test, enabled)
{
    DuESF.settings.set("sanity/" + test.stringId, enabled);
    DuESF.settings.save();
}

/**
 * Checks if a Sanity Test is enabled
 * @param {DuSanity.Test} test The test
 * @return {boolean}
 */
DuSanity.isEnabled = function(test)
{
    var project = DuSanity.isProjectEnabled(test)

    if (project) 
    {
        //check DuAEF settings
        test.enabled = DuSanity.isGloballyEnabled(test);
    }
    else 
    {
        test.enabled = false;
    }
    
    return test.enabled;
}

/**
 * Enables or disables the test
 * @param {DuSanity.Test} test The test
 * @param {boolean} [enabled=true]
 */
DuSanity.setEnabled = function (test, enabled)
{
    if (enabled) 
    {
        //First run
        test();
        test.enabled = true;
    }
    else 
    {
        test.enabled = false;
    }
}

/**
 * Enables or disables the test for the current project only
 * @param {DuSanity.Test} test The test
 * @param {boolean} [enabled=true]
 */
DuSanity.setProjectEnabled = function (test, enabled)
{
    //Init project settings
    DuAEProject.settings.update();
    DuAEProject.settings.data.sanity = def(DuAEProject.settings.data.sanity, {});
    DuAEProject.settings.data.sanity[test.stringId] = enabled;
    DuAEProject.settings.save();
}

/**
 * Sets the timeout for the test
 * @param {DuSanity.Test} test The test
 * @param {int} timeOut The time out in milliseconds.
 */
DuSanity.setTimeOut = function (test, timeOut)
{
    var enabled = test.enabled;
    DuSanity.setEnabled(test, false);
    DuESF.settings.set("sanity/timeOut/" + test.stringId, timeOut);
    DuESF.settings.save();
    DuSanity.setEnabled(test, enabled);
}

/**
 * Runs a test
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 * @param {boolean} [force=false] To improve performance, the test may be automatically paused. Set this to true to force it to run if calling this method.
 * @return {DuSanity.Level} The level of the result of the test.
 */
DuSanity.runTest = function(test, dontFix, force) {
    dontFix = def(dontFix, false);
    force = def(force, false);

    var elapsed = Date.now() - test.lastRun;
    var timedOut = elapsed > test.timeOut;

    var result = test.currentLevel;

    if (force || timedOut) {
        result = test(dontFix, force);
        test.lastRun = Date.now();
    }

    if(DuSanity.currentLevel < result) DuSanity.currentLevel = result;
    
    return result;
}

//low-level undocumented function: checks a value against a limit and sets the results in the UI
//returns the level
DuSanity.checkLevel = function(value, limit)
{
    if (value < limit*0.66)
    {
        return DuSanity.Level.OK;
    }

    if (value < limit*0.75)
    {
        return DuSanity.Level.INFO;
    }
    
    if (value < limit)
    {
        return DuSanity.Level.WARNING;
    }
    
    if (value < limit * 1.5)
    {
        return DuSanity.Level.DANGER;
    }
    
    return DuSanity.Level.CRITICAL;
}

/**
 * All the available tests.
 * @namespace
 * @category DuSanity
 */
DuSanity.Test = {};

/**
 * Checks if some compositions share the same name.
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 * @param {boolean} [force=false] To improve performance, this test may be automatically paused. Set this to true to force it to run if calling this method.
 */
DuSanity.Test.compNames = function ( dontFix, force ) {
    dontFix = def(dontFix, false);
    force = def(force, false);

    if ( DuSanity.Test.projectSize.currentLevel > DuSanity.Level.WARNING ) {
        DuSanity.Test.compNames.info = "Project too big";
        DuSanity.Test.compNames.tip = "The project is too big to run this test automatically. Use the 'Refresh' button to run it now.";
        DuSanity.Test.compNames.paused = true;
    }
    else if ( DuSanity.Test.projectItems.currentLevel > DuSanity.Level.WARNING ) {
        DuSanity.Test.compNames.info = "Too many items";
        DuSanity.Test.compNames.tip = "The project contains too many items to run this test automatically.\nUse the 'Refresh' button to run it now.";
        DuSanity.Test.compNames.paused = true;
    }
    else {
        DuSanity.Test.compNames.paused = false;
    }

    if (!force && DuSanity.Test.compNames.paused) {
        DuSanity.Test.compNames.currentLevel = DuSanity.Level.UNKNOWN;
        return DuSanity.Test.compNames.currentLevel;
    }

    var duplicatedNames = DuAEProject.checkCompNames();
    if (duplicatedNames.length == 0)
    {
        DuSanity.Test.compNames.info = "";
        DuSanity.Test.compNames.tip = "";
        DuSanity.Test.compNames.currentLevel = DuSanity.Level.OK;
    }
    else
    {
        DuSanity.Test.compNames.info = duplicatedNames.length;
        DuSanity.Test.compNames.tip = "Some compositions have the same name:";
        for (name in duplicatedNames)
        {
            if (name == 'length') continue;
            if (duplicatedNames.hasOwnProperty(name))
            {
                DuSanity.Test.compNames.tip += "\n- " + name;
            }
        }
        DuSanity.Test.compNames.currentLevel = DuSanity.Level.DANGER;
    }

    if (dontFix) return DuSanity.Test.compNames.currentLevel;
    return DuSanity.fix( DuSanity.Test.compNames );

}
DuSanity.Test.compNames.lastRun = 0;
DuSanity.Test.compNames.stringId = 'compNames';
DuSanity.Test.compNames.info = '';
DuSanity.Test.compNames.tip = '';
DuSanity.Test.compNames.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.compNames.enabled = true;
DuSanity.Test.compNames.id = 0;
DuSanity.Test.compNames.hasFix = true;
DuSanity.Test.compNames.hasAutoFix = true;
DuSanity.Test.compNames.timeOut = 600000;
DuSanity.Test.compNames.paused = false;
DuSanity.Test.compNames.testName = ""; // Added during init
DuSanity.Test.compNames.options = {}; // Added during init
DuSanity.Test.compNames.fix = function() {
    DuAE.beginUndoGroup( i18n._("Fix") + ': ' + DuSanity.Test.compNames.testName);

    var duplicatedNames = DuAEProject.checkCompNames();
    for (name in duplicatedNames)
    {
        if (name == 'length') continue;
        if (duplicatedNames.hasOwnProperty(name))
        {
            DuAEProject.setUniqueCompNames( duplicatedNames[name] );
        }
    }

    DuAE.endUndoGroup();
}

/**
 * Checks if some layers share the same name in the current comp.
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.layerNames = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var duplicatedNames = DuAEComp.checkLayerNames();
    if (duplicatedNames.length == 0)
    {
        DuSanity.Test.layerNames.info = ""
        DuSanity.Test.layerNames.tip = ""
        DuSanity.Test.layerNames.currentLevel = DuSanity.Level.OK;
    }
    else
    {
        DuSanity.Test.layerNames.info = duplicatedNames.length;
        DuSanity.Test.layerNames.tip = "Some layers have the same name:";
        for (name in duplicatedNames)
        {
            if (name == 'length') continue;
            if (duplicatedNames.hasOwnProperty(name))
            {
                DuSanity.Test.layerNames.tip += "\n- " + name;
                for (var i = 0, n = duplicatedNames[name].length; i < n; i++)
                {
                    DuSanity.Test.layerNames.tip += " | " + duplicatedNames[name][i].index;
                }
            }
        }
        DuSanity.Test.layerNames.currentLevel = DuSanity.Level.DANGER;
    }

    if (dontFix) return DuSanity.Test.layerNames.currentLevel;
    return DuSanity.fix( DuSanity.Test.layerNames );

}
DuSanity.Test.layerNames.lastRun = 0;
DuSanity.Test.layerNames.stringId = 'layerNames';
DuSanity.Test.layerNames.info = '';
DuSanity.Test.layerNames.tip = '';
DuSanity.Test.layerNames.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.layerNames.enabled = true;
DuSanity.Test.layerNames.id = 0;
DuSanity.Test.layerNames.hasFix = true;
DuSanity.Test.layerNames.hasAutoFix = true;
DuSanity.Test.layerNames.timeOut = 60000;
DuSanity.Test.layerNames.testName = ""; // Added during init
DuSanity.Test.layerNames.options = {}; // Added during init
DuSanity.Test.layerNames.fix = function() {
    DuAE.beginUndoGroup( i18n._("Fix") + ': ' + DuSanity.Test.layerNames.testName);

    var duplicatedNames = DuAEComp.checkLayerNames();
    for (name in duplicatedNames)
    {
        if (name == 'length') continue;
        if (duplicatedNames.hasOwnProperty(name))
        {
            DuAEComp.setUniqueLayerNames( duplicatedNames[name] );
        }
    }

    DuAE.endUndoGroup();
}

/**
 * Checks the expression engine.
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.expressionEngine = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var e = DuAEProject.expressionEngine();
    if (e.indexOf("javascript") == 0)
    {
        DuSanity.Test.expressionEngine.info = "";
        DuSanity.Test.expressionEngine.tip = "";
        DuSanity.Test.expressionEngine.currentLevel = DuSanity.Level.OK;
    }
    else
    {
        DuSanity.Test.expressionEngine.info = "ES";
        DuSanity.Test.expressionEngine.tip = "The expression engine is set to 'ExtendScript Legacy'\n'JavaScript' improves performance, you can change it in the project settings.";
        DuSanity.Test.expressionEngine.currentLevel = DuSanity.Level.DANGER;
    }

    if (dontFix) return  DuSanity.Test.expressionEngine.currentLevel;
    return DuSanity.fix( DuSanity.Test.expressionEngine );

}
DuSanity.Test.expressionEngine.lastRun = 0;
DuSanity.Test.expressionEngine.stringId = 'expressionEngine';
DuSanity.Test.expressionEngine.info = '';
DuSanity.Test.expressionEngine.tip = '';
DuSanity.Test.expressionEngine.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.expressionEngine.enabled = true;
DuSanity.Test.expressionEngine.id = 0;
DuSanity.Test.expressionEngine.hasFix = true;
DuSanity.Test.expressionEngine.hasAutoFix = true;
DuSanity.Test.expressionEngine.timeOut = 1800000;
DuSanity.Test.expressionEngine.testName = ""; // Added during init
DuSanity.Test.expressionEngine.options = {}; // Added during init
DuSanity.Test.expressionEngine.fix = function() {
    DuAE.beginUndoGroup( i18n._("Fix") + ': ' + DuSanity.Test.expressionEngine.testName);

    app.project.expressionEngine = 'javascript-1.0';

    DuAE.endUndoGroup();
}

/**
 * Checks the project size
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.projectSize = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var size = DuAEProject.getSize();
    
    var sizeLimit = DuESF.settings.get("sanity/options/" + DuSanity.Test.projectSize.stringId + "/sizeLimit", 100) * 1000000;

    if (size < 0 && app.project.numItems > 0)
    {
        DuSanity.Test.projectSize.info = "Not saved";
        DuSanity.Test.projectSize.tip = "You should save this project right now!";
        DuSanity.Test.projectSize.currentLevel = DuSanity.Level.FATAL;
        return DuSanity.Test.projectSize.currentLevel;
    }
    else if (size < 0)
    {
        DuSanity.Test.projectSize.info = "";
        DuSanity.Test.projectSize.tip = "";
        DuSanity.Test.projectSize.currentLevel = DuSanity.Level.OK;
    }
    else
    {
        DuSanity.Test.projectSize.info = DuString.fromSize(size);
        DuSanity.Test.projectSize.tip = "Try to keep the project small (e.g. do not animate several shots in the same project).";
        DuSanity.Test.projectSize.currentLevel = DuSanity.checkLevel(size, sizeLimit);
    }

    if (dontFix) return  DuSanity.Test.projectSize.currentLevel;
    return DuSanity.fix( DuSanity.Test.projectSize );
}
DuSanity.Test.projectSize.lastRun = 0;
DuSanity.Test.projectSize.stringId = 'projectSize';
DuSanity.Test.projectSize.info = '';
DuSanity.Test.projectSize.tip = '';
DuSanity.Test.projectSize.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.projectSize.enabled = true;
DuSanity.Test.projectSize.id = 0;
DuSanity.Test.projectSize.hasFix = false;
DuSanity.Test.projectSize.hasAutoFix = false;
DuSanity.Test.projectSize.testName = ""; // Added during init
DuSanity.Test.projectSize.options = {}; // Added during init
DuSanity.Test.projectSize.timeOut = 60000;

/**
 * Checks the project size
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.projectItems = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var n = app.project.numItems;
    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.projectItems.stringId + "/itemsLimit", 1000);

    DuSanity.Test.projectItems.info = n + " items";
    DuSanity.Test.projectItems.tip = "Try to keep the project small (e.g. do not animate several shots in the same project).";
    DuSanity.Test.projectItems.currentLevel = DuSanity.checkLevel(n, limit);

    if (dontFix) return  DuSanity.Test.projectItems.currentLevel;
    return DuSanity.fix( DuSanity.Test.projectItems );
}
DuSanity.Test.projectItems.lastRun = 0;
DuSanity.Test.projectItems.stringId = 'projectItems';
DuSanity.Test.projectItems.info = '';
DuSanity.Test.projectItems.tip = '';
DuSanity.Test.projectItems.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.projectItems.enabled = true;
DuSanity.Test.projectItems.id = 0;
DuSanity.Test.projectItems.hasFix = false;
DuSanity.Test.projectItems.hasAutoFix = false;
DuSanity.Test.projectItems.testName = ""; // Added during init
DuSanity.Test.projectItems.options = {}; // Added during init
DuSanity.Test.projectItems.timeOut = 600000;

/**
 * Checks if some items have the same source file
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 * @param {boolean} [force=false] To improve performance, this test may be automatically paused. Set this to true to force it to run if calling this method.
 */
DuSanity.Test.itemSources = function ( dontFix, force ) {
    dontFix = def(dontFix, false);
    force = def(force, false);

    if ( DuSanity.Test.projectSize.currentLevel > DuSanity.Level.WARNING ) {
        DuSanity.Test.itemSources.info = "Project too big";
        DuSanity.Test.itemSources.tip = "The project is too big to run this test automatically. Use the 'Refresh' button to run it now.";
        DuSanity.Test.itemSources.paused = true;
    }
    else if ( DuSanity.Test.projectItems.currentLevel > DuSanity.Level.WARNING ) {
        DuSanity.Test.itemSources.info = "Too many items";
        DuSanity.Test.itemSources.tip = "The project contains too many items to run this test automatically.\nUse the 'Refresh' button to run it now.";
        DuSanity.Test.itemSources.paused = true;
    }
    else {
        DuSanity.Test.itemSources.paused = false;
    }

    if (!force && DuSanity.Test.itemSources.paused) {
        DuSanity.Test.itemSources.currentLevel = DuSanity.Level.UNKNOWN;
        return DuSanity.Test.itemSources.currentLevel;
    }

    var duplicatedSources = {};
    duplicatedSources.length = 0;
    var sources = {};
    
    for (var i = 1, n = app.project.numItems; i <= n; i++)
    {
        var item = app.project.item(i);
        if (!(item instanceof FootageItem)) continue;
        var source  = item.mainSource;
        if (!(source instanceof FileSource)) continue;
        var file = source.file.fsName;
  
        if (DuAE.isLayeredFile(file)) continue;

        if (duplicatedSources[file])
        {
            duplicatedSources[file].push(item);
            continue;
        }
        if ( sources[file]) 
        {
            duplicatedSources[file] = [sources[file], item];
            duplicatedSources.length++;
            continue;
        }

        sources[file] = item;
    }

    if (duplicatedSources.length == 0)
    {
        DuSanity.Test.itemSources.info = "";
        DuSanity.Test.itemSources.tip = "";
        DuSanity.Test.itemSources.currentLevel = DuSanity.Level.OK;
    }
    else
    {
        DuSanity.Test.itemSources.info = duplicatedSources.length + " items";
        DuSanity.Test.itemSources.tip = "Some footages share the same sources:";
        for (var file in duplicatedSources)
        {
            if (file == 'length') continue;
            if (duplicatedSources.hasOwnProperty(file))
            {
                DuSanity.Test.itemSources.tip += "\n- " + file;
            }
        }
        DuSanity.Test.itemSources.currentLevel = DuSanity.Level.DANGER;
    }

    if (dontFix) return  DuSanity.Test.itemSources.currentLevel;
    return DuSanity.fix( DuSanity.Test.itemSources );
}
DuSanity.Test.itemSources.lastRun = 0;
DuSanity.Test.itemSources.stringId = 'itemSources';
DuSanity.Test.itemSources.info = '';
DuSanity.Test.itemSources.tip = '';
DuSanity.Test.itemSources.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.itemSources.enabled = true;
DuSanity.Test.itemSources.id = 0;
DuSanity.Test.itemSources.hasFix = false;
DuSanity.Test.itemSources.hasAutoFix = false;
DuSanity.Test.itemSources.timeOut = 1800000;
DuSanity.Test.itemSources.testName = ""; // Added during init
DuSanity.Test.itemSources.options = {}; // Added during init
DuSanity.Test.itemSources.paused = false;

/**
 * Checks if some items (footages) are not used
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.unusedItems = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var limit = 10;
    var unused = DuAEProject.getUnusedFootages();

    DuSanity.Test.unusedItems.currentLevel = DuSanity.checkLevel(unused.length, limit);

    if (DuSanity.Test.unusedItems.currentLevel > DuSanity.Level.OK) 
    {
        DuSanity.Test.unusedItems.info = unused.length + " footages";
        DuSanity.Test.unusedItems.tip = "Found some footages which are unused. You should remove them.";
        for (var i = 0, n = unused.length; i < n; i++)
        {
            DuSanity.Test.unusedItems.tip += "\n- " + unused[i].name;
        }
    }
    else
    {
        DuSanity.Test.unusedItems.info = "";
        DuSanity.Test.unusedItems.tip = "";
    }

    if (dontFix) return  DuSanity.Test.unusedItems.currentLevel;
    return DuSanity.fix( DuSanity.Test.unusedItems );
}
DuSanity.Test.unusedItems.lastRun = 0;
DuSanity.Test.unusedItems.stringId = 'unusedItems';
DuSanity.Test.unusedItems.info = '';
DuSanity.Test.unusedItems.tip = '';
DuSanity.Test.unusedItems.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.unusedItems.enabled = true;
DuSanity.Test.unusedItems.id = 0;
DuSanity.Test.unusedItems.hasFix = true;
DuSanity.Test.unusedItems.hasAutoFix = true;
DuSanity.Test.unusedItems.timeOut = 1800000;
DuSanity.Test.unusedItems.testName = ""; // Added during init
DuSanity.Test.unusedItems.options = {}; // Added during init
DuSanity.Test.unusedItems.fix = function () {
    DuAE.beginUndoGroup( i18n._("Fix") + ': ' + DuSanity.Test.unusedItems.testName);

    var unused = DuAEProject.getUnusedFootages();
    for (var i = unused.length-1; i >= 0; i--)
    {
        unused[i].remove();
    }

    DuAE.endUndoGroup();
};

/**
 * Checks if some precomps are in the root of the project
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.precomps = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var precomps = DuAEProject.getPrecompsAtRoot();
    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.precomps.stringId + "/maxPrecompsAtRoot", 1);

    DuSanity.Test.precomps.currentLevel = DuSanity.checkLevel(precomps.length, limit);
    DuSanity.Test.precomps.tip = "";
    DuSanity.Test.precomps.info = "";

    if (DuSanity.Test.precomps.currentLevel > DuSanity.Level.OK)
    {
        DuSanity.Test.precomps.info = precomps.length + " comps";
        DuSanity.Test.precomps.tip = "Some precompositions are at the root of the project.\n" + 
            "They should be moved in a subfolder.";
        for (var i = 0, n = precomps.length; i<n; i++)
        {
            DuSanity.Test.precomps.tip += "\n- " + precomps[i].name;
        }
    }

    if (dontFix) return  DuSanity.Test.precomps.currentLevel;
    return DuSanity.fix( DuSanity.Test.precomps );
}
DuSanity.Test.precomps.lastRun = 0;
DuSanity.Test.precomps.stringId = 'precomps';
DuSanity.Test.precomps.info = '';
DuSanity.Test.precomps.tip = '';
DuSanity.Test.precomps.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.precomps.enabled = true;
DuSanity.Test.precomps.id = 0;
DuSanity.Test.precomps.hasFix = true;
DuSanity.Test.precomps.hasAutoFix = true;
DuSanity.Test.precomps.timeOut = 600000;
DuSanity.Test.precomps.testName = ""; // Added during init
DuSanity.Test.precomps.options = {}; // Added during init
DuSanity.Test.precomps.fix = function () {
    DuAE.beginUndoGroup( i18n._("Fix") + ': ' + DuSanity.Test.precomps.testName);

    var precomps = DuAEProject.getPrecompsAtRoot();
    var precompFolderName = DuESF.settings.get("sanity/options/" + DuSanity.Test.precomps.stringId + "/precompsFolder", "Precomps");
    var precompFolder = DuAEProject.getFolderItem( precompFolderName );
    if (!precompFolder) precompFolder = app.project.items.addFolder(precompFolderName);
    for (var i = 0, n = precomps.length; i < n; i++)
    {
        precomps[i].parentFolder = precompFolder;
    }

    DuAE.endUndoGroup();
};

/**
 * Checks if there are multiple comps in the root of the project
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.unusedComps = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var folderName = DuESF.settings.get("sanity/options/" + DuSanity.Test.unusedComps.stringId + "/mainCompsFolder", "" );
    if (folderName == 'Project root') folderName = '';
    var unusedFolder = DuAEProject.getFolderItem( folderName );
    var comps = DuAEProject.getUnusedComps(unusedFolder);
    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.unusedComps.stringId + "/maxUnusedComps", 1);

    DuSanity.Test.unusedComps.currentLevel = DuSanity.checkLevel(comps.length, limit);
    DuSanity.Test.unusedComps.tip = "";
    DuSanity.Test.unusedComps.info = "";

    if (DuSanity.Test.unusedComps.currentLevel > DuSanity.Level.OK)
    {
        DuSanity.Test.unusedComps.info = comps.length + " comps";
        DuSanity.Test.unusedComps.tip = "Some main compositions are stored in subfolders.\n" + 
            "It is easier to keep them at the root of the project, or they should be removed if they're not needed anymore.";
        for (var i = 0, n = comps.length; i<n; i++)
        {
            DuSanity.Test.unusedComps.tip += "\n- " + comps[i].name;
        }
    }

    if (dontFix) return  DuSanity.Test.unusedComps.currentLevel;
    return DuSanity.fix( DuSanity.Test.unusedComps );
}
DuSanity.Test.unusedComps.lastRun = 0;
DuSanity.Test.unusedComps.stringId = 'unusedComps';
DuSanity.Test.unusedComps.info = '';
DuSanity.Test.unusedComps.tip = '';
DuSanity.Test.unusedComps.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.unusedComps.enabled = true;
DuSanity.Test.unusedComps.id = 0;
DuSanity.Test.unusedComps.hasFix = true;
DuSanity.Test.unusedComps.hasAutoFix = false;
DuSanity.Test.unusedComps.timeOut = 1800000;
DuSanity.Test.unusedComps.testName = ""; // Added during init
DuSanity.Test.unusedComps.options = {}; // Added during init
DuSanity.Test.unusedComps.fix = function () {
    
    var unusedFolderName = DuESF.settings.get("sanity/options/" + DuSanity.Test.unusedComps.stringId + "/mainCompsFolder", "Project root");
    var unusedFolder = DuAEProject.getFolderItem( unusedFolderName );
    var comps = DuAEProject.getUnusedComps(unusedFolder);
    if (comps.length > 0)
    {
        var dlg = DuScriptUI.popUp("Fix Unused Compositions", 'column', true);
        DuScriptUI.staticText(dlg.content, comps.length + " seemingly unused comps. have been found in this project.\nWhat do you want to do with them?");
        var slctr = DuScriptUI.selector(dlg.content);
        slctr.addButton("Remove unused compositions");
        slctr.addButton("Collect unused comps. into folder:");
        slctr.setCurrentIndex(1);
        var folderEdit =  DuScriptUI.editText(dlg.content,unusedFolderName, undefined, undefined, "Project Root");
        folderEdit.alignment = ['fill','top'];
        var validGrp = DuScriptUI.group(dlg.content, 'row');
        validGrp.alignment = ['fill','bottom'];
        var cnclBtn = DuScriptUI.button(validGrp, "Cancel");
        var okBtn = DuScriptUI.button(validGrp, "Fix");
        slctr.onChange = function() {
            folderEdit.enabled = slctr.index == 1;
        }
        cnclBtn.onClick = dlg.cancel;
        okBtn.onClick = function() {

            DuAE.beginUndoGroup( i18n._("Fix") + ': ' + DuSanity.Test.unusedComps.testName);
            
            if (slctr.index == 1)
            {
                var unusedFolderName = folderEdit.text;
                var unusedFolder = DuAEProject.getFolderItem( unusedFolderName );
            
                if (!unusedFolder)
                {
                    unusedFolder = app.project.items.addFolder(unusedFolderName);
                }
                for (var i = 0, n = comps.length; i < n ; i++)
                {
                    comps[i].parentFolder = unusedFolder;
                }
            }
            else
            {
                for (var i = 0, n = comps.length; i < n ; i++)
                {
                    comps[i].remove();
                }
            }
            
            DuAE.endUndoGroup();
            dlg.cancel();
        };

        dlg.show();
    }    
};

/**
 * Checks the memory in use
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.memory = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var mem = app.memoryInUse ;
    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.memory.stringId + "/memoryLimit", 8) * 1073741824;

    DuSanity.Test.memory.info = DuString.fromSize(mem);
    DuSanity.Test.memory.tip = "If the memory used gets too high, it may be good to purge the cache and free some space.";
    DuSanity.Test.memory.currentLevel = DuSanity.checkLevel(mem, limit);

    if (dontFix) return  DuSanity.Test.memory.currentLevel;
    return DuSanity.fix( DuSanity.Test.memory );
}
DuSanity.Test.memory.lastRun = 0;
DuSanity.Test.memory.stringId = 'memory';
DuSanity.Test.memory.info = '';
DuSanity.Test.memory.tip = '';
DuSanity.Test.memory.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.memory.enabled = true;
DuSanity.Test.memory.id = 0;
DuSanity.Test.memory.hasFix = true;
DuSanity.Test.memory.hasAutoFix = false;
DuSanity.Test.memory.timeOut = 300000;
DuSanity.Test.memory.testName = ""; // Added during init
DuSanity.Test.memory.options = {}; // Added during init
DuSanity.Test.memory.fix = function() {
    app.purge(PurgeTarget.SNAPSHOT_CACHES);
    app.purge(PurgeTarget.IMAGE_CACHES);

    var ok = confirm("We've purged what can be purged without impacting your workflow. We can now purge more memory, but you will lose your undo history.\n\nDo you want to continue?");
    if (ok) {
        app.purge(PurgeTarget.UNDO_CACHES);
        app.purge(PurgeTarget.ALL_CACHES);
    }

    DuSanity.Test.memory();
}

/**
 * Checks the number of essential properties in the current comp
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.essentialProperties = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var n = DuAEComp.numMasterProperties();
    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.essentialProperties.stringId + "/maxEssentialProps", 40);

    DuSanity.Test.essentialProperties.info = n;
    DuSanity.Test.essentialProperties.tip = "Having a lot of Master Properties in the current composition has a very bad impact on performance.";
    DuSanity.Test.essentialProperties.currentLevel = DuSanity.checkLevel(n, limit);

    if (dontFix) return  DuSanity.Test.essentialProperties.currentLevel;
    return DuSanity.fix( DuSanity.Test.essentialProperties );
}
DuSanity.Test.essentialProperties.lastRun = 0;
DuSanity.Test.essentialProperties.stringId = 'essentialProperties';
DuSanity.Test.essentialProperties.info = '';
DuSanity.Test.essentialProperties.tip = '';
DuSanity.Test.essentialProperties.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.essentialProperties.enabled = true;
DuSanity.Test.essentialProperties.id = 0;
DuSanity.Test.essentialProperties.hasFix = false;
DuSanity.Test.essentialProperties.hasAutoFix = false;
DuSanity.Test.essentialProperties.timeOut = 300000;
DuSanity.Test.essentialProperties.testName = ""; // Added during init
DuSanity.Test.essentialProperties.options = {}; // Added during init

/**
 * Checks the elapsed time since last save
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.save = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var proj = app.project;
    var f = app.project.file;
    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.save.stringId + "/timeout", 30) * 60000;

    if (!app.project.dirty) {
        DuSanity.Test.save.info = "";
        DuSanity.Test.save.tip = "";
        DuSanity.Test.save.currentLevel = DuSanity.Level.OK;
        return DuSanity.Test.save.currentLevel;
    }
    if (!(f instanceof File) && app.project.numItems > 0)
    {
        DuSanity.Test.save.info = "Not saved";
        DuSanity.Test.save.tip = "This project has not been saved yet. You should save it right now!";
        DuSanity.Test.save.currentLevel = DuSanity.Level.FATAL;
        return DuSanity.Test.save.currentLevel;
    }
    else if (!(f instanceof File))
    {
        DuSanity.Test.save.info = "";
        DuSanity.Test.save.tip = "";
        DuSanity.Test.save.currentLevel = DuSanity.Level.OK;
        return DuSanity.Test.save.currentLevel;
    }
    
    if (!f.exists)
    {
        DuSanity.Test.save.info = "Missing file";
        DuSanity.Test.save.tip = "It looks like the file for this project has disappeared. You should save it right now!";
        DuSanity.Test.save.currentLevel = DuSanity.Level.FATAL;
        return DuSanity.Test.save.currentLevel;
    }

    var date = f.modified.getTime();
    var now = new Date().getTime();
    var elapsed =  now - date;
    var elapsedStr = Math.round(elapsed/60000) + "mn";

    DuSanity.Test.save.info = elapsedStr;
    DuSanity.Test.save.tip = "You should save the project regularly.";
    DuSanity.Test.save.currentLevel = DuSanity.checkLevel(elapsed, limit);

    if (dontFix) return  DuSanity.Test.save.currentLevel;
    return DuSanity.fix( DuSanity.Test.save );
}
DuSanity.Test.save.lastRun = 0;
DuSanity.Test.save.stringId = 'save';
DuSanity.Test.save.info = '';
DuSanity.Test.save.tip = '';
DuSanity.Test.save.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.save.enabled = true;
DuSanity.Test.save.id = 0;
DuSanity.Test.save.hasFix = true;
DuSanity.Test.save.hasAutoFix = true;
DuSanity.Test.save.timeOut = 900000;
DuSanity.Test.save.testName = ""; // Added during init
DuSanity.Test.save.options = {}; // Added during init
DuSanity.Test.save.fix = function() {
    app.project.save();
}

/**
 * Checks the up time of After Effects
 * @param {boolean} [dontFix=false] If false, will automatically fix the issue.
 */
DuSanity.Test.upTime = function ( dontFix ) {
    dontFix = def(dontFix, false);

    var limit = DuESF.settings.get("sanity/options/" + DuSanity.Test.upTime.stringId +"/timeout", 180);

    $.global.DuSan = def($.global.DuSan, {});

    $.global.DuSan.AEStartTime = def($.global.DuSan.AEStartTime, Date.now());
    // Check time elapsed and convert to minutes
    var elapsed = Date.now() - $.global.DuSan.AEStartTime;
    elapsed /= 60000;
    elapsed = Math.round(elapsed);
    
    DuSanity.Test.upTime.currentLevel = DuSanity.checkLevel(elapsed, limit);

    DuSanity.Test.upTime.info = elapsed + ' mn';
    DuSanity.Test.upTime.tip = "When After Effects stays up for too long, it gets tired.\n\nRestarting After Effects regularly helps keep the memory usage low and improves performance.";

    if (dontFix) return  DuSanity.Test.upTime.currentLevel;
    return DuSanity.fix( DuSanity.Test.upTime );
}
DuSanity.Test.upTime.lastRun = 0;
DuSanity.Test.upTime.stringId = 'upTime';
DuSanity.Test.upTime.info = '';
DuSanity.Test.upTime.tip = '';
DuSanity.Test.upTime.currentLevel = DuSanity.Level.UNKNOWN;
DuSanity.Test.upTime.enabled = true;
DuSanity.Test.upTime.id = 0;
DuSanity.Test.upTime.hasFix = true;
DuSanity.Test.upTime.hasAutoFix = false;
DuSanity.Test.upTime.timeOut = 900000;
DuSanity.Test.upTime.testName = ""; // Added during init
DuSanity.Test.upTime.options = {}; // Added during init
DuSanity.Test.upTime.fix = function() {
    app.quit();
}