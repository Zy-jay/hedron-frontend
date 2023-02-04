export function isLost(liquidationStart ?:string){
    return liquidationStart?  ((Number(liquidationStart) - (Date.now() / 1000)  ) + 24 * 60 * 60) < 0 ? true : false : false
    } 
