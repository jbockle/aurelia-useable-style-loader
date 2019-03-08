import { Container } from 'aurelia-dependency-injection';
import { Loader } from 'aurelia-loader';
import { getLogger } from 'aurelia-logging';
import { ViewResources } from 'aurelia-templating';
import { CSSViewEngineHooks } from './css-view-engine-hooks';
import { IUseableStyleLoader } from './useable-style-loader';

export class CSSResource {
  public address: string;
  public scoped!: CSSViewEngineHooks;

  private _logger = getLogger('aurelia-useable-style-loader');

  constructor(address: string) {
    this._logger.debug(`creating css resource for '${address}'`);
    this.address = address;
  }

  public initialize(_container: Container, Hooks: typeof CSSViewEngineHooks): void {
    this._logger.debug(`initializing css view engine hooks`);
    this.scoped = new Hooks(this);
  }

  public register(registry: ViewResources, _name?: string): void {
    this._logger.debug(`registering css view engine hooks`);
    registry.registerViewEngineHooks(this.scoped);
  }

  public async load(container: Container): Promise<CSSResource> {
    this._logger.debug(`loading css module`);
    const loader: Loader = container.get(Loader);
    const module = await this.getModule(loader);
    this.scoped.css = module;
    return this;
  }

  public async getModule(loader: Loader): Promise<IUseableStyleLoader | null> {
    let styleModule: IUseableStyleLoader | null;
    try {
      styleModule = await loader.loadModule(this.address);
      if (!('use' in styleModule!) || !('unuse' in styleModule!)) {
        // tslint:disable-next-line:max-line-length
        throw new Error('the css module does not have use/unuse methods available, are you missing the style-loader/useable loader rule?');
      }
    } catch (e) {
      this._logger.error(`an error occurred while loading the css module`, e);
      styleModule = null;
    }
    return styleModule;
  }
}
