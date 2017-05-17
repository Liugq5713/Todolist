// HTML的引用链接被我删除了

document.querySelector('#notificate').addEventListener('click', () => {
  console.log('begin');
  if (window.Notification) {
    if (Notification.permission == 'granted') {
      console.log(1);
      const notication = new Notification('//TODO ', {
        body: '//TODO 备注',
        tag: '// 标签',
                    // icon: "//字符串。通知面板左侧那个图标地址。

      });
    } else if (Notification.permission != 'denied') {
      console.log(2);

      Notification.requestPermission().then((permission) => {
        console.log(3);

        if (permission == 'granted') {
          const notification = new Notification('Hi，帅哥：', {
            body: '可以加你为好友吗？',
            icon: 'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg',
          });
        }
      });
    } else {
      alert('nothing');
    }
  }
}, false);
