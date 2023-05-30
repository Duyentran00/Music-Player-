/* CÁC CÔNG VIỆC CẦN LÀM 
    1. Render songs-->ok
    2. Scroll to top-->ok
    3. Play, Pause, Seek--> ok
    4. CD rotate-->ok
    5. Next, Prev-->ok
    6. Random-->ok
    7. Next and Repeat when ended-->ok
    8. Active song
    9. Scroll active song into view
    10. Play song when click
    11. Save option 
    11. add volume

    render:  Render hay rendering, tiếng Việt nghĩa là kết xuất, là quá trình tạo ra
    sản phẩm kỹ thuật số cuối cùng từ một loại đầu vào cụ thể.
*/
const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')

const progress = $('#progress')
const timeCurrent = $('.progress-time__current');
const timeDuration = $('.progress-time__duration');

const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const PLAYER_STORAGE_KEY = "MY_DUYEN"

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}, // xem lại bài JSON
    songs:  [
        {
            singer: 'Dua Lipa',
            name: 'Be The One',
            path: './assets/music/Dua Lipa - Be The One .mp3',
            img:  './assets/img/Be the one.jpg'
        },
        {
            singer: 'Selena Gomez',
            name: 'Feel me',
            path: './assets/music/Selena_Gomez_-_Feel_Me.mp3',
            img:  './assets/img/Feel me.jpg'
        },
        {
            singer: 'Timbaland',
            name: 'Give it to me',
            path: './assets/music/Timbaland_-_Give_It_To_Me_ft.mp3',
            img:  './assets/img/Give it to me.jpg'
        },
        {
            singer: 'Rihanna',
            name: 'Only Girl',
            path: './assets/music/Rihanna - Only Girl (In The World).mp3',
            img:  './assets/img/only-girl.jpg'
        },
        {
            singer: 'Nelly Furtado',
            name: 'Stay It Right',
            path: './assets/music/Nelly Furtado - Stay It Right .mp3',
            img:  './assets/img/Say_It_Right.jpg'
        },
        {
            singer: 'Lana Del Rey',
            name: 'Summertime Sadness',
            path: './assets/music/Lana Del Rey - Summertime Sadness .mp3',
            img:  './assets/img/summer time sadness.jpg'
        },
        {
            singer: 'Selena Gomez',
            name: 'The Heart Wants What It Wants',
            path: './assets/music/Selena_Gomez_-_The_Heart_Wants_What_It_Wants.mp3',
            img:  './assets/img/The Heart Wants What It Wants.jpg'
        },
        {
            singer: 'Timbaland',
            name: 'The Way I Are',
            path: './assets/music/Timbaland - The Way I Are ft. Keri Hilson, D.O.E.mp3',
            img:  './assets/img/The way i are.jpg'
        },
    
    ], 
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)) // bắt buộc phải truyền 2 đối số cho setItem
    },

    render: function(){
        const htmls = this.songs.map((song, index) => {
            return ` 
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}> 
                    <div class="thumb" 
                        style="background-image: url('${song.img}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('');
    },
    // hàm hiển thị tên bài hát trên đầu theo index của nó
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    
    // hàm xử lý sự kiện 
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lý đĩa CD quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, // 100 giây
            iterations: Infinity // quay vô hạn
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 // xử lý việc ko cuộn nhanh cd ko ẩn hẳn
            cd.style.opacity = newCdWidth / cdWidth // set độ mờ cho cd
        }

        // Xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play() // play là 1 thuộc tính video và audio của html nha, lên w3 để đọc, từ khóa HTML Audio/video Dom
            }
        }

        // Khi song đc play thì ta lắng nghe sự kiện play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

        }

        // Khi song bị pause 
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                timeDuration.innerText = _this.timeFormat(audio.duration);
                timeCurrent.innerText = _this.timeFormat(audio.currentTime);
            }
        }

        // Xử lý khi tua song
        progress.oninput= function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi prev song 
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } 
            else{
                _this.prevSong()
            }
            audio.play()
        }

        // Khi next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } 
            else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi random song
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom) // **2 
            randomBtn.classList.toggle('active', _this.isRandom) // đọc về toggle
        }
        // Xử lý lặp lại song
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat) // **2 
            repeatBtn.classList.toggle('active', _this.isRepeat) 
        }
        // **2: bước này là để setItem hoạt động, set value cho key

        // Xử lý next song khi audio ended
        audio.onended =  function(){
            if (_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
        }



        // NÂNG CAO HƠN: Lắng nghe hành vi click và playlist
        playList.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            const optionNode = e.target.closest(".option")
            if (songNode || optionNode) {
              // Xử lý khi click vào song
              // Handle when clicking on the song
              if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index); // ít ng biết về dataset
                _this.loadCurrentSong(); // trên kia dài, viết dưới này (ta cho Number vì bên kia _this.currentIndex đang ở kiểu số, mà songNode.dataset.index đang ở strings)
                _this.render();
                audio.play();
              }
      
              // Xử lý khi click vào song option, ko phát nhạc
              if (optionNode) {
                audio.pause();
              }
            }
        };
    },

    // Hàm kéo thì thấy song đang chạy
    scrollToActiveSong: function() {
        setTimeout(() => {
          $('.song.active').scrollIntoView({ // đọc về scrollIntoView
            behavior: 'smooth',
            block: "end",
            inline: "nearest"
          })
        }, 300);
      },

    timeFormat(seconds) {
        let minute = Math.floor(seconds / 60);
        let second = Math.floor(seconds % 60);
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return minute + ":" + second;
    },
    // hàm hiển thị bài hát đang chạy
    loadCurrentSong : function() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },

    loadConfig : function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    }, 

    prevSong: function() {
        this.currentIndex --
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    }, 

    nextSong : function() {
        this.currentIndex ++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    randomSong : function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while(newIndex === this.currentIndex) // điều kiện loại bỏ bài hát có index = index cũ
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },



    start: function() {

        // Gán cấu hình từ config vào app
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object 
        this.defineProperties();
        
        // lắng nghe và xử lý các sự kiện (DOM Events)
        this.handleEvents(); // vì thiếu cái gọi hàm này mà m mất 2 tiếng ko biết vì sao ko cuộn đc
        
        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Prev song
        this.prevSong();

        // Next song
        this.nextSong();

        // Random song
        this.randomSong();

        // Render Playlist
        this.render();

        // Hiển thị trạng thái ban đầu của nút repeat và random
        repeatBtn.classList.toggle('active', this.isRepeat) 
        randomBtn.classList.toggle('active', this.isRandom) // đọc về toggle
    }
}
app.start()

