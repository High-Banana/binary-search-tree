const BinaryTree = require("./binarySearchTree.js");

function createRandomNumber() {
  let size = Math.floor(Math.random() * 10) + 5;
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const BST = new BinaryTree(createRandomNumber());

console.log("Is balanced:", BST.isBalanced());

console.log("Level order:", [BST.levelOrder().join(", ")]);
console.log("Preorder:", [BST.preOrder().join(", ")]);
console.log("Postorder:", [BST.postOrder().join(", ")]);
console.log("Inorder:", [BST.inOrder().join(", ")]);
// print(BST);

BST.insert(150);
BST.insert(200);
BST.insert(220);

console.log("Is balanced after inserting few elements:", BST.isBalanced());
BST.reBalance();

console.log("Level order:", [BST.levelOrder().join(", ")]);
console.log("Preorder:", [BST.preOrder().join(", ")]);
console.log("Postorder:", [BST.postOrder().join(", ")]);
console.log("Inorder:", [BST.inOrder().join(", ")]);

// print(BST);
