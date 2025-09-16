export type TSkillExchange = {
    id: string;
    skillId: string;
    fromUserId: string;
    toUserId: string | null;
    status: 'exchangeSearch' | 'exchangeDone' | 'exchangeInProgress';
}