
function getRandomRangedNumber(min:number, max:number) {
    return  Math.floor(Math.random() * (max - min) + min);
}

export default {
    getRandomRangedNumber
}