$(function () {
    const apiUrl = 'http://172.16.10.74:9009/api/v2/timeline';
    const token = 'Bearer 4e27c008-7655-44d1-94f4-ef3eb843117b';
    const imageUrl = 'https://beta.api.gateway.overatevntech.com/short/';
    const apiTest = 'https://jsonplaceholder.typicode.com/users';

    // "ProjectId: 8001 Method: 0" +
    // " Token:Bearer 45a15d5b-b54c-4f24-8887-c38ea02f0e37 " +
    // "Request:http://172.16.10.118:7080/api/v9/admins?admin_role_id=-1&status=-1 Body:null"
    axios.get(apiUrl
        , {
            params:{
                limit:20,
                post_type:0,
            },
            headers: {
                'Authorization':token
                // 'Authorization': 'Bearer 45a15d5b-b54c-4f24-8887-c38ea02f0e37 ',
                // 'ProjectId': 8001,
                // 'Method': 0
            }
        }
    ).then(response => {
        console.log(response.data);
        // return;
        const data = response.data.data;
        console.log(response.data.data)
        const tableData = data.map(item => ({
            content: item.content,
            fullName: item.user.full_name,
            avatar: `<img src="" alt="${imageUrl + item.user.avatar}">`

        }))
        displayTable(tableData);

        // Line Chart
        // Chuẩn bị dữ liệu cho biểu đồ đường
        const chartData = data.reduce((acc, item) => {
            // accumulator (acc) - giá trị được trả về từ lần gọi callback trước đó.
            // currentValue (item) - giá trị của phần tử hiện tại trong mảng.
            // currentIndex (optional) - chỉ số của phần tử hiện tại trong mảng.
            // array (optional) - mảng gốc đang được duyệt.
            // console.log(item.post_id)

            // Kiểm tra xem post_id đã tồn tại trong lineChartData hay chưa
            if (acc[item.post_id]) {
                // Nếu đã tồn tại, tăng giá trị lên 1
                acc[item.post_id].value++;
            } else {
                // Nếu chưa tồn tại, tạo một đối tượng mới với value = 1 và name = post_id
                acc[item.post_id] = {value: item.post_id, name: item.post_id};
            }
            // Trả về đối tượng accumulator đã được cập nhật
            return acc;
        }, {});

        // Cấu hình tùy chọn cho biểu đồ đường
        const lineChartOptions = {
            xAxis: {
                // Thiết lập kiểu trục x là 'category'
                type: 'category',
                // Sử dụng thuộc tính name của từng mục trong lineChartData làm nhãn trục x
                data: Object.values(chartData).map(item => item.name)
            },
            yAxis: {
                // Thiết lập kiểu trục y là 'value'
                type: 'value'
            },
            series: [
                {
                    // Sử dụng thuộc tính value của từng mục trong lineChartData làm dữ liệu trục y
                    data: Object.values(chartData).map(item => item.value),
                    // Thiết lập kiểu biểu đồ là 'line'
                    type: 'line'
                }
            ]
        }

        const lineChartDom = document.getElementById('lineChart');
        const lineChart = echarts.init(lineChartDom);
        lineChart.setOption(lineChartOptions);

        //     columnChartOptions
        const columnChartOptions = {
            xAxis: {
                type: 'category',
                data: Object.values(chartData).map(item => item.name)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: Object.values(chartData).map(item => item.value),
                    type: 'bar'
                }
            ]
        };

        const columnChartDom = document.getElementById('columnChart');
        const columnChart = echarts.init(columnChartDom);
        columnChart.setOption(columnChartOptions);

        // pieChart
        const pieChartOptions = {
            series: [
                {
                    data: Object.values(chartData),
                    type: 'pie'
                }
            ]
        };

        const pieChartDom = document.getElementById('pieChart');
        const pieChart = echarts.init(pieChartDom);
        pieChart.setOption(pieChartOptions);
    }).catch(error => {
        console.log(error)
    })

    function displayTable(data) {
        $('#tableAPI').DataTable({
            data: data,
            columns: [
                {data: 'avatar', title: 'avatar'},
                {data: 'content', title: 'content'},
                {data: 'fullName', title: 'full Name'},
            ]
        })
    }

})
