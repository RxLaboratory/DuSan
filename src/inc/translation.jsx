#include "config/translations.jsxinc"

DuESF.preInitMethods.push(function ()
{
    // Extract translations
    var outputFolder = DuESF.scriptSettings.file.parent.absoluteURI + '/';

    DuSan_fr.toFile( outputFolder + 'DuSan_fr.json', false );
    DuSan_pd.toFile( outputFolder + 'DuSan_pd.json', false );
    DuSan_de.toFile( outputFolder + 'DuSan_de.json', false );
    DuSan_zh.toFile( outputFolder + 'DuSan_zh.json', false );
    DuSan_es.toFile( outputFolder + 'DuSan_es.json', false );
});