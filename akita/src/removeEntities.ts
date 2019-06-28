import { EntityState, ID, StateWithActive } from './types';
import { isNil } from './isNil';
import { hasActiveState, isMultiActiveState, resolveActiveEntity } from './activeState';

export type RemoveEntitiesParams<State, Entity> = {
  state: StateWithActive<State>;
  ids: any[];
};

// @internal
export function removeEntities<S extends EntityState<E>, E>({ state, ids }: RemoveEntitiesParams<S, E>): S {
  if (isNil(ids)) return removeAllEntities(state);
  const entities = state.entities;
  let newEntities = {};

  for (const id of state.ids) {
    if (ids.includes(id) === false) {
      newEntities[id] = entities[id];
    }
  }

  const newIds = state.ids.filter(current => ids.includes(current) === false);

  const newState = {
    ...state,
    entities: newEntities,
    ids: newIds,
    cache$: !!newIds.length
  };

  if (hasActiveState(state)) {
    newState.active = resolveActiveEntity(newState);
  }

  return newState;
}

// @internal
export function removeAllEntities<S>(state: StateWithActive<S>): S {
  return {
    ...state,
    entities: {},
    ids: [],
    cache$: false,
    active: isMultiActiveState(state.active) ? [] : null
  };
}
