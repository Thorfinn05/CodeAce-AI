import type { Problem, SupportedLanguage, UserProgress } from '@/types';

export const mockProblems: Problem[] = [
  {
    id: "p001",
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.",
    input_format: "An array of integers `nums`, and an integer `target`.",
    output_format: "An array containing the indices of the two numbers.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    sample_input: "nums = [2, 7, 11, 15], target = 9",
    sample_output: "[0, 1] (because nums[0] + nums[1] == 9)",
    difficulty: "Easy",
    topic: "Arrays",
    defaultCode: {
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
  # Your code here
  pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your code here
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[2];
    }
}`,
      "c++": `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`
    }
  },
  {
    id: "p002",
    title: "Fibonacci Number (Recursive)",
    description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2), for n > 1.\nGiven n, calculate F(n) using recursion.",
    input_format: "An integer `n`.",
    output_format: "The nth Fibonacci number.",
    constraints: [
      "0 <= n <= 30"
    ],
    sample_input: "n = 4",
    sample_output: "3 (F(4) = F(3) + F(2) = (F(2)+F(1)) + (F(1)+F(0)) = (1+1) + (1+0) = 2+1 = 3)",
    difficulty: "Easy",
    topic: "Recursion",
    defaultCode: {
      python: `def fib(n: int) -> int:
  # Your recursive code here
  pass`,
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  // Your recursive code here
};`,
      java: `class Solution {
    public int fib(int n) {
        // Your recursive code here
        return 0;
    }
}`,
      "c++": `class Solution {
public:
    int fib(int n) {
        // Your recursive code here
        return 0;
    }
};`
    }
  },
  {
    id: 'p003',
    title: 'Reverse a String In-Place',
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array in-place with O(1) extra memory.',
    input_format: 'An array of characters `s`.',
    output_format: 'The input array `s` modified in-place.',
    constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.'],
    sample_input: 's = ["h","e","l","l","o"]',
    sample_output: 's becomes ["o","l","l","e","h"]',
    difficulty: 'Easy',
    topic: 'Strings',
     defaultCode: {
      python: `def reverse_string(s: list[str]) -> None:
  """
  Do not return anything, modify s in-place instead.
  """
  # Your code here
  pass`,
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Your code here
};`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Your code here
    }
}`,
      "c++": `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Your code here
    }
};`
    },
  },
  {
    id: 'p004',
    title: 'Validate Binary Search Tree',
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    input_format: 'The root of a binary tree. TreeNode definition will be provided (assume standard TreeNode structure).',
    output_format: '`true` if the tree is a valid BST, `false` otherwise.',
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1',
    ],
    sample_input: 'root = [2,1,3]',
    sample_output: 'true (For [5,1,4,null,null,3,6] it would be false)',
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
    def isValidBST(self, root) -> bool: # Python type hint for root would be Optional[TreeNode]
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
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean isValidBST(TreeNode root) {
        // Your code here
        return false;
    }
}`,
      "c++": `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // Your code here
        return false;
    }
};`
    },
  },
  {
    id: "p005",
    title: "Merge Sorted Arrays",
    description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\nThe final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to 0 and should be ignored. `nums2` has a length of `n`.",
    input_format: "nums1 (array, m+n length), m (integer), nums2 (array, n length), n (integer).",
    output_format: "Modify nums1 in-place.",
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9"
    ],
    sample_input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
    sample_output: "nums1 becomes [1,2,2,3,5,6]",
    difficulty: "Easy",
    topic: "Arrays",
    defaultCode: {
      python: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
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
      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Your code here
    }
}`,
      "c++": `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Your code here
    }
};`
    }
  },
  {
    id: "p006",
    title: "Binary Search",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.\nYou must write an algorithm with O(log n) runtime complexity.",
    input_format: "A sorted array of integers `nums`, and an integer `target`.",
    output_format: "Index of target if found, else -1.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    sample_input: "nums = [-1,0,3,5,9,12], target = 9",
    sample_output: "4",
    difficulty: "Easy",
    topic: "Searching",
    defaultCode: {
      python: `def search(nums: list[int], target: int) -> int:
  # Your code here
  pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  // Your code here
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
      "c++": `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
        return -1;
    }
};`
    }
  },
  {
    id: "p007",
    title: "Longest Common Prefix",
    description: "Write a function to find the longest common prefix string amongst an array of strings.\nIf there is no common prefix, return an empty string \"\".",
    input_format: "An array of strings `strs`.",
    output_format: "The longest common prefix string.",
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters."
    ],
    sample_input: 'strs = ["flower","flow","flight"]',
    sample_output: '"fl"',
    difficulty: "Easy",
    topic: "Strings",
    defaultCode: {
      python: `def longest_common_prefix(strs: list[str]) -> str:
  # Your code here
  pass`,
      javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // Your code here
};`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Your code here
        return "";
    }
}`,
      "c++": `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // Your code here
        return "";
    }
};`
    }
  },
  {
    id: "p008",
    title: "Climbing Stairs (Dynamic Programming)",
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    input_format: "An integer `n`.",
    output_format: "The number of distinct ways to climb to the top.",
    constraints: [
      "1 <= n <= 45"
    ],
    sample_input: "n = 3",
    sample_output: "3 (1+1+1, 1+2, 2+1)",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    defaultCode: {
      python: `def climb_stairs(n: int) -> int:
  # Your code here
  pass`,
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  // Your code here
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Your code here
        return 0;
    }
}`,
      "c++": `class Solution {
public:
    int climbStairs(int n) {
        // Your code here
        return 0;
    }
};`
    }
  },
  {
    id: "p009",
    title: "Invert Binary Tree",
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    input_format: "The root of a binary tree. TreeNode definition assumed.",
    output_format: "The root of the inverted binary tree.",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    sample_input: "root = [4,2,7,1,3,6,9]",
    sample_output: "[4,7,2,9,6,3,1]",
    difficulty: "Easy",
    topic: "Trees",
    defaultCode: {
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root): # Optional[TreeNode] -> Optional[TreeNode]
        # Your code here
        pass`,
      javascript: `// Definition for a binary tree node.
// function TreeNode(val, left, right) {
//    this.val = (val===undefined ? 0 : val)
//    this.left = (left===undefined ? null : left)
//    this.right = (right===undefined ? null : right)
// }
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    // Your code here
};`,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Your code here
        return root;
    }
}`,
      "c++": `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        // Your code here
        return root;
    }
};`
    }
  },
  {
    id: "p010",
    title: "Bubble Sort Algorithm",
    description: "Implement the Bubble Sort algorithm to sort an array of integers in ascending order. Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.",
    input_format: "An array of integers `nums`.",
    output_format: "The sorted array `nums` (modify in-place or return new). For simplicity, let's say modify in-place.",
    constraints: [
      "1 <= nums.length <= 1000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    sample_input: "nums = [5, 1, 4, 2, 8]",
    sample_output: "nums becomes [1, 2, 4, 5, 8]",
    difficulty: "Easy",
    topic: "Sorting",
    defaultCode: {
      python: `def bubble_sort(nums: list[int]) -> None:
  # Modify nums in-place
  # Your code here
  pass`,
      javascript: `/**
 * @param {number[]} nums
 * @return {void} Modifies nums in-place
 */
function bubbleSort(nums) {
  // Your code here
};`,
      java: `class Solution {
    public void bubbleSort(int[] nums) {
        // Your code here
    }
}`,
      "c++": `class Solution {
public:
    void bubbleSort(vector<int>& nums) {
        // Your code here
    }
};`
    }
  }
];


export const mockUserProgress: UserProgress = { // This structure needs to align with `UserData.progress`
  xp: 150,
  streaks: { current: 3, longest: 5, lastActivityDate: new Date() },
  solvedProblems: { 'p001': new Date() }, 
  badges: ['WelcomeCoder', 'FirstSolve'],
  topicMastery: {
    Arrays: { solved: 1, xp: 100, masteryLevel: 'Beginner' },
    Strings: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Recursion: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Trees: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    DynamicProgramming: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Sorting: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Searching: { solved: 0, xp: 0, masteryLevel: 'Novice' },
  },
};

export const availableLanguages: {value: SupportedLanguage, label: string}[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
];

export const getGenericDefaultCode = (language: SupportedLanguage): string => {
  switch (language) {
    case 'python':
      return `# Start your Python code here\n\ndef solve():\n  # Your solution logic\n  pass\n\nsolve()`;
    case 'javascript':
      return `// Start your JavaScript code here\n\nfunction solve() {\n  // Your solution logic\n}\n\nsolve();`;
    case 'java':
      return `class Solution {\n    public static void main(String[] args) {\n        // Start your Java code here\n        solve();\n    }\n\n    public static void solve() {\n        // Your solution logic\n    }\n}`;
    case 'c++':
      return `// Start your C++ code here\n#include <iostream>\n\nvoid solve() {\n    // Your solution logic\n    std::cout << "Hello, C++ World!" << std::endl;\n}\n\nint main() {\n    solve();\n    return 0;\n}`;
    default:
      return `// Happy Coding in ${language}! Begin your journey.`;
  }
}
