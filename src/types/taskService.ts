type orderBy = 'asc' | 'desc';

export type taskQueryProps = {
    where?: {
        AND?: Array<Object>;
    },
    select?: Object;
    take?: number;
    skip?: number;
    orderBy: {
        createdAt?: orderBy;
        updatedAt?: orderBy;
        deletedAt?: orderBy;
    };
}