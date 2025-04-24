type PollOption = {
    text: string;
    votes: number;
};

export type Poll = {
    id: number;
    question: string;
    options: PollOption[];
};

export const usePollStore = defineStore('poll', () => {
    const polls = ref<Poll[]>([]);


    const createPoll = (question: string, options: string[]): void => {
        if (!question.trim()) throw new Error('La pregunta es requerida');
        if (options.length < 2) throw new Error('Debe haber al menos 2 opciones');

        polls.value.push({
            id: Date.now(),
            question,
            options: options.map(opt => ({ text: opt, votes: 0 })),
        });
    };

    const vote = (pollId: number, optionIndex: number): void => {
        const poll = polls.value.find(p => p.id === pollId);
        if (!poll) throw new Error('Encuesta no encontrada');

        poll.options[optionIndex].votes++;
    };

    const getPollResults = (pollId: number): Poll | undefined => {
        return polls.value.find(p => p.id === pollId);
    };

    return { polls, createPoll, vote, getPollResults };
});