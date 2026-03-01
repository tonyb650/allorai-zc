const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const sharedConfig = require('../../../libs/shared/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    // Explicitly scan all remote MFE source files so platform's CSS bundle
    // covers every class used across the composed app. This is necessary because
    // in production Module Federation (Zephyr), only the host's CSS is loaded —
    // remote CSS files are not automatically injected when a remote is mounted.
    join(__dirname, '../chat/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../landing/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../explore/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../itineraries/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../../../libs/shared/ui/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
