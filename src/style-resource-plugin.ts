import { resource } from 'aurelia-framework';
import { CSSResource } from './css-resource';
import { CSSViewEngineHooks } from './css-view-engine-hooks';

export function createCSSResource(address: string): any {
  @resource(new CSSResource(address))
  class UseableCSS extends CSSViewEngineHooks { }
  return UseableCSS;
}

const styleResourcePlugin = {
  fetch: (address: string) => {
    return { [address]: createCSSResource(address) };
  },
};

export { styleResourcePlugin };
