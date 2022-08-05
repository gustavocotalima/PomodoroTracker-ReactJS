import { createContext, ReactNode, useState } from 'react'

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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<Cycle | undefined>(undefined)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: cycles.length + 1,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycle(newCycle)
    setAmountSecondsPassed(0)
  }

  function interruptActiveCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle === activeCycle) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycle(undefined)
    setAmountSecondsPassed(0)
  }

  function setActiveCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle === activeCycle) {
          return { ...cycle, endDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycle(undefined)
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
      children
    </CyclesContext.Provider>
  )
}
