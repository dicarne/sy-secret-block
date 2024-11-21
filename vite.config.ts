import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from "vite-plugin-static-copy";


// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "./README*.md",
          dest: "./",
        },
        {
          src: "./widget.json",
          dest: "./",
        },
        {
          src: "./preview.png",
          dest: "./",
        },
        {
          src: "./icon.png",
          dest: "./",
        },
      ],
    }),
  ],
  server: {
    /** 调试 siyuan_cache_api_lib 时最好关掉，因为每次编译会导致 hmr 多次，我不太喜欢 */
    // hmr: false,
    fs: {
      strict: false,
    },
  },
  base: "./",
  build: {
    sourcemap: true,
  },
}

export default ({ command, mode }) => {
  if (command === "serve") {
    config.base = "/widgets/sy-secret-block/";
    return config;
  } else {
    return config;
  }
};