module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    electronBuilder: {
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: "src/main/background.js",
      // Use this to change the entry point of your app's render process. default src/[main|index].[js|ts]
      rendererProcessFile: "src/renderer/main.js"
    }
  }
};
