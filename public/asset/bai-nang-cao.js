$(function() {
    // Bắt đầu xử lý range-slider filter khoảng giá sản phẩm
    const $minThumb = $('.min-thumb'); // Lưu trữ phần tử DOM của thumb tối thiểu
    const $maxThumb = $('.max-thumb'); // Lưu trữ phần tử DOM của thumb tối đa
    const $rangeTrack = $('.range-slider-track'); // Lưu trữ phần tử DOM của thanh trượt
    const $rangeSlider = $('.range-slider'); // Lưu trữ phần tử DOM của thanh trượt

    let isDragMin = false; // Cờ kiểm tra xem thumb tối thiểu đang được kéo hay không
    let isDragMax = false; // Cờ kiểm tra xem thumb tối đa đang được kéo hay không
    let startX, startMinValue, startMaxValue; // Lưu trữ vị trí chuột và giá trị ban đầu của thanh trượt khi bắt đầu kéo
    let minPrice = 50000; // Giá trị tối thiểu ban đầu
    let maxPrice = 9000000; // Giá trị tối đa ban đầu
    let totalWidth = $rangeSlider.width(); // Lưu trữ chiều rộng của thanh trượt

    // Gọi hàm cập nhật thanh trượt giá
    updatePriceRange();

    // Đăng ký các sự kiện cho thanh trượt
    $minThumb.on('mousedown', startDragMin);
    $maxThumb.on('mousedown', startDragMax);
    $(document).on('mousemove', doDrag);
    $(document).on('mouseup', stopDrag);

    // Hàm cập nhật thanh trượt giá
    function updatePriceRange() {
        // Tính toán tỷ lệ phần trăm vị trí của giá trị tối thiểu và tối đa
        const minPercent = (minPrice / 10000000) * 100;
        const maxPercent = (maxPrice / 10000000) * 100;

        // Cập nhật giá trị hiển thị
        $('.min-price-value').text(`${minPrice.toLocaleString()}đ`);
        $('.max-price-value').text(`${maxPrice.toLocaleString()}đ`);

        // Cập nhật vị trí của các thumbs
        $minThumb.css('left', `${minPercent}%`);
        $maxThumb.css('left', `${maxPercent}%`);

        // Cập nhật kích thước của thanh trượt
        $rangeTrack.css({
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`
        });
    }

    // Hàm bắt đầu kéo thumb tối thiểu
    function startDragMin(e) {
        isDragMin = true;
        startX = e.clientX;
        startMinValue = minPrice;
    }

    // Hàm bắt đầu kéo thumb tối đa
    function startDragMax(e) {
        isDragMax = true;
        startX = e.clientX;
        startMaxValue = maxPrice;
    }

    // Hàm xử lý khi kéo thumb
    function doDrag(e) {
        if (isDragMin) {
            // Tính toán giá trị mới của thanh trượt khi kéo thumb tối thiểu
            let delta = e.clientX - startX;
            let newValue = startMinValue + Math.round(delta * 10000000 / totalWidth);
            minPrice = Math.max(0, Math.min(10000000, newValue));
            updatePriceRange();
        } else if (isDragMax) {
            // Tính toán giá trị mới của thanh trượt khi kéo thumb tối đa
            let delta = e.clientX - startX;
            let newValue = startMaxValue + Math.round(delta * 10000000 / totalWidth);
            maxPrice = Math.max(0, Math.min(10000000, newValue));
            updatePriceRange();
        }
    }

    // Hàm dừng kéo thumb
    function stopDrag() {
        isDragMin = false;
        isDragMax = false;
    }

    // Xử lý sự kiện click của nút tìm kiếm
    $('#price-filter-btn').on('click', function() {
        axios({
            method: 'GET',
            url: 'filter-price-range',
            params: {
                minPrice: minPrice,
                maxPrice: maxPrice
            }
        }).then(function(response) {
            if (response.status === 200) {
                showHtml(response.data.data);
            } else {
                console.log(response.message);
            }
        }).catch(function(error) {
            console.error(error);
        });
    });

    // Định dạng lại giá tiền
    function formatPrice(price) {
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Kết thúc xử lý range-slider filter khoảng giá sản phẩm

    function formatPrice(price) {

        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    $('.filter-categories').on('change',function (){
        axios({
            'method':'GET',
            'url': 'filter-categories',
            params: {
                id: $('select.filter-categories').val()
            }
        }).then(function (response){
           if(response.status ===200){

               showHtml(response.data.data);
           }else{
               console.log(response.message)
           }
        })

    })

    $('.filter-price').on('change',function (){
        axios({
            'method': 'GET',
            'url': 'filter-price',
            params: {
                option: $('select.filter-price').val(),
                id: $('select.filter-categories').val()

            }
        }).then(function (response){
            if(response.status===200){
                console.log(response.data.data);
                showHtml(response.data.data);

            }else{
                console.log(response.message)
            }


        })
    })

    // hàm thêm sản phẩm vào giỏ hàng với cookie
    // $.removeCookie('cart',{path:'/'});
    function addCart(productID, name, image, priceDiscount) {
        let cart = Cookies.get("cart");
        let cartItems = {};

        if (cart) {
            cartItems = JSON.parse(cart);
        }

        let timestamp = new Date().getTime();

        // Thêm hoặc cập nhật sản phẩm trong giỏ hàng
        if (cartItems.hasOwnProperty(productID)) {
            cartItems[productID].quantity += 1;
            cartItems[productID].timestamp = timestamp; // Cập nhật timestamp
        } else {
            cartItems[productID] = {
                name: name,
                image: image,
                priceDiscount: priceDiscount,
                quantity: 1,
                timestamp: timestamp
            };
        }

        let expiresDate = new Date();
        expiresDate.setMonth(expiresDate.getMonth() + 3);
        Cookies.set("cart", JSON.stringify(cartItems), {
            expires: expiresDate
        });

        alert("Thêm vào giỏ hàng thành công!");
        console.log(cartItems);
    }

    function getSortedCartItems() {
        let cart = Cookies.get("cart");
        if (!cart) {
            return [];
        }
        let cartItems = JSON.parse(cart);

        // Chuyển đổi đối tượng cartItems thành một mảng các sản phẩm
        let products = Object.keys(cartItems).map(productID => {
            return { id: productID, ...cartItems[productID] };
        });

        // Sắp xếp các sản phẩm theo timestamp, sản phẩm mới nhất trước
        products.sort((a, b) => b.timestamp - a.timestamp);

        return products;
    }





    // hàm hiển thị lên html khi truyền vào dữ liệu từ server
    function showHtml(dataHtml){
        let data='';
        let discountedPrice=0;

        dataHtml.map(v => {
            discountedPrice = v.price * (1 - v.discount / 100);
            // console.log(v.id);
            data += `
        <div class="products" >
            <img class="product-img" src="${v.image}" alt="${v.name}">
            <span class="discount-percent">-${v.discount}%</span>
            <h3 class="product-name">${v.name}</h3>
            <p class="price">${formatPrice(v.price)}đ</p>
            <span class="price-discount">${formatPrice(discountedPrice)}đ</span>
            <div class="btn-add-cart">
                <button class="cart-add" data-product-id="${v.id}">
                    <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>
            </div>
        </div>`;
        });

        $('#content').html(data);

        // thêm product vào cart
        $('.cart-add').on('click', function() {
            let productID = $(this).data('product-id');
            let productName = $(this).data('product-name');
            let productImage = $(this).data('product-img');
            let productPrice = $(this).data('product-discount-price');
            addCart(productID,productName,productImage,productPrice);
            // Cập nhật số lượng sản phẩm trên giỏ hàng icon
            countCartItems();
        });
    }

    // thêm product vào cart
    $('.cart-add').on('click', function() {
        let productID = $(this).data('product-id');
        let productName = $(this).data('product-name');
        let productImage = $(this).data('product-img');
        let productPrice = $(this).data('product-discount-price');
        addCart(productID,productName,productImage,productPrice);
        // Cập nhật số lượng sản phẩm trên giỏ hàng icon
        countCartItems();
    });

    // chức năng tìm kiếm sản phẩm
    $('#search-btn').on('click',function (){
        let productName =  $('#inputSearch').val();
        axios.get('search-product',{
            params: {
                'product-name': productName
            }
        }).then(function (response){
            showHtml(response.data.data);
        })

    })

    // hàm đọc cookies để thêm vào popup cart
   function getCartFromCookie(){
        let cart = Cookies.get('cart');
        return cart ? JSON.parse(cart):{};
   }

   // hàm đếm các sản phẩm có trong giỏ hàng
   function countCartItems(){
        let cartItems = getCartFromCookie();
        let itemCount = Object.keys(cartItems).length;
       // Cập nhật số lượng sản phẩm trên giỏ hàng icon
       $('.cart-count').text(itemCount);
   }

    function updateCartPopup() {
        let cartItems =getSortedCartItems();
        let $cartItemsList = $('.popup-cart');
        $cartItemsList.empty();

        $.each(cartItems, function (productID, item) {
            let listItem = `
                   <div class="popup-cart-item">
                    <div class="popup-title">
                        <img class="popup-img"
                             src="${item.image}" alt="${item.name}">
                        <p class="popup-name">${item.name}</p>
                    </div>
                    <span class="popup-price">${formatPrice(item.priceDiscount)}đ</span>
                </div>
            `;
            $cartItemsList.append(listItem);
        });
    }

    countCartItems();
    updateCartPopup();
    $('.header-icon').hover(
        function () {
            updateCartPopup();
            $('.popup-cart').show();
        },
        function () {
            $('.popup-cart').hide();
        }
    );

});



