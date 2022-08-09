import { createContext, ReactNode, useReducer, useState } from 'react'

interface Cycle {
  id: number
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  endDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  setActiveCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesState {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycle: action.payload.newCycle,
          }
        case 'INTERRUPT_ACTIVE_CYCLE':
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
        case 'SET_ACTIVE_CYCLE_AS_FINISHED':
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
    },
    {
      cycles: [],
      activeCycle: undefined,
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycle } = cyclesState

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: cycles.length + 1,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  function interruptActiveCycle() {
    dispatch({
      type: 'INTERRUPT_ACTIVE_CYCLE',
      payload: {
        activeCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  function setActiveCycleAsFinished() {
    dispatch({
      type: 'SET_ACTIVE_CYCLE_AS_FINISHED',
      payload: {
        data: activeCycle,
      },
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        setActiveCycleAsFinished,
        activeCycle,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
