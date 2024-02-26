import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Election, electionSchemaList } from '../types/Election'
import { useHelpers } from '@/shared/composables'
const { delay } = useHelpers()
const useElection = () => {
  const error = ref<string | false>(false)
  const isPending = ref<boolean>(false)
  const election = ref<Election>()
  const elections = ref<Election[]>([])

  const fetchElections = async () => {
    await delay()
    try {
      error.value = false
      isPending.value = true
      const { data, error: err } = await supabase
        .from('election')
        .select('*')
        .returns<Election[]>()
        .order('created_at')
      if (err)
        throw new Error(
          `Erro ao buscar as eleições: ${err.message} (${err.code})`,
        )
      elections.value = electionSchemaList.parse(data)
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(e)
    } finally {
      isPending.value = false
    }
  }
  return { election, elections, isPending, fetchElections }
}

export default useElection