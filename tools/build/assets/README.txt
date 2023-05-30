(c) 2022 RxLaboratory, Nicolas Dufresne and contributors  
Copying and distribution of this file, with or without modification,
are permitted in any medium without royalty provided the copyright
notice and this notice are preserved.  This file is offered as-is,
without any warranty.

# DuSan

Sanity tests for Adobe After Effects

DuSan periodically runs some tests during an After Effects session to detect anything which might go wrong or lead to poor performance
(like the project size, memory in use, layers sharing the same name, number of essential properties...).
It can be used as a stand-alone ScriptUI Panel, but it is also meant to be included in other RxLab. scripts like Duik,
to make sure After Effects projects are as sane as possible when using complex tools involving a lot of expressions.

## Getting help with DuSan

There are a lot of ways to get help with DuSan!

- Read the official comprehensive user guide: http://dusan.rxlab.guide where you will find documentation for all the tools, an FAQ, and a lot of other information.

- Access tutorials, talks, video quicktips, and more on the official website: http://rxlaboratory.org

- Come and have a chat on the dedicated server! http://chat.rxlab.info

## Supported versions of After Effects 

DuSan should work correctly on all versions of After Effects since 2013 (CC). It will not work with CS6 and earlier versions.

# Installation

- Unzip the files you have downloaded.

You'll find several folders and files.

- *"LICENSE"* contains the license of Duik, the [GNU-GPL v3](https://www.gnu.org/licenses/gpl-3.0.html).
- The *Help* folder contains the documentation. Double click on the file "index.html" to open it.
- The *Tools* folder contains some useful scripts and other tools.
- The *ScriptUI Panels* folder contains the actual *Duik* script you need to install. A lot of different panels are available, you can install all of them or just pick the ones you need.

- There are several easy methods to install DuSan, read the next sections.

!!! note
    When DuSan is installed for the first time, you'll need to restart After Effects to make it available.

## a. Copy the files

Copy all the files from the *ScriptUI Panels* folder to:

- Windows: `C:\Program Files\Adobe\Adobe After Effects CC\Support Files\Scripts\ScriptUI Panels\`  
- Mac OS: `/Applications/Adobe After Effects CC/Scripts/ScriptUI Panels`

You may need administrator privileges to install Duik this way. If you don't have them, see the other methods below.

## b. Shortcut for After Effects CC2018 and more recent

- Open After Effects  
- *Windows*: Holding the [Alt] and [Shift] keys, drag and drop the ScriptUI Panels files onto the project panel.  
- *Mac OS*: Holding the [Options] and [Shift] keys, drag and drop the ScriptUI Panels files onto the project panel.  

## c. Using the menu for After Effects CC2019 and more recent

- Open After Effects  
- Use the `File/Scritps/Install ScriptUI Panel...` menu to select and install the ScriptUI Panels files.  

# Without installation 

You'll always be able to run Duik without even installing it. This is a good way to use it if you do not have administrator privileges on an older version of After Effects.

- Unzip all the files in any folder.  
- Launch After Effects, and start Duik via the `File/Scripts/Run script file...` menu.
