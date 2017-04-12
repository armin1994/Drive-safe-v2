angular.module('app')
    .filter('checkbox', function () {
        return function (arr, filter, key, noOne = true) {
            // arr is an array of objects
            // filter is checkbox filter. someting like {1:true,2:false}
            // key is a property in ech object inside arr
            // noOne is a behavior if none of checkbox is activated (default:false)
            //if (!arr.length) return null;
            if (arr) {
                function noOneCheck(filter) {
                    return Object.keys(filter).every((key) => {
                        return !filter[key]
                    })
                }

                if (key == 'difficulty') {
                    return arr.filter((i) => {
                        return filter[i.difficulty] || (noOne && noOneCheck(filter))
                    })
                }
                else if (key == 'category'){
                    return arr.filter((i) => {
                        return filter[i.category.name] || (noOne && noOneCheck(filter))
                    })
                }
            }
            else
                return arr;
        }
    })