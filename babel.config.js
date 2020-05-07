module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            src: './src',
            img: './src/img',
            sound: './src/sound',
            font: './src/font',
            view: './src/view',
            workers: './src/workers',
            components: './src/components',
            app: './App.js'
          },
        },
      ],
    ],
  };
};
