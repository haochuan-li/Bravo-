import { app } from 'electron';
import './security-restrictions';
import { restoreOrCreateWindow } from '/@/mainWindow';

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);


/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shut down background process if all windows was closed
 */

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', restoreOrCreateWindow);


/**
 * Create app window when background process will be ready
 */
app.whenReady()
  .then(() => {
    restoreOrCreateWindow();
  })
  .catch((e) => console.error('Failed create window:', e));

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}

