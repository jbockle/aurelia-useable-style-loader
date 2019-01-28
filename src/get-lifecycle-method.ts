import { AuLifecycleMethod, CtorLike } from './helper-types';
import { StyleLoader } from './style-loader';

function voidLifecycle(method: string): () => Promise<void> {
  StyleLoader.logger.debug(`executing void callback for ${method}`);
  return (): Promise<void> => Promise.resolve();
}

const getLifecycleMethod = <T extends CtorLike>(ctor: T, method: 'attached' | 'detached'): AuLifecycleMethod => {
  return ctor.prototype[method] || voidLifecycle(method);
};

export default getLifecycleMethod;
