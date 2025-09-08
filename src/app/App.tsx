// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }
// ./src/App.tsx
import React from 'react'
import { SkillWidget } from '../widgets/skill/SkillWidget'
import type { TSkill } from '../shared/lib/types'

const stubSkill: TSkill = {
	id: 'drums-1',
	title: 'Игра на барабанах',
	liked: false,
	images: [
		'https://picsum.photos/seed/drums1/1200/800',
		'https://picsum.photos/seed/drums2/1200/800',
		'https://picsum.photos/seed/drums3/1200/800',
	],
}

function App() {
	return (
		<main style={{ padding: 24 }}>
			<SkillWidget
				skill={stubSkill}
				onPropose={(id) => console.log('propose:', id)}
				onToggleLike={(id) => console.log('like:', id)}
			/>
		</main>
	)
}

export default App
