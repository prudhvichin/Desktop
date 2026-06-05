# def reverse_string(str):
#     result = str[::-1]
#     return result


# print(reverse_string('Prudhvi'))


# def Check_if_palindrome(str):
#     last = len(str) -1
#     for i in range(len(str)):
#         if str[i] == str[last]:
#             last = last -1
#         else:
#             return False
        
#     return True



# print(Check_if_palindrome('prudhvi'))


# x = [1,2,323,434,4,3,45,6,4,54,2,3,23,23,67,76]

# def find_largest_num(arr):
#     largest = 0

#     for i in arr:
#         if largest < i:
#             largest = i

#     return largest

# print(find_largest_num(x))


# ========================================================

# Count vowels 

# def count_vowels(s):
#     vowels ='aeiou'
#     count = 0

#     for char in s.lower():
#         if char in vowels:
#             count+=1

#     return count


# print(count_vowels("hello world"))


# ===========================================================

# FIBONACCI SERIES

#  \(0, 1, 1, 2, 3, 5, 8, 13, 21, 34,\)

# def fibonacci(limit):
#   a = 0
#   b = 1

#   for i in range(limit):
#     print(a)
#     temp = a
#     a = b
#     b = temp + b



 # fibonacci(13)

# =========================================================
# Remove duplicates from list

# brute force
# li = [1,2,2,2,1,21,23]

# li = set(li)

# print(li)


# def remove_duplicates(arr):
#     result =[]

#     for item in arr:
#         if item not in result:
#             result.append(item)

#     return result

# print(remove_duplicates(li))



# =====================================================================
# FIND FACTORIAL

# def factorial(n):
#     result = 1
#     for i in range(1,n+1):
#         result *=i

#     return result

# def factorialResult(n):
#     result = 1
#     for i in range(1,n+1):
#         result *=i
#     return result


#

# def count_vowels(s):
#     vowels = "aeiou"
#     count = 0
#     for char in vowels:
#         if char in s:
#             count +=1
#     return count


# def largestNumber(arr):
#     largest = 0
#     for i in arr:
#         if largest < i:
#             largest = i

#     return largest




# x = [12,1,1,1,1]

# def fibonacci(limit):
#     a,b = 0,1
#     for i in range(limit):
#         print(a)
#         temp = a
#         a = b
#         b = temp+b


# fibonacci(13)


# def remove_duplicates(li):
#     unique = []

#     for i in li:
#         if i not in unique:
#             unique.append(i)
#     return unique


# print(remove_duplicates([1,1,1,2]))

# def find_factorial(n):
#     result = 1
#     for i in range(1,n+1):
#         result *=i
#     return result


# print(find_factorial(5))


# def two_sum(nums, target):
#     for i in range(len(nums)):
#         for j in range(i + 1, len(nums)):
#             if nums[i] + nums[j] == target:
#                 return [i, j]



# def two_sum(nums,target):
#     for i in range(len(nums)):
#         for j in range(i+1,len(nums)):
#             if nums[i] + nums[j] == target:
#                 return[i,j]

# nums = [2, 4,7, 11, 15]

# print(two_sum(nums, 9))

# def longest_substring(s):
#     seen = set()
#     left = 0
#     max_length = 0

#     for right in range(len(s)):

#         while s[right] in seen:
#             seen.remove(s[left])
#             left += 1

#         seen.add(s[right])

#         max_length = max(max_length, right - left + 1)

#     return max_length


# print(longest_substring("abcabcbb"))
    