import type { Session } from 'next-auth'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export type CurrentSession = Session | null

export interface CurrentSessionStore {
  currentSession: CurrentSession
  setCurrentSession: (value: CurrentSession) => void
}

export const useCurrentSession = create<CurrentSessionStore>()(
  devtools(
    persist(
      (set) => {
        return {
          currentSession: null,
          setCurrentSession(value) {
            set({ currentSession: value })
          },
        }
      },
      {
        name: 'instagram-clone/current-session-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize(state) {
          return { currentSession: state.currentSession }
        },
      }
    ),
    { name: 'instagram-clone/current-session' }
  )
)
