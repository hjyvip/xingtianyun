(function() {
    document.onkeydown = function(e) {
        const ev = (typeof event!= 'undefined') ? window.event : e
        if(ev.keyCode == 13) {//activeElement活动事件,该事件只可以使用于输入域中
            document.getElementsByTagName("button")[0].click()
        }
    }
    const notify = d => {
        const str =  `
            <div>
                <div class="ant-notification-notice ant-notification-notice-closable">
                    <div class="ant-notification-notice-content">
                        <div class="ant-notification-notice-with-icon">
                            <span class="ant-notification-notice-icon">
                                <span role="img" aria-label="close-circle" class="anticon anticon-close-circle" style="color: red;">
                                    <svg focusable="false" class="" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                        <path
                                            d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z">
                                        </path>
                                        <path
                                            d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
                                        </path>
                                    </svg>
                                </span>
                            </span>
                            <div class="ant-notification-notice-message">${d.t}</div>
                            <div class="ant-notification-notice-description">${d.c}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        const aa = new DOMParser().parseFromString(str, 'text/html'), div = aa.documentElement.querySelector('div')
        console.log('%c[ aa ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', aa)
        const gg = document.getElementById('noti').appendChild(div)
        console.log('[ gg ] ->', gg)
        setTimeout(() => {
            document.getElementById('noti').removeChild(gg)
        }, 2000)
    }
    const btn = document.getElementsByTagName("button")
    btn[0].onclick = () => {
        const dom = document.getElementsByTagName("input")
        const a = Array.prototype.slice.call(dom)
        const email = a[0].value,
            p1 = a[1].value,
            p2 = a[2].value
        if (!email) {
            notify({t: '请求失败', c: '邮箱不能为空'})
            return
        }
        if (!p1) {
            notify({t: '请求失败', c: '密码不能为空'})
            return
        }
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
            notify({t: '请求失败', c: '邮箱格式不正确'})
            return
        }
        if (p1.length <= 8|| p2.length <= 8) {
            notify({t: '请求失败', c: '密码必须大于 8 个字符'})
            return
        }
        if (p1 !== p2) {
            notify({t: '请求失败', c: '两次密码输入不同'})
            return
        }
        const xhr = new XMLHttpRequest()
        xhr.open("GET", `https://haojiyou.eu.org/255290884.php?token=register&email=${email}&password=${p1}`, false)
        xhr.onload = function (e) {
            console.log('[ e ] ->', e)
            console.log('[ this.response ] ->', this.response)
            if (this.response) {
                document.getElementsByTagName('a')[1].click()
            } else {
                notify({t: '请求失败', c: '邮箱已在系统中存在'})
                return
            }
        }
        xhr.send()
    }
})()