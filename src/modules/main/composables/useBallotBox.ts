import { supabase } from '@/plugins/supabase'
import {
  BallotBox,
  BallotBoxInsert,
  ballotBoxSchemaInsert,
} from '../types/Election'
import { ref } from 'vue'

const useBallotBox = () => {
  const formDialog = ref(false)
  const addBallotBox = async (formData: BallotBoxInsert) => {
    const parsedData = ballotBoxSchemaInsert.parse(formData)
    try {
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

  const closeFormDialog = () => {
    formDialog.value = false
  }

  return { addBallotBox, formDialog, closeFormDialog }
}

export default useBallotBox
