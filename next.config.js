const withCss = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".css"] = (file) => {};
}

module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      const antStyles = /antd-mobile\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }
    return config;
  },
};

module.exports = withCss({});
