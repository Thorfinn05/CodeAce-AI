import type { Problem } from '@/types';

export const mockProblems: Problem[] = [
  {
    id: 'p001',
    title: 'Two Sum',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    input_format: 'An array of integers `nums` and an integer `target`.',
    output_format: 'An array of two integers representing the indices.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    sample_input: 'nums = [2,7,11,15], target = 9',
    sample_output: '[0,1]',
    difficulty: 'Easy',
    topic: 'Arrays',
    defaultCode: {
      python: `def two_sum(nums, target):
  # Your code here
  pass`,
      javascript: `function twoSum(nums, target) {
  // Your code here
}`,
    },
  },
  {
    id: 'p002',
    title: 'Reverse a String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`.',
    input_format: 'An array of characters `s`.',
    output_format: 'The reversed string (or modify in-place if specified by language conventions).',
    constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.'],
    sample_input: 's = ["h","e","l","l","o"]',
    sample_output: '["o","l","l","e","h"]',
    difficulty: 'Easy',
    topic: 'Strings',
     defaultCode: {
      python: `def reverse_string(s):
  # Your code here
  pass`,
      javascript: `function reverseString(s) {
  // Your code here
}`,
    },
  },
  {
    id: 'p003',
    title: 'Fibonacci Number',
    description:
      'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1.\nGiven n, calculate F(n).',
    input_format: 'An integer `n`.',
    output_format: 'The Fibonacci number F(n).',
    constraints: ['0 <= n <= 30'],
    sample_input: 'n = 4',
    sample_output: '3',
    difficulty: 'Medium',
    topic: 'Recursion',
     defaultCode: {
      python: `def fibonacci(n):
  # Your code here
  pass`,
      javascript: `function fibonacci(n) {
  // Your code here
}`,
    },
  },
   {
    id: 'p004',
    title: 'Validate Binary Search Tree',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node\'s key.\n- The right subtree of a node contains only nodes with keys greater than the node\'s key.\n- Both the left and right subtrees must also be binary search trees.',
    input_format: 'The root of a binary tree.',
    output_format: '`true` if the tree is a valid BST, `false` otherwise.',
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1',
    ],
    sample_input: 'root = [2,1,3]',
    sample_output: 'true',
    difficulty: 'Medium',
    topic: 'Trees',
    defaultCode: {
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # Your code here
        pass`,
      javascript: `// Definition for a binary tree node.
// function TreeNode(val, left, right) {
//     this.val = (val===undefined ? 0 : val)
//     this.left = (left===undefined ? null : left)
//     this.right = (right===undefined ? null : right)
// }
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    // Your code here
};`,
    },
  },
  {
    id: 'p005',
    title: 'Merge Sorted Array',
    description: 'You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.',
    input_format: '`nums1`, `m`, `nums2`, `n`',
    output_format: 'Modify `nums1` in-place.',
    constraints: [
      'nums1.length == m + n',
      'nums2.length == n',
      '0 <= m, n <= 200',
      '1 <= m + n <= 200',
      '-10^9 <= nums1[i], nums2[j] <= 10^9',
    ],
    sample_input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
    sample_output: '[1,2,2,3,5,6]',
    difficulty: 'Hard',
    topic: 'Arrays',
    defaultCode: {
      python: `def merge(nums1, m, nums2, n):
  """
  Do not return anything, modify nums1 in-place instead.
  """
  # Your code here
  pass`,
      javascript: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // Your code here
};`,
    },
  },
];

export const mockUserProgress = {
  solvedProblems: ['p001'],
  xp: 250,
  badges: ['firstProblemSolved'],
  topicMastery: {
    Arrays: { solved: 1, xp: 100, masteryLevel: 'Beginner' },
    Strings: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Recursion: { solved: 0, xp: 0, masteryLevel: 'Novice' },
  },
};

export const availableLanguages: {value: SupportedLanguage, label: string}[] = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
];
