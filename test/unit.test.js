import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import UsersList from '../src/components/UsersList.vue'

test('Button click calls addUser', async () => {
  let isAddUserCalled = false

  const TestComponent = defineComponent({
    extends: UsersList,
    methods: {
      addUser() {
        isAddUserCalled = true
      }
    }
  })

  const wrapper = mount(TestComponent)

  await wrapper.vm.$nextTick()

  const button = wrapper.find('[data-test="submit-button"]')
  if (button.exists()) {
    await button.trigger('click')
    await wrapper.vm.$nextTick() // Wait for any asynchronous updates
    expect(isAddUserCalled).toBe(true)
  } else {
    throw new Error('Button not found')
  }
})