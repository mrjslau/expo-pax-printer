import {
	ConfigPlugin,
	withAppBuildGradle,
	withProjectBuildGradle,
	withDangerousMod,
} from "expo/config-plugins";
import path from "path";
import fs from "fs";
import withPaxEnabledFlag from "./PaxEnabledFlagMod";

// CURRENTLY UNUSED - libs are searched directly in the plugin
// ➤ 1. Add flatDir to root build.gradle
// (Tells gradle to look for .jar files inside 'libs')
// const applyProjectGradleMod: ConfigPlugin = (config) => {
// 	return withProjectBuildGradle(config, (config) => {
// 		if (!config.modResults.contents.includes("flatDir { dirs 'libs' }")) {
// 			config.modResults.contents = config.modResults.contents.replace(
// 				/allprojects\s*{[\s\S]*?repositories\s*{/, // match up to opening of repositories block
// 				(match) => {
// 					return `${match}\n        flatDir { dirs 'libs' }`;
// 				}
// 			);
// 		}

// 		return config;
// 	});
// };

// CURRENTLY UNUSED - implementation line is included directly in the plugin build.gradle
// ➤ 2. Add implementation line to app/build.gradle
// (Finds dependencies and add NeptuneLiteApi)
// const applyAppGradleMod: ConfigPlugin = (config) => {
// 	const implementationLine = `implementation files('libs/NeptuneLiteApi_V3.30.00_20220720.jar')`;

// 	return withAppBuildGradle(config, (config) => {
// 		const { contents } = config.modResults;

// 		// Only insert if not present
// 		if (!contents.includes(implementationLine)) {
// 			config.modResults.contents = contents.replace(
// 				/(dependencies\s*{)/m,
// 				`$1\n    ${implementationLine}`
// 			);

// 			// If no dependencies block, append one (very rare!)
// 			if (config.modResults.contents === contents) {
// 				config.modResults.contents += `\n\ndependencies {\n    ${implementationLine}\n}\n`;
// 			}
// 		}

// 		return config;
// 	});
// };

// CURRENTLY UNUSED - .jar is placed directly in the plugin
// ➤ 3. Inject .jar into android/app/libs.
// const withJarCopy: ConfigPlugin = (config) => {
// 	return withDangerousMod(config, [
// 		"android",
// 		async (config) => {
// 			const targetLibsPath = path.join(
// 				config.modRequest.platformProjectRoot,
// 				"app",
// 				"libs"
// 			);
// 			// Versioned (full name) file is copied from assets.
// 			const jarSourcePath = path.resolve(
// 				__dirname,
// 				"../assets/NeptuneLiteApi_V3.30.00_20220720.jar"
// 			);
// 			// Rename to keep it shorter after copy.
// 			const jarTargetPath = path.join(
// 				targetLibsPath,
// 				"NeptuneLiteApi_V3.30.00_20220720.jar"
// 			);

// 			if (!fs.existsSync(targetLibsPath)) {
// 				fs.mkdirSync(targetLibsPath, { recursive: true });
// 			}

// 			fs.copyFileSync(jarSourcePath, jarTargetPath);
// 			console.log(
// 				`✅ Copied NeptuneLiteApi_V3.30.00_20220720.jar to ${jarTargetPath}`
// 			);

// 			return config;
// 		},
// 	]);
// };

// ➤ 4. Main plugin entry that will be used in the target app.
const withNeptuneLiteJar: ConfigPlugin = (config) => {
	// config = applyProjectGradleMod(config);
	// config = applyAppGradleMod(config);
	// config = withJarCopy(config);
	config = withPaxEnabledFlag(config);
	return config;
};

export default withNeptuneLiteJar;
