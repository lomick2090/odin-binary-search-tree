

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
            let mid = Math.round((start + end)/2);
            if (start > end) {
                return null;
            }
            
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

        this.remove = (value, arr = this.root) => {
            if (arr.data == value) {
                if (arr.left == null) {
                    if (arr.right == null) {
                        return null;
                    } else {
                        return arr.right;
                    }
                } else if (arr.right == null) {
                    return arr.left;
                } else {
                    //delete and reinsert
                }
            } else if (arr.data > value) {
                arr.left =  this.remove(value, arr.left);
            } else if (arr.data < value) {
                arr.right = this.remove(value, arr.left);
            }
        }
    }
}

let array = [1,3,5,7,8,9,10];
bst = new tree(array);
bst.insert(4)
bst.remove(4)

console.log(JSON.stringify(bst, null, 4))
prettyPrint(bst.root)