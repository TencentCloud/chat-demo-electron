const { app, BrowserWindow, ipcMain,globalShortcut } = require('electron');
const Store = require('electron-store');
const CaptureView = require('./electron-captureview/main/captureview').default;
const path = require('path');
const url = require('url');
const TimMain = require('im_electron_sdk/dist/main');
const { SDK_APP_ID,GET_FILE_INFO_CALLBACK,SCREENSHOTMAC } = require('./const/const');
const IPC = require('./ipc');
const CallWindowIpc = require('./callWindowIpc');
const child_process = require('child_process')
const fs = require('fs')
const store = new Store();
Store.initRenderer();

let callWindowIpc;
let ipc;
let mainInstance;
let catchedSdkAppId;
const settingConfig = store.get('setting-config');
const sdkappid = catchedSdkAppId = settingConfig?.sdkappId ?? SDK_APP_ID;

const initTimMain = (appid) => {
  mainInstance = new TimMain({
    sdkappid: Number(appid)
  });
}

initTimMain(sdkappid);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

ipcMain.handle('re-create-main-instance',async (event, newSdkAppid) => {
  console.log("************ re-create-main-instance",newSdkAppid)
  mainInstance.setSDKAPPID(newSdkAppid)   
  return
})


// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
// declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 640,
    width: 960,
    minWidth: 830,
    minHeight: 600,
    show:false,
    frame:false,
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  });
  mainInstance.enable(mainWindow.webContents)
  global.WIN = mainWindow;

  mainWindow.on('ready-to-show',() => {
    mainWindow.show();
    if(!ipc) ipc = new IPC(mainWindow);
    mainWindow.openDevTools();
    // if(!callWindowIpc) callWindowIpc = new CallWindowIpc(mainInstance);
  });
  mainWindow.on('close', () => {
    mainWindow.webContents.send('updateHistoryMessage');
    setTimeout(() => {
      app.exit();
    }, 30);
  });
  console.log('======process env======', process.env?.NODE_ENV);
  if(process.env?.NODE_ENV?.trim() === 'development') {
    mainWindow.loadURL(`http://localhost:3000`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
          pathname: path.join(__dirname, '../../bundle/index.html'),
          protocol: 'file:',
          slashes: true
      })
    );
  }
  // const capture = new CaptureView({
  //   devTools: false,
  //   Mosaic: false,
  //   Text: false,
  //   // onShow: () => {
  //   //   console.log('start screenshot');
  //   // },
  //   onClose: () => {
  //    const png = clipboard.readImage().toBitmap();
  //    const fileExample = new File([png], 'xxx.png', { type: 'image/jpeg' });
  //     console.log('结束截图', fileExample);
  //   },
  //   onShowByShortCut: () => {
  //     console.log('shortcut key to start screenshot')
  //   }
  // });
  // capture.setMultiScreen(true);
  // capture.updateShortCutKey('shift+option+c');
  globalShortcut.register('Shift+CommandOrControl+C',function(){
    console.log("i am shortcut~~~~~~~~~");
    const newdate = new Date();
    const date = newdate.toISOString().replaceAll(":","");
        // console.log(date.toISOString());
        if (process.platform == "darwin") {
          let ex = "screencapture -i ~/desktop/screenshot"+date+".png"
          child_process.exec(`screencapture -i ~/desktop/screenshot`+date+`.png`,(error, stdout, stderr) => {　　　　　　if (!error) {
              var _img = fs.readFileSync(process.env.HOME+"/desktop/screenshot"+date+".png");
              // console.log(_img);
              mainWindow.webContents.send(GET_FILE_INFO_CALLBACK, {
                  triggerType: SCREENSHOTMAC,
                  data:{_img:_img,date}
              })
            }
    　　　　});
        }else{
          let url = path.resolve(__dirname, "../Snipaste-2.8.2-Beta-x64/Snipaste.exe");
          let command = url+" snip -o C:\\Users\\Public\\Desktop\\screenshot"+date+".png";
          // console.log(command);
          var id = setInterval(dealFile, 300);
          child_process.exec(command,async (error,stdout,stderr)=>{if(!error){
              console.log("done capture");
          }})
          function dealFile(){
                  try{
                      var _img = fs.readFileSync("C:\\Users\\Public\\Desktop\\screenshot"+date+".png");
                      clearInterval(id);
                      console.log("file exists");
                      console.log(_img);
                      event.reply(GET_FILE_INFO_CALLBACK, {
                          triggerType: SCREENSHOTMAC,
                          data:{_img:_img,date}
                      })
                  } catch(err){
                      if(err.code == 'ENOENT'){
                          // console.log("file doesn't exist yet")
                      } else{
                          throw err;
                      }
                  }
                  
              
          }
        }
        
  })
  // mainWindow.loadURL(`http://localhost:3000`);
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('all-window-closed');
  if (process.platform !== 'darwin') {
    app.exit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
