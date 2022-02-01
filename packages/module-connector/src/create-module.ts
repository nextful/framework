import Module from './module';
import { NextModule } from '../types.d';

const createModule = ({ ...props }: NextModule) => new Module(props);

export default createModule;
