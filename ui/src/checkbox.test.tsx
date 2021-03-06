// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { XCheckbox, Checkbox } from './checkbox'
import * as T from './qd'
import { initializeIcons } from '@fluentui/react'

const name = 'checkbox'
const checkboxProps: Checkbox = { name }

describe('Checkbox.tsx', () => {
  beforeAll(() => initializeIcons())
  beforeEach(() => {
    jest.clearAllMocks()
    T.qd.args[name] = null
  })

  it('Renders data-test attr', () => {
    const { queryByTestId } = render(<XCheckbox model={checkboxProps} />)
    expect(queryByTestId(name)).toBeInTheDocument()
  })

  it('Does not display checkbox when visible is false', () => {
    const { queryByTestId } = render(<XCheckbox model={{ ...checkboxProps, visible: false }} />)
    expect(queryByTestId(name)).toBeInTheDocument()
    expect(queryByTestId(name)).not.toBeVisible()
  })

  it('Does not call sync when trigger is off', () => {
    const syncMock = jest.fn()
    const { getByTestId } = render(<XCheckbox model={checkboxProps} />)

    T.qd.sync = syncMock
    fireEvent.click(getByTestId(name))

    expect(syncMock).toHaveBeenCalledTimes(0)
  })

  it('Calls sync when trigger is on', () => {
    const syncMock = jest.fn()
    const { getByTestId } = render(<XCheckbox model={{ ...checkboxProps, trigger: true }} />)

    T.qd.sync = syncMock
    fireEvent.click(getByTestId(name))

    expect(syncMock).toHaveBeenCalled()
  })

  it('Sets args on click', () => {
    const { getByTestId } = render(<XCheckbox model={checkboxProps} />)
    fireEvent.click(getByTestId(name))

    expect(T.qd.args[name]).toBe(true)
  })

})