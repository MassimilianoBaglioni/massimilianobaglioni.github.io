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
>Given a binary tree, the task is to find the height of the tree. The height of the tree is the number of vertices in the tree from the root to the deepest node. 

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
>Two trees are identical when they have the same data and the arrangement of data is also the same.

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
>Given a binary tree, the task is to convert the binary tree into its Mirror tree. Mirror of a Binary Tree T is another Binary Tree M(T) with left and right children of all non-leaf nodes interchanged. 

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
>Given a binary tree, check whether it is a mirror of itself. 

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
>The diameter of a tree is the number of nodes on the longest path between two leaves in the tree.

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
- the **left subtree height + 1** if we have no right subtree
- the **right subtree height + 1** if we have no left subtree
- the **max height + 1** if we have both subtrees 

The **+1** comes from the fact that we are counting the current node in the height, this returned value will be used as **left** or **right** subtree in the next recursive call.