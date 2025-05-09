import type { Problem, SupportedLanguage, UserProgress } from '@/types';

export const mockProblems: Problem[] = [
  {
    id: "p001",
    title: "Two Sum",
    description: "Given an array of integers, return the indices of two numbers that add up to a target.",
    input_format: "An array of integers nums, and an integer target.",
    output_format: "Indices of the two numbers (0-based).",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "You may assume that each input would have exactly one solution.",
      "You may not use the same element twice."
    ],
    sample_input: "nums = [2, 7, 11, 15], target = 9",
    sample_output: "[0, 1]",
    difficulty: "Easy",
    topic: "Arrays",
    defaultCode: {
      python: `def two_sum(nums, target):
  # Your awesome code here!
  pass`,
      javascript: `function twoSum(nums, target) {
  // Your awesome code here!
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your awesome code here!
        return new int[]{};
    }
}`,
      "c++": `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your awesome code here!
        return {};
    }
};`
    }
  },
  {
    id: "p002",
    title: "Fibonacci Using Recursion",
    description: "Write a recursive function to return the nth Fibonacci number. The Fibonacci sequence is F(n) = F(n-1) + F(n-2) with F(0)=0 and F(1)=1.",
    input_format: "An integer n.",
    output_format: "nth Fibonacci number.",
    constraints: [
      "0 <= n <= 30" // Corrected from 1 <= n <= 30 to include F(0)
    ],
    sample_input: "n = 5",
    sample_output: "5", // F(5) = F(4)+F(3) = (F(3)+F(2)) + (F(2)+F(1)) = ((F(2)+F(1)) + (F(1)+F(0))) + ((F(1)+F(0)) + F(1)) = (((F(1)+F(0))+1)+(1+0))+((1+0)+1) = (((1+0)+1)+1)+(1+1) = ((1+1)+1)+2 = (2+1)+2 = 3+2 = 5
    difficulty: "Easy",
    topic: "Recursion",
    defaultCode: {
      python: `def fibonacci(n):
  # Your brilliant recursion here!
  pass`,
      javascript: `function fibonacci(n) {
  // Your brilliant recursion here!
}`,
      java: `class Solution {
    public int fib(int n) {
        // Your brilliant recursion here!
        return 0;
    }
}`,
      "c++": `class Solution {
public:
    int fib(int n) {
        // Your brilliant recursion here!
        return 0;
    }
};`
    }
  },
  {
    id: 'p003',
    title: 'Reverse a String',
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
  # Your in-place reversal magic!
  pass`,
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Your in-place reversal magic!
}`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Your in-place reversal magic!
    }
}`,
      "c++": `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Your in-place reversal magic!
    }
};`
    },
  },
  {
    id: 'p004',
    title: 'Validate Binary Search Tree',
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\\nA valid BST is defined as follows:\\n- The left subtree of a node contains only nodes with keys less than the node's key.\\n- The right subtree of a node contains only nodes with keys greater than the node's key.\\n- Both the left and right subtrees must also be binary search trees.",
    input_format: 'The root of a binary tree. TreeNode definition will be provided.',
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
        # Your BST validation logic!
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
    // Your BST validation logic!
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
        // Your BST validation logic!
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
        // Your BST validation logic!
        return false;
    }
};`
    },
  },
];

export const mockUserProgress: UserProgress = {
  solvedProblems: ['p001'], // Example: User solved "Two Sum"
  xp: 150,
  badges: ['WelcomeCoder', 'FirstSolve'], // Example badges
  topicMastery: {
    Arrays: { solved: 1, xp: 100, masteryLevel: 'Beginner' },
    Strings: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Recursion: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    Trees: { solved: 0, xp: 0, masteryLevel: 'Novice' },
    DynamicProgramming: { solved: 0, xp: 0, masteryLevel: 'Novice' },
  },
};

export const availableLanguages: {value: SupportedLanguage, label: string}[] = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
];

export const getGenericDefaultCode = (language: SupportedLanguage): string => {
  switch (language) {
    case 'python':
      return `# Start your Python code here\npass`;
    case 'javascript':
      return `// Start your JavaScript code here\n`;
    case 'java':
      return `class Solution {\n    // Start your Java code here\n    public static void main(String[] args) {\n        \n    }\n}`;
    case 'c++':
      return `// Start your C++ code here\n#include <iostream>\n\nint main() {\n    return 0;\n}`;
    default:
      return `// Happy Coding in ${language}!`;
  }
}
