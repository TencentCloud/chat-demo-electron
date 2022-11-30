English | [简体中文](./README.md)
# IM Demo for Electron

The IM demo for Electron provides features of IM and TRTC. Developers can easily access and integrate it to enjoy stable and reliable services via Tencent Cloud services. Tencent Cloud IM is committed to helping developers quickly develop reliable, low-cost, and high-quality communication solutions. For more product information, see [Instant Messaging](https://cloud.tencent.com/product/im).

<img src="https://camo.githubusercontent.com/c1e070dc8b0a68158dbc5fd476a1a35158f5f62fea16964e82beeaa9ee28094b/68747470733a2f2f7765622e73646b2e71636c6f75642e636f6d2f696d2f64656d6f2f6c61746573742f696d672f6c6f676f2e36383066393833332e737667" width="365" height="182" data-canonical-src="https://web.sdk.qcloud.com/im/demo/latest/img/logo.680f9833.svg" style="max-width: 100%;">

## Environmental requirements 
|Platform|Version|
|---|---|
|Electron|13.1.5 and above|
|Node.js|v14.2.0 and above|

## Starting a Project
```
// install package
npm install

cd src/client
npm install

// run 
npm run start
```

## Logging In
**prerequisites**
You have [registered for Tencent Cloud](https://cloud.tencent.com/document/product/378/17985) account and completed [authentication](https://cloud.tencent.com/document/product/378/3629).
1. Log in to [IM Console](https://console.cloud.tencent.com/im).
>?If you already have an app, record its SDKAppID and [get key info](#step2).
>The same Tencent Cloud account can create up to 300 instant messaging IM applications. If there are already 300 apps, you can [deactivate and delete](https://intl.cloud.tencent.com/document/product/1047/34540) unused apps before creating new ones. **After the application is deleted, all data and services corresponding to the SDKAppID cannot be recovered, please operate with caution.**

2. Click **Create Application**, enter your application name in the **Create Application** dialog box, and click **Con**.
![](https://main.qcloudimg.com/raw/15e61a874a0640d517eeb67e922a14bc.png)
3. Please save the SDKAppID information. You can view the status, business version, SDKAppID, label, creation time, and expiration time of the newly created application on the console overview page.
    ![](https://main.qcloudimg.com/raw/7954cc2882d050f68cd5d1df2ee776a6.png)
4. Click the created application, click **Auxiliary Tools**>**UserSig Generation & Verification** in the left navigation bar, create a UserID and its corresponding UserSig, copy the signature information, and use it for subsequent logins.
![](https://main.qcloudimg.com/raw/2286644d987d24caf565142ae30c4392.png)
5. After starting the project, click Settings in the upper right corner, and fill `sdkAppid`, `userId`, `userSig` into the basic configuration in turn. After submitting, log in to the Demo with the password.
![](https://qcloudimg.tencent-cloud.cn/raw/fa3dc14c756f918934734d0d2be66bbc.png)
   ![](https://qcloudimg.tencent-cloud.cn/raw/eba28a67c3152dcdf002e1d699cac625.png)

## Packaging
```
// Package a Mac app
npm run build:mac

// Package a Windows app
npm run build:windows
```

### Effets
##### Conversation
|conversation list|conversation management|
|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/fe20f3b17b00f19ab214599dd6324fa1.png)|![](https://qcloudimg.tencent-cloud.cn/raw/522a1d5c23f67fc40b3bcfc9c51dfc69.png)|

##### Message
|message list|message management|group message|
|---|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/1dfd5b45a34388c4ef4ad892f57d9218.png)|![](https://qcloudimg.tencent-cloud.cn/raw/5f6a391d2686109e221a472ce919d592.png)|![](https://qcloudimg.tencent-cloud.cn/raw/ca234361e5225be0e6634964f912e83f.png)|

##### Group
|group list|create group|
|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/a308d807da9895f6df9188b7beecb629.png)|![](https://qcloudimg.tencent-cloud.cn/raw/58db63be58e0c25628a32f6e759671d7.png)|

##### friendship
|friendship management|add friend|
|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/1f2d2dd1c97f320e4ef14497e220ce42.png)|![](https://qcloudimg.tencent-cloud.cn/raw/37149f7f28c42b656c209a5d9792b254.png)|

### Function Description
Electron Demo basically implements nearly all the functions provided by Electron SDK, including conversation module, message module, group module, relationship module and real-time audio and video module. The specific functions implemented by each module in the Demo are listed below.

**Conversation module**
- Show conversation list
- Search conversation with keywords
- Conversation pinning/unpinning
- Remove/delete conversation

**Message module**
- Send messages (including text, emoticons, pictures, files, custom, etc.)
- Withdraw/delete/forward/reply/merge messages
- Message read flag/marked as read

**Group Module**
- Create/delete group chats
- Set group announcement/group introduction
- Add/delete group members, view group members, set group administrators, transfer groups
- Set "Do not disturb"
- Mute group members

**Relationship chain module**
- View personal/friend information
- Friends List
- Add/remove friends
- Add friend to blocklist
- Friend requests

**Real-time audio and video chat TRTC**
- Voice chat and its related functions
- Video chat and its related functions
- Video conferencing related functions



#### Demo code structure overview
|Folder|Introduction|
|---|---|---|
|src/client|Project rendering process directory|
|src/client/components|Project component directory|
|src/clients/pages|Project page directory|
|src/cliets/typings|variable type definition directory|
|src/clients/utils|Project tool functions and some IM functions directories|



## FAQs
- 1: For `gypgyp ERR!ERR` reported during development environment installation, see [link](https://stackoverflow.com/questions/57879150/how-can-i-solve-error-gypgyp-errerr-find-vsfind-vs-msvs-version-not-set-from-c).
- 2: White screen appears when you run `npm run start` on macOS. This is because the rendering process code is not completely built and the port 3000 opened by the main process points to an empty page. The error will be resolved after the rendering process code is completely built and you refresh the window. Alternatively, you can run `cd src/client && npm run dev:react` and `npm run dev:electron` to start the rendering process and main process separately.
- 3: For macOS signature and notarization, see [link](https://xingzx.org/blog/electron-builder-macos).
- 4: For some development issues on Windows, see [link](https://blog.csdn.net/Yoryky/article/details/106780254).
- 5: In order to `npm install` correctly, you need to install python2 first.
- 6: After the MacOS M1 project is builded and installed, it may prompt that the project is damaged. It may be because it has assigned the attribute `com.apple.quarantine` in the app. You can execute `sudo xattr -r -d com.apple.quarantine /path/to/MyApp.app` to delete the attribute after executing the command `xattr /path/to/MyApp.app` in the terminal to check the attribute.

## References
- [IM SDK Documentation for Electron](https://comm.qq.com/toc-electron-sdk-doc/index.html)
- [TRTC SDK Documentation for Electron](https://web.sdk.qcloud.com/trtc/electron/doc/zh-cn/trtc_electron_sdk/index.html)

## Contact
- Join group 
<img src="https://qcloudimg.tencent-cloud.cn/raw/f3f531d942ec13eb2184d853db7a56c0.jpg" width="50%" alt="二维码"/>
