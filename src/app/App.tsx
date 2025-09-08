// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }
// ./src/App.tsx
import React, { useState } from 'react'
import { SkillWidget } from '../widgets/skill/SkillWidget'
import type { TSkill } from '../shared/lib/types'
import Gallery from '../entities/skills/component/gallery/Gallery'

const stubSkill: TSkill = {
	id: 'drums-1',
	title: 'Игра на барабанах',
	text: 'Научу основам техники, ритмам и разбору песен. Безопасная посадка и звук.',
	category: 'Творчество и искусство',
	subCategory: 'Музыка и звук',
	liked: false,
	images: [
		'https://picsum.photos/seed/drums1/1200/800',
		'https://picsum.photos/seed/drums2/1200/800',
		'https://picsum.photos/seed/drums3/1200/800',
	],
}

function App() {
	const [skill, setSkill] = useState<TSkill>(stubSkill)

	const handleToggleLike = () => {
		setSkill((prev) => ({ ...prev, liked: !prev.liked }))
	}

	return (
		<main style={{ padding: 24, display: 'grid', gap: 48 }}>
			<SkillWidget
				skill={skill}
				onPropose={(id) => console.log('propose:', id)}
				onToggleLike={handleToggleLike}
			/>

			<section style={{ maxWidth: 800, margin: '0 auto' }}>
				<h2>Тест галереи отдельно</h2>
				<Gallery images={skill.images} />
			</section>
		</main>
	)
}

export default App
