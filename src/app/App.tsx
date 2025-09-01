// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }

// export default App
import { useState } from 'react'
import CheckboxUI from '../components/SkillUI/CheckboxUI'

export default function App() {
	const [a, setA] = useState(false)

	return (
		<div
			style={{ padding: 20, display: 'flex', gap: 20, background: '#f6f6f6' }}
		>
			<CheckboxUI
				ariaLabel='Пустой чекбокс'
				checked={a}
				onClick={() => setA((v) => !v)}
			/>
			<CheckboxUI ariaLabel='Выбранный чекбокс' checked />
			<CheckboxUI ariaLabel='Отключенный чекбокс' disabled />
		</div>
	)
}
