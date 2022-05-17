![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2022;updated:2022/05/17)

# Use DuSan

![](img/screenshot.png)

*DuSan* periodically runs the tests displayed in this list and shows the result there.

!!! note
    DuSan doesn't actually run the tests at regular intervals, but schedules them to run when the user interacts with its panel. This is a way to be sure to limit its impact on the performance of *After Effects*. You just have to move the mouse over the panel from time to time to update the test results.

For each test:

- The **checkbox** on the left globally enables or disables the test.
- ![](img/icons/file_d.svg){: style="width:16px;"} enables or disables the test only for the current project. This setting is saved in the project file.
- ![](img/icons/live_fix_d.svg){: style="width:16px;"} enables or disables the *live fix*: when enabled, DuSan will automatically (try to) fix any issue reported by the corresponding test as soon as it happens.
- ![](img/icons/fix.svg){: style="width:16px;"} Fixes any issue reported by the corresponding test.

The status may show one of these icons:

- ![](img/icons/check_g.svg){: style="width:16px;"}: OK
- ![](img/icons/information.svg){: style="width:16px;"}: Information
- ![](img/icons/warning.svg){: style="width:16px;"}: Warning
- ![](img/icons/danger.svg){: style="width:16px;"}: Danger
- ![](img/icons/critical.svg){: style="width:16px;"}: Critical
- ![](img/icons/fatal.svg){: style="width:16px;"}: Fatal
- ![](img/icons/check.svg){: style="width:16px;"}: Unknown

Finally, the two buttons on the right:

- ![](img/icons/update.svg){: style="width:16px;"} Runs the test and shows its result.
- ![](img/icons/options.svg){: style="width:16px;"} Shows some options for the test.
  - You can set the update frequency for the test.
  - Some more options may be shown, as in the screenshot below.

![](img/options.png)