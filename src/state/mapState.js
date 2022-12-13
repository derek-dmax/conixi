import { computed } from 'vue'
import { useStore } from 'vuex'
const mapGetters = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => [getter, computed(() => store.getters[getter])]
    )
  )
}

const mapMutations = () => {
    const store = useStore()
    return Object.fromEntries(
      Object.keys(store._mutations).map(
        mutation => [mutation, value => store.commit(mutation, value)]
      )
    )
  }
  
  const mapActions = () => {
    const store = useStore()
    return Object.fromEntries(
      Object.keys(store._actions).map(
        action => [action, value => store.commit(action, value)]
      )
    )
  }
  
  export { mapActions, mapGetters, mapMutations }