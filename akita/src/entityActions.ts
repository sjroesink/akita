import { ID } from './types';

export enum EntityActions {
  Add,
  Update,
  Remove
}

export interface EntityAction {
  type: EntityActions;
  ids: ID[]
}
