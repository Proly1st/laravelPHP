<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cart</title>
    <link rel="stylesheet" href="{{asset('asset/css/cart.css')}}">

</head>
<body>

<div class="table-css">

    <table id="my-datatable" class="display" style="width:100%"></table>
    <div class="total">
        <h2>HOÁ ĐƠN BÁN HÀNG</h2>
        <!-- Input để nhập giảm giá -->
        <div class="discount-input-container">
            <label>Giảm giá:</label>
            <input type="number" id="discount-input"  value="">
            <label><input type="radio" name="discount-type" value="percent" checked> %</label>
            <label><input type="radio" name="discount-type" value="amount"> Số tiền</label>
        </div>


            <div class="vat-input-container">
                <label for="vat-input">VAT (%):</label>
                <input type="number" id="vat-input"  value="">
            </div>




        <div class="bill-detail">
            <p >Tổng tiền hàng: <span id="bill-sum-price">0</span>đ</p>
            <p >Chiết khấu: <span id="bill-discount">0</span>đ</p>
            <p >Thuế VAT: <span id="bill-vat">0</span>%</p>
            <p style="color: red">Tổng thanh toán: <span id="bill-total" >0</span>đ</p>
            <div class="btn-add-cart">
                <button class="payments" data-product-id="${v.id}">
                    <i class="fa-solid fa-bag-shopping"></i> Thanh toán
                </button>
            </div>
        </div>
    </div>
</div>


{{-- Include the jQuery library --}}
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
{{-- Inclue axios library--}}
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script src="https://cdn.datatables.net/2.0.7/js/dataTables.js"></script>


{{--thư viện js-cookie--}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/3.0.1/js.cookie.min.js"></script>



<script src="{{asset("asset/cart.js")}}"></script>
</body>
</html>
