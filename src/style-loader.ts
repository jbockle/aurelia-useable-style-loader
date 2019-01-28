import { getLogger, Logger } from 'aurelia-logging';
import getLifecycleMethod from './get-lifecycle-method';
import { CtorLike, IAuLifecycle, IStyleLoader } from './helper-types';

export class StyleLoader {
  public static logger: Logger = getLogger('aurelia-useable-style-loader');
  public static use(styleLoader: { use: () => void, unuse: () => void }) {

    this.logger.debug(`preparing to apply useStyles decorator`, styleLoader);

    return <T extends CtorLike>(ctor: T) => {
      const original = this.getLifecycleMethods(ctor);

      return this.extendClass<T>(ctor, styleLoader, original);
    };
  }

  private static getLifecycleMethods<T extends CtorLike>(ctor: T) {
    return {
      attached: getLifecycleMethod(ctor, 'attached'),
      detached: getLifecycleMethod(ctor, 'detached'),
    };
  }

  private static extendClass<T extends CtorLike>(ctor: T, styleLoader: IStyleLoader, original: IAuLifecycle) {
    // tslint:disable-next-line:max-classes-per-file
    return class extends ctor {
      public async attached(): Promise<void> {
        StyleLoader.logger.debug(`loading styles for ${ctor.name}`);

        styleLoader.use();

        await this.__applyOriginalMethod__('attached');
      }

      public async detached(): Promise<void> {
        StyleLoader.logger.debug(`unloading styles for ${ctor.name}`);

        styleLoader.unuse();

        await this.__applyOriginalMethod__('detached');
      }

      public async __applyOriginalMethod__(name: 'attached' | 'detached') {
        await original[name].apply(this);
      }
    };
  }
}
