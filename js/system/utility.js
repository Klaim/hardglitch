export { rotate_array }


// Rotates the elements of an array-like object.
function rotate_array(array, count = 1){
    while(count > 0){
        let element = array.shift();
        array.push(element);
        --count;
    }
}