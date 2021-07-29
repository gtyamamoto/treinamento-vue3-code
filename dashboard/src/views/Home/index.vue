<template>
  <custom-header
   @create-account="handleAccountCreate"
   @login="handleLogin"
   />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="text-center font-medium text-gray-800">feedbacker 2020</p>
  </div>
</template>

<script>
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () { }

    function handleAccountCreate () { }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
