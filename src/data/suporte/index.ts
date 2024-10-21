export type SuporteTags = {
    id: number;
    label: string;
};

export type SuporteTagsProps = SuporteTags[];
/**
 * TagsOptions
 * @returns TagsProps [{ id: number, label: string }]
 */
export const SuporteTagsOptions: SuporteTagsProps = [
    {
        id: 1,
        label: 'Cliente optou por marcar outro dia ',
    },
    {
        id: 2,
        label: 'cadastro incorreto',
    },
    {
        id: 3,
        label: 'Cliente remarcou o horário',
    },
    {
        id: 4,
        label: 'Cliente não compareceu',
    },
]