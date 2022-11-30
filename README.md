[English](./README_EN.md) | 简体中文

# IM Electron Demo
IM(Instant Messaging) Electron Demo 包含了即时通信(IM)和实时音视频(TRTC)的能力，简单接入、稳定必达，通过腾讯云服务向开发者开放，致力于帮助开发者快速搭建低成本、可靠的、高品质的通信解决方案。产品参考: [即时通信(IM)](https://cloud.tencent.com/product/im)

<img src="https://camo.githubusercontent.com/c1e070dc8b0a68158dbc5fd476a1a35158f5f62fea16964e82beeaa9ee28094b/68747470733a2f2f7765622e73646b2e71636c6f75642e636f6d2f696d2f64656d6f2f6c61746573742f696d672f6c6f676f2e36383066393833332e737667" width="365" height="182" data-canonical-src="https://web.sdk.qcloud.com/im/demo/latest/img/logo.680f9833.svg" style="max-width: 100%;">


## 环境要求 
|平台|版本|
|---|---|
|Electron|13.1.5 及以上版本|
|Node.js|v14.2.0 及以上版本|

## 如何启动项目
```
// install package
npm install

cd src/client
npm install

// run 
npm run start
```
## 登录 Demo
**前提条件**
您已 [注册腾讯云](https://cloud.tencent.com/document/product/378/17985) 帐号，并完成 [实名认证](https://cloud.tencent.com/document/product/378/3629)。
1. 登录 [即时通信 IM 控制台](https://console.cloud.tencent.com/im)。
>?如果您已有应用，请记录其 SDKAppID 并 [获取密钥信息](#step2)。
>同一个腾讯云帐号，最多可创建300个即时通信 IM 应用。若已有300个应用，您可以先 [停用并删除](https://intl.cloud.tencent.com/document/product/1047/34540) 无需使用的应用后再创建新的应用。**应用删除后，该 SDKAppID 对应的所有数据和服务不可恢复，请谨慎操作。**
>
2. 单击**创建新应用**，在**创建应用**对话框中输入您的应用名称，单击**确定**。
![](https://main.qcloudimg.com/raw/15e61a874a0640d517eeb67e922a14bc.png)
3. 请保存 SDKAppID 信息。可在控制台总览页查看新建应用的状态、业务版本、SDKAppID、标签、创建时间以及到期时间。
    ![](https://main.qcloudimg.com/raw/7954cc2882d050f68cd5d1df2ee776a6.png)
4. 单击创建后的应用，左侧导航栏单击**辅助工具**>**UserSig 生成&校验**，创建一个 UserID 及其对应的 UserSig，复制签名信息，后续登录使用。
![](https://main.qcloudimg.com/raw/2286644d987d24caf565142ae30c4392.png)
5. 启动项目后，点击右上角设置，将`sdkAppid`,`userId`,`userSig`依次填入基础配置。提交后用密码登录Demo。
   ![](https://qcloudimg.tencent-cloud.cn/raw/fa3dc14c756f918934734d0d2be66bbc.png)
   ![](https://qcloudimg.tencent-cloud.cn/raw/eba28a67c3152dcdf002e1d699cac625.png)

## 如何打包
```
// 打包mac app
npm run build:mac

// 打包windows app
npm run build:windows
```

### 效果展示
##### 会话管理
|会话列表|会话列表管理|
|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/fe20f3b17b00f19ab214599dd6324fa1.png)|![](https://qcloudimg.tencent-cloud.cn/raw/522a1d5c23f67fc40b3bcfc9c51dfc69.png)|

##### 聊天管理
|消息列表|消息管理|群聊管理|
|---|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/1dfd5b45a34388c4ef4ad892f57d9218.png)|![](https://qcloudimg.tencent-cloud.cn/raw/5f6a391d2686109e221a472ce919d592.png)|![](https://qcloudimg.tencent-cloud.cn/raw/ca234361e5225be0e6634964f912e83f.png)|

##### 群组管理
|群组列表|创建群组|
|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/a308d807da9895f6df9188b7beecb629.png)|![](https://qcloudimg.tencent-cloud.cn/raw/58db63be58e0c25628a32f6e759671d7.png)|

##### 好友管理
|好友管理|添加好友|
|---|---|
|![](https://qcloudimg.tencent-cloud.cn/raw/1f2d2dd1c97f320e4ef14497e220ce42.png)|![](https://qcloudimg.tencent-cloud.cn/raw/37149f7f28c42b656c209a5d9792b254.png)|

### 功能说明
Electron Demo 基本实现了Electron SDK提供的几乎所有功能，包含会话模块、消息模块、群组模块、好友关系链模块和实时音视频模块。下面列出了各模块在 Demo 中实现的的具体功能。

**会话模块**
- 显示会话列表
- 关键词搜索会话
- 会话置顶/取消置顶
- 移除会话

**消息模块**
- 发送消息（包含文本，表情包，图片，文件等）
- 撤回/删除/转发/回复/合并消息
- 消息已读标志/标为已读

**群组模块**
- 创建/删除群聊
- 设置群公告/群介绍
- 添加/删除群成员，查看群成员，设置群管理员，转让群组
- 消息免打扰
- 禁言

**关系链模块**
- 查看个人/好友信息
- 好友列表
- 添加/删除好友
- 加入黑名单
- 好友申请

**实时音视频聊天 TRTC**
- 语音聊天与其相关功能
- 视频聊天与其相关功能
- 视频会议相关功能


#### Demo 代码结构概览
|文件夹|介绍|
|---|---|---|
|src/client|项目渲染进程目录|
|src/client/components|项目组件目录|
|src/clients/pages|项目页面目录|
|src/cliets/typings|变量类型定义目录|
|src/clients/utils|项目工具函数和一些IM函数调用目录|

## 常见问题
- 1: 安装开发环境问题，`gypgyp ERR!ERR`, 参考[链接](https://stackoverflow.com/questions/57879150/how-can-i-solve-error-gypgyp-errerr-find-vsfind-vs-msvs-version-not-set-from-c).
- 2: Mac 端执行`npm run start` 会出现白屏，原因是渲染进程的代码还没有build完成，主进程打开的3000端口为空页面，当渲染进程代码build 完成重新刷新窗口后即可解决问题。或者执行`cd src/client && npm run dev:react`, `npm run dev:electron`, 分开启动渲染进程和主进程。
- 3: Macos 签名公证参考[链接](https://xingzx.org/blog/electron-builder-macos)
- 4: Windows 下开发一些问题参考[链接](https://blog.csdn.net/Yoryky/article/details/106780254);
- 5: 此项目需要python2。
- 6: MacOS M1 项目打包安装后提示`项目已损坏`，可能是由于电脑对app赋予了`com.apple.quarantine`属性。可以在终端执行命令`xattr /path/to/MyApp.app`检查该属性后执行`sudo xattr -r -d com.apple.quarantine /path/to/MyApp.app`删除属性。

## 文档链接
- [IM Electron SDK 文档](https://comm.qq.com/toc-electron-sdk-doc/index.html)
- [TRTC Electron SDK 文档](https://web.sdk.qcloud.com/trtc/electron/doc/zh-cn/trtc_electron_sdk/index.html)

## 联系方式
- 开发群 
  <img src="https://qcloudimg.tencent-cloud.cn/raw/f3f531d942ec13eb2184d853db7a56c0.jpg" width="50%" alt="二维码"/>
