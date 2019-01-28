import { IStyleLoader } from './helper-types';

declare module '*.scss' {
  const loader: IStyleLoader;
  export default loader;
}
