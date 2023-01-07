import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material'
import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  useEffect,
} from 'react'

interface IStates {
  open: boolean
  type: AlertColor
  message: string
  position: SnackbarOrigin
  timeout: number
}

const defaultState = {
  states: {
    open: false,
    type: 'info',
    message: 'message',
    position: {
      vertical: 'top',
      horizontal: 'right',
    },
    timeout: 6000,
  } as IStates,
  setStates: (() => {}) as Dispatch<React.SetStateAction<IStates>>,
}

export const SnackbarContext = createContext<typeof defaultState>(defaultState)

/* -------------------------------------------------------------------------- */
/*                                  Provider                                  */
/* -------------------------------------------------------------------------- */
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- States --------------------------------- */

  const [states, setStates] = useState<IStates>(defaultState.states)

  /* --------------------------------- Methods -------------------------------- */
  const handleClose = () => {
    setStates({ ...states, open: false })
  }
  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    return () => {
      setStates(defaultState.states)
    }
  }, [])

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <SnackbarContext.Provider value={{ states, setStates }}>
      {children}
      <Snackbar
        anchorOrigin={states.position}
        open={states.open}
        onClose={handleClose}
        autoHideDuration={states.timeout}
      >
        <Alert severity={states.type}>{states.message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
