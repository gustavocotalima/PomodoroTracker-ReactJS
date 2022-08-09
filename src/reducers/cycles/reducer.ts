import { ActionTypes } from './actions'

export interface Cycle {
  id: number
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  endDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycle: action.payload.newCycle,
      }
    case ActionTypes.INTERRUPT_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle === state.activeCycle) {
            return {
              ...cycle,
              interruptDate: new Date(),
            }
          } else {
            return cycle
          }
        }),
        activeCycle: undefined,
      }
    case ActionTypes.SET_ACTIVE_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle === state.activeCycle) {
            return {
              ...cycle,
              endDate: new Date(),
            }
          } else {
            return cycle
          }
        }),
        activeCycle: undefined,
      }
    default:
      return state
  }
}
