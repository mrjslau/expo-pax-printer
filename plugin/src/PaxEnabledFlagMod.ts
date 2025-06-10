import { withAppBuildGradle, ConfigPlugin } from "@expo/config-plugins";

const withPaxEnabledFlagMod: ConfigPlugin = (config) => {
	return withAppBuildGradle(config, (config) => {
		if (!config.modResults.contents.includes("PAX_ENABLED")) {
			config.modResults.contents = config.modResults.contents.replace(
				/defaultConfig\s*{([\s\S]*?)}/m,
				(match) =>
					match.replace(
						/}/,
						`    buildConfigField "boolean", "PAX_ENABLED", true\n}`
					)
			);
		}
		return config;
	});
};

export default withPaxEnabledFlagMod;
