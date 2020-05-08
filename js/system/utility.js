export { rotate_array, random_sample }


// Rotates the elements of an array-like object.
function rotate_array(array, count = 1){
    while(count > 0){
        let element = array.shift();
        array.push(element);
        --count;
    }
}

// Return a random element of the provided array.
function random_sample(array){
    if(array.length == 0)
        return null;
    return array[ Math.floor( Math.random() * array.length ) ];
}

