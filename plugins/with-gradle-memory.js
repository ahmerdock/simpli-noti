const { withGradleProperties } = require("expo/config-plugins");

// Release builds run Android lint (lintVitalAnalyzeRelease) inside the Gradle
// daemon, and the Expo template's default 512m metaspace cap makes it fail with
// "Metaspace" on EAS. Raise the daemon's limits.
const JVM_ARGS =
  "-Xmx4096m -XX:MaxMetaspaceSize=1536m -XX:+HeapDumpOnOutOfMemoryError";

module.exports = function withGradleMemory(config) {
  return withGradleProperties(config, (cfg) => {
    cfg.modResults = cfg.modResults.filter(
      (item) =>
        !(item.type === "property" && item.key === "org.gradle.jvmargs"),
    );
    cfg.modResults.push({
      type: "property",
      key: "org.gradle.jvmargs",
      value: JVM_ARGS,
    });
    return cfg;
  });
};
