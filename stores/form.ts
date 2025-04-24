type QuestionType = 'short' | 'long' | 'number' | 'radio';

type FormQuestion = {
    id: number;
    text: string;
    type: QuestionType;
    required: boolean;
    placeholder?: string;
    options?: string[];
};

type FormResponse = {
    id: number;
    answers: Record<number, string | number>;
};

export type Form = {
    id: number;
    title: string;
    questions: FormQuestion[];
    responses: FormResponse[];
};

export const useFormStore = defineStore('form', () => {
    const forms = ref<Form[]>([]);
    const currentFormId = ref<number | null>(null);

    const createForm = (title: string, questions: FormQuestion[]): number => {
        const newForm: Form = {
            id: Date.now(),
            title,
            questions,
            responses: [],
        };
        forms.value.push(newForm);
        return newForm.id;
    };

    const submitResponse = (formId: number, answers: FormResponse['answers']): void => {
        const form = forms.value.find(f => f.id === formId);
        if (!form) throw new Error('Formulario no encontrado');

        form.responses.push({
            id: Date.now(),
            answers,
        });
    };

    return { forms, currentFormId, createForm, submitResponse };
});