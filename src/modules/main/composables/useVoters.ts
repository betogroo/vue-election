import { supabase } from '@/plugins/supabase'
import { type Voter, voterSchema, voterListSchema } from '../types/Election'
import { ref } from 'vue'
const useVoters = () => {
  const voter = ref<Voter>({
    id: '',
    name: '',
    ra: 0,
  })
  const voters = ref<Voter[]>([])
  const availableVoters = ref<Voter[]>([])
  const fetchVoters = async () => {
    try {
      const { data, error: err } = await supabase
        .from('voters')
        .select('*')
        .returns<Voter[]>()
      if (err) throw err
      voters.value = voterListSchema.parse(data)
      return data || null
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const fetchUsedVoters = async (election_id: string) => {
    try {
      const { data, error: err } = await supabase
        .from('votes')
        .select('voter_id')
        .eq('election_id', election_id)
      if (err) throw err
      const usedVoters =
        '(' + data.map((item) => `${item.voter_id}`).join(',') + ')'
      return usedVoters
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const fetchAvailableVoters = async (election_id: string) => {
    try {
      const usedVoters = await fetchUsedVoters(election_id)
      const { data, error: err } = await supabase
        .from('voters')
        .select('id, name, ra')
        .not('id', 'in', usedVoters)
      if (err) throw err
      availableVoters.value = voterListSchema.parse(data)
      //console.log(data, usedVoters)
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const getVoterByRa = async (election_id: string, voter_ra: string | null) => {
    try {
      const usedVoters = await fetchUsedVoters(election_id)
      const { data, error: err } = await supabase
        .from('voters')
        .select('id, name, ra')
        .not('id', 'in', usedVoters)
        .eq('ra', voter_ra)
        .single()
      if (err) throw err
      voter.value = voterSchema.parse(data)
      console.log(data)
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  return {
    fetchVoters,
    availableVoters,
    getVoterByRa,
    fetchAvailableVoters,
    voter,
    voters,
  }
}

export default useVoters
