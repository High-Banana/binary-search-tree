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

    // prettyPrint(currentRoot);
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
    if (value === undefined) return console.log("Error! Value cannot be empty");
    if (currentRoot === null) return console.log(`${value} does not exists in the tree.`);

    if (value > currentRoot.data) {
      return this.find(value, currentRoot.right);
    } else if (value < currentRoot.data) {
      return this.find(value, currentRoot.left);
    } else {
      console.log(currentRoot);
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
    console.log(result.join(", "));
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
// tree2.delete(4);
tree2.delete(2);
tree2.find(3);
tree2.find(10);
tree2.levelOrder();
