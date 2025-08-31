import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { MyButton } from '../src'

test('button', () => {
  const app = mount(MyButton, {
    props: {
      type: 'primary',
    },
  })
  expect(app.text()).toMatchInlineSnapshot(`"my button: type primary"`)
  expect(app.html()).toMatchInlineSnapshot(
    `"<button class="my-button">my button: type primary</button>"`,
  )
})
