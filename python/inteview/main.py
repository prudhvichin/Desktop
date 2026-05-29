arr = [1,1,21,21,12,12,12,15,17]

def repeated_function(arr):
    repeated = []
    prev = arr[0]
    for i in arr:
        if i == prev and i not in repeated:
            repeated.append(i)
    return repeated
print(repeated_function(arr))