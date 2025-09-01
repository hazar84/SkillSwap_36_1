// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }

// export default App
import React, { useState } from 'react'
import CheckboxUI from '@/components/SkillUI/CheckboxUI'
import RadioButtonUI from '@/components/SkillUI/RadioButtonUI'
import CheckboxCategoryUI from '@/components/SkillUI/CheckboxCategoryUI'
import LikeButtonUI from '@/components/SkillUI/LikeButtonUI'
import VisibleButtonUI from '@/components/SkillUI/VisibleButtonUI'
import NotificationButtonUI from '@/components/SkillUI/NotificationButtonUI'
import ToggleButtonUI from '@/components/SkillUI/ToggleButtonUI'

export default function App() {
	const [notif, setNotif] = useState(false)
	const [check, setCheck] = useState(false)
	const [radio, setRadio] = useState(false)
	const [category, setCategory] = useState<'empty' | 'partial' | 'checked'>(
		'empty'
	)
	const [like, setLike] = useState(false)
	const [visible, setVisible] = useState(false)

	const [toggle, setToggle] = useState(false)

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
			<LikeButtonUI
				ariaLabel='лайк'
				active={like}
				onClick={() => setLike((v) => !v)}
			/>
			<VisibleButtonUI
				ariaLabel='показать/скрыть'
				active={visible}
				onClick={() => setVisible((v) => !v)}
			/>
			<NotificationButtonUI
				ariaLabel='уведомления'
				active={notif}
				onClick={() => setNotif((v) => !v)}
			/>
			<ToggleButtonUI
				ariaLabel='тумблер'
				active={toggle}
				onClick={() => setToggle((v) => !v)}
			/>
		</div>
	)
}
