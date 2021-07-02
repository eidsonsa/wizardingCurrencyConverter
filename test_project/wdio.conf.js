exports.config = {
    services: ['appium'],
    port: 4723,
    path: '/wd/hub',
    runner: 'local',
    specs: [
      './test/specs/**/*.js'
    ],
    capabilities: [{
       maxInstances: 1,
       browserName: '',
       appiumVersion: '1.13.0',
       platformName: 'Android',
       platformVersion: '11',
       deviceName: 'Pixel_3a_API_30',
       app: '/home/ealmeida/Desktop/wizardingCurrencyConverter/android/app/build/outputs/apk/release/app-release.apk',
       automationName: 'UiAutomator2'
    }],
    
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    }
  }