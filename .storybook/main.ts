import { StorybookConfig, CoreConfig, Options } from "@storybook/core-common";
import { UserConfig } from "vite";
import { Weaken } from "utilitypes";

interface CustomizedCoreConfig extends Weaken<CoreConfig, "builder"> {
  builder: CoreConfig["builder"] | "storybook-builder-vite";
}
interface CustomizedStorybookConfig extends Weaken<StorybookConfig, "core"> {
  core: CustomizedCoreConfig;
  viteFinal?: (config: UserConfig, options: Options) => UserConfig;
}

const config: CustomizedStorybookConfig = {
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

export default config;
