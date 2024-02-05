---
layout: header
title: Trees
description: Problems concercing trees.
---

## Node structure

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
```

This is the node structure used for most of the simple binary trees.

<br/>

## Tree structure

```python
class Tree:
    def __init__(self,root):
        self.root = root
        self.longest = 0
```

This is the simple tree strucutre used for most of the binary trees.

---

<br/>

## Find the Maximum Depth or Height of given Binary Tree

`Assignment`

> Given a binary tree, the task is to find the height of the tree. The height of the tree is the number of vertices in the tree from the root to the deepest node.

```python
    def tree_height(self, root):
        if root == None:
            return 0

        height = max(self.tree_height(root.left),self.tree_height(root.right)) + 1
        return height
```

`Description`

The idea here is to traverse the tree until we reach the leaves. When the recursion is resolved we just add 1 to the current height we are coming from. Since the height is the longest path from the root to a leaf we just need to return the max.

---

<br/>

## Determine if two trees are identical

`Assignment`

> Two trees are identical when they have the same data and the arrangement of data is also the same.

```python
def equal_trees(root1, root2):
    if (root1 is None) != (root2 is None):
        return False

    if root1.data != root2.data:
        return False

    if root1 == None and root2 == None:
        return True

    if root1.data == root2.data:
        return True
    return equal_trees(root1.left, root2.left) and equal_trees(root1.right, root2.right)
```

`Description`

Here we are starting from the roots of the two trees.

The idea behind this solution is just to do traversal on both trees.

Whenever we find a difference we just return `false` that is propagated till the end of the recursive calls thanks to the `and` statement.

---

<br/>

## Convert a Binary Tree into its Mirror Tree (Invert Binary Tree)

`Assignment`

> Given a binary tree, the task is to convert the binary tree into its Mirror tree. Mirror of a Binary Tree T is another Binary Tree M(T) with left and right children of all non-leaf nodes interchanged.

```python
    def mirror_tree(self, root):
        if root == None:
            return
        tmp = root.left

        root.left = root.right
        root.right = tmp

        self.mirror_tree(root.left)
        self.mirror_tree(root.right)
```

`Description`

Here we simply traverse the tree, during the traversal we will just swap references between the left and the right child of the current inspected node.

---

<br/>

## Symmetric Tree (Mirror Image of itself)

`Assignment`

> Given a binary tree, check whether it is a mirror of itself.

```python
    def is_mirror(self, root1, root2):
        if root1 == None and root2 == None:
            return True

        if root1 != None and root2 != None and root1.data != root2.data:
            return False

        if (root1 is None) != (root2 is None):
            return False

        return self.is_mirror(root1.left, root2.right) and self.is_mirror(root1.right, root2.left)
```

`Description`

Here we start from the children of the root.

The edge case where the root is the only node present in the tree is solved with the first `if` statement, returning `true`.

The other two edge cases where the root has one child only are solved by the third `if` statement, where the returned value is `false` if one of the two children is `None` ad the other is not.

If both children exist then we simply do two calls, one where we do an **inorder traversal** and a **postorder traversal** on the left and the right child. In the second call we do the traversal swapped.

---

<br/>

## Diameter of a Binary Tree

`Assignment`

> The diameter of a tree is the number of nodes on the longest path between two leaves in the tree.

```python
    def diameter(self, root):
        self.diameter_rec(root)
        self.longest = 0

    def diameter_rec(self, root):
        if root is None:
            return 0
        l = self.diameter_rec(root.left)
        r = self.diameter_rec(root.right)

        self.longest = max(self.longest, l + r + 1)

        if root.left is None:
            return r + 1
        elif root.right is None:
            return l + 1
        else:
            return max(l,r) + 1
```

`Description`

Here we are recursively reaching the leaves, after that we keep a best score in a class attribute that is updated during the resolve of the recursive calls.

We are recursively calculating, for each node, its longest path (including the node itself) from a leaf to a leaf. This path is composed of its **left subtree height** plus its **right subtree height**.

If this value is better than the current value, then we are updating the class attribute, otherwise we keep going with the recursion without updating.

The value we are returning to the next recursive call is the height of the current node, which will be:

-   the **left subtree height + 1** if we have no right subtree
-   the **right subtree height + 1** if we have no left subtree
-   the **max height + 1** if we have both subtrees

The **+1** comes from the fact that we are counting the current node in the height, this returned value will be used as **left** or **right** subtree in the next recursive call.

---

<br/>

## Check if the tree is balanced

`Assignment`

> A height balanced binary tree is a binary tree in which the height of the left subtree and right subtree of any node does not differ by more than 1 and both the left and right subtree are also height balanced.

```python
    def is_balanced_rec(self, root):
        if root is None:
            return True

        l = self.is_balanced_rec(root.left)

        if l == 0:
            return 0

        r = self.is_balanced_rec(root.right)
        if r == 0:
            return 0

        if abs(l-r) > 1:
            return 0

        return max(l,r)+1

    def is_balanced(self, root):
        if self.is_balanced_rec(root) == 0:
            return False
        else:
            True
```

`Description`

We just check if the left subtree and the right subtree differ of at most one.

If the subtrees differ more than one we just return `0`, that is propagated to all the recursive calls.

---

<br/>

## Children sum parent

`Assignment`

> Given a binary tree, the task is to check for every node, its value is equal to the sum of values of its immediate left and right child. For NULL values, consider the value to be 0.

```python
def children_sum(self, root):
        if root is None:
            return True

        if root.right is None and root.left is None:
            return True

        l = 0

        if root.left is None:
            l = 0
        else:
            l += root.left.data

        r = 0
        if root.right is None:
            r = 0
        else:
            r += root.right.data

        if root.data != l + r:
            return False
        else:
            return (
                True and self.children_sum(root.left) and self.children_sum(root.right)
            )
```

`Description`

Really simple solution, just check if the condition is satisfied. If it's not return `false`, the false is propagated using an `and` statement, so if one function returns `false`, the overall return value will be `false`.

---

<br/>

## Check if BST

`Assignment`

> Check if the given tree is a BST.

```python
    def is_bst(self, root):
        prev = [None]
        return self.is_bst_rec(root, prev)

    def is_bst_rec(self, root, prev):
        if root is None:
            return True

        if not self.is_bst_rec(root.left, prev):
            return False

        if prev[0] is not None and prev[0].data >= root.data:
            return False

        prev[0] = root

        return self.is_bst_rec(root.right, prev)
```

`Description`

If we run `inorder traversal` on a BST, the returned values will be ordered in an ascending fashion.

In the solution we simply do an inorder traversal and we pass the previous value that we are "returning". If that value is greater, then the tree is not a BST.

The second `if` condition stops the recursion in case we find a false value.

The previous value is `None` until we visit the smallest value in the tree, basically when we are done going left for the first iteraionts.

The same approach can be done using postorder traversal, but using descending values.

---

<br/>

## Array to Balanced BST

`Assignment`

> Given a sorted array. Write a function that creates a Balanced Binary Search Tree using array elements.

```python
def create_bst(input_array, l, r, tree):
    if l >= r:
        return
    mid = (l + r) // 2
    if tree[0] is None:
        tree[0] = Tree(Node(input_array[mid]))

    tree[0].insert_bst(tree[0].root, input_array[mid])
    create_bst(input_array, l, mid, tree)
    create_bst(input_array, mid + 1, r, tree)
```

`Description`

To create the BBST we are using an approach similar to Binary search. In fact we are diving the array in two parts each time, the nodes of each level will be the `mid` values used in Binary search.

Since the array is sorted, picking the center element will assure us of always having two children (excluding the leaves cases).

---

<br/>

## Largest value in each level of binary tree

`Assignment`

> Given a binary tree, find the largest value in each level.

```python
    def largest_values(self, root):
        result = [0 for _ in range(self.tree_height(root))]
        self.largest_values_rec(root, 0, result)
        return result

    def largest_values_rec(self, root, level, result):
        if root is None:
            return

        result[level] = max(result[level], root.data)
        self.largest_values_rec(root.left, level + 1, result)
        self.largest_values_rec(root.right, level + 1, result)
```

`Description`

In this case we traverse the tree and pass to the recursion a `level` variable which will indicate the current recursion level.

We initially have initialized an array with length equal to the height of the tree (which is the same of the number of levels).

Each position in the array will then store the current best for each level. The solution just updates each cell of the array for each recursion call (with the max between the stored one and the current inspected node).

---

<br/>

## Maximum GCD of siblings of a binary tree

`Assignment`

> Given a 2d-array arr[][] which represents the nodes of a Binary tree, the task is to find the maximum GCD of the siblings of this tree without actually constructing it.

```python
def max_gcd(nodes, edges):
    sorted_edges = sorted(edges, key=lambda x: x[0])
    gcd = float("-inf")
    for i in range(0, len(sorted_edges) - 1):
        if sorted_edges[i][0] == sorted_edges[i + 1][0]:
            gcd = max(math.gcd(sorted_edges[i][1], sorted_edges[i + 1][1]), gcd)

    if gcd == float("-inf"):
        return 0
    return gcd
```

`Description`

Here we are sorting the edges array, so that we can access every child of the current scanned node more efficiently. If we don't sort the array we might be forced to scan the whole array to search for other occurences of the node that can lead to a time complexity of n^2.

After the sorting we are just calculating the GCD of each node (with its children) and updating a variable that keeps the current running maximum.

---

<br/>

## Zigzag Tree Traversal

`Assignment`

> Write a function to print ZigZag order traversal of a binary tree.

```python
def zig_zag_traversal(self, root):
        crt_lvl = []
        next_lvl = []
        left_to_right = False
        result = []

        crt_lvl.append(root)

        while len(crt_lvl) > 0:
            crt_value = crt_lvl.pop()
            result.append(crt_value.data)
            if left_to_right:
                if crt_value.right is not None:
                    next_lvl.append(crt_value.right)
                if crt_value.left is not None:
                    next_lvl.append(crt_value.left)
            else:
                if crt_value.left is not None:
                    next_lvl.append(crt_value.left)
                if crt_value.right is not None:
                    next_lvl.append(crt_value.right)

            if len(crt_lvl) == 0:
                left_to_right = not left_to_right
                crt_lvl, next_lvl = next_lvl, crt_lvl

        return result
```

`Description`

This traversal basically is a level traversal that inverts the order of traversing for each level we go trough.

In this solution we make use of two stacks and a boolean flag.

A stack is used to keep track of the current level nodes and the other is used to set the next nodes we will be traversing.

When we have the boolean flag set to `True` we will add the left child first, because in the next level that should be traversed later. The opposite happens when the flag is `False`.

When we inspected the whole current level, we get to the next by swapping the current level stack with the next level stack.
