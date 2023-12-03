const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const balancedTree = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(balancedTree);
    this.inOrderArray = [];
    this.preOrderArray = [];
    this.postOrderArray = [];
  }

  buildTree(balancedTree) {
    if (balancedTree.length === 0) return null;
    const midPoint = Math.floor(balancedTree.length / 2);
    const rootNode = new Node(balancedTree[midPoint]);
    rootNode.left = this.buildTree(balancedTree.slice(0, midPoint));
    rootNode.right = this.buildTree(balancedTree.slice(midPoint + 1));
    return rootNode;
  }

  insert(value, currentRoot = this.root) {
    if (value === undefined) return console.log("Error! Value cannot be empty");
    if (currentRoot === null) return new Node(value);
    if (value > currentRoot.data) {
      currentRoot.right = this.insert(value, currentRoot.right);
    } else if (value < currentRoot.data) {
      currentRoot.left = this.insert(value, currentRoot.left);
    } else return currentRoot;

    return currentRoot;
  }

  delete(value, currentRoot = this.root) {
    if (currentRoot === null) return currentRoot;
    if (value === undefined) return console.log("Error! Value cannot be empty");

    if (value > currentRoot.data) {
      currentRoot.right = this.delete(value, currentRoot.right);
    } else if (value < currentRoot.data) {
      currentRoot.left = this.delete(value, currentRoot.left);
    } else {
      if (currentRoot.left === null) {
        return currentRoot.right;
      } else if (currentRoot.right === null) {
        return currentRoot.left;
      }
      let predecesser = currentRoot.left;
      while (predecesser.right !== null) {
        predecesser = predecesser.right;
      }
      currentRoot.data = predecesser.data;
      currentRoot.left = this.delete(predecesser.data, currentRoot.left);
    }
    prettyPrint(this.root);
    return currentRoot;
  }

  find(value, currentRoot = this.root) {
    if (value === undefined) return "Error! Value cannot be empty";
    if (currentRoot === null) return `${value} does not exists in the tree.`;

    if (value > currentRoot.data) {
      return this.find(value, currentRoot.right);
    } else if (value < currentRoot.data) {
      return this.find(value, currentRoot.left);
    } else {
      return currentRoot;
    }
  }

  levelOrder(currentRoot = this.root) {
    if (currentRoot === null) return;
    const queue = [];
    const result = [];

    queue.push(currentRoot);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      result.push(node.data);
    }
    return result;
  }

  inOrder(root = this.root) {
    if (root === null) return;

    if (root.left !== null) this.inOrder(root.left);

    if (root.data !== undefined) this.inOrderArray.push(root.data);

    if (root.right !== null) this.inOrder(root.right);

    return this.inOrderArray;
  }

  preOrder(root = this.root) {
    if (root === null) return;

    if (root.data !== undefined) this.preOrderArray.push(root.data);

    if (root.left !== null) this.preOrder(root.left);

    if (root.right !== null) this.preOrder(root.right);

    return this.preOrderArray;
  }

  postOrder(root = this.root) {
    if (root === null) return;

    if (root.left !== null) this.postOrder(root.left);

    if (root.right !== null) this.postOrder(root.right);

    if (root.data !== undefined) this.postOrderArray.push(root.data);

    return this.postOrderArray;
  }

  height(root = this.root) {
    if (root === null) return 0;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  depth(node, root = this.root, count = 0) {
    if (root === null) return;
    if (node === undefined) node = root.data;
    if (node === root.data) return count;

    const status = this.find(node, root);
    if (!status || isNaN(status.data)) return `(NaN) ${node} does not exist in the tree`;

    if (node > root.data) {
      return this.depth(node, root.right, count + 1);
    } else {
      return this.depth(node, root.left, count + 1);
    }
  }

  isBalanced(root = this.root) {
    if (root === null) return true;
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) === true && this.isBalanced(root.right) === true)
      return true;

    return false;
  }

  reBalance() {
    if (this.isBalanced()) return prettyPrint(this.root);

    console.log("Before balancing");
    prettyPrint(this.root);
    console.log("After balancing");
    if (this.root === null) return;
    const sorted = [...new Set(this.inOrder().sort((a, b) => a - b))];
    this.root = this.buildTree(sorted);
    prettyPrint(this.root);
    console.log("Is balanced: ", this.isBalanced());
  }
}

// const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const tree2 = new Tree([7, 6, 5, 3, 4, 2, 1]);
tree2.insert(8);
tree2.insert(6);
tree2.insert(9);
tree2.insert(9);
tree2.insert(1.5);
tree2.insert(-1);
// tree2.delete(9);
// tree2.delete(8);
// tree2.delete(7);
// tree2.delete(6);
// tree2.delete(1.5);
console.log(tree2.find(3)); // Node {data: 3, left: null, right: null}
console.log(tree2.find(10)); // 10 does not exists in the tree.
console.log("Level Order:", [tree2.levelOrder().join(", ")]); // [4, 2, 6, 1, 3, 5, 7, -1, 1.5, 8, 9]
console.log("Inorder:", [tree2.inOrder().join(", ")]); // [-1, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9]
console.log("Preorder:", [tree2.preOrder().join(", ")]); // [4, 2, 1, -1, 1.5, 3, 6, 5, 7, 8, 9]
console.log("Postorder:", [tree2.postOrder().join(", ")]); //
console.log("Height of the tree:", tree2.height()); // 5
console.log("Depth of the tree:", tree2.depth(7)); // 2
console.log("Is balanced:", tree2.isBalanced()); // false
tree2.reBalance(); // Balances the tree and returns true for isBalanced at the end
