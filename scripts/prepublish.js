const fs = require("fs");
const path = require("path");

const packagesDir = path.resolve(__dirname, "../packages");

function adjustPackageJson(packageDir) {
  const packageJsonPath = path.join(packageDir, "package.json");
  const distDir = path.join(packageDir, "dist");
  const packageDistJsonPath = path.join(distDir, "package.json");
  const newDistDir = path.join(distDir, "dist");

  if (!fs.existsSync(distDir)) {
    console.warn(`Dist directory not found for package: ${packageDir}`);
    return;
  }

  if (fs.existsSync(packageDistJsonPath)) {
    console.warn(`Dist package.json already exists for package: ${packageDir}`);
    return;
  }

  // create a subfolder in dist for the package and move files there
  fs.mkdirSync(newDistDir, { recursive: true });

  fs.readdirSync(distDir).forEach((file) => {
    const src = path.join(distDir, file);
    const dest = path.join(newDistDir, file);

    if (fs.lstatSync(src).isDirectory()) {
      if (file !== "dist") {
        fs.renameSync(src, dest);
      }
    } else {
      fs.renameSync(src, dest);
    }
  });

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.main = "./dist/index.js";
  packageJson.types = "./dist/index.d.ts";

  fs.writeFileSync(packageDistJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`Adjusted ${packageJsonPath}`);
}

fs.readdirSync(packagesDir).forEach((pkg) => {
  const packageDir = path.join(packagesDir, pkg);

  if (fs.existsSync(path.join(packageDir, "package.json"))) {
    adjustPackageJson(packageDir);
  }
});
