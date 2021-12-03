module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: (config) => {
        config.module
          .rule("compile")
          .test(/\.js$/)
          .exclude.add(/(node_modules|dist_electron)/)
          .end()
          .use("babel")
          .loader("babel-loader")
          .options({
            presets: ["@vue/cli-plugin-babel/preset"],
          });
      },
      // List native deps here if they don't work
      externals: ["chokidar"],
      builderOptions: {
        extraResources: [
          {
            from: "node_modules/regedit/vbs",
            to: "regedit/vbs",
            filter: ["**/*"],
          },
        ],
        protocols: {
          name: "nexus-protocol",
          schemes: ["nexusclips"],
        },
        appId: "com.nexusclips.app",
        target: "nsis",
        productName: "Nexus Clips",
        copyright: "Nexus Live S.L",
        forceCodeSigning: false,
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: false,
          allowElevation: true,
          runAfterFinish: true,
          installerIcon: "./nsis_builder/installerIcon.ico",
          artifactName: "NexusClips_${version}.${ext}",
        },
        publish: [
          {
            provider: "s3",
            bucket: "bucket",
            region: "eu-west-1",
          },
        ],
      },
      nodeIntegration: true,
    },
  },
};
