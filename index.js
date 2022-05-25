//  https://relevel.com/courses/backend-development-course-0002/schedule/class-details/3d8dee1d-f7ad-4d76-b490-de5a6dcb5f3f/live-class

let arr1 = [[1,2,3,4],
           [5,6,7,8],
           [9,10,11,12]
           ];

    let arr2 = [[13,41,16,17],
               [18,19,20,21],
               [22,23,24,25]
                [26,27,28,29],
                [30,31,32,33]
               ];


// output - 1,2,3,8,12,11,10,9,5,6,7,8

// output - 13,14,16,17,21,25,29,33,32,31,30,26,22,18,19,20,24,28,27,23

let r = 0 // first row
let c = 0 // first column

let n = arr1.length; // all row
let m = arr1[0].length  // all column

let i = 0;
while(r <n  && c < m){
console.log(arr1[i],arr1[0].length);
}

