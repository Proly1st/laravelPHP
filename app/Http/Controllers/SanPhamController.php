<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use voku\helper\ASCII;

class SanPhamController extends Controller
{


    public function index()
    {

        $data = $this->getProductData(); // Gọi hàm getProductData() để lấy danh sách sản phẩm
        $productData = $data['products'];
        $categoriesData = $data['categories'];
        $productsHtml = $this->showViewProduct($productData);

        $categoriesHtml = $this->showViewCategory($categoriesData);


        return view('bai-nang-cao', compact('productsHtml', 'categoriesHtml'));

    }

    public function viewCart()
    {
        return view('cart');

    }

    public function getProductsById(Request $request)
    {
        try {
            $productIDs = $request->input('productIDs');
            $data = $this->getProductData();

            $products = collect($data['products'])->whereIn('id', $productIDs)->values();
            $response = [
                'status' => 200,
                'message' => 'success',
                'data' => $this->convertObjectToArray($products)
            ];
            return $response;

        } catch (Exception $exception) {
            $response = [
                'status' => 500,
                'message' => $exception->getMessage(),
                'data' => null
            ];
            return $response;
        }
    }

    public function filterByPriceRange(Request $request)
    {
        $minPrice = $request->input('minPrice');
        $maxPrice = $request->input('maxPrice');
        $data = $this->getProductData();

        try {
            // Kiểm tra các tham số giá tiền
            if (is_null($minPrice) || is_null($maxPrice)) {
                return response()->json(['status' => 400, 'message' => 'Giá tiền không hợp lệ'], 400);
            }

            // Truy vấn sản phẩm trong khoảng giá tiền
            $products = collect($data['products'])->filter(function($product) use ($minPrice, $maxPrice) {
                return $product['price'] >= $minPrice && $product['price'] <= $maxPrice;
            })->values(); // reset các key sau khi filter

            return response()->json([
                'status' => 200,
                'data' => $products,
                'message' => 'success']);

        } catch (Exception $exception) {
            return response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage()
            ]);
        }
    }

    public function getProductsByCategory(Request $request)
    {
        try {
            $categoryId = $request->get('id');

            $data = $this->getProductData();
            if ($categoryId == 0) {
                $filteredProducts = $data['products'];
            } else {
                $dataCollection = collect($data['products']);
                $filteredProducts = $dataCollection->where('categories', $categoryId);
            }
            // Lọc sản phẩm theo ID danh mục nếu có

            $response = [
                'status' => 200,
                'message' => 'success',
                'data' => $this->convertObjectToArray($filteredProducts)
            ];
            return $response;
        } catch (Exception $exception) {
            $response = [
                'status' => 500,
                'message' => $exception->getMessage(),
                'data' => null
            ];
            return ($response);
        }
    }

    public function convertObjectToArray($obj)
    {
        $arrayConvert = [];
        foreach ($obj as $item) {
            $arrayConvert[] = (object)$item;
        }
        return $arrayConvert;
    }

    public function getProductsByPrice(Request $request)
    {
        $option = $request->get('option');
        $categoryId = $request->get('id');
        $data = $this->getProductData();
        $filteredProducts = collect($data['products']);
        if ($categoryId != 0) {
//            $dataCollection = collect($data['products']);
            $dataCollection = collect($data['products']);
            $filteredProducts = $dataCollection->where('categories', $categoryId);
        }

        // Sắp xếp dữ liệu theo giá
        if ($option == 1) {
//            dd($filteredProducts);
            // Sắp xếp tăng dần
            $filteredProducts = $filteredProducts->sortBy('price');

        } elseif ($option == 2) {
            // Sắp xếp giảm dần
//            dd($filteredProducts);
            $filteredProducts = $filteredProducts->sortByDesc('price');
        }
        try {
            $response = [
                'status' => 200,
                'message' => 'success',
                'data' => $this->convertObjectToArray($filteredProducts)
            ];
            return $response;
        } catch (Exception $exception) {
            $response = [
                'status' => 500,
                'message' => $exception->getMessage(),
                'data' => null
            ];
            return ($response);
        }

    }

    public function getProductData()
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Thời trang nam'
            ],
            [
                'id' => 2,
                'name' => 'Thời trang nữ'
            ],

            [
                'id' => 3,
                'name' => 'Trang sức'
            ],
            [
                'id' => 4,
                'name' => 'Phụ kiện'
            ],
        ];
        $products = [
            [
                'id' => 1,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltdw32tdoekk57',
                'name' => 'Áo nam',
                'price' => 550000,
                'discount' => 10,
                'categories' => 1,
            ],
            [
                'id' => 2,
                'image' => 'https://down-vn.img.susercontent.com/file/a225a5573419a3fae00d6a823371670b',
                'name' => 'Quần nữ',
                'price' => 150000,
                'discount' => 10,
                'categories' => 2
            ],

            [
                'id' => 3,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqzq68f3sszo07',
                'name' => 'Đồng hồ',
                'price' => 300000,
                'discount' => 20,
                'categories' => 3
            ],
            [
                'id' => 4,
                'image' => 'https://down-vn.img.susercontent.com/file/9fe7fa1549da769be1af12177ad2f098',
                'name' => 'Giày đốc nam da mềm',
                'price' => 1500000,
                'discount' => 10,
                'categories' => 4
            ],

            [
                'id' => 5,
                'image' => 'https://down-vn.img.susercontent.com/file/dffa835cc7de357ea90010b6bd09bd7e',
                'name' => 'Dây chuyền vàng giả',
                'price' => 550000,
                'discount' => 25,
                'categories' => 3
            ],

            [
                'id' => 6,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvmx3vcxgol5d6',
                'name' => 'Áo bà ba',
                'price' => 400000,
                'discount' => 15,
                'categories' => 2
            ],
            [
                'id' => 7,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lii8h2vazsi479',
                'name' => 'Áo Chống Nắng Nữ',
                'price' => 500000,
                'discount' => 15,
                'categories' => 2
            ],
            [
                'id' => 8,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj9dfovddo0i55',
                'name' => 'Váy khoét lưng Mina dress',
                'price' => 200000,
                'discount' => 15,
                'categories' => 2
            ],
            [
                'id' => 9,
                'image' => 'https://down-vn.img.susercontent.com/file/8670497794c18897012dde1bf375feb1',
                'name' => 'Đồng Hồ Quartz Ba Mắt',
                'price' => 90000,
                'discount' => 10,
                'categories' => 4
            ],
            [
                'id' => 10,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lil5y6bhofyqd6',
                'name' => 'Dép nữ xixitiao mềm nhẹ giá rẻ',
                'price' => 1990000,
                'discount' => 10,
                'categories' => 4
            ],
            [
                'id' => 11,
                'image' => 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-limtvpwmy7m405',
                'name' => 'Đôi dép ếch dễ thương',
                'price' => 8800000,
                'discount' => 10,
                'categories' => 4
            ],
        ];
        return [
            'products' => $products,
            'categories' => $categories
        ];
    }

    public function showViewProduct($productData)
    {
        $productsHtml = '';

        //Tạo HTMl cho danh sách sản phẩm
        foreach ($productData as $product) {
            $discountedPrice = $product['price'] * (1 - $product['discount'] / 100);
            $discountedPriceFm = number_format($discountedPrice, 0, ',', '.');
            $formatPrice = number_format($product['price'], 0, ',', '.');

            $productsHtml .= <<<HTML
            <div class="products">
                <img class="product-img" src="{$product['image']}" alt="{$product['name']}">
                <span class="discount-percent">-{$product['discount']}%</span>
                <h3 class="product-name">{$product['name']}</h3>
                <p class="price">{$formatPrice}đ</p>
                <span class="price-discount">{$discountedPriceFm}đ</span>
                  <div class="btn-add-cart">
                        <button class="cart-add" data-product-id="{$product['id']}"
                        data-product-img="{$product['image']}" data-product-name="{$product['name']}"
                         data-product-discount-price="{$discountedPrice}" >
                            <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                        </button>
                  </div>
            </div>
            HTML;
        }
        return $productsHtml;
    }

    public function showViewCategory($categoriesData)
    {

        $categoriesHtml = '';
        // Tạo HTML cho select2 categories
        foreach ($categoriesData as $category) {
            $categoriesHtml .= <<<HTML
            <option value="{$category['id']}">{$category['name']}</option>
            HTML;

        }

        return $categoriesHtml;
    }


    // hàm search theo tên sản phẩm
    public function searchProduct(Request $request)
    {
        try {

            $productName = $request->get('product-name');
            $data = $this->getProductData();

            $dataCollection = collect($data['products']);
            $filteredProducts = $dataCollection->filter(function ($product) use ($productName) {
                // Chuyển đổi chuỗi có dấu thành không dấu
                $normalizedProductName = ASCII::to_ascii($product['name']);
                $normalizedSearchTerm = ASCII::to_ascii($productName);

                // Kiểm tra xem tên sản phẩm đã chuyển đổi có chứa chuỗi tìm kiếm đã chuyển đổi hay không
                return Str::contains(Str::lower($normalizedProductName), Str::lower($normalizedSearchTerm));
            });

            $response = [
                'status' => 200,
                'message' => 'success',
                'data' => $this->convertObjectToArray($filteredProducts)
            ];
            return $response;
        } catch (Exception $exception) {
            $response = [
                'status' => 500,
                'message' => $exception->getMessage(),
                'data' => null
            ];
            return ($response);
        }

    }

}
