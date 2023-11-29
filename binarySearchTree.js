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
      let predecesserParent = currentRoot;
      let predecesser = currentRoot.left;
      while (predecesser.right !== null) {
        predecesserParent = predecesser;
        predecesser = predecesser.right;
      }
      currentRoot.data = predecesser.data;
      if (predecesser.data > predecesserParent.data) {
        predecesserParent.right = this.delete(predecesserParent.right.data, predecesserParent.right);
      } else {
        predecesserParent.left = this.delete(predecesserParent.left.data, predecesserParent.left);
      }
    }
    prettyPrint(this.root);
    return currentRoot;
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
tree2.delete(1.5);
