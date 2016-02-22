var app = require('app');
var BrowserWindow = require('browser-window');
const ipc = require('electron').ipcMain;
var mainWindow = null;

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("sudo node /home/pi/brewbot", puts);

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {	
  mainWindow = new BrowserWindow({width: 600, height: 800, frame: false, fullscreen:true});  
  mainWindow.loadUrl('file://' + __dirname + '/index.html');  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });  
});

ipc.on('quit-message', function(event, arg) {
 app.quit();
});
