import {create} from "zustand"

const confirmStore = create(set => ({
  confirm: null,
  setConfirm: (value) => set({confirm: value})
}))

export default confirmStore
