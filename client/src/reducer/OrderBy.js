export function orderByNameAsc(array){
    
    array.sort(function(a, b){
        if(a.name > b.name){
            return 1
        };
        if(b.name > a.name){
            return -1
        };
        return 0;
    })

    
}

export function orderByNameDesc (array){
    
    array.sort(function(a, b){
        if(a.name > b.name){
            return -1
        };
        if(b.name > a.name){
            return 1
        };
        return 0;
    })

    
}

export function orderByRatingAsc (array) {
    
    array.sort(function(a, b){
        if(a.rating > b.rating){
            return 1
        };
        if(b.rating > a.rating){
            return -1
        };
        return 0;
    })

    
}

export function orderByRatingDesc (array) {
    
    array.sort(function(a, b){
        if(a.rating > b.rating){
            return -1
        };
        if(b.rating > a.rating){
            return 1
        };
        return 0;
    })

    
}