/*
 |------------------------------------------------------
 |  Attach Plugins
 |------------------------------------------------------
 |
 | Run all plugin functions in the order specified in
 | the plugins array to initialized the functionality
 | you need before creating a Vue instance.
 |
 */
import { plugins } from "./plugins";

export async function attachPlugins(context) {
  const response = {};

  for (const plugin of plugins) {
    let pluginFunction = await import(`./plugins/${plugin}.js`);

    pluginFunction = pluginFunction.default || pluginFunction;

    const result = await pluginFunction(context);

    Object.assign(context, result);
    Object.assign(response, result);
  }

  return response;
}
