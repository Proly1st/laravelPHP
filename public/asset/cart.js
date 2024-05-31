$(function () {
    let cart = Cookies.get("cart");
    let products;
    let cartItems;
    if (cart) {
         cartItems = JSON.parse(cart);
        let keys = Object.keys(cartItems);
        if (keys.length == 0) {
            return;
        }
        // Đảo ngược thứ tự của các keys
        // keys.reverse();
        axios.get('show-list-cart', {
            params: {
                productIDs: keys
            }
        }).then(function (response) {
            if (response.data.status === 200) {
                 products = response.data.data; // Lấy dữ liệu sản phẩm từ response


                // Kết hợp dữ liệu từ server với thông tin từ cookie
                products.forEach(product => {
                    if (cartItems[product.id]) {
                        product.timestamp = cartItems[product.id].timestamp;
                        product.quantity = cartItems[product.id].quantity;
                    }
                });

                // Sắp xếp sản phẩm theo timestamp
                products.sort((a, b) => b.timestamp - a.timestamp);


                showHtmlDataTable(products , cartItems);


                // cập nhật tổng tiền khi nhập vào số lượng
                $('.cart-soluong').on('input', function () {
                    let quantity = $(this).val();

                    // Đảm bảo số lượng là hợp lệ
                    if (quantity < 0 || !Number(quantity)) {
                        $(this).val(0);
                        quantity = 0;
                    }
                    // Cập nhật tổng tiền dựa trên số lượng
                    let row = $(this).closest('tr');
                    let unitPrice = row.find('td:eq(3)').text().replace(/\./g, '');
                    let totalPrice = unitPrice * quantity;

                    // Cập nhật ô tổng tiền
                    row.find('td:eq(5)').text(formatNumber(totalPrice));

                    // Tính và cập nhật tổng tiền hàng
                    calculateTotalAmount();
                });

                // thêm tổng tiền của 1 sản phẩm vào tổng thành tiền
                $('#my-datatable tbody').on('change', '.product-checkbox', function () {
                    // Tính và cập nhật tổng tiền hàng
                    calculateTotalAmount();

                })

                // Sự kiện click của nút "Xoá" trong bảng DataTable
                $('#my-datatable tbody').on('click', '.cart-delete', function() {

                    // Lấy ID của sản phẩm từ hàng chứa nút "Xoá" được nhấn
                    let productID = $(this).closest('tr').find('.product-checkbox').val();

                    // Xoá sản phẩm khỏi cookie
                    removeProductFromCart(productID);
                    alert('Xoá thành công');

                    // Load lại trang sau khi xoá
                    window.location.reload();
                });

            }
        });


    }

    // hàm hiển thị dữ liệu vào html
    function showHtmlDataTable(products , cartItems){
        console.log(products);
        console.log(cartItems)
        $('#my-datatable').DataTable({
            data: products,
            columns: [
                {
                    title: 'Chọn',
                    render: function (data, type, row) {
                        return `<input type="checkbox" class="product-checkbox" value="${row.id}">`;
                    }
                },
                {title: 'Tên sản phẩm', data: 'name'},
                {
                    title: 'Hình ảnh', data: 'image', render: function (data) {
                        return '<img src="' + data + '" width="100" height="100">';
                    }
                },
                {
                    title: 'Đơn giá', data: null,
                    render: function (data, type, row) {
                        let discountedPrice = row.price * (1 - row.discount / 100);
                        return formatNumber(discountedPrice); // Định dạng đơn giá sau khi giảm
                    }
                },
                {
                    data: null,
                    title: 'Số Lượng',
                    render: function (data, type, row) {
                        let productId = row.id; // ID của sản phẩm trong datatable
                        let quantity = cartItems[productId].quantity; // Số lượng từ cookies cart
                        return ` <input style="width: 40px" type="text" class="cart-soluong" value="${quantity}"  >`; // Hiển thị số lượng
                    }
                },
                {
                    data: null,
                    title: 'Tổng tiền',
                    render: function (data, type, row) {
                        return formatNumber(row.price * (1 - row.discount / 100) * cartItems[row.id].quantity); // tính tổng tiền
                    }
                },
                {
                    data: null,
                    title: 'Action',
                    render: function (data, type, row) {
                        return `<a class="cart-delete"><i class="fa-solid fa-trash"></i></a>`;
                    }
                }
            ],
            columnDefs: [
                {
                    targets: -1, // Cột cuối cùng
                    orderTable: false, // Không cho phép sắp xếp theo cột này
                    className: 'text-center' // Căn giữa các nút xóa
                }
            ],
            searching: false, // Mặc định là true, set false để tắt chức năng search
            ordering: false, // Mặc định là true, set false để tắt chức năng sắp xếp theo collumn
            scrollX: 1000, // Nội dụng của table sẽ hiện thị với with 400px, Nếu quá thì sẽ có thanh scroll

            processing: true,
        });
    }

    // Hàm loại bỏ sản phẩm khỏi cookie
    function removeProductFromCart(productID) {
        let cart = Cookies.get("cart");
        if (cart) {
            let cartItems = JSON.parse(cart);
            delete cartItems[productID]; // Xoá sản phẩm từ cartItems
            // Lưu lại cartItems mới vào cookie
            Cookies.set("cart", JSON.stringify(cartItems), {
                expires: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000), // Cập nhật thời gian hết hạn
                path: '/'
            });
        }
    }

    // hàm đọc cookies  cart
    function getCartFromCookie(){
        let cart = Cookies.get('cart');
        return cart ? JSON.parse(cart):{};
    }

    // Hàm xóa các sản phẩm được chọn ra khỏi cookie
    function removeSelectedItems() {
        let cart = getCartFromCookie();
        $('#my-datatable tbody .product-checkbox:checked').each(function() {
            let productId = $(this).val();
            delete cart[productId];
        });

        let expiresDate = new Date();
        expiresDate.setMonth(expiresDate.getMonth() + 3);
        Cookies.set("cart", JSON.stringify(cart), {
            expires: expiresDate
        });


    }

    // Sự kiện click của nút thanh toán
    $('.payments').on('click',  function() {
        removeSelectedItems();
        alert("Các sản phẩm đã được thanh toán và xóa khỏi giỏ hàng!" );
        // Load lại trang sau khi thanh toán
        window.location.reload();
    });


// Hàm tính tổng tiền
    function calculateTotalAmount() {
        let totalAmount = 0;
        $('#my-datatable tbody .product-checkbox:checked').each(function () {
            let $row = $(this).closest('tr');
            let unitPrice = $row.find('td:eq(3)').text().replace(/\./g, '');
            let quantity = $row.find('.cart-soluong').val();
            totalAmount += unitPrice * quantity;

        });
        $('#bill-sum-price').text(formatNumber(totalAmount));
        // gọi hàm update tiền giảm giá
        updatePriceDiscount();
    }

    // Hàm định dạng số với dấu chấm
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function unformatNumber(formattedNumber) {
        // Kiểm tra nếu formattedNumber không phải là chuỗi hoặc rỗng
        if (typeof formattedNumber !== 'string' || formattedNumber === '') {
            return formattedNumber;
        }
        // Loại bỏ dấu phân tách (dấu ,)
        let unformattedNumber = formattedNumber.replace(/\./g, '');

        // Chuyển đổi chuỗi thành số
        return parseFloat(unformattedNumber);
    }

    // hàm cập nhật tiền giảm giá khi chọn % hoặc số tiền
    function updatePriceDiscount() {
        let tienHang = unformatNumber($('#bill-sum-price').text());
        let tienGiamGia = $('#discount-input').val();
        let discountType = $('input[name="discount-type"]:checked').val();
        let discountAmount;

        // Kiểm tra và giới hạn giá trị tối đa của giảm giá khi chọn phần trăm
        if (discountType === 'percent') {
            // Giới hạn giá trị tối đa là 100
            if (tienGiamGia > 100) {
                $('#discount-input').val(100);
                tienGiamGia = 100; // Cập nhật lại giá trị tienGiamGia
            } else if (tienGiamGia < 0 || !Number(tienGiamGia)) {
                $('#discount-input').val();
                tienGiamGia = 0; // Cập nhật lại giá trị tienGiamGia
            }
        } else {
            // Kiểm tra giá trị nhập vào là số dương
            if (tienGiamGia < 0 || !Number(tienGiamGia)) {
                $('#discount-input').val();
                tienGiamGia = 0; // Cập nhật lại giá trị tienGiamGia
            } else if (tienGiamGia > tienHang) {
                tienGiamGia = tienHang;
            }
        }

        // Tính giảm giá dựa trên loại giảm giá và giá trị nhập vào
        if (discountType === 'percent') {
            // Tính giảm giá dựa trên phần trăm
            discountAmount = unformatNumber(tienHang) * (tienGiamGia / 100);

        } else {
            // Tính giảm giá dựa trên số tiền
            discountAmount = tienGiamGia;
        }

        // Hiển thị giảm giá và cập nhật tổng tiền
        $('#bill-discount').text(formatNumber(discountAmount));
        updateBillTotal();
    }

    $('#discount-input').on('input', function () {

        // gọi hàm update tiền giảm giá
        updatePriceDiscount();
    });

    $('input[name="discount-type"]').on('change', function () {
        $('#discount-input').val();
        // gọi hàm update tiền giảm giá

        updatePriceDiscount();
    });

    $('#vat-input').on('input', function () {

        let tienVAT = $('#vat-input').val();
        if (tienVAT < 0 || !Number(tienVAT)) {

            tienVAT = 0;
        } else if (tienVAT > 100) {
            tienVAT = 100;
            $('#vat-input').val(100);

        }

        $('#bill-vat').text(tienVAT);

        //     Cập nhật lại tổng tiền
        updateBillTotal();

    })

    //   hàm tính tổng tiền dựa trên tiền hàng - giảm giá - vat
    function updateBillTotal() {
        let tienHang = unformatNumber($('#bill-sum-price').text());
        let tienGiamGia = unformatNumber($('#bill-discount').text());

        let tienVAT = $('#bill-vat').text();


        let priceVAT = (tienHang - tienGiamGia) * (tienVAT / 100);

        let total = tienHang - tienGiamGia - priceVAT;
        if (total < 0 || !Number(total)) {
            total = 0;
        }
        $('#bill-total').text(formatNumber(total));

    }


});
