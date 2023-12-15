const Tree = require("./binarySearchTree");

let tree;

beforeEach(() => {
  tree = new Tree([1, 1, 3, 2, 4, 7, 6, 5, 4]);
});

describe("Creating a balanced binary tree", () => {
  test("Sorts the given array in ascending order and remove the duplicates", () => {
    expect(tree.sortAndRemoveDuplicates([1, 1, 3, 2, 4, 7, 6, 5, 4])).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("Returns the root node value", () => {
    expect(tree.buildTree([1, 2, 3, 4, 5, 6, 7]).data).toBe(4);
  });

  test("Returns left node value of the root", () => {
    expect(tree.buildTree([1, 2, 3, 4, 5, 6, 7]).left.data).toBe(2);
  });

  test("Returns right node value of the root", () => {
    expect(tree.buildTree([1, 2, 3, 4, 5, 6, 7]).right.data).toBe(6);
  });
});

describe("Finding a node", () => {
  test("Returns error if value is not provided", () => {
    expect(tree.find()).toBe("Error! Value cannot be empty.");
  });

  test("Returns null if given value is not found", () => {
    expect(tree.find(90)).toBe(null);
  });

  test("Returns the node value if the node is found", () => {
    expect(tree.find(3).data).toBe(3);
  });
});

describe("Level order, Inorder, Preorder and PostOrder", () => {
  test("Returns correct level order of the binary tree", () => {
    expect(tree.levelOrder(tree.buildTree([1, 2, 3, 4, 5, 6, 7]))).toStrictEqual([4, 2, 6, 1, 3, 5, 7]);
  });

  test("Returns correct inorder of the binary tree", () => {
    expect(tree.inOrder()).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("Returns correct preorder of the binary tree", () => {
    expect(tree.preOrder()).toStrictEqual([4, 2, 1, 3, 6, 5, 7]);
  });

  test("Returns correct postorder of the binary tree", () => {
    expect(tree.postOrder()).toStrictEqual([1, 3, 2, 5, 7, 6, 4]);
  });
});

describe("Inserting and deleting nodes", () => {
  test("Inserts the given node value at the end of the leaf node", () => {
    tree.insert(8);
    expect(tree.levelOrder()).toStrictEqual([4, 2, 6, 1, 3, 5, 7, 8]);
    expect(tree.inOrder()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test("Returns error if the value is not given to insert", () => {
    expect(tree.insert()).toBe("Error! Value cannot be empty.");
  });

  test("Deletes the given node value which is a leaf node (node with no children)", () => {
    tree.delete(1);
    tree.delete(7);
    expect(tree.inOrder()).toStrictEqual([2, 3, 4, 5, 6]);
    expect(tree.levelOrder()).toStrictEqual([4, 2, 6, 3, 5]);
  });

  test("Deletes the given node value which has one children", () => {
    tree.delete(6);
    expect(tree.inOrder()).toStrictEqual([1, 2, 3, 4, 5, 7]);
    expect(tree.levelOrder()).toStrictEqual([4, 2, 5, 1, 3, 7]);
  });

  test("Deletes the given node value which has two children", () => {
    tree.delete(2);
    expect(tree.inOrder()).toStrictEqual([1, 3, 4, 5, 6, 7]);
    expect(tree.levelOrder()).toStrictEqual([4, 1, 6, 3, 5, 7]);
  });

  test("Deletes the root node value", () => {
    tree.delete(4);
    expect(tree.inOrder()).toStrictEqual([1, 2, 3, 5, 6, 7]);
    expect(tree.levelOrder()).toStrictEqual([3, 2, 6, 1, 5, 7]);
  });
});

describe("Height and Depth of BST", () => {
  test("Returns height of the tree", () => {
    expect(tree.height()).toBe(3);
  });

  test("Returns depth of the tree from given node", () => {
    expect(tree.depth(7)).toBe(2);
  });
});

describe("Balancing the tree", () => {
  test("Returns true for the default tree", () => {
    expect(tree.isBalanced()).toBe(true);
  });

  test("Returns false after adding few nodes to make tree unbalanced", () => {
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    expect(tree.isBalanced()).toBe(false);
  });

  test("Rebalances the unbalanced tree and returns true", () => {
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    expect(tree.isBalanced()).toBe(false);
    tree.reBalance();
    expect(tree.isBalanced()).toBe(true);
  });
});
