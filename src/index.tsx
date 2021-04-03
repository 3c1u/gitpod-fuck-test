import * as React from 'react'
import { render, Text, Box } from 'ink'
import UncontrolledTextInput from 'ink-text-input'

type InputState = 'input' | 'done'

export const Hello = () => {
  const [inputState, setInputState] = React.useState('input' as InputState)
  const [password, setPassword] = React.useState('')

  const onSubmit = (value: string) => {
    setInputState('done')
    setTimeout(() => process.exit(0), 1000)
  }

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text bold>Type cat: </Text>
        <UncontrolledTextInput
          focus={inputState === 'input'}
          value={password}
          onChange={setPassword}
          onSubmit={onSubmit}
          placeholder="meow"
        />
      </Box>
      {inputState === 'done' ? <Text>にゃーん</Text> : <></>}
    </Box>
  )
}

render(<Hello />)
