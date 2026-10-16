const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-suppliers',
  filename: "remoteEntry.js",
  exposes: {
    './SuppliersPage': './src/app/pages/suppliers/suppliers.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
