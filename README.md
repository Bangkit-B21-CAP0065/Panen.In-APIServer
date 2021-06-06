# Panen.in_APIserver

API Server.

## Path:
* `/api/test`

## Installation
1. Install Node.js and Python 3.9.
2. Make sure Python 3.9 can be called by using `python3` alias.
3. Install all Node.js dependencies by using npm.
```
npm install
```
4. Install all Python dependencies by using pip.
```
python3 -m pip install --upgrade pip
python3 -m pip install -r ./requirement.txt
```
5. Run the server.
  - Linux need root access to open well-known ports:
  ```
  sudo node index
  ```
  - Windows:
  ```
  node index
 ```
- This should showed up on your terminal.<br><br>
 ![Run](/README/run.png)

6. Test the server by accessing `/api/test`. For example, if you are using it on localhost, try to open `localhost/api/test` on your browser. You could also use the local ip, showed previously, to access it from your local network.<br><br>
- This should showed up:<br><br>
![Access](/README/api_test.png)

## Documentation
WIP
