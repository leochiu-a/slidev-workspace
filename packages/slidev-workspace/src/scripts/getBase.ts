import { readFileSync } from "fs";
import { dirname, join } from "path";
import { parse as parseYaml } from "yaml";
import { fileURLToPath } from "url";

export function getBaseFromYaml() {
  try {
    const yamlPath = join(
      dirname(fileURLToPath(import.meta.url)),
      "..",
      "slidev-workspace.yaml"
    );
    const yamlContent = readFileSync(yamlPath, "utf8");
    const config = parseYaml(yamlContent);

    return config["slidev-workspace"]?.base;
  } catch {
    console.warn("無法讀取 slidev-workspace.yaml");
  }
}

// 如果直接執行此檔案，則輸出結果
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(getBaseFromYaml());
}
