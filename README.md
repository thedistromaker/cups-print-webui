# cups-print-webui
CUPS Print WebUI - For polished printing, so that you do not need to bash your head with Windows print spooling.
# How to install
Make a folder called ```public``` in your working directory.<br>
Move ```index.html``` and ```home.html``` into ```public/```.<br> 
Move ```webcups-ui.service``` to ```/etc/systemd/system/```.<br>
**ENSURE** you have node installed and it is in /usr/bin. This program will **not** work without it being in the correct directory, or not being installed.<br>
Run ```sudo systemctl start webcups-ui``` to start it for this boot only<br>
Or run ```sudo systemctl enable --now webcups-ui``` to run it on boot every time.<br>
# Set up CUPS
If CUPS is already installed, please name your printer WebPrinter-1 for compatibility with the WebUI. Or edit public/home.html to your printer's job, edit variable ```PrinterCUPSName``` to your CUPS printer name.
