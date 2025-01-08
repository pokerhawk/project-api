export const paginated = (data: any, count: number, page: number, rows: number) => {
    return {
        data,
        count,
        currentPage: page,
        nextPage: (page + 1) > Math.ceil(count / rows) ? page : page + 1,
        prevPage: (page - 1) < 0 ? page : page - 1,
        lastPage: Math.ceil(count / rows)
    }
}

export const skipOption = (rows: number, page:number) => {
    return (page-1)*rows;
}