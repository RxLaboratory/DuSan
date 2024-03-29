
DuSanity.initialized = false;

/**
 * Runs all sanity tests
 * @param {boolean} [force=false] Force running all tests even if they've not timed out yet.
 */
DuSanity.run = function( force ) {
    if (!DuSanity.initialized) return;

    force = def(force, false);

    // Runs all tests and get the result
    DuSanity.currentLevel = DuSanity.Level.OK;

    var level = DuSanity.Level.UNKNOWN;
    for (var k in DuSanity.Test) {
        if (!DuSanity.Test.hasOwnProperty(k)) continue;
        var test = DuSanity.Test[k];
        if (DuSanity.isEnabled(test)) {
            var testLevel = test.currentLevel;
            testLevel = DuSanity.runTest(test, false, force);
            if (testLevel > level) level = testLevel;
        }
    }

    DuSanity.currentLevel = level;

    // Update UI
    for(var i = 0; i < DuSanity.UI.items.length; i++) {
        DuSanity.UI.items[i].setLevel( DuSanity.currentLevel );
    }

}

/**
 * This function must be called once when everything in the script is ready and after {@link DuAEF.init}
 */
DuSanity.init = function() {
    // A single global variable to keep track of Ae Uptime
    $.global.DuSan = def($.global.DuSan, {});
    $.global.DuSan.AEStartTime = def($.global.DuSan.AEStartTime, Date.now());

    // Add options (just now to translate the description)
    DuSanity.Test.projectSize.options = {
        sizeLimit: {
            value: 100,
            description: i18n._("Size limit (MB)")
        }
    };

    DuSanity.Test.projectItems.options = {
        itemsLimit: {
            value: 1000,
            description: i18n._("Maximum number of items")
        }
    };

    DuSanity.Test.precomps.options = {
        maxPrecompsAtRoot: {
            value: 0,
            description: i18n._("Maximum number of precompositions in the root folder")
        },
        precompsFolder: {
            value: "Precomps",
            description: i18n._("Default folder for precompositions")
        }
    };

    DuSanity.Test.unusedComps.options = {
        maxUnusedComps: {
            value: 0,
            description: i18n._("Maximum unused comps in the project")
        },
        mainCompsFolder: {
            value: "Project root",
            description: i18n._("Folder for main comps (leave empty for project root)")
        }
    };

    DuSanity.Test.memory.options = {
        memoryLimit: {
            value: 8,
            description: i18n._("Maximum memory (GB)")
        }
    };

    DuSanity.Test.essentialProperties.options = {
        maxEssentialProps: {
            value: 40,
            description: i18n._("Maximum number of essential properties in a comp")
        }
    };

    DuSanity.Test.save.options = {
        timeout: {
            value: 30,
            description: i18n._("Time limit before saving the project (mn)")
        }
    };

    DuSanity.Test.upTime.options = {
        timeout: {
            value: 180,
            description: i18n._("Uptime limit (mn)")
        }
    };

    // Add names
    DuSanity.Test.compNames.testName = i18n._('Composition Names');
    DuSanity.Test.layerNames.testName = i18n._('Layer Names');
    DuSanity.Test.expressionEngine.testName = i18n._('Expression engine');
    DuSanity.Test.projectSize.testName = i18n._('Project size');
    DuSanity.Test.projectItems.testName = i18n._('Project items');
    DuSanity.Test.itemSources.testName = i18n._('Duplicated footages');
    DuSanity.Test.unusedItems.testName = i18n._('Unused footages');
    DuSanity.Test.precomps.testName = i18n._('Precompositions');
    DuSanity.Test.unusedComps.testName = i18n._('Main compositions');
    DuSanity.Test.memory.testName = i18n._('Memory in use');
    DuSanity.Test.essentialProperties.testName = i18n._('Essential properties');
    DuSanity.Test.save.testName = i18n._('Time since last save');
    DuSanity.Test.upTime.testName = i18n._('Up time');
};
DuESF.initMethods.push( DuSanity.init );

DuSanity.enterRunTime = function() {

    DuDebug.log( "DuSanity: entering runtime..." );
    
    if (DuSanity.initialized) return;

    // Enable tests
    for (var k in DuSanity.Test) {
        if (!DuSanity.Test.hasOwnProperty(k)) continue;
        var test = DuSanity.Test[k];
        DuSanity.setEnabled(test, DuSanity.isProjectEnabled(test) && DuSanity.isGloballyEnabled(test));        
    }

    // first run
    DuDebug.log( "DuSanity: First run" );
    DuSanity.run(true);
    // Add event
    DuDebug.log( "DuSanity: Adding event..." );
    DuScriptUI.addEvent(DuSanity.run);

    DuSanity.initialized = true;

    DuDebug.log( "DuSanity: Runtime!" );
};
DuESF.enterRunTimeMethods.push( DuSanity.enterRunTime );
