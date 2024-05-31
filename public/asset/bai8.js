
$(function () {
    let data = [
        {
            'id': 0,
            'text': 'Lựa chọn sản phẩm',

        },
        {
            'id': 1,
            'text': 'quần',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 2,
            'text': 'áo khoác',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 3,
            'text': 'mũ',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 4,
            'text': 'khăn',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 5,
            'text': 'áo thun',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 6,
            'text': 'áo cổ cao',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 7,
            'text': 'ủng',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 8,
            'text': 'giày',
            'color': 'đen',
            'price': 120000,
        },
        {
            'id': 9,
            'text': 'quần Jean',
            'color': 'trắng',
            'price': 120000,
        },
        {
            'id': 10,
            'text': 'Nón tai bèo',
            'color': 'xanh',
            'price': 120000,
        },
    ];
    let removedData = [];
    // let nextID = 0;

    $('#example-select').select2({
        data: data
    });

    let $table = $('#my-datatable').DataTable({
        data: [],
        columns: [
            {
                data: null,
                title: 'STT',
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {data: 'text', title: 'Tên sản phẩm'},
            {data: 'color', title: 'Màu'},
            {data: 'price', title: 'Đơn Giá'},
            {
                data: null,
                title: 'Action',
                render: function (data, type, row) {
                    return `<button class="btn btn-danger btn-sm delete-row">Xóa</button>`;
                }
            }
        ],
        columnDefs: [
            {
                targets: -1, // Cột cuối cùng
                ordertable: false, // Không cho phép sắp xếp theo cột này
                className: 'text-center' // Căn giữa các nút xóa
            }
        ],
        searching: false, // Mặc định là true, set false để tắt chức năng search
        ordering:  false, // Mặc định là true, set false để tắt chức năng sắp xếp theo collumn


        scrollX: 400, // Nội dụng của table sẽ hiện thị với with 400px, Nếu quá thì sẽ có thanh scroll
        scrollY: 400, // Nội dụng của table sẽ hiện thị với hieght 400px, Nếu quá thì sẽ có thanh scroll
        processing: true,
    });


    $('#example-select').on('select2:select', function (e) {
        let selectedId = e.target.value;
        let selectedData = data.find(item => item.id == selectedId);


        // Xoá data của option được chọn khỏi mảng data
        data = data.filter(item => item.id != selectedId);

        // Thêm data của option được chọn vào mảng removedData
        removedData.push(selectedData);

        // Cập nhật lại dữ liệu cho Select2
        $('#example-select').empty().select2({
            data: data
        });



        //  Xoá dữ liệu cũ trước khi thêm
        $table.clear().draw();
        // Thêm dữ liệu từ removedData vào DataTable
        $table.rows.add(removedData).draw();

    });

    $('#my-datatable').on('click', '.delete-row', function () {

        let row = $(this).closest('tr');
        if (row.index() < $table.rows().count()){
            $table.rows().every(function () {
                let r = $(this.node())
                if (r.index() > row.index()) r.find('td:eq(0)').text(r.find('td:eq(0)').text() - 1)
            })
        }

        console.log(row.index())
        let dataDelete = $table.row(row).data();
        $table.row(row).remove().draw();

        // Xóa dữ liệu tương ứng khỏi mảng removedData
        removedData = removedData.filter(item => item.id !== dataDelete.id);

        //Thêm dữ liệu đó vào ngược lại mảng trong select2
        data.push(dataDelete);

        // Cập nhật lại dữ liệu cho Select2
        $('#example-select').empty().select2({
            data: data
        });
    })

});
