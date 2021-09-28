export default async function insertionSort(arr){
    for(let i = 1; i < arr.length;i++){
        for(let j = i - 1; j > -1; j--){
            if(arr[j + 1].tempo < arr[j].tempo){
                [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];
            }
        }
    };
  return arr;
}