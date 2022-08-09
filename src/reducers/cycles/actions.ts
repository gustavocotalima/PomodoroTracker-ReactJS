import { Cycle } from './reducer'

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  // eslint-disable-next-line no-unused-vars
  SET_ACTIVE_CYCLE_AS_FINISHED = 'SET_ACTIVE_CYCLE_AS_FINISHED',
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptActiveCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_ACTIVE_CYCLE,
  }
}

export function setActiveCycleAsFinishedAction() {
  return {
    type: ActionTypes.SET_ACTIVE_CYCLE_AS_FINISHED,
  }
}
