// bài 1: Tạo 1 ô input, nhập số vào thì console.log số đó ra
$(function () {
    $('#input-b1').on('input', function () {
        let a = $('#input-b1').val()
        if (Number(a)) {
            console.log(a)
        }
    })
})


// Bài 2: Tạo 1 ô input và 1 button, nhập số vào, nhấn button thì alert số đó ra
$(function () {
    $('#btn-b2').on('click', function () {
        let b = $('#input-b2').val()
        if (Number(b)) {
            alert("Số nhập vào là: " + b);
        } else {
            alert(b + " Không phải số");
        }
    })
})

//Bài 3: Tạo 2 ô input và 1 button, nhập số vào 2 ô, nhấn button thì alert tổng 2 số
$(function () {
    $('#btn-b3').on('click', function () {
        if (Number($('#input-b3a').val()) && Number($('#input-b3b').val())) {
            let a = parseInt($('#input-b3a').val())
            let b = parseInt($('#input-b3b').val())
            let sum = a + b;
            alert("Tổng 2 số là: " + sum);
        } else {
            alert("a hoặc b không phải là số!");
        }
    })
})

// Bài 4: Tạo 2 ô input, 1 select (+, -, *, /) và 1 button, nhập số vào 2 ô, chọn phép tính, nhấn
// button thì hiện kết quả
$(function () {
    $('#btn-b4').on('click', function () {
        if (Number($('#input-b4a').val()) && Number($('#input-b4b').val())) {
            let a = parseInt($('#input-b4a').val())
            let b = parseInt($('#input-b4b').val())
            let c = $('#operation').val()
            let result
            switch (c) {
                case "1":
                    result = a + b;
                    alert("Tổng 2 số là: " + result);
                    break;
                case "2":
                    result = a - b;
                    alert("Hiệu 2 số là: " + result);
                    break;
                case "3":
                    result = a * b;
                    alert("Tích 2 số là: " + result);
                    break;
                case "4":
                    result = a / b;
                    alert("Thương 2 số là: " + result);
                    break;
            }
        } else {
            alert("a hoặc b không phải là số!");
        }
    })
})

// Bài 5: Sắp xếp mảng [6,9,1,15,22,33,2,83,67] mà không dùng hàm sort

$(function (){
    let a = [6,9,1,15,22,33,2,83,67];
    console.log(a)
    let temp;
    $('#btn-b5a').on('click',function (){
        for( let i =0; i<a.length;i++){
            for(let j=i+1; j<a.length ; j++){
                if( a[i] > a[j]){
                    temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        $('#lb-b5').text("Mảng Tăng dần: ["+ a +" ]" );

    })

    $('#btn-b5b').on('click',function (){
        for( let i =0; i<a.length;i++){
            for(let j=i+1; j<a.length ; j++){
                if( a[i] < a[j]){
                    temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
      $('#lb-b5').text("Mảng Giảm dần: ["+ a +" ]" );
    })
})

//• Bài 6: Lấy ra những phần tử giống nhau, khác nhau trong 2 mảng [6,9,1,15,22,33,2,83,67],
// [15,2,43,18,9,12,33]

$(function (){
    let a = [6,9,1,15,22,33,2,83,67];
    let b = [15,2,43,18,9,12,33];
    let result1=[];
    let result2=[];
    $('#btn-b6a').on('click',function (){
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                result1.push(a[i]);
            }
        }
        $('#lb-b6a').text("Mảng Giống nhau: ["+result1 +" ]" );
        result1=[];
    })

    $('#btn-b6b').on('click',function (){
        for(let i =0 ; i<a.length;i++){
            if(!b.includes(a[i])){
                result2.push(a[i])
            }
        }
        for(let i =0 ; i<b.length;i++){
            if(!a.includes(b[i])){
                result2.push(b[i])
            }
        }
        result2 = [...new Set(result2)];
        $('#lb-b6b').text("Mảng Khác nhau: ["+result2 +" ]" );
    })

    // bai 7
    let countdownTime = 60; // Đặt thời gian đếm ngược ban đầu (tính bằng giây)
    let countdownInterval;
    let isCountdownRunning = false;

    function startCountdown() {
        isCountdownRunning = true;
        countdownInterval = setInterval(function() {
            countdownTime--;
            $('#countdown').text(countdownTime);

            if (countdownTime === 0) {
                clearInterval(countdownInterval);
                isCountdownRunning = false;
                alert("Đếm ngược đã kết thúc!");
                countdownTime=60;
            }
        }, 1000); // Mỗi lần gọi hàm sẽ trừ đi 1 giây
    }

    $('#btn-b7').on('click',function (){
        if (!isCountdownRunning) {
            startCountdown();
        }

    })
})


