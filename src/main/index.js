/* eslint-disable vue/no-parsing-error */
'use strict'

import { app, BrowserWindow, Tray, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const options = {
    height: 763,
    width: 929,
    show: true, // 创建后是否显示
    frame: true, // 是否创建frameless窗口
    center: true, // 是否出现在屏幕居中的位置
    fullscreenable: true, // 是否允许全屏
    resizable: true, // 是否允许拉伸大小
    title: 'PicGo',
    vibrancy: 'ultra-drak', // 窗口模糊的样式（仅macOS）
    transparent: true, // 是否是透明窗口（仅macOS）
    titleBarStyle: 'hidden', // 标题栏的样式，有hidden、hiddenInset、customButtonsOnHover等
    webPreferences: {
      backgroundThrottling: false // 当页面被置于非激活窗口的时候是否停止动画和计时器
    }
  }
  if (process.platform === 'win32') {
    // 针对windows做配置
    options.show = true // 创建即显示
    options.frame = true // 创建一个frameless窗口
    options.backgroundColor = '#3f3c37' // 背景色
  }
  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  createTray(mainWindow)
}

function createTray (window) {
  // 图标
  tray = new Tray(`${__static}/uploadPic.png`)
  // 菜单模板
  const template = [{
    label: 'Edit',
    submenu: [
      // { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click () {
          app.quit()
        }
      }
    ]
  }]
  // 设置菜单
  Menu.buildFromTemplate(template)
  // const menu = Menu.buildFromTemplate(template)
  // 设置菜单到顶层
  Menu.setApplicationMenu(null)
  // 悬停显示文字
  tray.setToolTip('upLoadPic')
  // 右键菜单
  const contextMenu = Menu.buildFromTemplate([
    // {
    //   label: '关于',
    //   click () {
    //     dialog.showMessageBox({
    //       title: 'PicGo',
    //       message: 'PicGo',
    //       detail: `Version: ${pkg.version}\nAuthor: Molunerfinn\nGithub: https://github.com/Molunerfinn/PicGo`
    //     })
    //   }
    // },
    // {
    //   label: '打开详细窗口',
    //   click () {
    //     if (settingWindow === null) {
    //       createSettingWindow()
    //       settingWindow.show()
    //     } else {
    //       settingWindow.show()
    //       settingWindow.focus()
    //     }
    //   }
    // },

    {
      role: 'quit',
      label: '退出'
    }
  ])
  tray.on('right-click', () => {
    window.hide()
    tray.popUpContextMenu(contextMenu) // 打开菜单
  })
  tray.on('click', () => {
    window.hide()
    if (mainWindow === null) {
      // 如果主窗口不存在则创建
      createWindow()
      mainWindow.show()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })
  // 以下在mac生效
  tray.on('drag-enter', () => {
    tray.setImage(`${__static}/upload.png`)
  })
  tray.on('drag-end', () => {
    tray.setImage(`${__static}/uploadPic.png`)
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
