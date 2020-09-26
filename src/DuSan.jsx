#include 'dusan_required/dusan_header.jsxinc'

//TODO
//polices manquantes

// Main Functions
function checkSanity()
{
    var level = DuAEF.DuSanity.currentLevel;
    if (level == DuAEF.DuSanity.Levels.UNKNOWN)
    {
        ui_sanityButton.label.text = "Sanity level: unknown";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.AE_DARK_GREY);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else if (level == DuAEF.DuSanity.Levels.OK)
    {
        ui_sanityButton.label.text = "Sanity level: OK";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.VERY_DARK_GREY);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.LIGHT_GREY);
    }
    else if (level == DuAEF.DuSanity.Levels.INFO)
    {
        ui_sanityButton.label.text = "Sanity level: INFO";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.VERY_DARK_GREY);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.AFTER_EFFECTS_BLUE);
    }
    else if (level == DuAEF.DuSanity.Levels.WARNING)
    {
        ui_sanityButton.label.text = "Sanity level: WARNING";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.YELLOW);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.VERY_DARK_GREY);
    }
    else if (level == DuAEF.DuSanity.Levels.BAD)
    {
        ui_sanityButton.label.text = "Sanity level: BAD";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.ORANGE);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.BLACK);
    }
    else if (level == DuAEF.DuSanity.Levels.CRITICAL)
    {
        ui_sanityButton.label.text = "Sanity level: CRITICAL";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.RAINBOX_RED);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.WHITE);
    }
    else if (level == DuAEF.DuSanity.Levels.FATAL)
    {
        ui_sanityButton.label.text = "Sanity level: FATAL";
        ui_sanityButton.setBackgroundColor(DuAEF.DuJS.Color.Colors.LIGHT_PURPLE);
        ui_sanityButton.setTextColor(DuAEF.DuJS.Color.Colors.WHITE);
    }
}

//UI
var ui_sanityButton = DuAEF.DuScriptUI.addButton(ui.mainGroup, "Sanity level: unknown-------------------------------------");
ui_sanityButton.onClick = function () {
    ui.mainGroup.visible = false;
    ui.sanityGroup.visible = true;
}

DuAEF.DuScriptUI.addEvent(checkSanity);


#include 'dusan_required/dusan_footer.jsxinc'