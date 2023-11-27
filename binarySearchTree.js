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
      prettyPrint(this.root);
      console.log("1");
      return currentRoot;
    } else if (value < currentRoot.data) {
      prettyPrint(this.root);
      console.log("2");
      currentRoot.left = this.delete(value, currentRoot.left);
      return currentRoot;
    } else {
      console.log(currentRoot);
      console.log(currentRoot.data);
      if (currentRoot.left === null && currentRoot.right === null) {
        prettyPrint(this.root);
        console.log("3");
        return null;
      } else if (currentRoot.right === null) {
        // console.log(currentRoot.left);
        prettyPrint(this.root);
        console.log("4");
        return currentRoot.left;
      } else if (currentRoot.left === null) {
        // console.log(currentRoot.right);
        prettyPrint(this.root);
        console.log("5");
        return currentRoot.right;
      }
    }

    let successerParent = currentRoot;
    let successer = currentRoot.left;
    while (successer.right !== null) {
      successerParent = successer;
      successer = successer.right;
    }
    currentRoot.data = successer.data;
    if (successer.data > successerParent.data) {
      successerParent.right = this.delete(successerParent.right.data, successerParent.right);
    } else {
      successerParent.left = this.delete(successerParent.left.data, successerParent.left);
    }
    prettyPrint(this.root);
    console.log("6");
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
// tree2.delete(9);
tree2.delete(1);
