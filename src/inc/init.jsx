function init()
{
    // This is required
    DuAEF.init( scriptName, scriptVersion, companyName);

    // Setting these may prove useful
    DuESF.chatURL = chatURL;
    DuESF.bugReportURL = bugReportURL;
    DuESF.aboutURL = aboutURL;
    DuESF.docURL = docURL;
    DuESF.scriptAbout = scriptAbout;
    DuESF.companyURL = companyURL;
    DuESF.rxVersionURL = rxVersionURL;
    DuESF.isPreRelease = isPreRelease;
    DuESF.translateURL = translateURL;

    language();
}

function language( )
{
    DuScriptUI.askLanguage( version, thisObj );
}

function version( )
{
    DuScriptUI.checkUpdate( buildUI, thisObj );
}

init();