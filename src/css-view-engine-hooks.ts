import { getLogger } from 'aurelia-logging';
import { CSSResource } from './css-resource';
import { IUseableStyleLoader } from './useable-style-loader';

export class CSSViewEngineHooks {
  public owner: any;
  public css!: IUseableStyleLoader | null;

  private _logger = getLogger('aurelia-useable-style-loader');

  constructor(owner: CSSResource) {
    this._logger.debug('instatiating CSSViewEngineHooks', owner);
    this.owner = owner;
  }

  public beforeBind(): void {
    if (this.css) {
      this._logger.debug('using css resource');
      this.css.use();
    }
  }
  public beforeUnbind(): void {
    if (this.css) {
      this._logger.debug('unusing css resource');
      this.css.unuse();
    }
  }
}
