const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), []);

module.exports = {
  output: {
    uniqueName: 'container',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      // name: "container",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './apps/container/src/app/app.component.ts',
      // },

      // For hosts (please adjust)
      // remotes: {
      //     "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",

      // },

      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: "12.0.0" },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: "12.0.0" },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: "12.0.0" },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: "12.0.0" },
        '@angular/material': { singleton: true, strictVersion: true, requiredVersion: "12.2.13" },
        "@angular/platform-browser": { strictVersion: true, requiredVersion: '12.2.13' },
        "@angular/cdk": { strictVersion: true, requiredVersion: '12.2.13' },
        '@angular/material/core': { singleton: true, strictVersion: true, requiredVersion: "12.2.13" },
        '@angular/material/datepicker': { singleton: true, strictVersion: true, requiredVersion: "12.2.13" },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
