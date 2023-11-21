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
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(sortedArray);
    // prettyPrint(this.root);
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;
    const midPoint = Math.floor(sortedArray.length / 2);
    const rootNode = new Node(sortedArray[midPoint]);
    rootNode.left = this.buildTree(sortedArray.slice(0, midPoint));
    rootNode.right = this.buildTree(sortedArray.slice(midPoint + 1));
    return rootNode;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) return new Node(value);
    if (value === undefined) {
      console.log("Value cannot be empty");
      return;
    }

    if (value > currentNode.data) {
      currentNode.right = this.insert(value, currentNode.right);
    } else if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else return;

    prettyPrint(currentNode);
    return currentNode;
  }
}

// const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const tree2 = new Tree([7, 6, 5, 3, 4, 2, 1]);
tree2.insert(10);
tree2.insert(9);
