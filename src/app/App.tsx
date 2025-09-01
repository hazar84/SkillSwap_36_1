// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }

// export default App
import React, { useState } from 'react'
import CheckboxUI from '@/components/SkillUI/CheckboxUI'
import RadioButtonUI from '@/components/SkillUI/RadioButtonUI'
import CheckboxCategoryUI from '@/components/SkillUI/CheckboxCategoryUI'

export default function App() {
	const [check, setCheck] = useState(false)
	const [radio, setRadio] = useState(false)
	const [category, setCategory] = useState<'empty' | 'partial' | 'checked'>(
		'empty'
	)

	const cycleCategory = () => {
		if (category === 'empty') setCategory('partial')
		else if (category === 'partial') setCategory('checked')
		else setCategory('empty')
	}

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
			<CheckboxCategoryUI
				ariaLabel='категория'
				state={category}
				onClick={cycleCategory}
			/>
		</div>
	)
}
