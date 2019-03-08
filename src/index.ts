import { FrameworkConfiguration, ViewEngine } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { styleResourcePlugin } from './style-resource-plugin';

interface IConfig {
  extensions: string[];
}

export function configure(
  framework: FrameworkConfiguration, callback: (config: IConfig) => void,
) {
  const logger = getLogger('aurelia-useable-style-loader');
  logger.info('begin configure');
  const config = { extensions: ['.css', '.less', '.sass', '.scss', '.styl'] };

  if (callback instanceof Function) {
    callback(config);
  }
  logger.debug('applying resource plugins for extensions', config.extensions);

  const viewEngine: ViewEngine = framework.container.get(ViewEngine);

  for (const ext of config.extensions) {
    viewEngine.addResourcePlugin(ext, styleResourcePlugin);
  }
  logger.info('end configure');
}
