module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "storybook-builder-vite",
  },
  viteFinal: (config, { configType }) => {
    if (process.env.NODE_ENV === "production") {
      config.build.chunkSizeWarningLimit = 1200;
    }
    if (configType === "DEVELOPMENT") {
      config.optimizeDeps.include = [
        "react-is",
        "@base2/pretty-print-object",
        ...config?.optimizeDeps?.include,
      ];
    }
    return config;
  },
};
