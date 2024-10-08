import {create} from "zustand"

const homeProfileStore = create(set => ({
  userHomeProfile: null,
  setUserHomeProfile: (value) => set({userHomeProfile: value})
}))

export default homeProfileStore
