export interface IHomeHeroBody {
    id?: string;
    title: string;
    subtitle: string;
    image: string;
}

export type IHomeHeroReturn = Promise<{
    success: boolean;
    message: string;
    data: IHomeHeroBody | null;
}>;
