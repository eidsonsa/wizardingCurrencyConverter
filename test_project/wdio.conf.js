exports.config = {
    services: ['appium'],
    port: 4723,
    runner: 'local',
    specs: [
      './test/specs/**/*.js'
    ],
    capabilities: [{
       maxInstances: 1,
       browserName: '',
       appiumVersion: '1.13.0',
       platformName: 'Android',
       platformVersion: '13',
       deviceName: 'Pixel_API_3a_30_x86',
       app: '<path to APK>',
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