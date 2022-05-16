#include 'dusan_required/dusan_header.jsxinc'

//TODO
//polices manquantes

//icons
var im = DuAEF.DuBinary.toFile(w25_brain_m);
var ib = DuAEF.DuBinary.toFile(w25_brain_b);
var iy = DuAEF.DuBinary.toFile(w25_brain_y);
var io = DuAEF.DuBinary.toFile(w25_brain_o);
var ir = DuAEF.DuBinary.toFile(w25_brain_r);
var ip = DuAEF.DuBinary.toFile(w25_brain_p);

// Main Functions
function checkSanity()
{
    var level = DuAEF.DuSanity.currentLevel;
    if (level == DuAEF.DuSanity.Levels.UNKNOWN)
    {
        ui_sanityButton.setStandardImage(im);
        ui_sanityButton.label.text = "Unknown";
    }
    else if (level == DuAEF.DuSanity.Levels.OK)
    {
        ui_sanityButton.setStandardImage(im);
        ui_sanityButton.label.text = "OK";
    }
    else if (level == DuAEF.DuSanity.Levels.INFO)
    {
        ui_sanityButton.setStandardImage(ib);
        ui_sanityButton.label.text = "Info";
    }
    else if (level == DuAEF.DuSanity.Levels.WARNING)
    {
        ui_sanityButton.setStandardImage(iy);
        ui_sanityButton.label.text = "WARNING";
    }
    else if (level == DuAEF.DuSanity.Levels.BAD)
    {
        ui_sanityButton.setStandardImage(io);
        ui_sanityButton.label.text = "BAD";
    }
    else if (level == DuAEF.DuSanity.Levels.CRITICAL)
    {
        ui_sanityButton.setStandardImage(ir);
        ui_sanityButton.label.text = "CRITICAL";
    }
    else if (level == DuAEF.DuSanity.Levels.FATAL)
    {
        ui_sanityButton.setStandardImage(ip);
        ui_sanityButton.label.text = "FATAL";
    }
}

//UI
var ui_sanityButton = DuAEF.DuScriptUI.addButton(
    ui.mainGroup,
    "Unknown",
    im,
    "",
    ir
    );

ui_sanityButton.label.minimumSize = [50,0];
ui.sanityGroup.tieTo(ui_sanityButton);
/*ui_sanityButton.onClick = function () {
    ui.sanityGroup.visible = !ui.sanityGroup.visible;
}*/

DuAEF.DuScriptUI.addEvent(checkSanity);
checkSanity();


#include 'dusan_required/dusan_footer.jsxinc'