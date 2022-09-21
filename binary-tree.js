/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(node = this.root) {

    if (!node) return 0;

    let queue = [node];
    let depth = 1;

    while (queue.length) {
      let current = queue.shift();

      if (!current.left && !current.right) {
        return depth;
      } else {
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
        depth++;
      }
    }
    return depth;

    // return 1 + Math.min(this.minDepth(node.left), this.minDepth(node.right));
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if (!node) return 0;

    let queue = [node];
    let depth = 1;

    while (queue.length) {
      let current = queue.shift();

      if (current.left || current.right) {
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
        depth++;
      }
    }
    return depth;
    // return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound, node = this.root) {
    if (!node) return null;

    let stack = [node];
    let closest = Infinity;

    while (stack.length) {
      let current = stack.pop();

      if (current.val < closest && current.val > lowerBound) {
        closest = current.val;
      }
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }

    return closest === Infinity ? null : closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

    let queue = [this.root];
    let depth = 1;

    while (queue.length) {

      let current = queue.pop();

      if (current.left === node1 || current.right === node1) {
        node1.info = { depth: depth, parent: current };
      }
      if (current.left === node2 || current.right === node2) {
        node2.info = { depth: depth, parent: current };
      }

      if (node1.info.depth === node2.info.depth
        && node1.info.parent !== node2.info.parent) {
        return true;
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      depth++;

    }
    return false;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
