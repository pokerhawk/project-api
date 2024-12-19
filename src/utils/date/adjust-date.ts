export type dateProps = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'lastYear' | 'allTime'
type typeProps = 'gte' | 'lte'

const getLastDayOfMonth = (
    year:number, month:number, day:number
)=>{    
    const maxDay = new Date(year, month + 1, 0).getDate();
    return Math.min(day, maxDay);
}

const year = new Date().getFullYear()
const month = new Date().getMonth()
const today = new Date().getDate()
const lastDay = getLastDayOfMonth(year, month, 31);
const hours = new Date().getHours()
const minutes = new Date().getMinutes()
const seconds = new Date().getSeconds()
const milliseconds = new Date().getMilliseconds()

export const transformDate = (date:string, type?:typeProps) =>{
    const dateSplit = date.split('-');
    if(type){
        if(type === "gte"){
            return new Date(Number(dateSplit[0]), Number(dateSplit[1])-1, Number(dateSplit[2]), 0, 0, 0, 0)
        }
        if(type === "lte"){
            return new Date(Number(dateSplit[0]), Number(dateSplit[1])-1, Number(dateSplit[2]), 23, 59, 59, 999)
        }
    } else {
        return new Date(Number(dateSplit[0]), Number(dateSplit[1])-1, Number(dateSplit[2]), hours, minutes, seconds, milliseconds)
    }
}

export const fixedDate = (date:dateProps, type:typeProps) =>{
    if(type === 'gte'){
        switch(date){
            case 'today':
                return new Date(year, month, today, 0, 0, 0, 0)
            case 'yesterday':
                return new Date(year, month, (today-1), 0, 0, 0, 0)
            case 'thisWeek':
                return new Date(year, month, (today - 7), 0, 0, 0, 0)
            case 'thisMonth':
                return new Date(year, month, 1, 0, 0, 0, 0)
            case 'lastMonth':
                return new Date(year, (month - 1), 1, 0, 0, 0, 0)
            case 'thisYear':
                return new Date(year, 0, 1, 0, 0, 0, 0)
            case 'lastYear':
                return new Date((year - 1), 0, 1, 0, 0, 0, 0)
            case 'allTime':
                return new Date(0, 0, 0,  0, 0, 0, 0)
        }
    }
    if(type === 'lte'){
        switch(date){
            case 'today':
                return new Date()
            case 'yesterday':
                return new Date(year, month, (today-1), 23, 59, 59, 999)
            case 'thisWeek':
                return new Date()
            case 'thisMonth':
                return new Date()
            case 'lastMonth':
                return new Date(year, (month - 1), lastDay, 23, 59, 59, 999)
            case 'thisYear':
                return new Date()
            case 'lastYear':
                return new Date((year - 1), 11, 31, 23, 59, 59, 999)
            case 'allTime':
                return new Date()
        }
    }
}