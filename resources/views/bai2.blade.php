<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="{{ asset('asset/css/bai2.css') }}" rel="stylesheet">

</head>
<body>
    <div class="content">
            <input id="input-b1" type="text" placeholder="Bài 1 Nhập vào số">
    </div>
    <div class="content">
        <input type="text" id="input-b2" placeholder="Bài 2 Nhập vào số">
        <button id="btn-b2">Bài 2</button>

    </div>
    <div class="content">
        <input type="text" id="input-b3a" placeholder="Bài 3 Nhập vào số a">
        <input type="text" id="input-b3b" placeholder="Bài 3 Nhập vào số b">
        <button id="btn-b3">Bài 3</button>

    </div>

    <div class="content4">
        <div>
            <input type="text" id="input-b4a" placeholder="Bài 4 Nhập vào số a">
            <input type="text" id="input-b4b" placeholder="Bài 4 Nhập vào số b">
        </div>

        <select id="operation">
            <option value="1"> + </option>
            <option value="2"> - </option>
            <option value="3"> * </option>
            <option value="4"> / </option>
        </select>
        <button id="btn-b4">Bài 4</button>

    </div>

    <div class="content">
        <label>Bài 5: </label>
       <label id="lb-b5"> Sắp xếp mảng: [6,9,1,15,22,33,2,83,67] </label>
        <button id="btn-b5a">Tăng dần</button>
        <button id="btn-b5b">Giảm dần</button>

    </div>

    <div class="content">
        <label>Bài 6: </label>
       <label id="lb-b6a"> Mảng 1: [6,9,1,15,22,33,2,83,67] </label>
        <br>
       <label id="lb-b6b"> Mảng 2: [15,2,43,18,9,12,33] </label>
        <br>
        <button id="btn-b6a">Giống Nhau</button>
        <button id="btn-b6b">Khác Nhau</button>

    </div>

    <div class="content">

        <div id="countdown">60</div>
        <button id="btn-b7">Bấm giờ</button>
    </div>



    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{asset("asset/bai1-7.js")}}"></script>

</body>
</html>
