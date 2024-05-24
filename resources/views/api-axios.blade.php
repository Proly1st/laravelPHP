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

    <div class="table-css">
        <p>Bảng API - Axios</p>
        <table id="tableAPI" class="display" style="width:100%"></table>

        <div id="lineChart" style="width: 100%; height: 400px;"></div>
        <div id="columnChart" style="width: 100%; height: 400px;"></div>
        <div id="pieChart" style="width: 100%; height: 400px;"></div>
    </div>

</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/2.0.7/js/dataTables.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js"></script>
<script src="{{asset("asset/api-axios.js")}}"></script>

</body>
</html>
