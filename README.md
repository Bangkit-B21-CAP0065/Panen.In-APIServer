# Panen.in_APIserver

API Server for Bangkit Capstone Design Project, built using Node.js and Express framework.


## Note
* This application requires [Panen.In-ML-Notebook](https://github.com/Bangkit-B21-CAP0065/Panen.In-ML-Notebook). Clone it according to this structure:<br>
```
(root folder)
 ├───Panen.in_APIserver
 └───Panen.In-ML-Notebook
 ```
 * For Linux installation, opening port 80 requires root privileges. Make sure all Python3 dependencies from Panen.In-ML-Notebook are installed for root user.
 
## Dependencies
* csv-parser: 3.0.0
* express: 4.17.1

## Installation
1. Install Node.js 14 and Python 3.
2. Make sure Python 3 can be called by using `python3` alias.
3. Install all Node.js dependencies by using npm.
```
npm install
```
4. Run the server.
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

5. Test the server by accessing `/api/test`. For example, if you are using it on localhost, try to open `localhost/api/test` on your browser. You could also use the local ip, showed previously, to access it from your local network.<br><br>
- This should showed up:<br><br>
![Access](/README/api_test.png)


## Documentation:
1.  `GET /api/test`
    * Description: Simple health check
    * Return: `{"status":"OK}`

2.  `GET /api/harga`
    * Description: Providing crop prices history
    * Query Parameters:
        * kota: String
        * crop: String
        * tahun: integer (optional)
    * Return (JSON):   
        * tahun: integer
        * bulan: integer
        * harga_rerata: integer
        * harga_terendah: integer
        * harga_tertinggi: integer
     * Example:
     ```
     GET http://35.184.194.249/api/harga?kota=tasikmalaya&crop=jagung&tahun=2019
     
     [{"tahun":"2019","bulan":"10","harga_rerata":"4751","harga_terendah":"4600","harga_tertinggi":"4800"}
     {"tahun":"2019","bulan":"11","harga_rerata":"4736","harga_terendah":"4700","harga_tertinggi":"4800"}
     {"tahun":"2019","bulan":"12","harga_rerata":"4938","harga_terendah":"4700","harga_tertinggi":"5100"}] 
     ```
     ```
     GET http://35.184.194.249/api/harga?kota=tasikmalaya&crop=jagung
     
     [{"tahun":"2019","bulan":"10","harga_rerata":"4751","harga_terendah":"4600","harga_tertinggi":"4800"},
     {"tahun":"2019","bulan":"11","harga_rerata":"4736","harga_terendah":"4700","harga_tertinggi":"4800"},
     {"tahun":"2019","bulan":"12","harga_rerata":"4938","harga_terendah":"4700","harga_tertinggi":"5100"},
     {"tahun":"2020","bulan":"1","harga_rerata":"5141","harga_terendah":"4200","harga_tertinggi":"5200"},
     ...
     {"tahun":"2021","bulan":"4","harga_rerata":"5406","harga_terendah":"5000","harga_tertinggi":"5500"}
     {"tahun":"2021","bulan":"5","harga_rerata":"5851","harga_terendah":"5500","harga_tertinggi":"6000"}]
     ```
     
* `/api/panen`
    * Description: Providing crop yield prediction in tonnes for the next few months. The prediction is done by [Panen.In-ML-Notebook](https://github.com/Bangkit-B21-CAP0065/Panen.In-ML-Notebook) module.
    * Query Parameters:
        * kota: String
        * crop: String
        * bulan: integer
    * Return: Array of integers with dimension 1x(bulan)
    * Example:
    ````
    GET http://35.184.194.249/api/panen?kota=bogor&crop=jagung&bulan=4
    
    [64.31466 57.67786 56.393345 56.226032]
    ````
