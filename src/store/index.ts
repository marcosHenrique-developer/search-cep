import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type IAddress } from '../types/type'

export const useAddressStore = defineStore('address', () => {
  const address = ref({} as IAddress)

  function updateAddress(payload: IAddress) {
    address.value = payload
  }
  const getAddress = computed(() => address.value)

  return { address, updateAddress, getAddress }
})
