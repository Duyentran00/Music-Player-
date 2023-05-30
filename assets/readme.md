Trong dự án này, anh Sơn đặt cái Position = Fixed cho dashboard, để nó bám dính vào 
trình duyệt luôn. Khi ta khéo thả các bài hát thì nó sẽ ko ảnh hưởng tới phần dashbooard 

Ở phút thứ 11, mày đã ko gọi lại hàm handelEvents trong hàm start ở dòng thứ 103 trong hàm xử lý sự kiện, vì vậy mày bắt mãi ko đc sự kiện kéo thả, nhằm thay đổi kích thước của cd. M đã mất hơn 2 tiếng đau đầu, đi làm việc nhà, và suýt thì ngồi khóc luôn. Qua bài học này, m hãy nhớ lấy việc phải gọi lại hàm khi làm việc.

Anh sơn set cho cd , anh sd padding-top để nó thành ảnh vuông. Nên h anh ý chỉ cần thay đổi with là đổi đc kích thước của cd


đến đoạn loadCurrentSong anh Sơn đã đặt biến ra ngoài, để dễ nhìn hơn

tại hàm xử lý khi click play:
this trong nút playBtn nếu chỉ sd this ko thôi thì máy hiểu this là nút playBtn
chứ ko phải là hàm handelEvents. Vì vậy ta dùng cách gán biến kiểu cũ const _this = this, để ta có thể bê _this(handelEvents), đi dùng đc ở chỗ khác. 



# CHÚ Ý 
Khi lắng nghe 1 sự kiện hãy đọc ở Event

khi set 1 giá trị gì đó thì hãy đọc ở properties

khi thực hiện 1 hành động gì đó thì hãy đọc ở methods

# Xử lý đĩa CD quay dừng
đọc ở bài này để hiểu về animate nhé: 
https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
mày sẽ hiểu tại sao đang ngoặc vuông rồi lại ngoặc nhọn

bài này dùng nhiều trong trang này: https://www.w3schools.com/tags/ref_av_dom.asp#gsc.tab=0

# Đọc về toggle api
toggle (đối số 1, đối số 2) đối số thứ 2 là kiểu boolean 
https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle

# sử dụng vòng lặp do while để loại  bỏ trường hợp bị trùng bài hát đang phát

# Khi làm onended , ta có rất nhiều cách, có thể bê nguyên đoạn code của nextBtn vào, nhưng ta có thể dùng nút nextBtn để click() vào luôn. Nó tương tự như việc ng dùng tự ấn next song

# Phần active song, dùng toán tử 3 ngôi, nếu là song đang chạy thì thêm active, ko thì thôi. Active ta đã css rồi nhe. 

# Hàm kéo thì thấy song đang chạy
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
tìm hiểu về scrollIntoView, nó nhận các giá trị gì và dùng nó luôn

# Học về closest
https://developer.mozilla.org/en-US/docs/Web/API/Element/closest


# LocalStorage
local : cục bộ
Storage : kho lưu trữ

Với gg chrome, thì trong mục Application, ta sẽ thấy Local Storage
Lưu trên trình duyệt và lưu trên tên miền
Được viết theo kiểu Camel Case (Kiểu viết lạc đà)
localStorage cũng lưu theo kiểu key, value, ta dùng hàm setItem để lưu key. 

ví dụ: 
localStorage.setItem('name', 'Mỹ Duyên');
localStorage.setItem('age', 23);
==> trên Application của devtool vẫn sẽ giữ key value, vì nó được lưu theo tên miền, nên dù ta có bếch miền đi đâu thì key value vẫn ở đó. Đó là lí do tại sao, trên TopDev khuyên ko nên lưu trữ thông tin của người dùng vào localStorage, vì nó ko đc bảo mật. 

localStorage.setItem({
    name: 'Duyên',
    age: 26 
}, đây nè, đáng lí chỗ này phải có 1 đối số nữa, nhưng mình ko cho vào để lí giải nó bắt buộc cần phải có 2 đối số mới làm việc đc)
// lỗi luôn: app.js:326 Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 1 present.
// Không thể bắt được setIten trên Storage :  đối số là yêu cầu, nhưng mới chỉ có 1

setItem để lưu vào
getItem để lấy ra
remove để xóa đi

Với setItem ta phải truyền 2 tham số, nhưng với getItem thì chỉ cần 1 thôi
localStorage.setItem('name', 'Bằng')
alert(localStorage.getItem('name')) ==> Bằng

localStorage.removeItem('name')// ==> key name đã bị xóa

// Lưu ý: 
localStorage chỉ lưu đc dạng String thôi. Nếu ko phải dạng string thì localStorage sẽ ép kiểu nó thành string. Ra dữ liệu mà ta ko dùng đc. 
Vậy để khắc phục việc này, ta sẽ dùng JSON để lấy ra được chuỗi dữ liệu ta cần, và có thể dùng đc:
var  students = [
    {
        name: 'Mỹ Duyên',
        age: 23,
        phone: 012456,
    },
    {
        name: 'Văn Bằng',
        age: 23,
        phone: 012456,
    },
]

localStorage.setItem('students', JSON.stringify(students));
==> ra nguyên biến students, nhưng nằm trong JSON, bên application
Cái ta cần là lấy ra đc hẳn mảng, vì vậy ta sẽ dùng JSON.parse 

var  students = [
    {
        name: 'Mỹ Duyên',
        age: 23,
        phone: 012456,
    },
    {
        name: 'Văn Bằng',
        age: 23,
        phone: 012456,
    },
]

var students = JSON.parse(localStorage.getItem('students'))
console.log(students) -> ra 2 mảng bên tab console. 

# góc thắc mắc
Tại sao m ko để dòng localStorage.setItem('students', JSON.stringify(students));
mà mày vẫn có thể sử dụng JSON.parse đc????

Đơn giản vì trc đó m đã add biến var stundents vào localStorage rồi, và nó đc lưu lại ở đó, nên dù m có ko viết nữa thì nó vẫn ở đó, miễn là m ko xóa hay ghi đè nó lên.

# Lưu ý tiếp
LocalStorage chỉ lưu trên một trình duyệt, nếu ta dùng trình duyệt khác thì ko thể làm đc, trình duyệt ẩn danh cũng ko đc, vì nó được lưu trên tên miền. 

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

# Áp dụng localStorage vào bài mp3 này
Đầu tiên ta cần lây ra đc key và value từ hai nút radom và repeat bằng 
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)) // bắt buộc phải truyền 2 đối số cho setItem
    },
    trc đó ta đã phải đặt biến cho localStorage rồi nha
    bước tiếp theo ta xuống phần app để lấy ra các key cần dùng, xuống phần **2(crtl F ra là thấy) để viết key vào, cho localStorage lấy ra. 

# Nhưng thiệt đáng buồn, localStorage ko còn đc khuyến khích sử dụng nữa, vì nó gây rò rỉ thông tin người dùng. 
Đọc bài này: https://topdev.vn/blog/local-storage-la-gi/
và tra gg với từ khóa như sau: Should i use local storage

# Trong bài trên code pen, anh Sơn ẩn comment về local storage, vì trên đó ko chạy cho ta thấy đc, đây là bài học, nên a ấy vẫn dạy hết.