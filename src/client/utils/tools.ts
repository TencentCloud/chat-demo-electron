import { CLOSE, DOWNLOADFILE, MAXSIZEWIN, MINSIZEWIN, SCREENSHOTWINDOWS,SCREENCAPTURE,RENDERPROCESSCALL, SHOWDIALOG, CHECK_FILE_EXIST, OPEN_CALL_WINDOW, CALL_WINDOW_CLOSE_REPLY, CLOSE_CALL_WINDOW, SELECT_FILES, GET_VIDEO_INFO, GET_FILE_PATH } from "../../app/const/const";

import  { ipcRenderer } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentWindow } from '@electron/remote';
const WIN = getCurrentWindow();
const SUPPORT_IMAGE_TYPE = ['png', 'jpg', 'gif', 'PNG', 'JPG', 'GIF','jpeg'];
const SUPPORT_VIDEO_TYPE = ['MP4', 'MOV', 'mp4', 'mov'];
const isWin = () => {
    const platform = process.platform;
    return platform === 'win32' || platform === 'linux';
}
const minSizeWin = () => {
    WIN.minimize();
}
const maxSizeWin = () => {
    if(WIN.isMaximized()){
        WIN.unmaximize()
    } else {
        WIN.maximize()
    }
}
const closeWin = () => {
    WIN.close()
}

const showDialog = ()=>{
    ipcRenderer.send(RENDERPROCESSCALL,{
        type:SHOWDIALOG
    })
}
const downloadFilesByUrl = (url)=>{
    ipcRenderer.send(RENDERPROCESSCALL,{
        type:DOWNLOADFILE,
        params:url
    })
}
const checkFileExist = (path) =>{
    ipcRenderer.send(RENDERPROCESSCALL,{
        type:CHECK_FILE_EXIST,
        params:path
    })
}
const selectFileMessage = () => {
    ipcRenderer.send(RENDERPROCESSCALL,{
        type: SELECT_FILES,
        params: {
            fileType: "file",
            extensions: ["*"],
            multiSelections: false
        }
    })
}
const selectVideoMessage = () => {
    ipcRenderer.send(RENDERPROCESSCALL,{
        type: SELECT_FILES,
        params: {
            fileType: "video",
            extensions: SUPPORT_VIDEO_TYPE,
            multiSelections: false
        }
    })
}
const selectImageMessage = () => {
    ipcRenderer.send(RENDERPROCESSCALL,{
        type: SELECT_FILES,
        params: {
            fileType: "image",
            extensions: SUPPORT_IMAGE_TYPE,
            multiSelections: false
        }
    })
}

const chooseFileToDownload = () => {
    ipcRenderer.send(RENDERPROCESSCALL,{
        type:GET_FILE_PATH,
        params:{
            fileType:"file",
            extensions:["*"],
            multiSelections:false
        }
    })
}

const readScreenShot = () => {
    ipcRenderer.send(RENDERPROCESSCALL,{
        type: SCREENCAPTURE,
    })
}

const readScreenShotWindows = () => {
    ipcRenderer.send(RENDERPROCESSCALL,{
        type: SCREENSHOTWINDOWS,
    })
}

const getVideoInfo = (path)=>{
    ipcRenderer.send(RENDERPROCESSCALL,{
        type: GET_VIDEO_INFO,
        params: { path: path }
    });
}
const generateRoomID = () => {
    return Math.floor(Math.random() * 1000);
}
export {
    isWin,
    minSizeWin,
    maxSizeWin,
    closeWin,
    showDialog,
    downloadFilesByUrl,
    checkFileExist,
    generateRoomID,
    selectFileMessage,
    selectVideoMessage,
    selectImageMessage,
    getVideoInfo,
    SUPPORT_IMAGE_TYPE,
    SUPPORT_VIDEO_TYPE,
    readScreenShot,readScreenShotWindows,
    chooseFileToDownload
}