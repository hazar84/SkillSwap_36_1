export type TSkillExchangeStatus =
	| 'pending'
	| 'accepted'
	| 'rejected'
	| 'inProgress'
	| 'done'

export type TSkillExchange = {
	id: string
	skillId: string
	fromUserId: string
	toUserId: string
	status: TSkillExchangeStatus
}
