function is_int(value){
    if( (parseInt(value) % 1 === 0 )){
        return true;
    }else{
        return false;
    }
}

module.exports = is_int;