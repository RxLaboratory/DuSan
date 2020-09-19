#include 'dusan_required/dusan_header.jsxinc'

DuAEF.debug = true;

//TODO
//polices manquantes

// Main Functions

function checkSave()
{
    var proj = app.project;

    var f = app.project.file;
    var limit = 60000;
    if (!(f instanceof File))
    {
        ui_saveText.setText("CRITICAL (Not saved)");
        DuAEF.DuScriptUI.setTextColor(ui_compNamesText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
    else if (!f.exists)
    {
        ui_saveText.setText("CRITICAL (Missing file)");
        DuAEF.DuScriptUI.setTextColor(ui_compNamesText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
    else
    {
        var date = f.modified.getTime();
        var now = new Date().getTime();
        var elapsed =  now - date;
        var elapsedStr = Math.round(elapsed/60000) + "mn";
        if (elapsed < limit*0.75)
        {
            ui_saveText.setText("OK (" + elapsedStr + ")");
            DuAEF.DuScriptUI.setTextColor(ui_saveText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
        }
        else if (elapsed < limit)
        {
            ui_saveText.setText("WARNING (" + elapsedStr + ")");
            DuAEF.DuScriptUI.setTextColor(ui_saveText, DuAEF.DuJS.Color.Colors.YELLOW);
        }
        else if (elapsed < limit * 1.5)
        {
            ui_saveText.setText("BAD (" + elapsedStr + ")");
            DuAEF.DuScriptUI.setTextColor(ui_saveText, DuAEF.DuJS.Color.Colors.ORANGE);
        }
        else
        {
            ui_saveText.setText("CRITICAL (" + elapsedStr + ")");
            DuAEF.DuScriptUI.setTextColor(ui_saveText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
        }
    }
}

function checkCompNames()
{
    var duplicatedNames = DuAEF.DuAE.Project.checkCompNames();
    if (duplicatedNames.length == 0)
    {
        ui_compNamesText.setText("OK");
        DuAEF.DuScriptUI.setTextColor(ui_compNamesText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else
    {
        ui_compNamesText.setText("BAD");
        DuAEF.DuScriptUI.setTextColor(ui_compNamesText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
}

function checkLayerNames()
{
    var duplicatedNames = DuAEF.DuAE.Comp.checkLayerNames();
    if (duplicatedNames.length == 0)
    {
        ui_layerNamesText.setText("OK");
        DuAEF.DuScriptUI.setTextColor(ui_layerNamesText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else
    {
        ui_layerNamesText.setText("BAD");
        DuAEF.DuScriptUI.setTextColor(ui_layerNamesText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
}

function checkProjectSize()
{
    var size = DuAEF.DuAE.Project.getSize();
    var sizeLimit = 10000000;
    if (size < 0)
    {
        ui_projectSizeText.setText("CRITICAL (not saved)");
        DuAEF.DuScriptUI.setTextColor(ui_projectSizeText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
    else if (size < sizeLimit*0.75)
    {
        ui_projectSizeText.setText("OK (" + DuAEF.DuJS.String.fromSize(size) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_projectSizeText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else if (size < sizeLimit)
    {
        ui_projectSizeText.setText("WARNING (" + DuAEF.DuJS.String.fromSize(size) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_projectSizeText, DuAEF.DuJS.Color.Colors.YELLOW);
    }
    else if (size < sizeLimit * 1.5)
    {
        ui_projectSizeText.setText("BAD (" + DuAEF.DuJS.String.fromSize(size) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_projectSizeText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
    else
    {
        ui_projectSizeText.setText("CRITICAL (" + DuAEF.DuJS.String.fromSize(size) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_projectSizeText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
}

function checkExpressionEngine()
{
    var e = DuAEF.DuAE.Project.expressionEngine();
    if (e.indexOf("javascript") == 0)
    {
        ui_expressionText.setText("OK (JS)");
        DuAEF.DuScriptUI.setTextColor(ui_expressionText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else
    {
        ui_expressionText.setText("BAD (ES)");
        DuAEF.DuScriptUI.setTextColor(ui_expressionText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
}

function checkNumItems()
{
    var n = app.project.numItems;
    var limit = 100;
    if (n < limit * 0.75)
    {
        ui_numItemsText.setText("OK (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_numItemsText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else if (n < limit)
    {
        ui_numItemsText.setText("WARNING (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_numItemsText, DuAEF.DuJS.Color.Colors.YELLOW);
    }
    else if (n < limit*1.5)
    {
        ui_numItemsText.setText("BAD (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_numItemsText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
    else
    {
        ui_numItemsText.setText("CRITICAL (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_numItemsText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
}

function checkMemory()
{
    var mem = app.memoryInUse;
    var limit = 2147483648‬; //2GB
    if (mem < limit * 0.75)
    {
        ui_memoryText.setText("OK (" + DuAEF.DuJS.String.fromSize(mem) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_memoryText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else if (mem < limit)
    {
        ui_memoryText.setText("WARNING (" + DuAEF.DuJS.String.fromSize(mem) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_memoryText, DuAEF.DuJS.Color.Colors.YELLOW);
    }
    else if (mem < limit*1.5)
    {
        ui_memoryText.setText("BAD (" + DuAEF.DuJS.String.fromSize(mem) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_memoryText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
    else
    {
        ui_memoryText.setText("CRITICAL (" + DuAEF.DuJS.String.fromSize(mem) + ")");
        DuAEF.DuScriptUI.setTextColor(ui_memoryText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
}

function checkMP()
{
    var n = DuAEF.DuAE.Comp.numMasterProperties();
    var limit = 20;
    if (n < limit * 0.75)
    {
        ui_MPText.setText("OK (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_MPText, DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else if (n < limit)
    {
        ui_MPText.setText("WARNING (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_MPText, DuAEF.DuJS.Color.Colors.YELLOW);
    }
    else if (n < limit*1.5)
    {
        ui_MPText.setText("BAD (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_MPText, DuAEF.DuJS.Color.Colors.ORANGE);
    }
    else
    {
        ui_MPText.setText("CRITICAL (" + n + ")");
        DuAEF.DuScriptUI.setTextColor(ui_MPText, DuAEF.DuJS.Color.Colors.RAINBOX_RED);
    }
}

function refresh()
{
    if ( ui_checkCompNamesButton.checked ) checkCompNames();
    checkLayerNames();
    checkProjectSize();
    checkExpressionEngine();
    checkNumItems();
    checkMemory();
    checkMP();
    checkSave();
}

// UI Events

function ui_checkButton_clicked()
{
    refresh();
}

//Settings
var ui_checkCompNamesButton = DuAEF.DuScriptUI.addCheckBox(ui.settingsGroup, "Check comp names", undefined, "Checks if some compositions in the project share the same name."); 
//Main Panel
//Report
var ui_reportMainGroup = DuAEF.DuScriptUI.addGroup(ui.mainGroup, "row");
var ui_reportLeftGroup = DuAEF.DuScriptUI.addGroup(ui_reportMainGroup, "column");
var ui_reportRightGroup = DuAEF.DuScriptUI.addGroup(ui_reportMainGroup, "column");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Composition Names:");
var ui_compNamesText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Layer Names:");
var ui_layerNamesText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Expression Engine:");
var ui_expressionText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Project Size:");
var ui_projectSizeText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Project Items:");
var ui_numItemsText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Memory in use:");
var ui_memoryText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Master properties in active comp:");
var ui_MPText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "----------------------------");
DuAEF.DuScriptUI.addStaticText(ui_reportLeftGroup, "Time since last save:");
var ui_saveText = DuAEF.DuScriptUI.addStaticText(ui_reportRightGroup, "---------------------------------------------");

var ui_checkButton = DuAEF.DuScriptUI.addButton(ui.mainGroup, "Refresh!", undefined, "Runs the sanity tests.");

//Load settings/defaults
ui_checkCompNamesButton.setChecked(true);

ui_checkButton.onClick = ui_checkButton_clicked;

//First tests
refresh();
//add to events
DuAEF.DuScriptUI.addEvent(refresh);

#include 'dusan_required/dusan_footer.jsxinc'