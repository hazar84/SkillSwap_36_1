// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }

// export default App
import React, { useState } from 'react'
import CheckboxUI from '@/components/SkillUI/CheckboxUI'
import RadioButtonUI from '@/components/SkillUI/RadioButtonUI'

export default function App() {
	const [check, setCheck] = useState(false)
	const [radio, setRadio] = useState(false)

	return (
		<div style={{ padding: 20, display: 'flex', gap: 20 }}>
			<CheckboxUI
				ariaLabel='чекбокс'
				checked={check}
				onClick={() => setCheck((v) => !v)}
			/>
			<RadioButtonUI
				ariaLabel='радио'
				checked={radio}
				onClick={() => setRadio((v) => !v)}
			/>
			<RadioButtonUI ariaLabel='радио disabled' disabled />
		</div>
	)
}
