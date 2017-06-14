TODO.List.addList = function() {
    const arrangement = TODO.List.get_Input_Event();
    // 如果数据为空，那么直接退出
    if (arrangement.user_event == '') {
        return false;
    }
    console.log('add ');
    TODO.DB.add_event(arrangement);
    //TODO::这边重新刷新了所有的数据，要好好想想
    TODO.Panel.event_all();
    clearInput();
};

// 获取输入的数据,并对数据进行处理
TODO.List.get_Input_Event = function() {
    const item = document.getElementById('item').value;
    const createDate = new Date();
    const date = createDate.Format('yyyy年MM月dd日 hh:mm:ss');
    user_id++;
    const arrangement = {
        id: user_id,
        user_event: item,
        finished: false,
        user_date: date,
        srarted: false,
    };
    return arrangement;
};