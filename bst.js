const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class node {
    constructor(data, left, right) {
        this.data = data,
        this.left = left,
        this.right = right
    }
}



class tree {
    constructor(arr) {
        this.buildTree = (arr, start = 0, end = arr.length) => {
            if (start > end || end == 0) {
                return null;
            }

            let mid = Math.round((start + end)/2);            
            let rootData = arr[mid-1];
        
            
            let left = this.buildTree(arr, start, mid-1);
            let right = this.buildTree(arr, mid+1, end);
        
            return new node(rootData, left, right);
        },

        this.root = this.buildTree(arr),

        this.insert = (value, arr = this.root) => {
            if (arr.data > value) {
                if (arr.left == null) {
                    arr.left = new node(value, null, null);
                    return;
                } else {
                    this.insert(value, arr.left)
                }
            } else if (arr.data < value) {
                if (arr.right == null) {
                    arr.right = new node(value, null, null)
                    return;
                } else {
                    this.insert(value, arr.right);
                }
            } else if (arr.data == value) {
                return;
            }
        
        },

        this.minValue = (arr = this.root) => {
            
            let minV = arr.data
            while (arr.left != null) {
                minV = arr.left.data;
                arr = arr.left;
            }
            return minV;
        },

        this.remove = (value, arr = this.root) => {
            if (arr == null) {
                return arr;
            }

            if (value > arr.data) {
                arr.right = this.remove(value, arr.right);
            } else if (value < arr.data) {
                arr.left = this.remove(value, arr.left);
            } else {
                if (!arr.right) {
                    return arr.left;
                } else if (!arr.left) {
                    return arr.right;
                }

                arr.data = this.minValue(arr.right);
                arr.right = this.remove(arr.data, arr.right);
            }
        
            return arr;
        }
    }
}

let array = [1,3,5,7,8,9,10];
bst = new tree(array);
bst.insert(4)
bst.remove(9)

prettyPrint(bst.root)