import { supabase } from '@/plugins/supabase'
import { Vote } from '../types/Election'
import { ref } from 'vue'

const useVote = () => {
  const votes = ref<Vote[]>([])
  const addVote = async (vote: Vote) => {
    try {
      const { data, error: err } = await supabase
        .from('votes')
        .insert(vote)
        .select('*')
        .returns<Vote[]>()
        .single()
      if (err) throw Error('Não foi possível votar')
      if (data) {
        votes.value.push(vote)
        // resetDisplay()
        console.log(data)
        return data
      }
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  return { addVote }
}

export default useVote
