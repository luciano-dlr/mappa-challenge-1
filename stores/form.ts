type QuestionType = 'short' | 'long' | 'number' | 'radio';

export type FormQuestion = {
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

    const initializeStore = () => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('forms');
            if (saved) forms.value = JSON.parse(saved);
        }
    };

    const saveToLocalStorage = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('forms', JSON.stringify(forms.value));
        }
    };

    // Inicializar al crear el store
    initializeStore();

    const createForm = (title: string, questions: FormQuestion[]): number => {
        const newForm: Form = {
            id: Date.now(),
            title,
            questions,
            responses: [],
        };
        forms.value.push(newForm);
        saveToLocalStorage();
        return newForm.id;
    };

    const submitResponse = (formId: number, answers: FormResponse['answers']): void => {
        const form = forms.value.find(f => f.id === formId);
        if (!form) throw new Error('Formulario no encontrado');

        form.responses.push({
            id: Date.now(),
            answers,
        });
        saveToLocalStorage();
    };

    const getFormById = (id: number) => {
        return forms.value.find(f => f.id === id);
    };



    return { forms: readonly(forms), createForm, submitResponse, getFormById };
});