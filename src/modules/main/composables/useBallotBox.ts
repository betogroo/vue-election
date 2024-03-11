import { supabase } from '@/plugins/supabase'
import {
  BallotBox,
  BallotBoxInsert,
  ballotBoxSchemaInsert,
  ballotBoxListSchema,
} from '../types/Election'
import { ref } from 'vue'

const useBallotBox = () => {
  const ballotBoxList = ref<BallotBox[]>([])
  const formDialog = ref(false)
  const addBallotBox = async (formData: BallotBoxInsert) => {
    try {
      const parsedData = ballotBoxSchemaInsert.parse(formData)
      if (!parsedData.election_id)
        throw new Error('Erro ao tentar criar a urna:')
      const { data, error: err } = await supabase
        .from('ballot_box')
        .insert(parsedData)
        .select('*')
        .returns<BallotBox>()
      if (err || !data)
        throw new Error(
          `Erro ao tentar criar a urna: ${err.message} (${err.code})`,
        )
      formDialog.value = false
      console.log(formData, parsedData, data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const fetchBallotBox = async (election_id: string) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('election_id', election_id)
        .returns<BallotBox[]>()
      if (err || !data)
        throw new Error(`Erro ao buscar as urna: ${err.message} (${err.code})`)
      const parsedData = ballotBoxListSchema.parse(data)
      ballotBoxList.value = parsedData
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const setBallotBoxReady = async (id: string, ready: string | null) => {
    try {
      const { error: err } = await supabase
        .from('ballot_box')
        .update({
          ready,
        })
        .eq('id', id)
      if (err)
        throw new Error(
          `Erro ao desabilitar urna: ${err.message} (${err.code})`,
        )
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const closeFormDialog = () => {
    formDialog.value = false
  }

  supabase
    .channel('ballot_box_ready_change')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'ballot_box',
      },

      (event) => {
        console.log(event)
        const { old, new: newBallotBox } = event
        const index = ballotBoxList.value.findIndex(
          (item) => item.id === old.id,
        )
        ballotBoxList.value[index] = newBallotBox as BallotBox
      },
    )
    .subscribe()

  return {
    addBallotBox,
    formDialog,
    closeFormDialog,
    fetchBallotBox,
    ballotBoxList,
    setBallotBoxReady,
  }
}

export default useBallotBox
