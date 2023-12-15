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
    this.root = this.buildTree(array);
  }

  sortAndRemoveDuplicates(array) {
    return [...new Set(array.sort((a, b) => a - b))];
  }

  buildTree(unSortedArray) {
    if (unSortedArray.length === 0) return null;
    const balancedTree = this.sortAndRemoveDuplicates(unSortedArray);
    const midPoint = Math.floor(balancedTree.length / 2);
    const rootNode = new Node(balancedTree[midPoint]);
    rootNode.left = this.buildTree(balancedTree.slice(0, midPoint));
    rootNode.right = this.buildTree(balancedTree.slice(midPoint + 1));
    return rootNode;
  }

  find(value, currentRoot = this.root) {
    if (value === undefined) return "Error! Value cannot be empty.";
    if (currentRoot === null) return null;

    if (value > currentRoot.data) {
      return this.find(value, currentRoot.right);
    } else if (value < currentRoot.data) {
      return this.find(value, currentRoot.left);
    } else {
      return currentRoot;
    }
  }

  insert(value, currentRoot = this.root) {
    if (value === undefined) return "Error! Value cannot be empty.";
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
    if (value === undefined) return "Error! Value cannot be empty";

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
    return currentRoot;
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

  inOrder(array = [], root = this.root) {
    if (root === null) return;

    if (root.left !== null) this.inOrder(array, root.left);

    // if (root.data !== undefined) this.inOrderArray.push(root.data);
    array.push(root.data);

    if (root.right !== null) this.inOrder(array, root.right);

    return array;
  }

  preOrder(array = [], root = this.root) {
    if (root === null) return;

    array.push(root.data);

    if (root.left !== null) this.preOrder(array, root.left);

    if (root.right !== null) this.preOrder(array, root.right);

    return array;
  }

  postOrder(array = [], root = this.root) {
    if (root === null) return;

    if (root.left !== null) this.postOrder(array, root.left);

    if (root.right !== null) this.postOrder(array, root.right);

    array.push(root.data);

    return array;
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

module.exports = Tree;
