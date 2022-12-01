import sveltePreprocess from 'svelte-preprocess';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    scss: {
      importer(url, prev, done) {
        if (url.startsWith('style/')) {
          return done({ file: `./src/${url}` });
        }
        return done({ file: prev });
      },
    },
  }),
};
