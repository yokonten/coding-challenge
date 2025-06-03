// esbuild.config.js
import esbuild from "esbuild";
import sassPlugin from "esbuild-plugin-sass";

esbuild
  .build({
    entryPoints: ["src/scripts/main.ts"],
    bundle: true,
    minify: true,
    outfile: "dist/site.min.js",
    plugins: [sassPlugin()],
    loader: {
      ".png": "file",
      ".woff": "file",
      ".woff2": "file",
    },
    sourcemap: false,
    target: ["es6"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  })
  .catch(() => process.exit(1));
