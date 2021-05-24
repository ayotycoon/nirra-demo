

export const mock = (seconds = 2000, r = false)=>{

    return new Promise((resolve,reject) => {
        setTimeout(!r ?resolve: reject,seconds)
    })

}