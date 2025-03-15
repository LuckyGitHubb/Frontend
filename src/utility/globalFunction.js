// Function to create total Amount
export function calculateTotalAmount(price,qty){
    return price * qty
}
export function calculateGrandAmount(tax,amount){
    const totalAmount = Math.ceil((tax / 100) * amount)
    return amount + totalAmount;
}