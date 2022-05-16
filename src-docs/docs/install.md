![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2022;updated:2022/05/16)

# Install DuSan

## Supported versions of After Effects 

*DuSan* is developed and tested using the latest released version of *After Effects* and the current *Beta* to make sure it is future-proof.

It **may** work with older versions too (although it is advised to keep *After Effects* up-to-date).

It **will not** work with *After Effects CS6* and older versions. Sorry, it's time to update!

## Installation

### **1 - Download** DuSan from the [official website](https://rxlaboratory.org/tools/dusan/)

### **2 - Unzip** the files you have downloaded

You'll find several folders and files.

- *README.txt* contains a lot of information to help you get started with DuSan.
- The *Help* folder contains these help pages. Double click on the file *index.html* to open it.
- The *Tools* folder contains some useful tools.
- The *ScriptUI Panels* folder contains the actual *DuSan* script you need to install.

### **3 -** There are several ways to install DuSan very easily

#### a. Copy the files

Copy all the files from the *ScriptUI Panels* folder to:

- Windows: `C:/Program Files/Adobe/Adobe After Effects 20XX/Support Files/Scripts/ScriptUI Panels/`  
- Mac OS: `/Applications/Adobe After Effects 20XX/Scripts/ScriptUI Panels`

You may need administrator privileges to install DuSan this way. If you don't have them, see the other ways below.

!!! Warning
    With the other installation methods, some features using third party tools, like transcoding sound when exporting to Adobe Audition, may not work correctly.

#### b. Shortcut for ***After Effects CC2018*** and more recent

- Open After Effects  
- *Windows*: Holding the `Alt` and `Shift` keys, drag and drop the file `DuSan Bassel.jsx` onto the Project panel.  
- *Mac OS*: Holding the `Options` and `Shift` keys, drag and drop the file `DuSan Bassel.jsx` onto the Project panel.  

#### c. Using the menu for ***After Effects CC2019*** and more recent

- Open After Effects  
- Use the `File/Scritps/Install ScriptUI Panel...` menu to select and install `DuSan Bassel.jsx`.  

### **4 - Restart** After Effects and DuSan will be available in the "Window" menu.

## Without installation 

You'll always be able to run DuSan without even installing it. This is a good way to use it if you do not have administrator privileges on an older version of *After Effects*.

- Unzip all the files in any folder.  
- Launch After Effects, and start DuSan via the `File/Scripts/Run script file...` menu.

## First Run

On first run, DuSan may first ask for file and network access, this is mandatory to make it work (DuSan needs to write its icon files, effects, etc.).

Then, you will have to choose the language you want to use. Default is [Esperanto](https://en.wikipedia.org/wiki/Esperanto). It can be changed later in the [settings](settings.md) panel.

## Fix / Uninstall DuSan

If for any reason DuSan won't start anymore (this happens sometimes when the settings file gets corrupted for example, especially on *Mac OS*...), you can try to fix it with this simple procedure:

### Run the ***DuSI*** script

This script is available in the *tools* subfolder of the *DuSan* zip archive you've downloaded to install *DuSan*. If you need to re-download it, you can [get it here](https://rxlaboratory.org/tools/dusi/).

To run it, just go to *After Effects*, `File/Scripts/Run script file...`.

![](https://rxlaboratory.org/wp-content/uploads/dusi_screenshot.png)

### Fix

Just click on the "Fix / Uninstall..." button to fix DuSan (and other scripts). Then you should be able to restart *DuSan*.

If you want to remove DuSan, and be sure to remove all the files it left behind, you'll have to remove its panels by yourself from the *ScriptUI Panels*.