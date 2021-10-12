## Components

Components in this dir will be auto-registered and on-demand, powered by [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components).

Components can be shared in all views.

### Icons

You can use icons from almost any icon sets by the power of [Iconify](https://iconify.design/).

It will only bundle the icons you use. Check out [vite-plugin-icons](https://github.com/antfu/vite-plugin-icons) for more details.

To use custom SVG icons as components, make sure that the `customCollections` property in the config for `Icons` Vite plugin (see `vite.config.ts`) has an entry for the corresponding folder. The config file currently has an entry for a `logos` custom collection that automatically loads all icons in the root of `extension/assets` and makes them available as components. See https://github.com/antfu/unplugin-icons#custom-icons for more info.
