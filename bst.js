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
            let arrData = arr[mid-1];
        
            
            let left = this.buildTree(arr, start, mid-1);
            let right = this.buildTree(arr, mid+1, end);
        
            return new node(arrData, left, right);
        },

        this.root = this.buildTree(arr),

        this.insert = (value, root = this.root) => {
            if (root.data > value) {
                if (root.left == null) {
                    root.left = new node(value, null, null);
                    return;
                } else {
                    this.insert(value, root.left)
                }
            } else if (root.data < value) {
                if (root.right == null) {
                    root.right = new node(value, null, null)
                    return;
                } else {
                    this.insert(value, root.right);
                }
            } else if (root.data == value) {
                return;
            }
        
        },

        this.minValue = (root = this.root) => {
            
            let minV = root.data
            while (root.left != null) {
                minV = root.left.data;
                root = root.left;
            }
            return minV;
        },

        this.remove = (value, root = this.root) => {
            if (root == null) {
                return root;
            }

            if (value > root.data) {
                root.right = this.remove(value, root.right);
            } else if (value < root.data) {
                root.left = this.remove(value, root.left);
            } else {
                if (!root.right) {
                    return root.left;
                } else if (!root.left) {
                    return root.right;
                }

                root.data = this.minValue(root.right);
                root.right = this.remove(root.data, root.right);
            }
        
            return root;
        }, 

        this.find = (value, root = this.root) => {
            if (root.data == value) {
                return root
            } else if (value > root.data) {
                return this.find(value, root.right);
            } else {
                return this.find(value, root.left);
            }
        },

        this.levelOrder = (func = (x) => {return x}, root = this.root) => {
            let array = [];
            let queue = [];
            if (root == null) {
                return null;
            }
            queue.push(root)
            while (queue.length > 0) {
                let current = queue[0];
                array.push(func(current.data));
                if (current.left) {queue.push(current.left)};
                if (current.right) {queue.push(current.right)};
                queue.shift();
            }
            return array;
        },

        this.inOrder = (func = (x) => {return x}, root = this.root, array = []) => {   
            if (root.left) {
                this.inOrder(func, root.left, array);
            }
            array.push(func(root.data));

            if (root.right) {
                this.inOrder(func, root.right, array);
            }

            return array;
        }, 

        this.preOrder = (func = (x) => {return x}, root = this.root, array = []) => {
            array.push(func(root.data));

            if (root.left) {
                this.preOrder(func, root.left, array);
            }
            if (root.right) {
                this.preOrder(func, root.right, array);
            }

            return array;

        },

        this.postOrder = (func = (x) => {return x}, root = this.root, array = []) => {
            if (root == null) {
                return;
            }
            this.postOrder(func, root.left, array);
            this.postOrder(func, root.right, array);
            array.push(func(root.data));

            return array;

        },

        this.height = (node) => {
            let l=0;
            let r=0;
            while (node.left) {
                node = node.left;
                l++;
            }
            while (node.right) {
                node = node.right;
                r++;
            }
            return (l >= r) ? l : r;
        },

        this.depth = (node, root=this.root) => {
            let d = 0
            while (root != node) {
                if (root.data > node.data) {
                    root = root.left;
                    d++;
                } else {
                    root = root.right;
                    d++;
                }
            }
            return d;
        },

        this.isBalanced = (root=this.root, outcome = true) => {
            if (!(root.left && root.right)) {
                return outcome;
            }
            if (!((this.height(root.left)+1== this.height(root.right)) ||
                (this.height(root.left)-1 == this.height(root.right)) || 
                (this.height(root.left)   == this.height(root.right)))) {
                return false;
            }
            outcome = this.isBalanced(root.left, outcome);
            outcome = this.isBalanced(root.right, outcome);

            return outcome;
        },

        this.rebalance = (root = this.root) => {

        }

        
    }
}

let array = [3,5,7,8,9,10, 
    14,18,44,98 ,99
];
bst = new tree(array);

bst.insert(4);
bst.insert(15);
bst.insert(16);
bst.insert(97);
prettyPrint(bst.root)
console.log(bst.isBalanced());

//console.log(JSON.stringify((bst.levelOrder())))