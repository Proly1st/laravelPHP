<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.7/css/dataTables.dataTables.min.css">

    <link rel="stylesheet" href="{{asset('asset/css/bai8.css')}}">
</head>
<body>
<div class="container">
    <div style="padding-right: 50px;">
        <h1>Select2 Chọn sản phẩm</h1>
        <select id="example-select">

        </select>
    </div>

    <div class="table-css">
        <p>Bảng Sản Phẩm</p>
        <table id="my-datatable" class="display" style="width:100%"></table>

    </div>

</div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.7/js/dataTables.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="{{asset("asset/bai8.js")}}"></script>

</body>
</html>
