# Server Side Chart Image Generator

## Available charts

### 1. Pie Chart:
- Route: /pie
- Parameters:
  - label
  - value
- Example Link:
    - /pie?label=marius,florin2,florin3&value=20,60,20
- Output:
  - ![Example](http://188.24.199.224:3000/pie?label=marius,florin2,florin3&value=20,60,20)

### 2. Bar Chart
- Route: /bar
- Parameters:
  - key
  - value
- Example Link
  - bar?key=florin1,florin2,florin3&value=33,55,77
- Output
  - ![Example](http://188.24.199.224:3000/bar?key=florin1,florin2,florin3&value=33,55,77)

### 3. ValueMax Chart
- Route: /valuemax
- Parameters:
  - key
  - value
  - max
  - legend
- Example Link
  - valuemax?key=first,second,third&value=10,20,30&max=20,30,40&legend=value,max
- Output
  - ![Example](http://188.24.199.224:3000/valuemax?key=first,second,third&value=10,20,30&max=20,30,40&legend=value,max)